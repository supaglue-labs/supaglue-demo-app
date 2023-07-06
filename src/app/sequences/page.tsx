import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import { SequencesTable } from "./SequencesTable";

export default function Sequences() {
  return (
    <>
      <Nav title="Sequences" />
      <Content>
        <SequencesTable />
      </Content>
    </>
  );
}
