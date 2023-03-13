import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { FormSpy, Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'

import {Badge, CardHeader, Select, CardContent, FormControl, Typography, MenuItem, Button, OutlinedInput, InputAdornment} from "@mui/material";
import {CardActions, InputLabel, Collapse, TextField, CircularProgress} from "@mui/material";

import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SearchIcon from '@mui/icons-material/Search';

import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from "date-fns/locale";

import { checkInsidePanels } from '../utils/utils';
import { isValidDate} from '../../../utils/convertor-utils';
import { validators, allowSearch} from '../../../utils/validator-utils';

import { AutoCompleteField, Accordion, AccordionSummary, AccordionDetails, ConfirmNir, PanelNIR, MaskedInput, StyledCard } from "../../shared";
import { useGetRefsQuery } from "../../../services/refsApi";
import { setCriterias, initCriterias, selectCriterias } from '../facturesSlice'
import { handleFormChange } from "./Mutators";

import './searchAccordion.scss'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function SearchAccordion() {

    const [firstRender, setFirstRender] = useState(true);
    const dispatch = useDispatch();
    const criterias = useSelector(selectCriterias);
    const formRef= useRef(null);
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();
    const [expanded, setExpanded] = useState({
        panelInformationGenerales: true,
        panelInformationsEstablishement: true,
        panelInformationsBeneficiaires: true,
        panelNIR: true,
    });
    const [openNIRDialog, setOpenNIRDialog] = useState(false);
    const [dotShow, setDotShow] = useState(false);
    const [panelExpanded, setPanelExpanded] = useState(false);
    const [disableCle, setDisableCle] = useState(true);
    const [factureStatus, setFactureStatus] = useState([]);
    const [numClient, setNumClient] = useState([]); //
    const [motif, setMotif] = useState([]);

    useEffect(() => {
        if (nomRefsIsSuccess) {

            setFactureStatus(Object.keys(nomRefs.FACTURE_STATUS).map(code => ({value: code, title: nomRefs.FACTURE_STATUS[code]})));
            setMotif(Object.keys(nomRefs.FACTURE_ERROR).map(code => ({value: code, title: nomRefs.FACTURE_ERROR[code]})));
            setNumClient(Object.keys(nomRefs.CLIENT).map(code => ({value: code, title: (code)? `(${code}) ${nomRefs.CLIENT[code]}`: nomRefs.CLIENT[code]})));

            setFirstRender(false);
        }
    }, [nomRefs, nomRefsIsSuccess]);

    const handleAccordionPanel = () => (event) => {
        if (!panelExpanded) {
            let {values} = formRef.current?.getState()
            setExpanded(checkInsidePanels(values))
        }
        setPanelExpanded(!panelExpanded);
    };

    const handleChange = (panel) => (event, newExpanded) => {
        if (panel == 'panelNIR' && !expanded.panelNIR) {
            setOpenNIRDialog(true);
        } else {
            setExpanded({...expanded, [panel]: newExpanded});
        }
    };

    const onSubmit = async (values) => {

        await sleep(300);
        dispatch(setCriterias({...values, cashe: Math.random()}));
        setPanelExpanded(false);
    };

    if (nomRefsIsFetching) return <CircularProgress style={{margin: '100px 50%'}}/>

    return (
        <div className={'formContent'}>
            <Form onSubmit={onSubmit}
                  initialValues={{ ...criterias }}
                  mutators={{ ...arrayMutators, handleFormChange: handleFormChange({motif, setMotif, setDisableCle, nomRefs}) }}
                  render = {({ handleSubmit, form, submitting, pristine, values }) => (
                      formRef.current = form,
                          <form onSubmit={handleSubmit} >
                              <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
                                  <StyledCard id="FacturesSearchForm" variant="outlined" sx={{ display: 'block', minWidth: 775, overflow: 'visible',
                                      '& .MuiCardHeader-root': {borderRadius: (panelExpanded)?'34px 34px 0 0 !important': '34px!important'}
                                  }}>
                                      <CardHeader
                                          sx={{ bgcolor: '#f1f1f1', display: "flex",  }}
                                          title={<div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>

                                                      <Field name="numeroFacture" validate={validators.composeValidators(validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <div style={{flex: 2, marginRight: '20px'}}>
                                                                  <TextField id="NumeroFacture" type={'number'} variant="standard"
                                                                      error={meta.invalid}
                                                                      placeholder={'Nº facture'}
                                                                      sx={{width: '100%'}}
                                                                      className="RoundedEl"
                                                                      InputProps={{  disableUnderline: true }}
                                                                      {...{...input, inputProps: { ...input.inputProps, step: 1, lang: 'fr', inputMode: 'numeric', pattern: '[0-9]*',
                                                                              onKeyDown: (e) => ["e", "E", "+", "-", ".", ","].includes(e.key) && e.preventDefault()
                                                                          }
                                                                      }}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>

                                                      <Field name="numeroEngagement" validate={validators.composeValidators(validators.maxValue(17))}>
                                                          {({ input, meta }) => (
                                                              <div style={{flex: 2, marginRight: '20px'}}>
                                                                  <TextField id="NumeroEngagement" variant={'standard'}
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      placeholder={'Nº d\'engagement'}
                                                                      InputProps={{  disableUnderline: true }}
                                                                      sx={{width: '100%'}}
                                                                      className="RoundedEl" />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>

                                                      <Field name="numeroAdherent" validate={validators.composeValidators(validators.maxValue(16))}>

                                                          {({ input, meta }) => (
                                                              <div style={{flex: 2}}>
                                                                  <TextField id="NumeroAdherent" variant="standard"
                                                                     error={meta.invalid}
                                                                     {...input}
                                                                     placeholder={'Nº adhérent'}
                                                                     InputProps={{  disableUnderline: true }}
                                                                     sx={{width: '100%'}}
                                                                     className="RoundedEl" />
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

                                              <Accordion expanded={expanded.panelInformationGenerales} onChange={handleChange('panelInformationGenerales')}>
                                                  <AccordionSummary aria-controls="panelInformationGenerales-content" id="panelInformationGenerales-header">
                                                      <Typography style={{paddingLeft: '5px'}}><b>Informations générales</b></Typography>
                                                  </AccordionSummary>

                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>

                                                      {(nomRefs && nomRefs?.FACTURE_DOMAINE) && <Field name="domaine" >

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <InputLabel id="Domaine-label">Domaine</InputLabel>
                                                                  <Select id="Domaine" labelId="Domaine-label"
                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Domaine" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}>
                                                                      {Object.keys(nomRefs.FACTURE_DOMAINE).map(code => ( <MenuItem key={code} value={code}> {nomRefs.FACTURE_DOMAINE[code]} </MenuItem> ))}
                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      <Field name="dateEntree">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date d\'admission / Date de soins '}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) => <TextField style={{flex: 2}} {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateReceivedStart" >
                                                          {({ input, meta }) => (
                                                              // <div className={"RoundDate"}>
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DateTimePicker
                                                                      label={'Réceptionné du'}
                                                                      ampm={false}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) => {
                                                                          const {onChange} = params.inputProps
                                                                          return <TextField style={{flex: 2}} type = {'datetime-local'}
                                                                                     { ...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa hh:mm"}} }
                                                                             onBlur = {(e) => {
                                                                              if (e.target.value.length < 16 && e.target.value.length >= 10) {
                                                                                  form.getFieldState('dateReceivedStart').change(new Date( e.target.value.substr(0,10).replace(/(\d+[/])(\d+[/])/, '$2$1') ))
                                                                                  onChange(e)
                                                                              }
                                                                          }} />}}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateReceivedEnd" validate={ validators.composeValidators(validators.beforeThan(values, 'dateReceivedStart')) }>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DateTimePicker
                                                                      label={'au '}
                                                                      ampm={false}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) => {
                                                                          const {onChange} = params.inputProps
                                                                          return <TextField style={{flex: 2}} type={'datetime-local'}
                                                                                    {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa hh:mm"}}}
                                                                                    onBlur = {(e) => {
                                                                                        if (e.target.value.length < 16 && e.target.value.length >= 10) {
                                                                                            form.getFieldState('dateReceivedEnd').change(new Date(e.target.value.substr(0,10).replace(/(\d+[/])(\d+[/])/, '$2$1') ))
                                                                                            onChange(e)
                                                                                        }
                                                                                    }}
                                                                          />}}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="identifiantPeriodeFacturation" validate={validators.composeValidators(validators.minValue(22))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" sx={{ flex: '1 0 22%', label: {marginTop: '15px!important'}}}>
                                                                  <MaskedInput id="identifiantPeriodeFacturation" autoFocus fullWidth
                                                                      mask={"********************** / 00"}
                                                                      placeholder={"********************** / 00"}
                                                                      color="primary"
                                                                      label={'ID période de facturation / Nº d\'occurrence'}
                                                                      {...input} />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateFacture">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date facture'}
                                                                      // error={false}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) => <TextField style={{flex: 2}} {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}} />}
                                                                  />
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <AutoCompleteField id="Statut" name="status"
                                                                         multiple={true}
                                                                         label={'Statut'}
                                                                         options={factureStatus}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'statuts sélectionnés'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />

                                                      <AutoCompleteField id="Motif" name="codeErreur"
                                                                         multiple={true}
                                                                         label={'Motif'}
                                                                         options={motif}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'motifs sélectionnéеs'}
                                                                         disabled={(motif?.length > 0)? false: true}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />

                                                  </AccordionDetails>
                                              </Accordion>

                                              <Accordion expanded={expanded.panelInformationsEstablishement} onChange={handleChange('panelInformationsEstablishement')}>
                                                  <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                                      <Typography style={{marginLeft: '5px'}}><b>Informations établissement</b></Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                                                      <Field name="finessGeographique" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="FinessGeographique" label={'FINESS géographique'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      onBlur={(e)=> {
                                                                          if (e.target.value.length == 8) form.getFieldState('numId').change('0' + e.target.value)
                                                                          return input.onBlur(e)
                                                                      }}
                                                                      className="RoundedEl" />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="finessJuridique" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="FinessJuridique" label={'FINESS juridique'} variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      onBlur={(e)=> {
                                                                          if (e.target.value.length == 8) form.getFieldState('numJur').change('0' + e.target.value)
                                                                          return input.onBlur(e)
                                                                      }}
                                                                      className="RoundedEl" />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="raisonSociale" validate={validators.composeValidators(validators.minValue(3), validators.maxValue(51))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="RaisonSociale" label={'Raison sociale'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      className="RoundedEl" />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="department" validate={validators.composeValidators(validators.mustBeNumber, validators.minValue(2), validators.maxValue(3))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="Department" type={"number"} label={'Nº département'} variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      className="RoundedEl" />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                  </AccordionDetails>

                                              </Accordion>

                                              <Accordion expanded={expanded.panelInformationsBeneficiaires} onChange={handleChange('panelInformationsBeneficiaires')}>
                                                  <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                                      <Typography style={{marginLeft: '5px'}}><b>Informations bénéficiaire</b></Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                                                      <AutoCompleteField id="NumeroAmc" name="numeroAmc"
                                                                         multiple={true}
                                                                         label={'AMC'}
                                                                         options={numClient}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'AMC sélectionnés'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />


                                                      <Field name="nom" validate={validators.composeValidators(
                                                          validators.maxValue(51),
                                                          validators.associated(values, ['prenom', 'dateNaissance'], 'Nom')
                                                      )}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="Nom" label={'Nom'} variant="outlined"
                                                                      {...input}
                                                                      className="RoundedEl" />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="prenom" validate={validators.composeValidators(
                                                          validators.maxValue(51),
                                                          validators.associated(values, ['nom', 'dateNaissance'], 'Prénom')
                                                      )}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="Prenom" label={'Prénom'} variant="outlined"
                                                                      {...input}
                                                                      className="RoundedEl" />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateNaissance" validate={validators.composeValidators(validators.associated(values, ['nom', 'prenom'], 'Date de naissance'))}>
                                                          {({ input, meta }) => (
                                                              <div className={"RoundDate"} style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker

                                                                      error={false}
                                                                      sx={{borderRadius: '20px', flex: 2}}
                                                                      onChange={(newDate) => {
                                                                          if (isValidDate(newDate) || form.getFieldState('birthDate').value == null) {
                                                                              form.getFieldState('birthDate').change(newDate)
                                                                              input.onChange(newDate)
                                                                          }
                                                                      }}

                                                                      inputFormat="dd/MM/yyyy"

                                                                      value={(input.value === '' || input.value == undefined || input.value == null  || input.value == 'null' )? null: input.value}

                                                                      renderInput={({ inputRef, inputProps, InputProps }) => {

                                                                          const { disabled, onChange, readOnly, type, value } = inputProps

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
                                                                                  InputProps={{ endAdornment: ( <InputAdornment position="end"> {InputProps?.endAdornment} </InputAdornment>) }}
                                                                                  onBlur={(e)=> {
                                                                                      if (e.target.value.length !== 10) form.getFieldState('dateNaissance').change(undefined)
                                                                                      return input.onBlur(e)
                                                                                  }}
                                                                          />

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
                                                <AccordionDetails sx={{ display: "flex", flexDirection: "row", justifyContent: "start" }}>
                                                    <PanelNIR validators={validators} disableCle={disableCle} handleFormChange={form.mutators.handleFormChange}/>
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
                                                      style={{marginRight: '15px'}} >
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
                                  <FormSpy subscription={{values: true}} onChange={firstRender? ()=>{}: (values) => {

                                      const {
                                          domaine, dateEntree, dateReceivedStart, dateReceivedEnd,
                                          identifiantPeriodeFacturation, dateFacture, status, codeErreur,
                                          finessGeographique, finessJuridique, raisonSociale,
                                          department, numeroAmc,
                                          nom, prenom, dateNaissance, birthDate, nir, cle
                                      } = values?.values;

                                      if(
                                          domaine || dateEntree || dateReceivedStart || dateReceivedEnd || identifiantPeriodeFacturation || dateFacture || status ||
                                          codeErreur || finessGeographique || finessJuridique || raisonSociale || department || numeroAmc || nom || prenom || dateNaissance ||
                                          birthDate || nir || cle
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




