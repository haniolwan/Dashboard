import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Countries = () => {
  const { permissions } = useContext(PermissionsContext);
  const cols = {
    flag: { label: "Flag", value: "flag", hidden: false },
    name: { label: "Country", value: "name", hidden: false },
    code: { label: "Code", value: "code", hidden: false },
    currency: { label: "Currency", value: "currency", hidden: false },
    locale: { label: "Locale", value: "locale", hidden: false },
    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("country.show"),
        edit: permissions.includes("country.update"),
        translate: permissions.includes("country.translate"),
        delete: permissions.includes("country.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("country.create"),
    search: true,
    download: permissions.includes("country.download"),
    filter: permissions.includes("country.filter"),
    filter_cols: true,
  };

  return (
    <Table path={"countries"} tools={tools} cols={cols}>
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
export default Countries;
