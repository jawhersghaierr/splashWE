import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import {Card, CardActions, CardContent, Typography, Button, TextField, CircularProgress} from "@mui/material";
import arrayMutators from 'final-form-arrays'
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import { FormSpy, Form, Field, FieldProps, FieldRenderProps } from 'react-final-form';
import { ListItemText } from "@material-ui/core";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from "date-fns/locale";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputAdornment from '@mui/material/InputAdornment';
import { useGetRefsQuery } from "../../../services/refsApi";
import { MaskedInput } from "../../shared/TextMaskCustom";
import {validators, calcCleFromNir, selectDeselectAllValues, allowSearch} from '../../../utils/validator-utils';
import {
    checkInsidePanels, getAvailableTypesFromStatuses,
    reshapeMotifFromStatus, getMotifsFromTypes,
    getStatusFromTypes, getSubMotifsFromMotif, getSubMotifsFromMotifs,
} from '../utils/utils';
import { setCriterias, initCriterias, selectCriterias } from '../rocEnLigneSlice';
import { ConfirmNir } from "../../shared/ConfirmNir";
import PanelNIR from '../../shared/PanelNIR';
import { Accordion, AccordionSummary, AccordionDetails } from "../../shared/Accordion";

import './searchAccordion.scss'

const StyledCard = styled(Card)(({ theme }) => ({
    "&.MuiPaper-rounded": {
        border: 0,
        borderRadius: '30px',
    },
}));

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function SearchAccordion(props) {

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
    const [localStatus, setLocalStatus] = useState({});
    const [localMotif, setLocalMotif] = useState({});
    const [localSubMotif, setLocalSubMotif] = useState({});
    // const [availableDep, setAvailableDep] = useState({
    //     types: [],
    //     status: [],
    //     motif: [],
    //     subMotif: [],
    // });


    useEffect(() => {
        if (nomRefsIsSuccess) {
            setLocalStatus(nomRefs.ROC_STATUSES)
            setLocalMotif(nomRefs.ROC_MOTIFS)
            setLocalSubMotif(nomRefs.ROC_SOUS_MOTIFS)
            // setAvailableDep({
            //     types: Object.keys( nomRefs.ROC_TYPES ),
            //     status: Object.keys( nomRefs.ROC_STATUSES ),
            //     motif:  Object.keys( nomRefs.ROC_MOTIFS ),
            //     subMotif: Object.keys( nomRefs.ROC_SOUS_MOTIFS ),
            // })

        }
    }, [nomRefsIsSuccess]);
    //
    // useEffect(() => {
    //     console.log('availableDep > ', availableDep)
    // }, [availableDep]);

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
                  initialValues={{ ...criterias }}
                  mutators={{
                      ...arrayMutators,
                      setValue: ([field, value], state, utils) => {

                          utils.changeValue(state, field, (value) => {

                              // console.log('touched ', value)
                              let _value = value;
                              if(field?.modified?.birdDate && value == null) { _value.dateNaiss = null}

                                switch (field.active) {
                                    case 'nir':
                                        let cle = calcCleFromNir(value)
                                        _value.cle = cle || undefined
                                            setDisableCle(cle ? false : true)
                                    break

                                    case 'cle':
                                    break

                                    case 'finessJur':
                                        // if (value?.finessJur?.length < 8) console.log(value.finessJur, field)

                                    break

                                    case 'amc': //Object.keys(nomRefs.CLIENT)
                                        const amcObj = selectDeselectAllValues(value, nomRefs.CLIENT, field.active);
                                        _value.amc = amcObj ? amcObj[field.active] : value[field.active];
                                    break

                                    case 'domaine':
                                        const domainObj = selectDeselectAllValues(value, nomRefs.ROC_DOMAINS, field.active);
                                        _value.domaine = domainObj ? domainObj[field.active] : value[field.active];
                                    break

                                    case 'type': //Object.keys(nomRefs.ROC_TYPES)
                                        const typeObj = selectDeselectAllValues(value, nomRefs.ROC_TYPES, field.active);
                                        _value.type = typeObj ? typeObj[field.active] : value[field.active];

                                        if (_value.statut !== undefined) {
                                            _value = {..._value, statut: undefined}
                                        }
                                        if (_value.motif !== undefined) {
                                            _value = {..._value, motif: undefined}
                                        }
                                        if (_value.sousMotif !== undefined) {
                                            _value = {..._value, sousMotif: undefined}
                                        }
                                    break

                                    case 'statut': //Object.keys(nomRefs.ROC_STATUSES)
                                        const statutObj = selectDeselectAllValues(value, localStatus, field.active);
                                        _value.statut = statutObj ? statutObj[field.active] : value[field.active];

                                        if (_value.motif !== undefined) {
                                            _value = {..._value, motif: undefined}
                                        }
                                        if (_value.sousMotif !== undefined) {
                                            _value = {..._value, sousMotif: undefined}
                                        }
                                    break

                                    case 'motif':
                                        const motifObj = selectDeselectAllValues(value, localMotif, field.active);
                                        _value.motif = motifObj ? motifObj[field.active] : value[field.active];

                                        if (_value.sousMotif !== undefined) {
                                            _value = {..._value, sousMotif: undefined}
                                        }
                                    break

                                    case 'sousMotif':
                                        const sousMotifObj = selectDeselectAllValues(value, localSubMotif, field.active);
                                        _value.sousMotif = sousMotifObj ? sousMotifObj[field.active] : value[field.active];
                                    break


                                }


                              return _value

                          })
                      }
                  }}

                  render = {({ handleSubmit, form, submitting, pristine, values }) => (
                      formRef.current = form,
                          <form onSubmit={handleSubmit} >
                              <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
                                  <StyledCard sx={{ display: 'block', minWidth: 775 }} id="RocEnLigneSearchForm" variant="outlined">
                                      <CardHeader
                                          sx={{ bgcolor: '#f1f1f1', display: "flex",  }}
                                          title={<div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>


                                              {(nomRefs && nomRefs?.ROC_TYPES) && <Field name="type" format={value => value || []}>

                                                  {({input, meta}) => (
                                                      <FormControl className="RoundDate" style={{ flex: 2, marginRight: '20px' }}>
                                                          <InputLabel id="Type-label">Type de la demande</InputLabel>
                                                          <Select
                                                              id="Type"
                                                              labelId="Type-label"
                                                              multiple
                                                              sx={{'fieldset': {border: 'none'}}}
                                                              {...input}
                                                              input={<OutlinedInput className="RoundedEl" label="Type" sx={{minWidth: 200}}/>}
                                                              MenuProps={{autoFocus: false}}
                                                              renderValue={(selected) => {
                                                                  if (selected.length > 1) return `${selected.length} types sélectionnés`
                                                                  return nomRefs.ROC_TYPES[selected[0]];
                                                              }}>

                                                              <MenuItem value="all" key='selectAll'>
                                                                  <ListItemText
                                                                      primary={(values?.type?.length == Object.keys(nomRefs.ROC_TYPES).length) ?
                                                                          <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
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
                                                                  <TextField
                                                                      id="NumEng"
                                                                      variant={'standard'}
                                                                      sx={{width: '100%'}}
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      placeholder={'Nº d\'engagement'}
                                                                      InputProps={{  disableUnderline: true }}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                        </Field>

                                                      <Field name="numAdh" validate={validators.composeValidators(validators.maxValue(16))}>

                                                          {({ input, meta }) => (
                                                              <div style={{flex: 2}}>
                                                                  <TextField
                                                                      id="NumAdh"
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
                                                                  <Select
                                                                      id="Domaine"
                                                                      labelId="Domaine-label"
                                                                      multiple
                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Domaine" sx={{minWidth: 200}}/>}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} domaines sélectionnés`
                                                                          return nomRefs.ROC_DOMAINS[selected[0]];
                                                                      }}
                                                                      MenuProps={{autoFocus: false}}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.domaine?.length == Object.keys(nomRefs.ROC_DOMAINS).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
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
                                                              // <div className={"RoundDate"}>
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DateTimePicker
                                                                      label={'Réceptionné du'}
                                                                      ampm={false}
                                                                      inputFormat="dd/MM/yyyy hh:mm"
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa hh:mm"}}} />}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="receptionDateEnd" validate={ validators.composeValidators(validators.beforeThan(values, 'receptionDateStart')) }>
                                                          {({ input, meta }) => (
                                                              // <div className={"RoundDate"}>
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DateTimePicker
                                                                      label={'au '}
                                                                      ampm={true}
                                                                      inputFormat="dd/MM/yyyy hh:mm"
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa hh:mm"}}} />}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="idPerFact" validate={validators.composeValidators(validators.minValue(22))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" sx={{ flex: '1 0 22%', label: {marginTop: '15px!important'}, maxWidth: '25%' }}>
                                                                  <MaskedInput
                                                                      id="IdPerFact"
                                                                      autoFocus
                                                                      fullWidth
                                                                      // mask={"0000000000000000000000 / 00"}
                                                                      mask={"********************** / 00"}
                                                                      placeholder={"********************** / 00"}
                                                                      color="primary"
                                                                      label={'ID période de facturation / Nº d\'occurrence'}
                                                                      {...input}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>


                                                      {(nomRefs && localStatus) && <Field name="statut" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '25%' }}>
                                                                  <InputLabel id="Statut-label">Statut</InputLabel>
                                                                  <Select
                                                                      id="Statut"
                                                                      labelId="Statut-label"
                                                                      multiple
                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Statut" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} statuts sélectionnés`
                                                                          return localStatus[selected[0]];
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.statut?.length == Object.keys(localStatus).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>

                                                                      {Object.keys(localStatus).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {localStatus[code]}
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
                                                                  <Select
                                                                      id="Motif"
                                                                      labelId="Motif-label"
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
                                                                          <ListItemText primary={(values?.motif?.length == Object.keys(nomRefs.ROC_MOTIFS).length) ?
                                                                              <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>

                                                                      {Object.keys(localMotif).map(code => (<MenuItem key={code} value={code}>
                                                                          {localMotif[code]}
                                                                      </MenuItem>))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      {nomRefs && <Field name="sousMotif" format={value => value || []}>

                                                          {({input, meta}) => (

                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24%' }}>
                                                                  <InputLabel id="SubMotif-label">Sous-motif de rejet</InputLabel>
                                                                  <Select
                                                                      id="SubMotif"
                                                                      labelId="SubMotif-label"
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
                                                                          return localSubMotif[selected[0]];
                                                                      }}>

                                                                      {localSubMotif && <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.motif?.length == Object.keys(localSubMotif).length) ?
                                                                                  <b>Désélectionner tout</b> :
                                                                                  <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>}

                                                                      {localSubMotif && Object.keys(localSubMotif).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {localSubMotif[code]}
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
                                                                  <TextField
                                                                      id="FINESSgeographique"
                                                                      label={'FINESS géographique'}
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
                                                                  <TextField
                                                                      id="FINESSJuridique"
                                                                      label={'FINESS juridique'}
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
                                                                  <TextField
                                                                      id="RaisonSociale"
                                                                      label={'Raison sociale'}
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
                                                                  <TextField
                                                                      id="Department"
                                                                      type={"number"}
                                                                      label={'Nº département'}
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
                                                                  <InputLabel id="NumClient-label">AMC</InputLabel>
                                                                  <Select
                                                                      id="NumClient"
                                                                      labelId="NumClient-label"
                                                                      multiple
                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="NumClient" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} AMC sélectionnées`
                                                                          return `(${selected[0]}) ${nomRefs.CLIENT[selected[0]]}`;
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.amc?.length == Object.keys(nomRefs.CLIENT).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>

                                                                      {Object.keys(nomRefs.CLIENT).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {`(${code}) ${nomRefs.CLIENT[code]}`}
                                                                          </MenuItem>
                                                                      ))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      <Field name="nom" validate={validators.composeValidators(
                                                          validators.maxValue(51),
                                                      )}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
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
                                                          validators.maxValue(51),
                                                          validators.associated(values, ['amc', 'nom', 'dateNaiss', 'numAdh'], 'Prénom')
                                                      )}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="Prenom"
                                                                      label={'Prénom'}
                                                                      variant="outlined"
                                                                      {...input}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateNaiss" >
                                                          {({ input: {onChange, value, ...rest}, meta }) => (
                                                              <div className={"RoundDate"} style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker

                                                                      error={false}
                                                                      sx={{borderRadius: '20px', flex: 2}}
                                                                      onChange={(newDate) => {
                                                                          if (isValidDate(newDate) || form.getFieldState('birdDate').value == null) {
                                                                              form.getFieldState('birdDate').change(newDate)
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
                                                                                  }}/>

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
                                                          // disabled={!allowSearch(values)}
                                                          className="RoundedEl">
                                                      <SearchIcon/>Rechercher
                                                  </Button>

                                              </div>
                                          </CardActions>
                                      </Collapse>
                                  </StyledCard>
                                  {<FormSpy onChange={(values) => {
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

                                      form.mutators.setValue(values)

                                      /**
                                       * TODO MUST BE FIXED
                                       * ****************************************************************
                                       */
                                      if (type){
                                          // console.log('choosen types ', type)
                                          // setAvailableDep({
                                          //     types: (type?.length > 0)? type : Object.keys( nomRefs.ROC_STATUSES ),
                                          //     status: getStatusFromTypes({type, nomRefs}), // Object.keys( nomRefs.ROC_STATUSES ),
                                          //     motif: getMotifsFromTypes({type, nomRefs}), // Object.keys( nomRefs.ROC_MOTIFS ),
                                          //     subMotif: getSubMotifsFromMotif({motif: getMotifsFromTypes({type, nomRefs}), nomRefs}) // Object.keys( nomRefs.ROC_SOUS_MOTIFS ),
                                          // })

                                          let statusFromTypes = getStatusFromTypes({nomRefs, type})
                                          let tmpStatut = {}
                                          Object.keys(nomRefs.ROC_STATUSES).forEach( stat => {
                                              if (statusFromTypes.includes(stat)) {
                                                  tmpStatut[stat] = nomRefs.ROC_STATUSES[stat]
                                              }
                                          })
                                          if (Object.keys(tmpStatut).length == 0 ) tmpStatut = nomRefs.ROC_STATUSES
                                          setLocalStatus(tmpStatut)

                                          let motifsFromTypes = getMotifsFromTypes({type, nomRefs})
                                          let tmpMotif = {}
                                          Object.keys(nomRefs.ROC_MOTIFS).forEach( stat => {
                                              if (motifsFromTypes.includes(stat)) {
                                                  tmpMotif[stat] = nomRefs.ROC_MOTIFS[stat]
                                              }
                                          })
                                          if (Object.keys(tmpMotif).length == 0 ) tmpMotif = nomRefs.ROC_MOTIFS
                                          setLocalMotif(tmpMotif)

                                          let tmpSubMotif = {}
                                          getSubMotifsFromMotif({motif: motifsFromTypes, nomRefs})
                                              .forEach(subCode => {
                                                  // console.log(nomRefs.ROC_SOUS_MOTIFS[subCode])
                                                  tmpSubMotif[subCode] = nomRefs.ROC_SOUS_MOTIFS[subCode]
                                              })
                                          if (Object.keys(tmpMotif).length == 0 ) tmpSubMotif = nomRefs.ROC_SOUS_MOTIFS
                                          setLocalSubMotif(tmpSubMotif)

                                      }

                                      if (statut) {
                                          // console.log('choosen statuses ', statut)
                                          // setAvailableDep({
                                          //     types: availableDep.types,
                                          //     status: (statut?.length > 0)? statut:  getStatusFromTypes({types: availableDep.types, nomRefs}),
                                          //     motif: (statut?.length > 0)? getMotifsFromTypes({
                                          //         type: getAvailableTypesFromStatuses({statut, nomRefs}),
                                          //         nomRefs}): Object.keys( nomRefs.ROC_MOTIFS ),
                                          //     subMotif: getSubMotifsFromMotif({motif: getMotifsFromTypes({type, nomRefs}), nomRefs}) // Object.keys( nomRefs.ROC_SOUS_MOTIFS ),
                                          // })

                                          // let tmpMotifs = reshapeMotifFromStatus({statut, nomRefs});
                                          // getAvailableTypesFromStatuses({nomRefs, statut})
                                          // console.log('tmpMotifs > ', tmpMotifs)

                                          let motifsFromTypes = getMotifsFromTypes({type, nomRefs})
                                          let tmpMotif = {}

                                          if (statut?.length > 0) {
                                              getMotifsFromTypes({ type: getAvailableTypesFromStatuses({ statut,  nomRefs }), nomRefs })
                                                  .forEach(code => tmpMotif[code] = nomRefs.ROC_MOTIFS[code])
                                          } else getMotifsFromTypes({type, nomRefs}).forEach(code => tmpMotif[code] = nomRefs.ROC_MOTIFS[code])

                                          if (Object.keys(tmpMotif).length == 0 ) tmpMotif = nomRefs.ROC_MOTIFS
                                          setLocalMotif(tmpMotif)

                                          let tmpSubMotif = {}
                                          getSubMotifsFromMotif({motif: motifsFromTypes, nomRefs})
                                              .forEach(subCode => {
                                                  tmpSubMotif[subCode] = nomRefs.ROC_SOUS_MOTIFS[subCode]
                                              })
                                          if (Object.keys(tmpMotif).length == 0 ) tmpSubMotif = nomRefs.ROC_SOUS_MOTIFS
                                          setLocalSubMotif(tmpSubMotif)

                                          // setLocalMotif(nomRefs.ROC_MOTIFS);

                                      }
                                      if (motif) {

                                              // setLocalSubMotif( getSubMotifsFromMotif({motif, nomRefs}) )
                                          let tmpSubMotif = {}
                                          getSubMotifsFromMotif({motif, nomRefs})
                                              .forEach(subCode => {
                                                  tmpSubMotif[subCode] = nomRefs.ROC_SOUS_MOTIFS[subCode]
                                              })
                                          if (Object.keys(tmpSubMotif).length == 0 ) tmpSubMotif = nomRefs.ROC_SOUS_MOTIFS
                                          setLocalSubMotif(tmpSubMotif)
                                      }

                                      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

                                      if(
                                          domaine || dateAdmission || receptionDateStart || receptionDateEnd || idPerFact || dateFact || statut ||
                                          motif || finessGeo || finessJur || raisonSociale || dеpartement || amc || nom || prenom || dateNaiss ||
                                          birdDate || nir || cle
                                      ) {
                                          setDotShow(true)
                                      } else {
                                          setDotShow(false)
                                      }

                                  }}/>}

                              </LocalizationProvider></form>)}/>
        </div>
    );
}




