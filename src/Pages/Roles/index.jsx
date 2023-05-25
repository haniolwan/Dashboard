import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Roles = () => {
  const { permissions } = useContext(PermissionsContext);

  const cols = {
    name: { label: "Roles", value: "name", hidden: false },
    is_active: { label: "Active", value: "is_active", hidden: false },

    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("role.show"),
        edit: permissions.includes("role.update"),
        translate: permissions.includes("role.translate"),
        delete: permissions.includes("role.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("role.create"),
    search: true,
    download: permissions.includes("role.download"),
    filter: permissions.includes("role.filter"),
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
