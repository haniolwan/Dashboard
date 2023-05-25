import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Services = () => {
  const { permissions } = useContext(PermissionsContext);

  const cols = {
    image: { label: "Image", value: "image", hidden: false },
    name: { label: "Service", value: "name", hidden: false },
    description: { label: "Description", value: "description", hidden: false },
    is_active: { label: "Active", value: "is_active", hidden: false },

    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("service.show"),
        edit: permissions.includes("service.update"),
        translate: permissions.includes("service.translate"),
        delete: permissions.includes("service.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("service.create"),
    search: true,
    download: permissions.includes("service.download"),
    filter: permissions.includes("service.filter"),
    filter_cols: true,
  };
  return (
    <Table path={"services"} tools={tools} cols={cols}>
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
export default Services;
