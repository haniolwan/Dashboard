import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Locales = () => {
  const { permissions } = useContext(PermissionsContext);

  const cols = {
    name: { label: "Page", value: "name", hidden: false },
    locale: { label: "Locale", value: "locale", hidden: false },
    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("locale.show"),
        edit: permissions.includes("locale.update"),
        translate: permissions.includes("locale.translate"),
        delete: permissions.includes("locale.destroy"),
      },
      hidden: false,
    },
  };
  const tools = {
    add: permissions.includes("locale.create"),
    search: true,
    download: true,
    filter: true,
    filter_cols: true,
  };
  return (
    <Table path={"locales"} tools={tools} cols={cols}>
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
export default Locales;
