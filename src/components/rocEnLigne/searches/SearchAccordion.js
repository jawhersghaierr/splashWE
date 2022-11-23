import React, {useState, useRef, useEffect, useLayoutEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Collapse, InputLabel, CardActions, TextField, CircularProgress } from "@mui/material";
import { CardContent, Typography, Button, Badge, Select, MenuItem, CardHeader, IconButton, FormControl, OutlinedInput , InputAdornment } from '@mui/material';

import arrayMutators from 'final-form-arrays'
import { FormSpy, Form, Field } from 'react-final-form';

import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';

import { ListItemText } from "@material-ui/core";
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fr } from "date-fns/locale";

import { AutoCompleteCustom, ConfirmNir, PanelNIR, MaskedInput, StyledCard, Accordion, AccordionSummary, AccordionDetails } from "../../shared";
import { selectCriterias, setCriterias, initCriterias } from '../rocEnLigneSlice';
import { useGetRefsQuery } from "../../../services/refsApi";

import { isValidDate } from "../../../utils/convertor-utils";
import { validators, allowSearch } from '../../../utils/validator-utils';
import { checkInsidePanels } from '../utils/utils';

import { MutatorSetValue } from "./Mutators";

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
        localStatus: null,
        localMotif: null,
        localSubMotif: null
    })

    useEffect(() => {
        if (nomRefsIsSuccess) {

            let amc = []
            Object.keys(nomRefs.CLIENT).forEach( cl=> {
                if ( nomRefs.ROC_AMCS.includes(cl) ) amc.push({value:cl, title: `(${cl}) ${nomRefs.CLIENT[cl]}`})
            })

            console.log(amc)

            setRln({
                amc,
                localStatus: Object.keys( nomRefs.ROC_STATUSES ),
                localMotif: Object.keys( nomRefs.ROC_MOTIFS ),
                localSubMotif: Object.keys( nomRefs.ROC_SOUS_MOTIFS )
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
                  // mutators={{ ...arrayMutators, setValue: MutatorSetValue({rln, setRln, setDisableCle, nomRefs}) }}
                  mutators={{
                      ...arrayMutators,
                      setValue: ([field, value], state, utils) => MutatorSetValue({rln, setRln, setDisableCle, nomRefs, field, value, state, utils})
                  }}
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
                                                      </FormControl>
                                                  )}
                                              </Field>}

                                              <Field name="numEng" validate={validators.composeValidators(validators.maxValue(17))}>
                                                {({ input, meta }) => (
                                                    <div style={{flex: 2, marginRight: '20px'}}>
                                                      <TextField id="NumEng" variant={'standard'}
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

                                              <Field name="numAdh" validate={validators.composeValidators(validators.maxValue(16))}>

                                                  {({ input, meta }) => (
                                                      <div style={{flex: 2}}>
                                                          <TextField id="NumAdh" variant="standard"
                                                              error={meta.invalid}
                                                              {...input}
                                                              placeholder={'Nº adhérent'}
                                                              sx={{width: '100%'}} className="RoundedEl"
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

                                                      {(nomRefs && nomRefs?.ROC_DOMAINS) && <Field name="domaine" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <InputLabel id="Domaine-label">Domaine</InputLabel>
                                                                  <Select id="Domaine" labelId="Domaine-label"
                                                                      multiple
                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Domaine" sx={{minWidth: 200}}/>}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} domaines sélectionnés`
                                                                          return nomRefs.ROC_DOMAINS[selected[0]];
                                                                      }}
                                                                      MenuProps={{autoFocus: false}}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          {(values?.domaine?.length == Object.keys(nomRefs.ROC_DOMAINS).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}
                                                                      </MenuItem>

                                                                      {Object.keys(nomRefs.ROC_DOMAINS).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {nomRefs.ROC_DOMAINS[code]}
                                                                          </MenuItem>
                                                                      ))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      <Field name="dateAdmission">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date d\'admission / Date de soins '}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}/>}
                                                                  />
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="receptionDateStart" >
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
                                                                                  form.getFieldState('receptionDateStart').change(new Date( e.target.value.substr(0,10).replace(/(\d+[/])(\d+[/])/, '$2$1') ))
                                                                                  onChange(e)
                                                                              }
                                                                            }}
                                                                          />}}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="receptionDateEnd" validate={ validators.composeValidators(validators.beforeThan(values, 'receptionDateStart')) }>
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
                                                                                     form.getFieldState('receptionDateEnd').change(new Date(e.target.value.substr(0,10).replace(/(\d+[/])(\d+[/])/, '$2$1') ))
                                                                                     onChange(e)
                                                                                 }
                                                                             }}
                                                                          />}}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="idPerFact" validate={validators.composeValidators(validators.minValue(22))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" sx={{ flex: '1 0 22%', label: {marginTop: '15px!important'}, maxWidth: '25%' }}>
                                                                  <MaskedInput id="IdPerFact" label={'ID période de facturation / Nº d\'occurrence'}
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


                                                      {(nomRefs && rln?.localStatus) && <Field name="statut" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '25%' }}>
                                                                  <InputLabel id="Statut-label">Statut</InputLabel>
                                                                  <Select id="Statut" labelId="Statut-label"
                                                                      multiple
                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Statut" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} statuts sélectionnés`
                                                                          return nomRefs.ROC_STATUSES[selected[0]];
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          {(values?.statut?.length == Object.keys(rln.localStatus).length) ?
                                                                              <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}
                                                                      </MenuItem>

                                                                      {rln.localStatus.map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {nomRefs.ROC_STATUSES[code]}
                                                                          </MenuItem>
                                                                      ))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      {(nomRefs && nomRefs?.ROC_MOTIFS) && <Field name="motif" format={value => value || []}>
                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24%' }}>
                                                                  <InputLabel id="Motif-label">Motif de rejet</InputLabel>
                                                                  <Select id="Motif" labelId="Motif-label"
                                                                      multiple
                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Motif" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      disabled={!Boolean(
                                                                    ( values?.statut?.length > 0 && ( values?.statut?.includes('REJETEE') || values?.statut?.includes('INVALIDE') ))
                                                                          || (values?.statut == undefined || values?.statut?.length == 0)
                                                                      )}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} motifs sélectionnés`
                                                                          return nomRefs.ROC_MOTIFS[selected[0]];
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          {(values?.motif?.length == nomRefs.ROC_MOTIFS.length) ?
                                                                              <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}
                                                                      </MenuItem>

                                                                      {rln?.localMotif && rln.localMotif.map(code => (<MenuItem key={code} value={code} sx={{maxWidth: '350px', whiteSpace: 'normal'}}>
                                                                          {nomRefs.ROC_MOTIFS[code]}
                                                                      </MenuItem>))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      {nomRefs && <Field name="sousMotif" format={value => value || []}>

                                                          {({input, meta}) => (

                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24%' }}>
                                                                  <InputLabel id="SubMotif-label">Sous-motif de rejet</InputLabel>
                                                                  <Select id="SubMotif" labelId="SubMotif-label"
                                                                      multiple
                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Sub Motif" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      disabled={!Boolean(
                                                                          ( values?.statut?.length > 0 && ( values?.statut?.includes('REJETEE') || values?.statut?.includes('INVALIDE') ))
                                                                          || (values?.statut == undefined || values?.statut?.length == 0)
                                                                      )}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} sous-motifs sélectionnés`
                                                                          return nomRefs.ROC_SOUS_MOTIFS[selected[0]];
                                                                      }}>

                                                                      {rln?.localSubMotif && <MenuItem value="all" key='selectAll'>
                                                                          {(values?.sousMotif?.length == rln.localSubMotif.length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}
                                                                      </MenuItem>}

                                                                      {rln?.localSubMotif && rln.localSubMotif.map(code => (
                                                                          <MenuItem key={code} value={code} sx={{maxWidth: '350px', whiteSpace: 'normal'}}>
                                                                              {nomRefs.ROC_SOUS_MOTIFS[code]}
                                                                          </MenuItem>
                                                                      ))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                  </AccordionDetails>
                                              </Accordion>

                                              <Accordion expanded={expanded.panelInformationsEstablishement} onChange={handleChange('panelInformationsEstablishement')}>
                                                  <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                                      <Typography style={{marginLeft: '5px'}}><b>Informations établissement</b></Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                                                      <Field name="finessGeo" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="FINESSgeographique" label={'FINESS géographique'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      onBlur={(e)=> {
                                                                          if (e.target.value.length == 8) form.getFieldState('finessGeo').change('0' + e.target.value)
                                                                          return input.onBlur(e)
                                                                      }}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="finessJur" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="FINESSJuridique" label={'FINESS juridique'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      onBlur={(e)=> {
                                                                          if (e.target.value.length == 8) form.getFieldState('finessJur').change('0' + e.target.value)
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

                                                      <Field name="dеpartement" validate={validators.composeValidators(validators.mustBeNumber, validators.minValue(2), validators.maxValue(3))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="Department" label={'Nº département'}
                                                                      type={"number"}
                                                                      variant="outlined"
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

                                                      {(nomRefs && nomRefs?.CLIENT) && <Field name="amc" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  {rln.amc && rln.amc.length > 0 &&
                                                                    <AutoCompleteCustom id="amc" label={'AMC'}
                                                                        meta={meta}
                                                                        input={input}
                                                                        options={rln.amc}
                                                                        selectMsg={'Sélectionner tout'}
                                                                        deSelectMsg={'Désélectionner tout'}
                                                                        selectedMsg={'AMC sélectionnées'}
                                                                    />}
                                                              </FormControl>
                                                          )}
                                                      </Field>}

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

                                                      <Field name="dateNaiss" >
                                                          {({ input, meta }) => (
                                                              // TODO dateNaissance must be separated in single file and following same name convention for all modules
                                                              <div className={"RoundDate"} style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      error={false}
                                                                      sx={{borderRadius: '20px', flex: 2}}
                                                                      onChange={(newDate) => {
                                                                          if (isValidDate(newDate) || form.getFieldState('birdDate').value == null) {
                                                                              form.getFieldState('birdDate').change(newDate)
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
                                                                                      form.getFieldState('birdDate').change(event.target.value)
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
                                                                                      if (e.target.value.length !== 10) form.getFieldState('dateNaiss').change(undefined)
                                                                                      return input.onBlur(e)
                                                                                  }}

                                                                          />

                                                                      }}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>
                                                      <Field name="birdDate">
                                                          {({input}) => ( <input {...input} type="hidden" name="birdDate"/> )}
                                                      </Field>

                                                  </AccordionDetails>

                                              </Accordion>
    
                                              <Accordion expanded={expanded.panelNIR} onChange={handleChange('panelNIR')}>
                                                <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                                    <Typography style={{ marginLeft: "5px" }}><b>Recherche par NIR</b></Typography>
                                                </AccordionSummary>
                                                <AccordionDetails
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "start",
                                                    }}
                                                >
                                                    <PanelNIR validators={validators} disableCle={disableCle} />
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
                                  <FormSpy subscription={{values: true}} onChange={firstRender? ()=>{}: (values) => {
                                      const {
                                          type, numEng, numAdh,
                                          domaine,
                                          dateAdmission,
                                          receptionDateStart, receptionDateEnd,
                                          idPerFact, dateFact,
                                          statut, motif, sousMotif,
                                          finessGeo, finessJur,
                                          raisonSociale,
                                          dеpartement, amc,
                                          nom, prenom,
                                          dateNaiss, birdDate,
                                          nir, cle
                                      } = values?.values;

                                      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                      form.mutators.setValue(values)
                                      /**
                                       * ****************************************************************
                                       */

                                      if(
                                          domaine || dateAdmission || receptionDateStart || receptionDateEnd || idPerFact || dateFact || statut ||
                                          motif || finessGeo || finessJur || raisonSociale || dеpartement || amc || nom || prenom || dateNaiss ||
                                          birdDate || nir || cle
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




