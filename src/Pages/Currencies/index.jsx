import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Currencies = () => {
  const { permissions } = useContext(PermissionsContext);

  const cols = {
    name: { label: "Currency", value: "name", hidden: false },
    code: { label: "Code", value: "code", hidden: false },
    symbol: { label: "Symbol", value: "symbol", hidden: false },
    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("currency.show"),
        edit: permissions.includes("currency.update"),
        translate: permissions.includes("currency.translate"),
        delete: permissions.includes("currency.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("currency.create"),
    search: true,
    download: true,
    filter: true,
    filter_cols: true,
  };

  return (
    <Table path={"currencies"} tools={tools} cols={cols}>
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
export default Currencies;
