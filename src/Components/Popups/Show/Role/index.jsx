import { useEffect, useState } from "react";
import { query } from "../../../../utils";
import { Checkbox } from "../../../common";
import { Permissions } from "../../../../classes";
import { toast } from "react-toastify";
import useIsMount from "../../../../hooks/useIsMount";
import Form from "../../Insert/Form";

const ShowRole = ({ roleId, show, setShow, selectedRow }) => {
  const [role, setRole] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setRole(selectedRow);
    }
  }, [selectedRow]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role.permissions, show]);

  const isMount = useIsMount();

  useEffect(() => {
    if (!show && !isMount) {
      setIsCheck([]);
      setPermissions([]);
    }
  }, [isMount, show]);

  useEffect(() => {
    if (permissions.length) {
      setIsCheck([...role.permissions, ...isCheck]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions.length, role.permissions]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content>
          <Form.Row>
            <h1 className="text-placeholder-color border-b border-black dark:border-white pb-2">
              Show Role
            </h1>
          </Form.Row>
          <Form.Row className="grid grid-cols-2 gap-5 py-5 pr-5">
            <p className="text-placeholder-color">{role.name}</p>
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
                          key={parseInt(id)}
                          checked={isCheck.includes(parseInt(id))}
                          afterLabel={name}
                          value={parseInt(id)}
                          readOnly
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {children &&
                          children?.map(({ id, name, code, children }) => {
                            return (
                              <div key={id}>
                                <Checkbox
                                  key={parseInt(id)}
                                  checked={isCheck.includes(parseInt(id))}
                                  afterLabel={name}
                                  value={parseInt(id)}
                                  readOnly
                                />
                                {children &&
                                  children.map(
                                    ({ id, name, code, children }) => {
                                      return (
                                        <div key={id}>
                                          <Checkbox
                                            key={parseInt(id)}
                                            checked={isCheck.includes(
                                              parseInt(id)
                                            )}
                                            afterLabel={name}
                                            value={parseInt(id)}
                                            readOnly
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
                                                    checked={isCheck.includes(
                                                      parseInt(id)
                                                    )}
                                                    afterLabel={name}
                                                    value={parseInt(id)}
                                                    readOnly
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
        <Form.Footer disabled />
      </Form.Container>
    </Form>
  );
};
export default ShowRole;
