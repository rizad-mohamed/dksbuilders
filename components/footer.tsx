import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Brand } from "./header";
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <Brand />
          <nav aria-label="Footer navigation">
            <Link prefetch={false} href="/#company">
              Company
            </Link>
            <Link prefetch={false} href="/#services">
              Services
            </Link>
            <Link prefetch={false} href="/projects">
              Projects
            </Link>
            <Link prefetch={false} href="/careers">
              Careers
            </Link>
          </nav>
          <Link prefetch={false} className="text-link" href="/#main">
            Back to top
            <ArrowUpRightIcon size={15} />
          </Link>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getUTCFullYear()} DKS Builders. Elpitiya, Sri Lanka.
          </span>
          <a
            href="https://quentagon.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designed by Quentagon
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
