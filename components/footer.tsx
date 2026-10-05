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
            <Link href="/#company">Company</Link>
            <Link href="/#services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/careers">Careers</Link>
          </nav>
          <Link className="text-link" href="/#main">
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
