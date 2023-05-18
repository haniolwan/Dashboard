import { useCallback, useEffect, useRef, useState } from "react";
import { Button, TextInput, UploadImage } from "../../../common";
import Form from "../../Insert/Form";
import { updateTranslation } from "../../../common/Table/methods";

const TranslateSlider = ({
  sliderId,
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
  const modalRef = useRef();
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setSlider(selectedRow);
    }
  }, [selectedRow]);

  useEffect(() => {
    setSlider([]);
  }, [locale]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      updateTranslation("sliders", sliderId, locale, updated);
      setShow(false);
      setRefreshRows(true);
    },
    [locale, setRefreshRows, setShow, sliderId, updated]
  );

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container ref={modalRef} onSubmit={onSubmit}>
        <Form.Content title={"Translate Slider"}>
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
                      (id === slider.locale_id || id === locale) &&
                      "bg-primary-color text-white"
                    }
                    onClick={changeLocale}
                  />
                </div>
              );
            })}
          </Form.Row>
          <Form.Row className="grid grid-cols-1 gap-5">
            <div className="col-span-3 sm:col-span-1">
              <TextInput
                key={slider.name}
                name={"name"}
                label={"Name"}
                defaultValue={slider.name}
                onChange={handleInputChange}
              />
            </div>
            <UploadImage
              id={"image"}
              label={"Photo"}
              name={"image"}
              src={slider.image}
              onChange={handleInputChange}
            />
          </Form.Row>
        </Form.Content>
        <Form.Footer />
      </Form.Container>
    </Form>
  );
};
export default TranslateSlider;
