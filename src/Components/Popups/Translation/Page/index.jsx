import { useCallback, useEffect, useState } from "react";
import { Button, TextArea, TextInput } from "../../../common";
import Form from "../../Insert/Form";
import { updateTranslation } from "../../../common/Table/methods";

const TranslatePage = ({
  pageId,
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
  const [page, setPage] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setPage(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setPage([]);
  }, [locale]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      updateTranslation("pages", pageId, locale, updated);
      setShow(false);
      setRefreshRows(true);
    },
    [locale, pageId, setRefreshRows, setShow, updated]
  );

  useEffect(() => {
    if (show && pageId) {
      setUpdated({
        ...selectedRow,
      });
    }
  }, [pageId, selectedRow, setUpdated, show]);

  return (
    <Form show={show} setShow={setShow} onSubmit={onSubmit}>
      <Form.Container>
        <Form.Content title={"Translate Page"}>
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
                      (id === page.locale_id || id === locale) &&
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
                key={page.name}
                name={"name"}
                label={"Name"}
                defaultValue={page.name}
                onChange={handleInputChange}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <div className="col-span-3 sm:col-span-1">
              <TextArea
                key={page.description}
                name={"description"}
                label={"Description"}
                defaultValue={page.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <TextArea
                key={page.content}
                name={"content"}
                label={"Content"}
                defaultValue={page.content}
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
export default TranslatePage;
