import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";

export function PageIntro({
  label,
  title,
  copy,
}: {
  label: string;
  title: string;
  copy: string;
}) {
  return (
    <header className="page-intro">
      <Link href="/" prefetch={false} className="text-link">
        <ArrowLeftIcon size={16} aria-hidden="true" />
        Back to home
      </Link>
      <div className="eyebrow">
        <span>DKS BUILDERS /</span>
        {label}
      </div>
      <h1>{title}</h1>
      <p>{copy}</p>
    </header>
  );
}
