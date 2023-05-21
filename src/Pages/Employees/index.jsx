import { useContext } from "react";
import Table from "../../Components/common/Table";
import { PermissionsContext } from "../../context";

const Employees = () => {
  const { permissions } = useContext(PermissionsContext);
  const cols = {
    avatar: { label: "Avatar", value: "avatar", hidden: false },
    name: { label: "Name", value: "name", hidden: false },
    email: { label: "Email", value: "email", hidden: false },
    mobile: { label: "Mobile", value: "mobile", hidden: false },
    country: { label: "Country", value: "country", hidden: false },
    city: { label: "City", value: "city", hidden: false },
    // status: { label: "Status", value: "status", hidden: false },
    actions: {
      label: "Actions",
      value: "actions",
      actions: {
        show: permissions.includes("employee.show"),
        edit: permissions.includes("employee.update"),
        translate: permissions.includes("employee.translate"),
        delete: permissions.includes("employee.destroy"),
        permission: permissions.includes("employee.destroy"),
      },
      hidden: false,
    },
  };

  const tools = {
    add: permissions.includes("employee.create"),
    search: true,
    download: true,
    filter: true,
    filter_cols: true,
  };

  return (
    <Table path={"employees"} tools={tools} cols={cols}>
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

export default Employees;
