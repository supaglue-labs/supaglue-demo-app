import { ReactNode } from "react";

export default function IntegrationsHeader({
  children,
}: {
  children: ReactNode;
}) {
  return <h1 className="text-xl semi-bold underline my-2">{children}</h1>;
}
