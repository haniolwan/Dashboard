import Table from "../../Components/common/Table";

const Plans = () => {
  const cols = {
    name: { label: "Settings", value: "name", hidden: false },
    key: {
      label: "Key",
      value: "key",
      hidden: false,
    },
    input_type: { label: "Input Type", value: "input_type", hidden: false },
    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: false,
        edit: true,
        translate: false,
        delete: false,
      },
      hidden: false,
    },
  };

  const tools = {
    add: false,
    search: true,
    download: false,
    filter: false,
    filter_cols: true,
  };

  return (
    <Table path={"settings"} tools={tools} cols={cols}>
      <Table.OuterContainer>
        <Table.InnerContainer>
          <Table.Tools />
          <Table.HeadContainer>
            <Table.Head />
            <Table.Body />
          </Table.HeadContainer>
        </Table.InnerContainer>
        <Table.Footer />
      </Table.OuterContainer>
    </Table>
  );
};
export default Plans;
