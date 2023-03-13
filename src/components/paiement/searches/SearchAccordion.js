import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    CardActions, CircularProgress, Collapse, TextField,
    Badge, Button, CardHeader, CardContent, FormControl, InputAdornment, IconButton, Typography,
} from "@mui/material";

import { FormSpy, Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SearchIcon from '@mui/icons-material/Search';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from "date-fns/locale";

import { checkInsidePanels } from '../utils/utils'
import { isValidDate } from '../../../utils/convertor-utils';
import { validators, allowSearch } from '../../../utils/validator-utils';

import { AutoCompleteField, Accordion, AccordionSummary, AccordionDetails, StyledCard, ConfirmNir, PanelNIR } from "../../shared";
import { handleFormChange } from "./Mutators";
import { setCriterias, initCriterias, selectCriterias } from '../paiementSlice'
import { useGetRefsQuery } from "../../../services/refsApi";

import './searchAccordion.scss'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function SearchAccordion(props) {

    const dispatch = useDispatch();
    const criterias = useSelector(selectCriterias);
    const formRef= useRef(null);
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    const [expanded, setExpanded] = useState({
        panelSoins: true,
        panelInformationsDuPaiement: true,
        panelInformationsDeLaFacture: true,
        panelInformationSupplementaires: true,
        panelInformationbeneficiaires: true,
        panelNIR: true,
    });

    const [dotShow, setDotShow] = useState(false);
    const [disableCle, setDisableCle] = useState(true);
    const [openNIRDialog, setOpenNIRDialog] = useState(false);
    const [panelExpanded, setPanelExpanded] = useState(false);
    const [paiementStatuses, setPaiementStatuses] = useState([]);
    const [environments, setEnvironments] = useState([]);
    const [provenances, setProvenances] = useState([]);
    const [groupDisciplines, setGroupDisciplines] = useState([]);
    const [disciplines, setDisciplines] = useState([]);

    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        if (nomRefsIsSuccess) {

            setPaiementStatuses(Object.keys(nomRefs.PAIEMENT_STATUS).map(code => ({value: code, title: nomRefs.PAIEMENT_STATUS[code]})));
            setEnvironments(Object.keys(nomRefs.ENVIRONMENT).map(code => ({value: code, title: nomRefs.ENVIRONMENT[code]})));
            setProvenances(Object.keys(nomRefs.PROVENANCE).map(code => ({value: code, title: `(${code}) ${nomRefs.PROVENANCE[code]}`})));
            setGroupDisciplines(Object.keys(nomRefs.DISCIPLINE_GROUP).map(code => ({value: code, title: nomRefs.DISCIPLINE_GROUP[code]})));
            setDisciplines(Object.keys(nomRefs.DISCIPLINE).map(code => ({value: code, title: nomRefs.DISCIPLINE[code]})));

            setFirstRender(false);
        }
    }, [nomRefs, nomRefsIsSuccess]);

    const handleChange = (panel) => (event, newExpanded) => {
        if (panel == 'panelNIR' && !expanded.panelNIR) {
            setOpenNIRDialog(true);
        } else {
            setExpanded({...expanded, [panel]: newExpanded});
        }
    };

    const handleAccordionPanel = () => (event) => {
        if (!panelExpanded) {
            let {values} = formRef.current?.getState()
            setExpanded(checkInsidePanels(values))
        }
        setPanelExpanded(!panelExpanded);
    };

    const onSubmit = async (values) => {
        await sleep(300);
        dispatch(setCriterias({...values, cashe: Math.random()}));
        setPanelExpanded(false);
    };

    if (nomRefsIsFetching) return <div className={'formContent'} style={{height: '30%'}}><CircularProgress style={{margin: '100px 50%'}}/></div>

    return (
        <div className={'formContent'}>
            <Form onSubmit={onSubmit}
                  initialValues={{ ...criterias }}
                  mutators={{ ...arrayMutators, handleFormChange: handleFormChange({setDisableCle}) }}
                  render = {({ handleSubmit, form, submitting, pristine, values }) => (
                      formRef.current = form,
                          <form onSubmit={handleSubmit} >
                              <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
                                  <StyledCard id="PaiementSearchForm" variant="outlined" sx={{ display: 'block', minWidth: 775, overflow: 'visible',
                                    '& .MuiCardHeader-root': {borderRadius: (panelExpanded)?'34px 34px 0 0 !important': '34px!important'}
                                    }}>
                                      <CardHeader
                                          sx={{ bgcolor: '#f1f1f1', display: "flex",  }}
                                          title={<div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>

                                                      <Field name="numeroFacture" validate={validators.composeValidators(validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <div style={{flex: 2, marginRight: '20px'}}>
                                                                  <TextField
                                                                      id="NumeroFacture"
                                                                      type={'number'}
                                                                      variant="standard"
                                                                      error={meta.invalid}
                                                                      placeholder={'Nº facture'}
                                                                      sx={{width: '100%'}}
                                                                      className="RoundedEl"
                                                                      InputProps={{  disableUnderline: true }}
                                                                      {...{ ...input, inputProps: {
                                                                              ...input.inputProps,
                                                                              step: 1,
                                                                              min: 0,
                                                                              lang: 'fr',
                                                                              inputMode: 'numeric',
                                                                              pattern: '[0-9]*',
                                                                              onKeyDown: (e) => ["e", "E", "+", "-", ".", ","].includes(e.key) && e.preventDefault()
                                                                          }
                                                                      }}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>

                                                      <Field name="numeroPartenaire" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <div style={{flex: 2, marginRight: '20px'}}>
                                                                  <TextField
                                                                      id="numeroPartenaire"
                                                                      variant={'standard'}
                                                                      sx={{width: '100%'}}
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      onBlur={(e)=> {
                                                                          if (e.target.value.length == 8) form.getFieldState('numeroPartenaire').change('0' + e.target.value)
                                                                          return input.onBlur(e)
                                                                      }}
                                                                      placeholder={'Nº de facturation PS'}
                                                                      InputProps={{  disableUnderline: true }}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>

                                                      <Field name="numeroAdherentIndividuel" validate={validators.composeValidators(validators.maxValue(16))}>

                                                          {({ input, meta }) => (
                                                              <div style={{flex: 2}}>
                                                                  <TextField
                                                                      id="NumeroAdherentIndividuel"
                                                                      variant="standard"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      placeholder={'Nº adhérent'}
                                                                      sx={{width: '100%'}}
                                                                      className="RoundedEl"
                                                                      InputProps={{  disableUnderline: true }}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>

                                                      <div style={{width: 150, display: 'flex'}}>
                                                          {!panelExpanded && <IconButton onClick={handleAccordionPanel()} sx={{height: '45px'}}>
                                                              <Badge color="secondary" variant="dot" invisible={!dotShow}><AddCircleIcon/></Badge>
                                                          </IconButton>}
                                                          {panelExpanded && <IconButton onClick={handleAccordionPanel()}><DoDisturbOnIcon/></IconButton>}
                                                          <Typography component="div" className='verticalTxt'><b>Critères</b></Typography>
                                                      </div>
                                                      <Button
                                                          variant="contained"
                                                          type="submit"
                                                          size="medium" className='RoundedEl'
                                                          disabled={!allowSearch(values)} >
                                                          <SearchIcon/>Rechercher
                                                      </Button>
                                                  </div>}
                                      />

                                      <CardContent sx={{ display: 'block', border: 0, padding: 0}}> </CardContent>

                                      <Collapse in={panelExpanded} timeout="auto">
                                          <CardActions sx={{ display: 'block'}} >

                                              <Accordion expanded={expanded.panelSoins} onChange={handleChange('panelSoins')}>
                                                  <AccordionSummary aria-controls="panelSoins-content" id="panelSoins-header">
                                                      <Typography style={{paddingLeft: '5px'}}><b>Soins</b></Typography>
                                                  </AccordionSummary>

                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>

                                                      <Field name="dateDebutSoinsStart" validate={validators.composeValidators(validators.noFutureDate())} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de soins du '}
                                                                      maxDate={new Date()}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateDebutSoinsEnd" validate={validators.composeValidators(validators.noFutureDate(), validators.beforeThan(values, 'dateDebutSoinsStart'))} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de soins au'}
                                                                      maxDate={new Date()}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <AutoCompleteField id="GroupDisciplines" name="groupDisciplines"
                                                                         multiple={true}
                                                                         label={'Groupe discipline'}
                                                                         options={groupDisciplines}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'disciplines sélectionnées'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />

                                                      <AutoCompleteField id="Disciplines" name="disciplines"
                                                                         multiple={true}
                                                                         label={'Discipline'}
                                                                         options={disciplines}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'disciplines sélectionnées'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />


                                                      <Field name="finessJuridique" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="FinessJuridique"
                                                                      label={'Nº FINESS juridique'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      onBlur={(e)=> {
                                                                          if (e.target.value.length == 8) form.getFieldState('numeroPsJuridique').change('0' + e.target.value)
                                                                          return input.onBlur(e)
                                                                      }}
                                                                      className="RoundedEl" />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>


                                                      <Field name="titre" validate={validators.composeValidators(validators.minValue(15), validators.maxValue(16))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="Titre"
                                                                      type={'number'}
                                                                      label={'Nº titre'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...{ ...input, inputProps: {
                                                                              ...input.inputProps,
                                                                              step: 1,
                                                                              min: 0,
                                                                              lang: 'fr',
                                                                              inputMode: 'numeric',
                                                                              pattern: '[0-9]*',
                                                                              onKeyDown: (е) => ["e", "E", "+", "-", ".", ","].includes(е.key) && е.preventDefault()
                                                                          }
                                                                      }}
                                                                      className="RoundedEl"/>
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>


                                                      <Field name="dateDebutHospitalisationStart" validate={validators.composeValidators(validators.noFutureDate())} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date d\'hospitalisation du '}
                                                                      maxDate={new Date()}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateDebutHospitalisationEnd" validate={validators.composeValidators(validators.noFutureDate(), validators.beforeThan(values, 'dateDebutHospitalisationStart'))} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date d\'hospitalisation au'}
                                                                      maxDate={new Date()}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                  </AccordionDetails>
                                              </Accordion>

                                              <Accordion expanded={expanded.panelInformationsDuPaiement} onChange={handleChange('panelInformationsDuPaiement')}>
                                                  <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                                      <Typography style={{marginLeft: '5px'}}><b>Informations du paiement</b></Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>

                                                      <AutoCompleteField id="Statut" name="status"
                                                                         multiple={true}
                                                                         label={'Statut du paiement'}
                                                                         options={paiementStatuses}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'statuts sélectionnées'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />

                                                      <Field name="totalRc" validate={validators.composeValidators(validators.notBiggerThan(1000000))} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24.5%'}}>
                                                                  <TextField
                                                                      id="TotalRc"
                                                                      type={'number'}
                                                                      label={'Montant RC du paiement'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...{ ...input,
                                                                          inputProps: {
                                                                              ...input.inputProps,
                                                                              step: 0.01,
                                                                              min: 0,
                                                                              lang: 'fr',
                                                                              inputMode: 'numeric',
                                                                              pattern: '[0-9]*',
                                                                              onKeyDown: (e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                                                                          },
                                                                          InputProps: { ...input.InputProps, endAdornment: <InputAdornment position="end"><b>€</b></InputAdornment>}
                                                                      }}
                                                                      className="RoundedEl"/>
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                  </AccordionDetails>

                                              </Accordion>

                                              <Accordion expanded={expanded.panelInformationsDeLaFacture} onChange={handleChange('panelInformationsDeLaFacture')}>
                                                  <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                                      <Typography style={{marginLeft: '5px'}}><b>Informations de la facture</b></Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>

                                                      <Field name="dateFactureStart" validate={validators.composeValidators(validators.noFutureDate())} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de la facture du '}
                                                                      maxDate={new Date()}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateFactureEnd" validate={validators.composeValidators(validators.noFutureDate(), validators.beforeThan(values, 'dateFactureStart'))} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de la facture au'}
                                                                      maxDate={new Date()}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateReceptionStart" validate={validators.composeValidators(validators.noFutureDate())} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de réception du '}
                                                                      maxDate={new Date()}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateReceptionEnd" validate={validators.composeValidators(validators.noFutureDate(), validators.beforeThan(values, 'dateReceptionStart'))} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de réception au'}
                                                                      maxDate={new Date()}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateTraitementStart" validate={validators.composeValidators(validators.noFutureDate())} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de traitement de la facture du '}
                                                                      maxDate={new Date()}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateTraitementEnd" validate={validators.composeValidators(validators.noFutureDate(), validators.beforeThan(values, 'dateTraitementStart'))} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de traitement de la facture au'}
                                                                      maxDate={new Date()}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>


                                                      <Field name="totalRcFacture" validate={validators.composeValidators(validators.notBiggerThan(10000000))} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="TotalRcFacture"
                                                                      label={'Montant RC de la facture'}
                                                                      type={'number'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...{ ...input,
                                                                          inputProps: {
                                                                              ...input.inputProps,
                                                                              step: 0.01,
                                                                              min: 0,
                                                                              lang: 'fr',
                                                                              inputMode: 'numeric',
                                                                              pattern: '[0-9]*',
                                                                              onKeyDown: (e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                                                                          },
                                                                          InputProps: { ...input.InputProps, endAdornment: <InputAdornment position="end"><b>€</b></InputAdornment>}
                                                                      }}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <div style={{ flex: '1 0 21%', margin: '15px 5px', height: '20px'}}>&nbsp;</div>

                                                  </AccordionDetails>

                                              </Accordion>

                                              <Accordion expanded={expanded.panelInformationSupplementaires} onChange={handleChange('panelInformationSupplementaires')}>
                                                  <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                                      <Typography style={{marginLeft: '5px'}}><b>Information supplementaires</b></Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'start'}}>

                                                      <AutoCompleteField id="NumeroEnvironnement" name="numeroEnvironnement"
                                                                         multiple={true}
                                                                         label={'Environnement'}
                                                                         options={environments}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'environnements sélectionnées'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />

                                                      <AutoCompleteField id="Provenance" name="provenance"
                                                                         multiple={true}
                                                                         label={'Provenance'}
                                                                         options={provenances}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'provenances sélectionnées'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />

                                                  </AccordionDetails>

                                              </Accordion>

                                              <Accordion expanded={expanded.panelInformationbeneficiaires} onChange={handleChange('panelInformationbeneficiaires')}>
                                                  <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                                      <Typography style={{marginLeft: '5px'}}><b>Information beneficiaires</b></Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'start'}}>

                                                          <Field name="nom" validate={validators.composeValidators(
                                                          validators.minValue(3),
                                                          validators.maxValue(51),
                                                          validators.associated(values, ['prenom', 'dateNaissance'], 'Nom')
                                                      )}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24.5%'}}>
                                                                  <TextField
                                                                      id="Nom"
                                                                      label={'Nom'}
                                                                      variant="outlined"
                                                                      {...input}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="prenom" validate={validators.composeValidators(
                                                          validators.minValue(3),
                                                          validators.maxValue(51),
                                                          validators.associated(values, ['nom', 'dateNaissance'], 'Prénom')
                                                      )}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24.5%'}}>
                                                                  <TextField
                                                                      id="Prenom"
                                                                      label={'Prénom'}
                                                                      variant="outlined"
                                                                      // error={meta.invalid}
                                                                      {...input}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateNaissance" validate={validators.composeValidators(validators.associated(values, ['nom', 'prenom'], 'Date de naissance'))}>
                                                          {({ input: {onChange, value, ...rest}, meta }) => (
                                                              <div className={"RoundDate"} style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24.5%'}}>
                                                                  <DatePicker

                                                                      error={false}
                                                                      sx={{borderRadius: '20px', flex: 2}}
                                                                      onChange={(newDate) => {
                                                                          if (isValidDate(newDate) || form.getFieldState('birthDate').value == null) {
                                                                              form.getFieldState('birthDate').change(newDate)
                                                                              onChange(newDate)
                                                                          }
                                                                      }}

                                                                      inputFormat="dd/MM/yyyy"

                                                                      value={(value === '' || value == undefined || value == null  || value == 'null' )? null: value}

                                                                      renderInput={({ inputRef, inputProps, InputProps }) => {

                                                                          const {
                                                                              disabled,
                                                                              onChange,
                                                                              readOnly,
                                                                              type,
                                                                              value
                                                                          } = inputProps

                                                                          return <TextField
                                                                                  label="Date de naissance"
                                                                                  ref={inputRef}
                                                                                  disabled={disabled}
                                                                                  onChange={(event)=> {
                                                                                      form.getFieldState('birthDate').change(event.target.value)
                                                                                      onChange(event)
                                                                                  }}
                                                                                  placeholder={'jj/mm/aaaa'}
                                                                                  readOnly={readOnly}
                                                                                  type={type}
                                                                                  value={value}
                                                                                  style={{width: '100%'}}
                                                                                  InputProps={{
                                                                                      endAdornment: (
                                                                                          <InputAdornment position="end">
                                                                                              {InputProps?.endAdornment}
                                                                                          </InputAdornment>)
                                                                                  }}/>

                                                                      }}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>
                                                      <Field name="birthDate">
                                                          {({input}) => ( <input {...input} type="hidden" name="birthDate"/> )}
                                                      </Field>

                                                  </AccordionDetails>

                                              </Accordion>

                                              <Accordion expanded={expanded.panelNIR} onChange={handleChange('panelNIR')}>
                                                <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                                    <Typography style={{ marginLeft: "5px" }}><b>Recherche par NIR</b></Typography>
                                                </AccordionSummary>

                                                <AccordionDetails sx={{ display: "flex", flexDirection: "row", justifyContent: "start", }} >
                                                    <PanelNIR validators={validators} disableCle={disableCle} handleFormChange={form.mutators.handleFormChange} />
                                                    <ConfirmNir 
                                                        agreed={()=> {
                                                            setOpenNIRDialog(false);
                                                            setExpanded({...expanded, ['panelNIR']: true});
                                                        }} 
                                                        disagreed={()=>setOpenNIRDialog(false)} 
                                                        opened={openNIRDialog}
                                                    />
                                                </AccordionDetails>

                                              </Accordion>

                                              <div style={{ margin: '10px', textAlign: 'right'}}>
                                                  <Button
                                                      variant="contained"
                                                      type="button"
                                                      onClick={()=> {
                                                          dispatch(initCriterias());
                                                          form.reset()
                                                      }}
                                                      className="RoundedEl"
                                                      disabled={!allowSearch(values)}
                                                      style={{marginRight: '15px'}}
                                                  >
                                                      Effacer
                                                  </Button>
                                                  <Button variant="contained"
                                                          type="submit" size="medium"
                                                          disabled={!allowSearch(values)}
                                                          className="RoundedEl">
                                                      <SearchIcon/>Rechercher
                                                  </Button>

                                              </div>
                                          </CardActions>
                                      </Collapse>
                                  </StyledCard>
                                  <FormSpy onChange={firstRender? ()=>{}: (values) => {

                                      const {
                                          dateDebutSoinsStart, dateDebutSoinsEnd,
                                          groupDisciplines, disciplines, finessJuridique, titre,
                                          dateDebutHospitalisationStart, dateDebutHospitalisationEnd,
                                          status, totalRc,
                                          dateFactureStart, dateFactureEnd, dateReceptionStart, dateReceptionEnd, dateTraitementStart, dateTraitementEnd, totalRcFacture,
                                          numeroEnvironnement, provenance, nom, prenom, dateNaissance,
                                          birthDate, nir, cle
                                      } = values?.values;

                                      if(
                                        dateDebutSoinsStart || dateDebutSoinsEnd || groupDisciplines || disciplines || finessJuridique || titre || dateDebutHospitalisationStart ||
                                        dateDebutHospitalisationEnd || status || totalRc || dateFactureStart || dateFactureEnd || dateReceptionStart || dateReceptionEnd || dateTraitementStart ||
                                        dateTraitementEnd || totalRcFacture || numeroEnvironnement || provenance || nom || prenom || dateNaissance || birthDate || nir || cle
                                      ) {
                                          setDotShow(true)
                                      } else {
                                          setDotShow(false)
                                      }
                                  }}/>

                              </LocalizationProvider></form>)}/>
        </div>
    );
}
