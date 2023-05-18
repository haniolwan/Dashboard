import { forwardRef, Fragment } from "react";
import Form, { ErrorMessage, Field } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import "./style.scss";

const TextInput = forwardRef(
  (
    {
      id,
      name,
      type,
      label,
      placeholder,
      error,
      errorMsg,
      onChange,
      disabled,
      grid,
      classes,
      defaultValue,
      value,
    },
    ref
  ) => {
    const validate = (value) => {
      if (value !== "open sesame") {
        return "INCORRECT_PHRASE";
      }
      return undefined;
    };

    return (
      <div className={`${grid}`}>
        <Form>
          {({ formProps }) => (
            <div
              {...formProps}
              input-type={`${error ? "error-input" : "text-input"}`}
            >
              <Field validate={validate} label={label} name={name}>
                {({ fieldProps, inputError, meta: { valid } }) => (
                  <Fragment>
                    <Textfield
                      ref={ref}
                      id={id}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      {...fieldProps}
                      onChange={onChange}
                      isDisabled={disabled}
                      className={classes}
                      value={value}
                      defaultValue={defaultValue}
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

export default TextInput;
