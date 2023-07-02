export function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-10">
      <div className="px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
