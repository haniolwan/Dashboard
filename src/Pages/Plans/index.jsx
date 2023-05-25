import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Plans = () => {
  const { permissions } = useContext(PermissionsContext);

  const cols = {
    name: { label: "Page", value: "name", hidden: false },
    billing_days: {
      label: "Billing days",
      value: "billing_days",
      hidden: false,
    },
    price: { label: "Price", value: "price", hidden: false },
    features: { label: "Features", value: "features", hidden: false },
    order_price: { label: "Order price", value: "order_price", hidden: false },
    orders_count: {
      label: "Orders count",
      value: "orders_count",
      hidden: false,
    },
    is_active: { label: "Active", value: "is_active", hidden: false },

    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("page.show"),
        edit: permissions.includes("page.update"),
        translate: permissions.includes("page.translate"),
        delete: permissions.includes("page.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("page.create"),
    search: true,
    download: permissions.includes("page.download"),
    filter: permissions.includes("page.filter"),
    filter_cols: true,
  };

  return (
    <Table path={"plans"} tools={tools} cols={cols}>
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
