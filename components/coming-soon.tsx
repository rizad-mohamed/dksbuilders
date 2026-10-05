import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
export function ComingSoon({ title, copy }: { title: string; copy: string }) {
  return (
    <main id="main" className="wrap coming-soon">
      <div className="eyebrow">
        <span>DKS BUILDERS /</span> COMING SOON
      </div>
      <h1>{title}</h1>
      <p>{copy}</p>
      <div className="coming-actions">
        <Link href="/" className="button">
          Back to home
          <ArrowRightIcon size={17} />
        </Link>
        <a href="mailto:dksbuilders@gmail.com" className="button outline">
          Email our team
        </a>
      </div>
    </main>
  );
}
