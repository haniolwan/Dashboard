import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Page = () => {
  const { permissions } = useContext(PermissionsContext);

  const cols = {
    image: { label: "Image", value: "image", hidden: false },
    name: { label: "Page", value: "name", hidden: false },
    key: { label: "Key", value: "key", hidden: false },
    description: { label: "Description", value: "description", hidden: false },
    summary: { label: "Summary", value: "summary", hidden: false },
    is_active: { label: "Active", value: "is_active", hidden: false },

    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("page.show"),
        edit: permissions.includes("page.update"),
        translate: permissions.includes("page.translate.show"),
        delete: permissions.includes("page.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("page.create"),
    search: true,
    // download: true,
    // filter: true,
    filter_cols: true,
  };
  return (
    <Table path={"pages"} tools={tools} cols={cols}>
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
export default Page;
