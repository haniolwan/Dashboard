import { useCallback, useEffect, useState } from "react";
import Form from "../../Insert/Form";
import { Button, TextInput } from "../../../common";
import { updateTranslation } from "../../../common/Table/methods";

const TranslatePlan = ({
  planId,
  show,
  setShow,
  selectedRow,
  updated,
  setUpdated,
  localeOptions,
  handleInputChange,
  setRefreshRows,
  locale,
  changeLocale,
}) => {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setPlan(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setPlan([]);
  }, [locale]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      updateTranslation("plans", planId, locale, updated);
      setShow(false);
      setRefreshRows(true);
    },
    [locale, planId, setRefreshRows, setShow, updated]
  );

  useEffect(() => {
    if (show && planId) {
      setUpdated({
        ...selectedRow,
      });
    }
  }, [planId, selectedRow, setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content title={"Translate Plan"}>
          <Form.Row className="grid grid-cols-12 gap-5">
            {localeOptions.map(({ id, name }) => {
              return (
                <div key={id} className="col-span-3">
                  <Button
                    type={"button"}
                    data={id}
                    label={name}
                    padding={"px-6 py-2"}
                    bgColor={"bg-[#DF8D6233]"}
                    textColor={"text-primary-color"}
                    hoverBgColor={
                      "hover:bg-primary-color hover:text-white dark:hover:text-white"
                    }
                    hoverTextColor={"text-placeholder-color"}
                    classes={
                      (id === plan.locale_id || id === locale) &&
                      "bg-primary-color text-white"
                    }
                    onClick={changeLocale}
                  />
                </div>
              );
            })}
          </Form.Row>
          <Form.Row className="grid grid-cols-2 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={plan.name}
                name={"name"}
                label={"Name"}
                defaultValue={plan.name}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer />
      </Form.Container>
    </Form>
  );
};
export default TranslatePlan;
