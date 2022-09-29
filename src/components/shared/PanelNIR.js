import React, { useState } from "react";
import { Field } from "react-final-form";
import { FormControl, Typography, TextField } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "./Accordion";
import { ConfirmNir } from "../../utils/ConfirmNir";

export default function PanelNIR({ validators, disableCle }) {
  const [openNIRDialog, setOpenNIRDialog] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    if (!expanded) {
      setOpenNIRDialog(true);
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          aria-controls="panelAdresse-content"
          id="panelAdresse-header"
        >
          <Typography style={{ marginLeft: "5px" }}>
            <b>Recherche par NIR</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
          }}
        >
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
        </AccordionDetails>
      </Accordion>
      <ConfirmNir
        agreed={() => {
          setOpenNIRDialog(false);
          setExpanded(true);
        }}
        disagreed={() => setOpenNIRDialog(false)}
        opened={openNIRDialog}
      />
    </>
  );
}
