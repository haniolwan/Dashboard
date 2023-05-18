import { useCallback, useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { query } from "../../../../utils";
import { Checkbox, TextInput } from "../../../common";
import { Permissions } from "../../../../classes";
import Form from "../Form";
import Swal from "sweetalert2";
import { insertNewRow } from "../../../common/Table/methods";

const AddRole = ({
  roleId,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const modalRef = useRef();
  useOnClickOutside(modalRef, () => setShow(false));
  const [role, setRole] = useState();
  const [userPermissions, setUserPermissions] = useState();

  const [permissions, setPermissions] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState({});
  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await query(`/api/dashboard/roles/${roleId}`);
        setRole(data.Role.name);
        setUserPermissions(data.Role.permissions);
        setIsCheck([...data.Role.permissions, ...isCheck]);
      } catch (error) {
        console.log(error);
      }
    };
    if (roleId && show) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId, show]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await query("/api/dashboard/permissions");
        const permArr = data.Permissions.map((ele) => {
          return new Permissions(ele);
        });
        setPermissions(permArr);
      } catch (error) {
        console.log(error);
      }
    };
    if (roleId && show) {
      fetchData();
    }
  }, [roleId, show]);

  const handleClick = (e) => {
    const { value, checked } = e.target;
    setIsCheck([...isCheck, value]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== value));
    }
  };

  const handleSelectAll = (e) => {
    const { value, checked } = e.target;
    setIsCheckAll({ ...isCheckAll, [value]: checked });
    permissions.forEach((li) => {
      if (li.code === value && checked) {
        let insideChildren = [];
        if (li.children) {
          li.children.forEach((child) =>
            child.children.forEach((child) => insideChildren.push(child.code))
          );
        }
        setIsCheck((oldCheck) => {
          return [
            ...oldCheck,
            ...li.children.map((child) => child.code),
            ...insideChildren,
          ];
        });
      }
    });
  };

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (roleId) {
        try {
          const form = new FormData();
          form.append("_method", "PUT");
          form.append("permissions", JSON.stringify(isCheck));
          for (const name in updated) {
            form.append(name, updated[name]);
          }
          await query(
            `/api/dashboard/roles/${roleId}`,
            "post",
            form,
            "multipart/form-data"
          );
          Swal.fire("Role updated successfully!", "", "success");
        } catch (error) {
          console.log(error);
        }
      } else {
        insertNewRow(updated, "roles");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [roleId, setShow, setRefreshRows, isCheck, updated]
  );

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container ref={modalRef} onSubmit={onSubmit}>
        <Form.Content>
          <Form.Row>
            <h1 className="text-placeholder-color border-b border-black dark:border-white pb-2">
              Edit Role
            </h1>
          </Form.Row>
          <Form.Row className="grid grid-cols-2 gap-5 py-5 pr-5">
            <TextInput
              id={"role"}
              key={role}
              name={"role"}
              label={"Role"}
              placeholder={"Role"}
              onChange={handleInputChange}
              defaultValue={role}
            />
          </Form.Row>
          <Form.Row className="flex flex-col justify-between w-full h-96 overflow-scroll sidebar">
            <div className="grid grid-cols-2 gap-5 pt-5 pr-5">
              {permissions.map(({ name, code, children }) => {
                return (
                  <div
                    key={code}
                    className="max-h-100 max-w-100 bg-white dark:bg-gray-800 p-3 rounded-primary"
                  >
                    <div className="flex gap-2 border-b text-placeholder-color w-full pb-2">
                      <Checkbox
                        onClick={handleSelectAll}
                        afterLabel={name}
                        defaultChecked={
                          isCheck.includes(code) ||
                          userPermissions?.includes(code)
                        }
                        value={code}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {children.map(({ name, code, children }) => {
                        return (
                          <>
                            <Checkbox
                              key={code}
                              defaultChecked={
                                isCheck.includes(code) ||
                                userPermissions?.includes(code)
                              }
                              afterLabel={name}
                              value={code}
                              onClick={handleClick}
                            />
                            {children &&
                              children.map(({ name, code, children }) => {
                                return (
                                  <>
                                    <Checkbox
                                      key={code}
                                      defaultChecked={
                                        isCheck.includes(code) ||
                                        userPermissions?.includes(code)
                                      }
                                      afterLabel={name}
                                      value={code}
                                      onClick={handleClick}
                                    />
                                    {children &&
                                      children.map(
                                        ({ name, code, children }) => {
                                          return (
                                            <Checkbox
                                              key={code}
                                              defaultChecked={isCheck.includes(
                                                code
                                              )}
                                              afterLabel={name}
                                              value={code}
                                              onClick={handleClick}
                                            />
                                          );
                                        }
                                      )}
                                  </>
                                );
                              })}
                          </>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer />
      </Form.Container>
    </Form>
  );
};
export default AddRole;
