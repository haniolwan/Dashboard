import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Users = () => {
  const { permissions } = useContext(PermissionsContext);

  const cols = {
    avatar: { label: "Avatar", value: "avatar", hidden: false },
    name: { label: "Name", value: "name", hidden: false },
    mobile: { label: "Mobile", value: "mobile", hidden: false },
    country: { label: "Country", value: "country", hidden: false },
    city: { label: "City", value: "city", hidden: false },
    is_baned: { label: "Baned", value: "is_baned", hidden: false },
    is_suspended: { label: "Suspended", value: "is_suspended", hidden: false },
    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: true,
        edit: true,
        translate: true,
        delete: true,
      },
      hidden: false,
    },
  };

  const tools = {
    add: true,
    search: true,
    download: true,
    filter: true,
    filter_cols: true,
  };

  return (
    <Table path={"users"} tools={tools} cols={cols}>
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
export default Users;
