import { useContext } from "react";
import Table from "../../../Components/common/Table";
import { PermissionsContext } from "../../../context";

const History = () => {
  const { permissions } = useContext(PermissionsContext);
  const cols = {
    title: { label: "Title", value: "title", hidden: false },
    type: { label: "Type", value: "type", hidden: false },
    message: { label: "Message", value: "message", hidden: false },
    filter: { label: "Filter", value: "filter", hidden: false },
    target_count: {
      label: "Target count",
      value: "target_count",
      hidden: false,
    },
    target_type: { label: "Target type", value: "target_type", hidden: false },
    notifications_templates: {
      label: "Notification template",
      value: "NotificationTemplate",
      hidden: false,
    },

    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("notification.history.show"),
        edit: permissions.includes("notification.history.update"),
        translate: permissions.includes("notification.history.translate"),
        delete: permissions.includes("notification.history.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("notification.history.create"),
    search: true,
    download: true,
    filter: true,
    filter_cols: true,
  };

  return (
    <Table path={"notifications_history"} tools={tools} cols={cols}>
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

export default History;
