import { useCallback, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Form from "../Form";
import { Checkbox } from "../../../common";
import { Permissions, Role } from "../../../../classes";
import { query } from "../../../../utils";
import { insertNewRow } from "../../../common/Table/methods";
import { toast } from "react-toastify";
import { UserInfoContext } from "../../../../context";

const SetPermissions = ({
  userId,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
  selectedRow,
}) => {
  const [roles, setRoles] = useState([]);

  const [updatedRoles, setUpdatedRoles] = useState([]);

  const [permissions, setPermissions] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  const [loading, setLoading] = useState(true);

  const {
    userInfo: { roles: userRoles, permissions: userPermissions },
  } = useContext(UserInfoContext);
  useEffect(() => {
    // Get Roles
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await query("/api/dashboard/roles");
        setRoles(data.RoleCollection.Roles.map((role) => new Role(role)));
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };
    if (userId && show) {
      fetchData();
    }
  }, [userId, show]);

  useEffect(() => {
    // Get All Permissions
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await query("/api/dashboard/permissions");
        setPermissions(data.Permissions.map((ele) => new Permissions(ele)));
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };
    if (userId && show) {
      fetchData();
    }
  }, [userId, show]);

  useEffect(() => {
    let perms = [];
    roles.forEach((role) => {
      if (userRoles.includes(role.id)) {
        perms = [...role.permissions];
      }
    });
    setIsCheck([...new Set([...perms, ...userPermissions, ...isCheck])]);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, userPermissions, userRoles]);

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

  const handleRoleChange = ({ target: { value, checked } }) => {
    if (value && checked) {
      setUpdatedRoles([...updatedRoles, parseInt(value)]);
      roles.forEach((element) => {
        if (element.id === parseInt(value)) {
          setIsCheck([...new Set([...element.permissions, ...isCheck])]);
        }
      });
    } else {
      setUpdatedRoles(updatedRoles.filter((role) => parseInt(value) !== role));
    }
  };

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (userId) {
        try {
          const form = new FormData();
          form.append("_method", "PUT");
          for (let index = 0; index < isCheck.length; index++) {
            form.append("permissions[]", isCheck[index]);
          }
          for (let index = 0; index < updatedRoles.length; index++) {
            form.append("roles[]", updatedRoles[index]);
          }
          await query(
            `/api/dashboard/employees/${userId}`,
            "post",
            form,
            "multipart/form-data"
          );
          Swal.fire("Role updated successfully!", "", "success");
        } catch ({
          response: {
            data: { message },
          },
        }) {
          toast.error(<span>{message.join("\r\n")}</span>);
        }
      } else {
        insertNewRow(updated, "roles");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [userId, setShow, setRefreshRows, isCheck, updatedRoles, updated]
  );

  useEffect(() => {
    if (!show) {
      setIsCheck([]);
      setPermissions([]);
    }
  }, [show]);

  return (
    <Form show={show} setShow={setShow} isLoading={loading} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row>
            <h1 className="text-placeholder-color border-b border-black dark:border-white pb-2">
              Edit Role
            </h1>
          </Form.Row>
          <Form.Row className="grid grid-cols-2 gap-5 py-5 pr-5">
            <div className="max-h-100 max-w-100 bg-white dark:bg-gray-800 p-3 rounded-primary">
              <h1 className="text-placeholder-color">Select Roles</h1>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {roles &&
                  roles?.map(({ id, name }) => {
                    return (
                      <Checkbox
                        key={id}
                        defaultChecked={
                          updatedRoles.includes(parseInt(id)) ||
                          userRoles.includes(parseInt(id))
                        }
                        afterLabel={name}
                        value={id}
                        onChange={handleRoleChange}
                      />
                    );
                  })}
              </div>
            </div>
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
                          defaultChecked={isCheck.includes(id)}
                          value={id}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {children &&
                          children?.map(({ id, name, code, children }) => {
                            return (
                              <div key={id}>
                                <Checkbox
                                  key={id}
                                  defaultChecked={isCheck.includes(
                                    parseInt(id)
                                  )}
                                  afterLabel={name}
                                  value={id}
                                  onClick={handleClick}
                                />
                                {children &&
                                  children.map(
                                    ({ id, name, code, children }) => {
                                      return (
                                        <div key={id}>
                                          <Checkbox
                                            defaultChecked={isCheck.includes(
                                              parseInt(id)
                                            )}
                                            afterLabel={name}
                                            value={id}
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
                                                    key={id}
                                                    defaultChecked={isCheck.includes(
                                                      parseInt(id)
                                                    )}
                                                    afterLabel={name}
                                                    value={id}
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
export default SetPermissions;
