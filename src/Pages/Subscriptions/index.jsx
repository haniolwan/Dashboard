import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Subscriptions = () => {
  const { permissions } = useContext(PermissionsContext);
  const cols = {
    name: { label: "Name", value: "name", hidden: false },
    billing_days: {
      label: "Billing days",
      value: "billing_days",
      hidden: false,
    },
    price: { label: "Price", value: "price", hidden: false },
    orders_count: {
      label: "Orders count",
      value: "orders_count",
      hidden: false,
    },
    balance: { label: "Balance", value: "balance", hidden: false },
    order_price: { label: "Order price", value: "order_price", hidden: false },
    started_at: { label: "Started at", value: "started_at", hidden: false },
    expire_at: { label: "Expire at", value: "expire_at", hidden: false },
    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: !permissions.includes("subscription.show"),
        edit: permissions.includes("subscription.update"),
        translate: permissions.includes("subscription.translate"),
        delete: permissions.includes("subscription.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("subscription.create"),
    search: true,
    download: permissions.includes("subscription.download"),
    filter: permissions.includes("subscription.filter"),
    filter_cols: true,
  };
  return (
    <Table path={"subscriptions"} tools={tools} cols={cols}>
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
export default Subscriptions;
