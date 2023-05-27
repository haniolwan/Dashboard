import { Fragment, forwardRef } from "react";
import Form, { ErrorMessage, Field } from "@atlaskit/form";
import Text from "@atlaskit/textarea";

import "./style.scss";

const TextArea = forwardRef(
  (
    {
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
    },
    ref
  ) => {
    return (
      <div className={`${grid}`}>
        <Form>
          {({ formProps }) => (
            <div {...formProps} name={name} className="textarea-input">
              <Field name={name} label={label}>
                {({ fieldProps, errorInput, meta: { valid } }) => (
                  <Fragment>
                    <Text
                      ref={ref}
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
            </div>
          )}
        </Form>
      </div>
    );
  }
);

export default TextArea;
