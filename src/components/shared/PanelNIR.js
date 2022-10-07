
import React from "react";
import { Field } from "react-final-form";
import { FormControl, TextField } from "@mui/material";

export default function PanelNIR({ validators, disableCle }) {
  return (
    <>
      <Field
        name="nir"
        validate={validators.composeValidators(
          validators.minValue(13),
          validators.maxValue(14)
        )}
      >
        {({ input, meta }) => {
          return (
            <FormControl
              className="RoundedEl"
              style={{
                flex: "1 0 21%",
                margin: "15px 5px",
                maxWidth: "200px",
                minWidth: "175px",
              }}
            >
              <TextField
                id="Nir"
                label={"NIR"}
                variant="outlined"
                {...input}
                error={meta.invalid}
                className="RoundedEl"
                onChange={(e) => {
                  return input.onChange(e);
                }}
              />
              {meta.error && meta.touched && (
                <span className={"MetaErrInfo"}>{meta.error}</span>
              )}
            </FormControl>
          );
        }}
      </Field>

      <Field
        name="cle"
        validate={validators.composeValidators(
          validators.mustBeNumber,
          validators.minValue(2),
          validators.maxValue(3)
        )}
      >
        {({ input, meta }) => {
          return (
            <FormControl
              className="RoundedEl"
              style={{
                flex: "1 0 21%",
                margin: "15px 5px",
                maxWidth: "100px",
              }}
            >
              <TextField
                id="Cle"
                label={"Clé"}
                type={"number"}
                disabled={disableCle}
                variant="outlined"
                // error={meta.invalid}
                className="RoundedEl"
                {...input}
              />
              {meta.error && meta.touched && (
                <span className={"MetaErrInfo"}>{meta.error}</span>
              )}
            </FormControl>
          );
        }}
      </Field>
    </>
  );
}
