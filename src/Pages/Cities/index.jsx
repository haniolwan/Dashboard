import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Cities = () => {
  const { permissions } = useContext(PermissionsContext);

  const cols = {
    // country: { label: "Country", value: "name", hidden: false },
    name: { label: "City", value: "name", hidden: false },
    is_active: { label: "Active", value: "is_active", hidden: false },

    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("city.show"),
        edit: permissions.includes("city.update"),
        translate: permissions.includes("city.translate"),
        delete: permissions.includes("city.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("city.create"),
    search: true,
    download: permissions.includes("city.download"),
    filter: permissions.includes("city.filter"),
    filter_cols: true,
  };

  return (
    <Table path={"cities"} tools={tools} cols={cols}>
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

export default Cities;
