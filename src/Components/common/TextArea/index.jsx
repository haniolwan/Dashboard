import { Fragment } from "react";
import Form, { ErrorMessage, Field } from "@atlaskit/form";
import Text from "@atlaskit/textarea";

import "./style.scss";

const TextArea = ({
  id,
  name,
  label,
  rows,
  cols,
  placeholder,
  error,
  errorMsg,
  disabled,
  grid,
  classes,
  defaultValue,
  onChange,
}) => {
  return (
    <div className={`${grid}`}>
      <Form>
        {({ formProps }) => (
          <form {...formProps} name={name} className="textarea-input">
            <Field name={name} label={label}>
              {({ fieldProps, errorInput, meta: { valid } }) => (
                <Fragment>
                  <Text
                    id={id}
                    placeholder={placeholder}
                    {...fieldProps}
                    rows={rows}
                    cols={cols}
                    isDisabled={disabled}
                    className={`${classes}`}
                    defaultValue={defaultValue}
                    onChange={onChange}
                  />
                  {error && <ErrorMessage>{errorMsg}</ErrorMessage>}
                </Fragment>
              )}
            </Field>
          </form>
        )}
      </Form>
    </div>
  );
};
export default TextArea;
