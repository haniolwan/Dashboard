import { useCallback, useContext, useEffect, useState } from "react";
import Form from "../Form";
import { insertNewRow, updateNewRow } from "../../../common/Table/methods";
import { SelectInput } from "../../../common";
import { EnumsContext } from "../../../../context";

const AddSettings = ({
  settingId,
  selectedRow,
  show,
  setShow,
  updated,
  setUpdated,
  handleInputChange,
  setRefreshRows,
}) => {
  const [setting, setSetting] = useState([]);
  const {
    enums: { InputType },
  } = useContext(EnumsContext);
  const [typeOptions, setTypeOptions] = useState([]);
  const [defaultTypeOption, setDefaultTypeOption] = useState([]);
  const [loadingType, setLoadingType] = useState(true);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (settingId) {
        updateNewRow(updated, "settings", settingId);
      } else {
        insertNewRow(updated, "settings");
      }
      setShow(false);
      setRefreshRows(true);
    },
    [settingId, setShow, setRefreshRows, updated]
  );
  useEffect(() => {
    if (selectedRow) {
      setSetting(selectedRow);
    }
  }, [selectedRow, show]);

  useEffect(() => {
    if (show) {
      const options = Object.keys(InputType).map((item) => {
        if (InputType[item] === setting.value) {
          setDefaultTypeOption({ label: item, value: InputType[item] });
        }
        return { label: item, value: InputType[item] };
      });
      setTypeOptions(options);
      setLoadingType(false);
    }
  }, [InputType, setting.value, show]);

  useEffect(() => {
    if (!show) {
      setSetting([]);
      setUpdated([]);
    }
  }, [setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content>
          <Form.Row className="grid grid-cols-2 gap-5">
            <div className="col-span-3 sm:col-span-2">
              <SelectInput
                key={defaultTypeOption}
                name={"value"}
                label={"Value"}
                options={typeOptions}
                onChange={(value) => {
                  setUpdated({
                    ...updated,
                    value: value.value,
                  });
                }}
                defaultValue={defaultTypeOption}
                isLoading={loadingType}
              />
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer />
      </Form.Container>
    </Form>
  );
};

export default AddSettings;
