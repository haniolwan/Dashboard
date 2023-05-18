import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Providers = () => {
  const { permissions } = useContext(PermissionsContext);

  const cols = {
    avatar: { label: "Avatar", value: "avatar", hidden: false },
    name: { label: "Provider", value: "name", hidden: false },
    locale: { label: "Locale", value: "locale", hidden: false },
    hourly_rate: { label: "Hourly rate", value: "hourly_rate", hidden: false },
    latitude: { label: "Latitude", value: "latitude", hidden: false },
    longitude: { label: "Longitude", value: "longitude", hidden: false },
    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("provider.show"),
        edit: permissions.includes("provider.update"),
        translate: permissions.includes("provider.translate"),
        delete: permissions.includes("provider.destroy"),
      },
      hidden: false,
    },
  };
  const tools = {
    add: permissions.includes("provider.create"),
    search: true,
    download: true,
    filter: true,
    filter_cols: true,
  };

  return (
    <Table path={"providers"} tools={tools} cols={cols}>
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
export default Providers;
