"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
const links = [
  { label: "Company", href: "/#company" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
];
export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="DKS Builders home">
      <Image
        src="/assets/dks-original-logo.webp"
        alt=""
        width={48}
        height={34}
      />
      <span className="wordmark">
        <b>DKS</b> BUILDERS
        <span className="brand-note">ENGINEERING & CONSTRUCTION</span>
      </span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    const onOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !nav.current?.contains(event.target) &&
        !toggle.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/#contact">Contact</Link>
        </nav>
        <Link className="button" href="/#contact">
          Discuss a project
          <ArrowRightIcon size={17} />
        </Link>
        <button
          ref={toggle}
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          {open ? <XIcon size={18} /> : <ListIcon size={18} />}
        </button>
      </div>
      {open && (
        <nav
          ref={nav}
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setOpen(false)}>
            Discuss a project
          </Link>
        </nav>
      )}
    </header>
  );
}
