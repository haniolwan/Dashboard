import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  TextArea,
  TextInput,
  UploadImage,
} from "../../../common";
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
  const [showTranslate, setShowTranslate] = useState(true);

  useEffect(() => {
    if (selectedRow) {
      setPage(selectedRow);
    } else {
      setPage([]);
    }
  }, [selectedRow]);

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
    <Form
      show={show}
      setShow={setShow}
      showTranslate={showTranslate}
      setShowTranslate={setShowTranslate}
      onSubmit={onSubmit}
    >
      <Form.Container>
        <Form.Content path={"page"} title={"Page Info"}>
          <Form.Row className="grid grid-cols-6 justify-items-center gap-5">
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
                    classes={id === locale && "bg-primary-color text-white"}
                    onClick={changeLocale}
                  />
                </div>
              );
            })}
          </Form.Row>
          {showTranslate ? (
            <Form.Row className="grid gap-5">
              <div className="col-span-12 gap-5 w-[20rem]">
                <div className="flex justify-center">
                  <UploadImage
                    className="col-span-6 justify-center"
                    disabled
                    avatar
                    src={page?.image}
                  />
                </div>
                <div className="text-placeholder-color text-center col-span-1 sm:col-span-6 pt-2">
                  {page?.name}
                </div>
                <Form.Row className="cols-span-6">
                  <div className="col-span-1 sm:col-span-6 space-y-2 pt-5">
                    <div className="flex justify-between text-placeholder-color">
                      <span>Key</span>
                      <span>{page.key}</span>
                    </div>
                    <div className="flex justify-between text-placeholder-color">
                      <span>Content</span>
                      <span className="text-end">{page.content}</span>
                    </div>
                    <div className="flex justify-between text-placeholder-color">
                      <span>Description</span>
                      <span className="text-end">{page.description}</span>
                    </div>
                    <div className="flex justify-between text-placeholder-color">
                      <span>Active</span>
                      <Checkbox
                        name={"is_active"}
                        defaultChecked={page?.is_active}
                        disabled
                      />
                    </div>
                  </div>
                </Form.Row>
              </div>
            </Form.Row>
          ) : (
            <>
              <Form.Row className="grid grid-cols-1 gap-5 w-[20rem]">
                <div className="col-span-3 sm:col-span-1">
                  <TextInput
                    key={page.name}
                    name={"name"}
                    label={"Name"}
                    defaultValue={page.name}
                    onChange={handleInputChange}
                  />
                </div>
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
            </>
          )}
        </Form.Content>
        <Form.Footer disabled={showTranslate} />
      </Form.Container>
    </Form>
  );
};
export default TranslatePage;
