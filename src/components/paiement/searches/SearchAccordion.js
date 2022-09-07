import React, {useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import {Card, CardActions, CardContent, Typography, Button, TextField}  from "@mui/material";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import FormControl from '@mui/material/FormControl';
import { FormSpy, Form, Field, FieldProps, FieldRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import Collapse from '@mui/material/Collapse';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import {ListItemText} from "@material-ui/core";

import { fr } from "date-fns/locale";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import {
    validators,
    isValidDate,
    calcCleFromNir
} from '../../../utils/utils';
import { checker, checkInsidePanels } from '../utils/utils'



import {
    setCriterias,
    initCriterias,
    selectCriterias,
} from '../paiementSlice'

import './searchAccordion.scss'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import InputAdornment from '@mui/material/InputAdornment';
import {useGetRefsQuery} from "../../../services/refsApi";
import {IMaskPhoneInput, TextMaskCustom} from "../components/TextMaskCustom";
import {ConfirmNir} from "../components/ConfirmNir";
import PaiementDetailsById from "../PaiementDetailsById";
import {useGetDisciplinesQuery} from "../../../services/referentielApi";


const Accordion = styled( (props) => ( <MuiAccordion disableGutters elevation={0} square {...props} /> ) )
(({ theme }) => ({
    border: `none`,
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => ( <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />))
(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({ border: 'none' }));

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

    console.log('nomRefs > ', nomRefs)

    const onSubmit = async (values) => {

        await sleep(300);
        dispatch(setCriterias(values));
    };

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

    return (
        <div className={'formContent'}>
            <Form onSubmit={onSubmit}
                  initialValues={{ ...criterias }}
                  mutators={{
                      ...arrayMutators,
                      setValue: ([field, value], state, utils) => {

                          utils.changeValue(state, field, (value) => {
                              let _value = value;
                              if(field?.modified?.birdDate && value == null) { _value.dateDeNaissance = null}

                              //Object.keys(nomRefs.FACTURE_ERROR)
                              // if (_value?.errorCode?.length === 0 ||
                              //     (_value?.errorCode?.includes('all') && _value?.errorCode?.length > Object.keys(nomRefs?.FACTURE_ERROR).length)
                              // ) _value = {..._value, errorCode: undefined}
                              // if (_value?.errorCode?.includes('all')) _value = {..._value, errorCode: Object.keys(nomRefs?.FACTURE_ERROR)}

                                switch (field.active) {
                                    case 'nir':
                                        let cle = calcCleFromNir(value)
                                        _value.cle = cle || undefined
                                        setDisableCle(cle ? false : true)
                                    break

                                    case 'cle':
                                    break

                                    case 'numJur':
                                        if (value?.numJur?.length < 8) console.log(value.numJur, field)
                                    break

                                    case 'numEnv':
                                        //Object.keys(nomRefs.CLIENT)
                                        if (_value?.numEnv?.length === 0 ||
                                            (_value?.numEnv?.includes('all') && _value?.numEnv?.length > Object.keys(nomRefs?.CLIENT).length)
                                        ) _value = {..._value, numEnv: undefined}
                                        if (_value?.numEnv?.includes('all')) _value = {..._value, numEnv: Object.keys(nomRefs?.CLIENT)}
                                    break

                                    case 'status':
                                        //Object.keys(nomRefs.STATUS_PAIAE)
                                        if (_value?.status?.length === 0 ||
                                            (_value?.status?.includes('all') && _value?.status?.length > Object.keys(nomRefs?.STATUS_PAIAE).length)
                                        ) _value = {..._value, status: undefined}
                                        if (_value?.status?.includes('all')) _value = {..._value, status: Object.keys(nomRefs?.STATUS_PAIAE)}
                                    break

                                    case 'grоupDisciplines': // nomRefs?.DISCIPLINE_GROUP
                                        if (_value?.grоupDisciplines?.length === 0 ||
                                            (_value?.grоupDisciplines?.includes('all') && _value?.grоupDisciplines?.length > Object.keys(nomRefs?.DISCIPLINE_GROUP).length)
                                        ) _value = {..._value, grоupDisciplines: undefined}
                                        if (_value?.grоupDisciplines?.includes('all')) _value = {..._value, grоupDisciplines: Object.keys(nomRefs?.DISCIPLINE_GROUP)}
                                    break

                                    case 'disciplines': // nomRefs?.DISCIPLINE
                                        if (_value?.disciplines?.length === 0 ||
                                            (_value?.disciplines?.includes('all') && _value?.disciplines?.length > Object.keys(nomRefs?.DISCIPLINE).length)
                                        ) _value = {..._value, disciplines: undefined}
                                        if (_value?.disciplines?.includes('all')) _value = {..._value, disciplines: Object.keys(nomRefs?.DISCIPLINE)}
                                    break

                                    case 'provenance': // nomRefs?.PROVENANCE
                                        if (_value?.provenance?.length === 0 ||
                                            (_value?.provenance?.includes('all') && _value?.provenance?.length > Object.keys(nomRefs?.PROVENANCE).length)
                                        ) _value = {..._value, provenance: undefined}
                                        if (_value?.provenance?.includes('all')) _value = {..._value, provenance: Object.keys(nomRefs?.PROVENANCE)}
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
                                  <StyledCard sx={{ display: 'block', minWidth: 775 }} id="PaiementSearchForm" variant="outlined">
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
                                                                      {...{
                                                                          ...input,
                                                                          inputProps: {
                                                                              ...input.inputProps,
                                                                              // step : 0.01,
                                                                              lang: 'fr'
                                                                          }
                                                                      }}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>

                                                      <Field name="numIdPs" validate={validators.composeValidators(validators.maxValue(14))}>
                                                          {({ input, meta }) => (
                                                              <div style={{flex: 2, marginRight: '20px'}}>
                                                                  <TextField
                                                                      id="NumEng"
                                                                      variant={'standard'}
                                                                      sx={{width: '100%'}}
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      placeholder={'Nº de facturation PS'}
                                                                      InputProps={{  disableUnderline: true }}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>

                                                      <Field name="numAdhInd">

                                                          {({ input, meta }) => (
                                                              <div style={{flex: 2}}>
                                                                  <TextField
                                                                      id="numAdhInd"
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
                                                          disabled={!checker(values)} >
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

                                                      <Field name="dateDebutSoin">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de soins du '}
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

                                                      <Field name="dateDebutSoinFin">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de soins au'}
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

                                                      {nomRefs && nomRefs?.DISCIPLINE_GROUP && <Field name="grоupDisciplines" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl  style={{ flex: '1 0 21%', margin: '15px 5px'}} className="RoundedEl">
                                                                  <InputLabel id="GroupDisciplines-label">Groupe discipline</InputLabel>
                                                                  <Select
                                                                      id="GroupDisciplines"
                                                                      labelId="GroupDisciplines-label"
                                                                      multiple

                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Group Disciplines" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) {
                                                                              return `${selected.length} disciplines sélectionnéеs`
                                                                          }
                                                                          return nomRefs.DISCIPLINE_GROUP[selected.toString()] || '';
                                                                      }}
                                                                  >

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.grоupDisciplines?.length == Object.keys(nomRefs?.DISCIPLINE_GROUP).length) ? <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>
                                                                      {Object.keys(nomRefs.DISCIPLINE_GROUP).map(key => (
                                                                          <MenuItem key={key} value={key}>
                                                                              {nomRefs.DISCIPLINE_GROUP[key]}
                                                                          </MenuItem>
                                                                      ))}
                                                                  </Select></FormControl>
                                                          )}
                                                      </Field>}

                                                      {nomRefs && nomRefs?.DISCIPLINE && <Field name="disciplines" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl  style={{ flex: '1 0 21%', margin: '15px 5px'}} className="RoundedEl">
                                                                  <InputLabel id="Disciplines-label">Discipline</InputLabel>
                                                                  <Select
                                                                      id="Disciplines"
                                                                      labelId="Disciplines-label"
                                                                      multiple

                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Disciplines" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) {
                                                                              return `${selected.length} disciplines sélectionnéеs`
                                                                          }
                                                                          return nomRefs.DISCIPLINE[selected.toString()] || '';
                                                                      }}
                                                                  >

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.disciplines?.length == Object.keys(nomRefs?.DISCIPLINE).length) ? <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>
                                                                      {Object.keys(nomRefs.DISCIPLINE).map(key => (
                                                                          <MenuItem key={key} value={key}>
                                                                              {nomRefs.DISCIPLINE[key]}
                                                                          </MenuItem>
                                                                      ))}
                                                                  </Select></FormControl>
                                                          )}
                                                      </Field>}

                                                      <Field name="numeroPsJuridique" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="NumeroPsJuridique"
                                                                      label={'Nº FINESS juridique'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      onBlur={(e)=> {
                                                                          if (e.target.value.length == 8) form.getFieldState('numJur').change('0' + e.target.value)
                                                                          return input.onBlur(e)
                                                                      }}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>


                                                      <Field name="complNumTitre" validate={validators.composeValidators(validators.minValue(3), validators.maxValue(51))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="ComplNumTitre"
                                                                      label={'Nº titre'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>


                                                      <Field name="dateDebutHospitalisation">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date d\'hospitalisation du '}
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

                                                      <Field name="dateDebutHospitalisationFin">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date d\'hospitalisation au'}
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

                                                  </AccordionDetails>
                                              </Accordion>

                                              <Accordion expanded={expanded.panelInformationsDuPaiement} onChange={handleChange('panelInformationsDuPaiement')}>
                                                  <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                                      <Typography style={{marginLeft: '5px'}}><b>Informations du paiement</b></Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                                                      {(nomRefs && nomRefs?.STATUS_PAIAE) && <Field name="status" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <InputLabel id="Statut-label">Statut du paiement</InputLabel>
                                                                  <Select
                                                                      id="Statut"
                                                                      labelId="Statut-label"
                                                                      multiple

                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Statut" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} Statuses sélectionnéеs`
                                                                          return nomRefs.STATUS_PAIAE[selected[0]];
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.status?.length == Object.keys(nomRefs.STATUS_PAIAE).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>

                                                                      {Object.keys(nomRefs.STATUS_PAIAE).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {nomRefs.STATUS_PAIAE[code]}
                                                                          </MenuItem>
                                                                      ))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      <Field name="totalRc" validate={validators.composeValidators(validators.minValue(3), validators.maxValue(51))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="TotalRc"
                                                                      label={'Montant RC du paiement'}
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

                                              <Accordion expanded={expanded.panelInformationsDeLaFacture} onChange={handleChange('panelInformationsDeLaFacture')}>
                                                  <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                                      <Typography style={{marginLeft: '5px'}}><b>Informations de la facture</b></Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>

                                                      <Field name="dateFacture">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de la facture du '}
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

                                                      <Field name="dateFactureFin">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de la facture au'}
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

                                                      <Field name="receivedDate">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de reception du '}
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

                                                      <Field name="receivedDateFin">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de reception au'}
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

                                                      <Field name="creationDate">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de traitement de la facture du '}
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

                                                      <Field name="creationDateFin">
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date de traitement de la facture au'}
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


                                                      <Field name="factureRc" validate={validators.composeValidators(validators.minValue(3), validators.maxValue(51))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="FactureRc"
                                                                      label={'Montant RC de la facture'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
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

                                                      {(nomRefs && nomRefs?.CLIENT) && <Field name="numEnv" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <InputLabel id="Enviroment-label">Enviroment</InputLabel>
                                                                  <Select
                                                                      id="NumEnv"
                                                                      labelId="Enviroment-label"
                                                                      multiple

                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Enviroment" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} Enviroment sélectionnés`
                                                                          return nomRefs.CLIENT[selected[0]];
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.numEnv?.length == Object.keys(nomRefs.CLIENT).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>

                                                                      {Object.keys(nomRefs.CLIENT).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {nomRefs.CLIENT[code]}
                                                                          </MenuItem>
                                                                      ))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      {(nomRefs && nomRefs?.CLIENT) && <Field name="provenance" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <InputLabel id="Provanance-label">Provanance</InputLabel>
                                                                  <Select
                                                                      id="Provanance"
                                                                      labelId="Provanance-label"
                                                                      multiple

                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Provanance" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} Provanance sélectionnés`
                                                                          return nomRefs.PROVENANCE[selected[0]];
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.numClient?.length == Object.keys(nomRefs.PROVENANCE).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>

                                                                      {Object.keys(nomRefs.PROVENANCE).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {nomRefs.PROVENANCE[code]}
                                                                          </MenuItem>
                                                                      ))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

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
                                                          validators.associated(values, {prenom: 'Prénom', dateDeNaissance: 'Date de naissance'})
                                                      )}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="Nom"
                                                                      label={'Nom'}
                                                                      variant="outlined"
                                                                      // error={meta.invalid}
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
                                                          validators.associated(values, {nom: 'Nom', dateDeNaissance: 'Date de naissance'})
                                                      )}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
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

                                                      <Field name="dateDeNaissance">
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
                                                      <Typography style={{marginLeft: '5px'}}><b>Recherche par NIR</b></Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'start'}}>

                                                      <Field name="nir" validate={validators.composeValidators(validators.minValue(13),validators.maxValue(14))}>
                                                          {({ input, meta }) => {

                                                              return (
                                                                  <FormControl className="RoundedEl" style={{
                                                                      flex: '1 0 21%',
                                                                      margin: '15px 5px',
                                                                      maxWidth: '200px',
                                                                      minWidth: '175px',
                                                                  }}>
                                                                      <TextField
                                                                          id="Nir"
                                                                          label={'NIR'}
                                                                          variant="outlined"
                                                                          {...input}
                                                                          error={meta.invalid}
                                                                          className="RoundedEl"
                                                                          onChange={(e) => {

                                                                              return input.onChange(e)
                                                                          }}
                                                                      />
                                                                      {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                                  </FormControl>
                                                              )
                                                          }}
                                                      </Field>

                                                      <Field name="cle" validate={validators.composeValidators(validators.mustBeNumber, validators.minValue(2), validators.maxValue(3))}>
                                                          {({ input, meta }) => {
                                                              return (
                                                                  <FormControl className="RoundedEl" style={{
                                                                      flex: '1 0 21%',
                                                                      margin: '15px 5px',
                                                                      maxWidth: '100px'
                                                                  }}>
                                                                      <TextField
                                                                          id="Cle"
                                                                          label={'Clé'}
                                                                          type={"number"}
                                                                          disabled={disableCle}
                                                                          variant="outlined"
                                                                          // error={meta.invalid}
                                                                          className="RoundedEl"

                                                                          {...input}

                                                                      />
                                                                      {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                                  </FormControl>
                                                              )
                                                          }}
                                                      </Field>

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
                                                      disabled={!checker(values)}
                                                      style={{marginRight: '15px'}}
                                                  >
                                                      Effacer
                                                  </Button>
                                                  <Button variant="contained"
                                                          type="submit" size="medium"
                                                          disabled={!checker(values)}
                                                          className="RoundedEl">
                                                      <SearchIcon/>Rechercher
                                                  </Button>

                                              </div>
                                          </CardActions>
                                      </Collapse>
                                  </StyledCard>
                                  {<FormSpy onChange={(values) => {
                                      form.mutators.setValue(values)
                                      const {
                                          numeroFacture,
                                          numIdPs,
                                          numAdhInd,
                                          dateDebutSoin,
                                          dateDebutSoinFin,
                                          grоupDisciplines,
                                          disciplines,
                                          numeroPsJuridique,
                                          complNumTitre,
                                          dateDebutHospitalisation,
                                          dateDebutHospitalisationFin,
                                          status,
                                          totalRc,
                                          dateFacture,
                                          dateFactureFin,
                                          receivedDate,
                                          receivedDateFin,
                                          creationDate,
                                          creationDateFin,
                                          factureRc,
                                          numEnv,
                                          provenance,
                                          nom,
                                          prenom,
                                          dateDeNaissance,
                                          birdDate,
                                          nir,
                                          cle
                                      } = values?.values;

                                      if(
                                          dateDebutSoin || dateDebutSoinFin || grоupDisciplines || disciplines || numeroPsJuridique || complNumTitre || dateDebutHospitalisation ||
                                          dateDebutHospitalisationFin || status || totalRc || dateFacture || dateFactureFin || receivedDate || receivedDateFin || creationDate ||
                                          creationDateFin || factureRc || numEnv || provenance || nom || prenom || dateDeNaissance || birdDate || nir || cle
                                      ) {
                                          setDotShow(true)
                                      } else {
                                          setDotShow(false)
                                      }
                                  }}/>}

                                  <ConfirmNir agreed={()=> {
                                      setOpenNIRDialog(false);
                                      setExpanded({...expanded, ['panelNIR']: true});
                                  }} disagreed={()=>setOpenNIRDialog(false)} opened={openNIRDialog}/>

                              </LocalizationProvider></form>)}/>
        </div>
    );
}




