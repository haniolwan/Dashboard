import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Roles = () => {
  const { permissions } = useContext(PermissionsContext);

  const cols = {
    name: { label: "Roles", value: "name", hidden: false },
    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("provider.show"),
        edit: permissions.includes("provider.update"),
        translate: permissions.includes("provider.translate"),
        delete: permissions.includes("provider.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("provider.create"),
    search: true,
    download: true,
    filter: true,
    filter_cols: true,
  };
  return (
    <Table path={"roles"} tools={tools} cols={cols}>
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
export default Roles;
