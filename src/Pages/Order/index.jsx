import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Orders = () => {
  const { permissions } = useContext(PermissionsContext);
  const cols = {
    name: { label: "Name", value: "name", hidden: false },
    user: { label: "User", value: "user", hidden: false },
    provider: { label: "Provider", value: "provider", hidden: false },
    service: { label: "Service", value: "service", hidden: false },
    date: { label: "Date", value: "date", hidden: false },
    // order_type: { label: "Type", value: "order_type", hidden: false },
    order_status: { label: "Status", value: "order_status", hidden: false },

    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("order.show"),
        delete: permissions.includes("order.destroy"),
        edit: permissions.includes("order.update"),
        translate: permissions.includes("order.translate"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("order.create"),
    search: true,
    download: permissions.includes("order.download"),
    filter: permissions.includes("order.filter"),
    filter_cols: true,
  };

  return (
    <Table path={"orders"} tools={tools} cols={cols}>
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
export default Orders;
