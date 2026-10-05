export function Parallax({
  children,
  className,
  overlay,
}: {
  children: React.ReactNode;
  className?: string;
  overlay?: React.ReactNode;
}) {
  return (
    <div className={"parallax-media " + (className ?? "")}>
      <div className="parallax-inner">{children}</div>
      {overlay}
    </div>
  );
}
