export function Parallax({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"parallax-media " + (className ?? "")}>
      <div className="parallax-inner">{children}</div>
    </div>
  );
}
