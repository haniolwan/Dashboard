import { useContext } from "react";
import Table from "../../../Components/common/Table";
import { PermissionsContext } from "../../../context";

const Templates = () => {
  const { permissions } = useContext(PermissionsContext);
  const cols = {
    title: { label: "Title", value: "title", hidden: false },
    message: { label: "Message", value: "message", hidden: false },
    type: { label: "Type", value: "type", hidden: false },

    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("notification.template.show"),
        edit: permissions.includes("notification.template.update"),
        translate: permissions.includes("notification.template.translate"),
        delete: permissions.includes("notification.template.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("notification.template.create"),
    search: true,
    download: permissions.includes("notification.history.download"),
    filter: permissions.includes("notification.history.filter"),
    filter_cols: true,
  };

  return (
    <Table path={"notifications_templates"} tools={tools} cols={cols}>
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

export default Templates;
