import { useEffect, useRef, useState } from "react";
import { Button, Checkbox } from "../../../common";
import { Permissions } from "../../../../classes";
import { query } from "../../../../utils";
import Form from "../../Insert/Form";
import { toast } from "react-toastify";

const EditRole = ({ id, addRow, updateRow, show, setShow, handleChange }) => {
  const [permissions, setPermissions] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState({});
  const [isCheck, setIsCheck] = useState([]);

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
    fetchData();
  }, []);

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

  return (
    <Form show={false} setShow={setShow}>
      <Form.Container>
        <Form.Content>
          <Form.Row>
            <h1 className="text-placeholder-color border-b border-black dark:border-white pb-2">
              Edit Role
            </h1>
          </Form.Row>
          <Form.Row className="flex flex-col justify-between w-full h-96 overflow-scroll sidebar">
            <div className="grid grid-cols-3 gap-5 pt-5">
              {permissions.map(({ name, code, children }) => {
                return (
                  <div
                    key={code}
                    className="max-h-100 max-w-100 bg-white dark:bg-gray-800 p-3 rounded-primary"
                  >
                    <div className="flex gap-2 border-b pb-3 text-placeholder-color w-full">
                      <Checkbox
                        onClick={handleSelectAll}
                        afterLabel={name}
                        defaultChecked={
                          isCheck.includes(code) || !!isCheckAll[code]
                        }
                        value={code}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-3">
                      {children.map(({ name, code, children }) => {
                        return (
                          <>
                            <Checkbox
                              key={code}
                              defaultChecked={isCheck.includes(code)}
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
                                      defaultChecked={isCheck.includes(code)}
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
export default EditRole;
