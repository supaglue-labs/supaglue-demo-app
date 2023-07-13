import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import { SequencesTable } from "@/components/SequencesTable";

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
