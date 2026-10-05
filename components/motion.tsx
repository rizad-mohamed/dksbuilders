export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className} data-reveal="" data-delay={delay}>
      {children}
    </div>
  );
}
