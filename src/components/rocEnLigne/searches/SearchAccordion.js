import React, {useState, useRef, useEffect, useLayoutEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Collapse, InputLabel, CardActions, TextField, CircularProgress } from "@mui/material";
import { CardContent, Typography, Button, Badge, Select, MenuItem, CardHeader, IconButton, FormControl, OutlinedInput , InputAdornment } from '@mui/material';

import arrayMutators from 'final-form-arrays'
import { FormSpy, Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners'

import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';

import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fr } from "date-fns/locale";

import { AutoCompleteField, ConfirmNir, PanelNIR, MaskedInput, StyledCard, Accordion, AccordionSummary, AccordionDetails } from "../../shared";
import { handleFormChange } from "./Mutators";
import { selectCriterias, setCriterias, initCriterias } from '../rocEnLigneSlice';
import { useGetRefsQuery } from "../../../services/refsApi";

import { checkForRejeteOrAnuleOrMore, checkInsidePanels} from '../utils/utils';
import { isValidDate } from "../../../utils/convertor-utils";
import { validators, allowSearch } from '../../../utils/validator-utils';

import './searchAccordion.scss'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
// ^^^^^^^ must be removed ^^^^^^^^^^ Completely unnecessary ^^^^^^^^^^^^^^


export default function SearchAccordion(props) {

    const [firstRender, setFirstRender] = useState(true);
    const dispatch = useDispatch();
    const criterias = useSelector(selectCriterias);
    const formRef= useRef(null);
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    const onSubmit = async (values) => {

        await sleep(300);
        dispatch(setCriterias({...values, cashe: Math.random()}));
        setPanelExpanded(false);
    };

    const [expanded, setExpanded] = useState({
        panelInformationGenerales: true,
        panelInformationsEstablishement: true,
        panelInformationsBeneficiaires: true,
        panelNIR: true,
    });
    const [dotShow, setDotShow] = useState(false);
    const [disableCle, setDisableCle] = useState(true);
    const [openNIRDialog, setOpenNIRDialog] = useState(false);

    const [rln, setRln] = useState({
        amc: null,
        localDomaine: null,
        localStatus: null,
        localMotif: null,
        localMotif1: null,
        localSubMotif: null,
        localSubMotif1: null
    })

    useEffect(() => {
        if (nomRefsIsSuccess) {

            let amc = []
            Object.keys(nomRefs.CLIENT).forEach( cl=> {
                if ( nomRefs.ROC_AMCS.includes(cl) ) amc.push({value:cl, title: `(${cl}) ${nomRefs.CLIENT[cl]}`})
            })

            setRln({
                amc,
                localDomaine: Object.keys( nomRefs.ROC_DOMAINS ).map(code => ({value: code, title: nomRefs.ROC_DOMAINS[code]})),
                localStatus: Object.keys( nomRefs.ROC_STATUSES ).map(code => ({value: code, title: nomRefs.ROC_STATUSES[code]})),
                localMotif1: Object.keys( nomRefs.ROC_MOTIFS ).map(code => ({value: code, title: nomRefs.ROC_MOTIFS[code]})),
                localSubMotif1: Object.keys( nomRefs.ROC_SOUS_MOTIFS ).map(code => ({value: code, title: nomRefs.ROC_SOUS_MOTIFS[code]})),
                localMotif: Object.keys( nomRefs.ROC_MOTIFS ),
                localSubMotif: Object.keys( nomRefs.ROC_SOUS_MOTIFS ),
            })

            setFirstRender(false);
        }
    }, [nomRefsIsSuccess]);

    const [panelExpanded, setPanelExpanded] = useState(false);

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


    if (nomRefsIsFetching || props.disciplinesIsFetching) return <CircularProgress style={{margin: '100px 50%'}}/>
    return (
        <div className={'formContent'}>
            <Form onSubmit={onSubmit}
                  initialValues={{ ...criterias, cashe: undefined }}
                  mutators={{ ...arrayMutators, handleFormChange: handleFormChange({rln, setRln, setDisableCle, nomRefs}) }}
                  // decorators={[Decorators]}
                  render = {({ handleSubmit, form, submitting, pristine, values }) => (
                      formRef.current = form,
                          <form onSubmit={handleSubmit} >
                              <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>

                                  <StyledCard id="RocEnLigneSearchForm" variant="outlined"
                                              sx={{ display: 'block', minWidth: 775, overflow: 'visible',
                                                  '& .MuiCardHeader-root': {borderRadius: (panelExpanded)?'34px 34px 0 0 !important': '34px!important'}
                                              }}>
                                      <CardHeader title={<div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }} sx={{ bgcolor: '#f1f1f1', display: "flex",  }}>

                                              {(nomRefs && nomRefs?.ROC_TYPES) && <Field name="type" format={value => value || []}>

                                                  {({input, meta}) => (
                                                      //TODO this kind of components should be separated in single file
                                                      <FormControl className="RoundDate" style={{ flex: 2, marginRight: '20px' }}>
                                                          <InputLabel id="Type-label">Type de la demande</InputLabel>
                                                          <Select id="Type" labelId="Type-label"
                                                              sx={{'fieldset': {border: 'none'}}}
                                                              multiple
                                                              {...input}
                                                              input={<OutlinedInput className="RoundedEl" label="Type" sx={{minWidth: 200}}/>}
                                                              MenuProps={{autoFocus: false}}
                                                              renderValue={(selected) => {
                                                                  if (selected.length > 1) return `${selected.length} types sélectionnés`
                                                                  return nomRefs.ROC_TYPES[selected[0]];
                                                              }}>

                                                              <MenuItem value="all" key='selectAll'>
                                                                  {(values?.type?.length == Object.keys(nomRefs.ROC_TYPES).length) ?
                                                                      <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}
                                                              </MenuItem>

                                                              {Object.keys(nomRefs.ROC_TYPES).map(code => (
                                                                  <MenuItem key={code} value={code}>
                                                                      {nomRefs.ROC_TYPES[code]}
                                                                  </MenuItem>
                                                              ))}
                                                          </Select>
                                                          <OnChange name={'type'}>
                                                              { () => form.mutators.handleFormChange('type') }
                                                          </OnChange>

                                                      </FormControl>
                                                  )}
                                              </Field>}

                                              <Field name="numeroEngagement" validate={validators.composeValidators(validators.maxValue(17))}>
                                                {({ input, meta }) => (
                                                    <div style={{flex: 2, marginRight: '20px'}}>
                                                      <TextField id="NumeroEngagement" variant={'standard'}
                                                                 error={meta.invalid}
                                                                 {...input}
                                                                 placeholder={'Nº d\'engagement'}
                                                                 InputProps={{  disableUnderline: true }}
                                                                 sx={{width: '100%'}} className="RoundedEl"
                                                      />
                                                      {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                    </div>
                                                )}
                                              </Field>

                                              <Field name="numeroAdherant" validate={validators.composeValidators(validators.maxValue(16))}>

                                                  {({ input, meta }) => (
                                                      <div style={{flex: 2}}>
                                                          <TextField id="NumeroAdherant" variant="standard"
                                                                     error={meta.invalid}
                                                                     {...input}
                                                                     placeholder={'Nº adhérent'}
                                                                     InputProps={{  disableUnderline: true }}
                                                                     sx={{width: '100%'}} className="RoundedEl"
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
                                              <Button variant="contained" type="submit"
                                                  // disabled={!allowSearch(values)}
                                                  size="medium" className='RoundedEl' >
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

                                                      <AutoCompleteField id="Domaine" name="domaine"
                                                                         multiple={true}
                                                                         label={'Domaine'}
                                                                         options={rln.localDomaine}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'domaines sélectionnés'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />


                                                      <Field name="dateAdmission">
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

                                                      <Field name="dateDebutReception" >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DateTimePicker label={'Réceptionné du'}
                                                                      ampm ={false}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) => {
                                                                          const {onChange} = params.inputProps
                                                                          return <TextField style = {{ flex: 2 }} type = {'datetime-local'}
                                                                            { ...{...params, inputProps: { ...params.inputProps, placeholder: "jj/mm/aaaa hh:mm" }} }
                                                                            onBlur = {(e) => {
                                                                              if (e.target.value.length < 16 && e.target.value.length >= 10) {
                                                                                  form.getFieldState('dateDebutReception').change(new Date( e.target.value.substr(0,10).replace(/(\d+[/])(\d+[/])/, '$2$1') ))
                                                                                  onChange(e)
                                                                              }
                                                                            }}
                                                                          />}}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateFinReception" validate={ validators.composeValidators(validators.beforeThan(values, 'dateDebutReception')) }>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DateTimePicker label={'au '}
                                                                      ampm={false}
                                                                      // inputFormat="dd/MM/yyyy hh:mm am"
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) => {
                                                                          const {onChange} = params.inputProps
                                                                          return <TextField style={{flex: 2}} type={'datetime-local'}
                                                                            {...{...params, inputProps: { ...params.inputProps, placeholder : "jj/mm/aaaa hh:mm"} }}
                                                                             onBlur = {(e) => {
                                                                                 if (e.target.value.length < 16 && e.target.value.length >= 10) {
                                                                                     form.getFieldState('dateFinReception').change(new Date(e.target.value.substr(0,10).replace(/(\d+[/])(\d+[/])/, '$2$1') ))
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
                                                              <FormControl className="RoundedEl" sx={{ flex: '1 0 22%', label: {marginTop: '15px!important'}, maxWidth: '25%' }}>
                                                                  <MaskedInput id="IdentifiantPeriodeFacturation" label={'ID période de facturation / Nº d\'occurrence'}
                                                                      autoFocus
                                                                      fullWidth
                                                                      mask={"********************** / 00"}
                                                                      placeholder={"********************** / 00"}
                                                                      color="primary"
                                                                      {...input}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>


                                                      <AutoCompleteField id="Statut" name="statut"
                                                                         multiple={true}
                                                                         label={'Statut'}
                                                                         options={rln.localStatus}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'statuts sélectionnés'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />


                                                      <AutoCompleteField id="Motif" name="motif"
                                                                         multiple={true}
                                                                         label={'Motif de rejet'}
                                                                         options={rln.localMotif1}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'motifs sélectionnés'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                                         disabled={!checkForRejeteOrAnuleOrMore(form.getState().values['statut'])}
                                                      />


                                                      <AutoCompleteField id="SousMotif" name="sousMotif"
                                                                         multiple={true}
                                                                         label={'Sous-motif de rejet'}
                                                                         options={rln.localSubMotif1}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'sous-motifs sélectionnés'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                                         disabled={!checkForRejeteOrAnuleOrMore(form.getState().values['statut'])}
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
                                                                          if (e.target.value.length == 8) form.getFieldState('finessGeographique').change('0' + e.target.value)
                                                                          return input.onBlur(e)
                                                                      }}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="finessJuridique" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="FinessJuridique" label={'FINESS juridique'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      onBlur={(e)=> {
                                                                          if (e.target.value.length == 8) form.getFieldState('finessJuridique').change('0' + e.target.value)
                                                                          return input.onBlur(e)
                                                                      }}
                                                                      className="RoundedEl"
                                                                  />
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
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="departement" validate={validators.composeValidators(validators.mustBeNumber, validators.minValue(2), validators.maxValue(3))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="Department" label={'Nº département'} variant="outlined"
                                                                             type={"number"}
                                                                             error={meta.invalid}
                                                                             {...input}
                                                                             className="RoundedEl"
                                                                  />
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
                                                                         options={rln.amc}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'AMC sélectionnées'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />


                                                      <Field name="nom" validate={validators.composeValidators( validators.maxValue(51) )}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="Nom" label={'Nom'}
                                                                      variant="outlined"
                                                                      {...input}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="prenom" validate={validators.composeValidators( validators.maxValue(51), validators.associated(values, ['amc', 'nom', 'dateNaiss', 'numAdh'], 'Prénom') )}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="Prenom" label={'Prénom'}
                                                                      variant="outlined"
                                                                      {...input}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateNaissance" >
                                                          {({ input, meta }) => (
                                                              // TODO dateNaissance must be separated in single file and following same name convention for all modules
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

                                                                          return <TextField label="Date de naissance" ref={inputRef}
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
                                                                                  }}
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
                                                <AccordionDetails sx={{ display: "flex", flexDirection: "row", justifyContent: "start" }} >
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
                                                  <Button type="button" variant="contained"
                                                      onClick={()=> {
                                                          dispatch(initCriterias());
                                                          form.reset()
                                                      }}
                                                      disabled={!allowSearch(values)}
                                                      className="RoundedEl"
                                                      style={{marginRight: '15px'}}
                                                  >
                                                      Effacer
                                                  </Button>
                                                  <Button type="submit" variant="contained"
                                                          size="medium"
                                                          // disabled={!allowSearch(values)}
                                                          className="RoundedEl">
                                                      <SearchIcon/>Rechercher
                                                  </Button>

                                              </div>
                                          </CardActions>
                                      </Collapse>
                                  </StyledCard>
                                  <FormSpy subscription={{values: true}} onChange={firstRender? ()=>{}: (params) => {
                                      const {
                                          domaine,
                                          dateAdmission,
                                          dateDebutReception, dateFinReception,
                                          identifiantPeriodeFacturation,
                                          statut, motif, sousMotif,
                                          finessGeographique, finessJuridique,
                                          raisonSociale,
                                          departement, numeroAmc,
                                          nom, prenom,
                                          dateNaissance, birthDate,
                                          nir, cle
                                      } = params?.values;

                                      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

                                      if(
                                          domaine || dateAdmission || dateDebutReception || dateFinReception || identifiantPeriodeFacturation || statut ||
                                          motif || sousMotif || finessGeographique || finessJuridique || raisonSociale || departement || numeroAmc || nom || prenom || dateNaissance ||
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




