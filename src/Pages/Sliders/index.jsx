import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Sliders = () => {
  const { permissions } = useContext(PermissionsContext);

  const cols = {
    image: { label: "Image", value: "image", hidden: false },
    name: { label: "Name", value: "name", hidden: false },
    url: { label: "Url", value: "url", hidden: false },
    active: { label: "Active", value: "active", hidden: false },
    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("slider.show"),
        edit: permissions.includes("slider.update"),
        translate: permissions.includes("slider.translate"),
        delete: permissions.includes("slider.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("slider.create"),
    search: true,
    download: true,
    filter: true,
    filter_cols: true,
  };

  return (
    <Table path={"sliders"} tools={tools} cols={cols}>
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
export default Sliders;
