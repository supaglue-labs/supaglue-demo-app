export function Collapse({
  tabIndex,
  header,
  children,
}: {
  tabIndex: number;
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <details className="collapse bg-base-200">
      <summary className="collapse-title text-xl font-medium">{header}</summary>
      <div className="collapse-content">{children}</div>
    </details>
  );
}
