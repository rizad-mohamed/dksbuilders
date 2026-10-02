"""Dependency-free release checks for HTML, navigation, metadata, assets and business data."""
import base64
import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
errors = []

class Audit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.anchors = []
        self.assets = []
        self.heading_levels = []
        self.canonical = []
        self.scripts = []
        self.in_json = False
        self.json_text = ''
        self.meta = {}

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.append(a['id'])
        if re.fullmatch(r'h[1-6]', tag):
            self.heading_levels.append(int(tag[1]))
        if tag == 'a':
            self.anchors.append(a.get('href', ''))
            if a.get('target') == '_blank' and not {'noopener', 'noreferrer'} <= set(a.get('rel', '').split()):
                errors.append('External new-tab link missing safe rel')
        if tag == 'img':
            if 'alt' not in a or not a.get('width') or not a.get('height'):
                errors.append('Image missing alt or explicit dimensions')
            self.assets.append(a.get('src', ''))
        if tag == 'source':
            self.assets.extend(x.strip().split()[0] for x in a.get('srcset', '').split(',') if x.strip())
        if tag == 'link' and a.get('rel') == 'stylesheet':
            self.assets.append(a['href'])
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical.append(a['href'])
        if tag == 'meta':
            self.meta[a.get('name', a.get('property', ''))] = a.get('content', '')
        if tag == 'script':
            if a.get('src'):
                self.assets.append(a['src'])
            self.in_json = a.get('type') == 'application/ld+json'

    def handle_data(self, data):
        if self.in_json:
            self.json_text += data

    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_json = False

html = (dist / 'index.html').read_text()
audit = Audit()
audit.feed(html)
if audit.heading_levels.count(1) != 1:
    errors.append('Expected one page-level H1')
for previous, current in zip(audit.heading_levels, audit.heading_levels[1:]):
    if current > previous + 1:
        errors.append(f'Heading level skipped: h{previous} to h{current}')
if len(audit.ids) != len(set(audit.ids)):
    errors.append('Duplicate DOM ID')
for href in audit.anchors:
    if not href:
        errors.append('Empty link')
    elif href.startswith('#') and href[1:] not in audit.ids:
        errors.append(f'Broken section link: {href}')
for asset in audit.assets:
    if not (dist / asset.lstrip('/')).is_file():
        errors.append(f'Missing local asset: {asset}')
if len(audit.canonical) != 1 or not audit.canonical[0].startswith('https://'):
    errors.append('Missing absolute canonical')
if not audit.meta.get('description') or not audit.meta.get('viewport'):
    errors.append('Missing required metadata')
schema = json.loads(audit.json_text)
if schema.get('telephone') != '+94912290737' or schema['address']['addressLocality'] != 'Elpitiya':
    errors.append('NAP data mismatch')
if any(x in schema for x in ('aggregateRating', 'review')):
    errors.append('Unverified review schema')
if re.search(r'lorem ipsum|100% satisfaction|dummy testimonial', html, re.I):
    errors.append('Placeholder or unsubstantiated content')
sitemap = ET.parse(dist / 'sitemap.xml')
locations = [e.text for e in sitemap.iter() if e.tag.endswith('loc')]
if locations != audit.canonical:
    errors.append('Sitemap and canonical mismatch')
if not (dist / 'robots.txt').is_file():
    errors.append('Missing robots directives')
# Header policy must permit the requested map and exact JSON-LD content.
headers = (dist / '_headers').read_text()
json_ld_hash = base64.b64encode(hashlib.sha256(audit.json_text.encode()).digest()).decode()
if f"'sha256-{json_ld_hash}'" not in headers:
    errors.append('JSON-LD CSP hash is stale')
if 'frame-src https://www.google.com;' not in headers:
    errors.append('Google Maps iframe blocked by CSP')
css = (dist / 'styles.css').read_text()
if 'prefers-reduced-motion' not in css or ':focus-visible' not in css:
    errors.append('Missing reduced-motion or focus styles')
for asset in (dist / 'assets').glob('*.webp'):
    if asset.stat().st_size > 300_000:
        errors.append(f'Asset over 300KB budget: {asset.name}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(audit.anchors)} links, {len(audit.assets)} assets, headings, NAP, structured data, metadata, sitemap, motion/focus rules and image budgets.')
print('Browser rendering, live external delivery, WCAG conformance and Lighthouse remain separate checks.')
