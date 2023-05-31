import { useCallback, useEffect, useState } from "react";
import { query } from "../../../../utils";
import { Checkbox, TextInput } from "../../../common";
import { Permissions } from "../../../../classes";
import Form from "../Form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useIsMount from "../../../../hooks/useIsMount";

const AddRole = ({
  roleId,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [role, setRole] = useState();
  const [userPermissions, setUserPermissions] = useState();

  const [permissions, setPermissions] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState([]);
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
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
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
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };
    if (show) {
      fetchData();
    }
  }, [roleId, show]);

  const handleClick = (e) => {
    const { value, checked } = e.target;
    setIsCheck([...new Set([...isCheck, parseInt(value)])]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== parseInt(value)));
    }
  };

  const handleSelectAll = (e) => {
    const { value, checked } = e.target;
    setIsCheckAll([...isCheckAll, parseInt(value)]);
    permissions.forEach((li) => {
      if (li.id === parseInt(value) && checked) {
        let insideChildren = [];
        if (li.children) {
          li.children.forEach((child) =>
            child.children.forEach((child) => insideChildren.push(child.id))
          );
        }
        setIsCheck((oldCheck) => {
          return [
            ...new Set([
              parseInt(value),
              ...oldCheck,
              ...li.children.map((child) => child.id),
              ...insideChildren,
            ]),
          ];
        });
      }
    });
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== parseInt(value)));
    }
  };

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        if (roleId) {
          const form = new FormData();
          form.append("_method", "PUT");
          for (let index = 0; index < isCheck.length; index++) {
            form.append("permissions[]", isCheck[index]);
          }
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
        } else {
          const form = new FormData();
          for (let index = 0; index < isCheck.length; index++) {
            form.append("permissions[]", isCheck[index]);
          }
          for (const name in updated) {
            form.append(name, updated[name]);
          }
          await query(
            "/api/dashboard/roles",
            "post",
            form,
            "multipart/form-data"
          );
          Swal.fire("Role added successfully!", "", "success");
        }
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
      setShow(false);
      setRefreshRows(true);
    },
    [roleId, setShow, setRefreshRows, isCheck, updated]
  );

  const isMount = useIsMount();

  useEffect(() => {
    if (!show && !isMount) {
      setIsCheck([]);
      setPermissions([]);
    }
  }, [isMount, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row>
            <h1 className="text-placeholder-color border-b border-black dark:border-white pb-2">
              Add Role
            </h1>
          </Form.Row>
          <Form.Row className="grid grid-cols-2 gap-5 py-5 pr-5">
            <TextInput
              id={"role"}
              key={role}
              name={"name"}
              label={"Role"}
              placeholder={"Role"}
              onChange={handleInputChange}
              defaultValue={role}
            />
          </Form.Row>
          <Form.Row className="flex flex-col justify-between w-full">
            <div className="grid grid-cols-2 gap-5 pt-5 pr-5">
              {permissions &&
                permissions?.map(({ id, name, code, children }) => {
                  return (
                    <div
                      key={id}
                      className="max-h-100 max-w-100 bg-white dark:bg-gray-800 p-3 rounded-primary"
                    >
                      <div className="flex gap-2 border-b text-placeholder-color w-full pb-2">
                        <Checkbox
                          onClick={handleSelectAll}
                          afterLabel={name}
                          defaultChecked={isCheck.includes(parseInt(id))}
                          value={parseInt(id)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {children &&
                          children?.map(({ id, name, code, children }) => {
                            return (
                              <div key={id}>
                                <Checkbox
                                  key={parseInt(id)}
                                  defaultChecked={isCheck.includes(
                                    parseInt(id)
                                  )}
                                  afterLabel={name}
                                  value={parseInt(id)}
                                  onClick={handleClick}
                                />
                                {children &&
                                  children.map(
                                    ({ id, name, code, children }) => {
                                      return (
                                        <div key={id}>
                                          <Checkbox
                                            key={parseInt(id)}
                                            defaultChecked={isCheck.includes(
                                              parseInt(id)
                                            )}
                                            afterLabel={name}
                                            value={parseInt(id)}
                                            onClick={handleClick}
                                          />
                                          {children &&
                                            children.map(
                                              ({
                                                id,
                                                name,
                                                code,
                                                children,
                                              }) => {
                                                return (
                                                  <Checkbox
                                                    key={parseInt(id)}
                                                    defaultChecked={isCheck.includes(
                                                      parseInt(id)
                                                    )}
                                                    afterLabel={name}
                                                    value={parseInt(id)}
                                                    onClick={handleClick}
                                                  />
                                                );
                                              }
                                            )}
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
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
