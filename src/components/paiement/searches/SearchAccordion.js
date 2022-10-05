import React, {useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Collapse,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    InputLabel,
    InputAdornment,
    IconButton,
    Typography,
    TextField
}  from "@mui/material";
import { FormSpy, Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {ListItemText} from "@material-ui/core";

import { fr } from "date-fns/locale";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { isValidDate } from '../../../utils/convertor-utils';
import { validators, calcCleFromNir, selectDeselectAllValues, allowSearch } from '../../../utils/validator-utils';
import { checkInsidePanels } from '../utils/utils'
import { setCriterias, initCriterias, selectCriterias } from '../paiementSlice'
import { useGetRefsQuery } from "../../../services/refsApi";
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

                                    case 'numEnv': //Object.keys(nomRefs.ENVIRONMENT)
                                        const numEnvObj = selectDeselectAllValues(value, nomRefs.ENVIRONMENT, field.active);
                                        _value.numEnv = numEnvObj ? numEnvObj[field.active] : value[field.active];
                                    break

                                    case 'status': //Object.keys(nomRefs.PAIEMENT_STATUS)
                                        const statusObj = selectDeselectAllValues(value, nomRefs.PAIEMENT_STATUS, field.active);
                                        _value.status = statusObj ? statusObj[field.active] : value[field.active];
                                    break

                                    case 'groupDisciplines': // nomRefs?.DISCIPLINE_GROUP
                                        const groupDisciplinesObj = selectDeselectAllValues(value, nomRefs.DISCIPLINE_GROUP, field.active);
                                        _value.groupDisciplines = groupDisciplinesObj ? groupDisciplinesObj[field.active] : value[field.active];
                                    break

                                    case 'disciplines': // nomRefs?.DISCIPLINE
                                        const disciplinesObj = selectDeselectAllValues(value, nomRefs.DISCIPLINE, field.active);
                                        _value.disciplines = disciplinesObj ? disciplinesObj[field.active] : value[field.active];
                                    break

                                    case 'provenance': // nomRefs?.PROVENANCE
                                        const provenanceObj = selectDeselectAllValues(value, nomRefs.PROVENANCE, field.active);
                                        _value.provenance = provenanceObj ? provenanceObj[field.active] : value[field.active];
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
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>

                                                      <Field name="numIdPs" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <div style={{flex: 2, marginRight: '20px'}}>
                                                                  <TextField
                                                                      id="NumEng"
                                                                      variant={'standard'}
                                                                      sx={{width: '100%'}}
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      onBlur={(e)=> {
                                                                          if (e.target.value.length == 8) form.getFieldState('numIdPs').change('0' + e.target.value)
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

                                                      <Field name="numAdhInd" validate={validators.composeValidators(validators.maxValue(16))}>

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

                                                      <Field name="dateDebutSoin" validate={validators.composeValidators(validators.noFutureDate())} >
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

                                                      <Field name="dateDebutSoinFin" validate={validators.composeValidators(validators.noFutureDate(), validators.beforeThan(values, 'dateDebutSoin'))} >
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
                                                                          if (e.target.value.length == 8) form.getFieldState('numeroPsJuridique').change('0' + e.target.value)
                                                                          return input.onBlur(e)
                                                                      }}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>


                                                      <Field name="complNumTitre" validate={validators.composeValidators(validators.minValue(15), validators.maxValue(16))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="ComplNumTitre"
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
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>


                                                      <Field name="dateDebutHospitalisation" validate={validators.composeValidators(validators.noFutureDate())} >
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

                                                      <Field name="dateDebutHospitalisationFin" validate={validators.composeValidators(validators.noFutureDate(), validators.beforeThan(values, 'dateDebutHospitalisation'))} >
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

                                                      {(nomRefs && nomRefs?.PAIEMENT_STATUS) && <Field name="status" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24.5%'}}>
                                                                  <InputLabel id="Statut-label">Statut du paiement</InputLabel>
                                                                  <Select
                                                                      id="Statut"
                                                                      labelId="Statut-label"
                                                                      multiple

                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Statut" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} statuts sélectionnés`
                                                                          return nomRefs.PAIEMENT_STATUS[selected[0]];
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.status?.length == Object.keys(nomRefs.PAIEMENT_STATUS).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>

                                                                      {Object.keys(nomRefs.PAIEMENT_STATUS).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {nomRefs.PAIEMENT_STATUS[code]}
                                                                          </MenuItem>
                                                                      ))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

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
                                                                              onKeyDown: (е) => ["e", "E", "+", "-"].includes(е.key) && е.preventDefault()
                                                                          },
                                                                          InputProps: { ...input.InputProps, endAdornment: <InputAdornment position="end"><b>€</b></InputAdornment>}
                                                                      }}
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

                                                      <Field name="dateFacture" validate={validators.composeValidators(validators.noFutureDate())} >
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

                                                      <Field name="dateFactureFin" validate={validators.composeValidators(validators.noFutureDate(), validators.beforeThan(values, 'dateFacture'))} >
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

                                                      <Field name="receivedDate" validate={validators.composeValidators(validators.noFutureDate())} >
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

                                                      <Field name="receivedDateFin" validate={validators.composeValidators(validators.noFutureDate(), validators.beforeThan(values, 'receivedDate'))} >
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

                                                      <Field name="creationDate" validate={validators.composeValidators(validators.noFutureDate())} >
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

                                                      <Field name="creationDateFin" validate={validators.composeValidators(validators.noFutureDate(), validators.beforeThan(values, 'creationDate'))} >
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


                                                      <Field name="factureRc" validate={validators.composeValidators(validators.notBiggerThan(10000000))} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="FactureRc"
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
                                                                              onKeyDown: (е) => ["e", "E", "+", "-"].includes(е.key) && е.preventDefault()
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

                                                      {(nomRefs && nomRefs?.ENVIRONMENT) && <Field name="numEnv" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24.5%'}}>
                                                                  <InputLabel id="Enviroment-label">Environnement</InputLabel>
                                                                  <Select
                                                                      id="NumEnv"
                                                                      labelId="Enviroment-label"
                                                                      multiple

                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Enviroment" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} environnements sélectionnés`
                                                                          return nomRefs.ENVIRONMENT[selected[0]];
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.numEnv?.length == Object.keys(nomRefs.ENVIRONMENT).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>

                                                                      {Object.keys(nomRefs.ENVIRONMENT).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {nomRefs.ENVIRONMENT[code]}
                                                                          </MenuItem>
                                                                      ))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      {(nomRefs && nomRefs?.PROVENANCE) && <Field name="provenance" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24.5%'}}>
                                                                  <InputLabel id="Provenance-label">Provenance</InputLabel>
                                                                  <Select
                                                                      id="Provanance"
                                                                      labelId="Provanance-label"
                                                                      multiple

                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Provenance" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} provenances sélectionnées`
                                                                          return `(${selected[0]}) ${nomRefs.PROVENANCE[selected[0]]}`;
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.numClient?.length == Object.keys(nomRefs.PROVENANCE).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>

                                                                      {Object.keys(nomRefs.PROVENANCE).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {`(${code}) ${nomRefs.PROVENANCE[code]}`}
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
                                                          validators.associated(values, ['prenom', 'dateDeNaissance'], 'Nom')
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
                                                          validators.associated(values, ['nom', 'dateDeNaissance'], 'Prénom')
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

                                                      <Field name="dateDeNaissance" validate={validators.composeValidators(validators.associated(values, ['nom', 'prenom'], 'Date de naissance'))}>
                                                          {({ input: {onChange, value, ...rest}, meta }) => (
                                                              <div className={"RoundDate"} style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24.5%'}}>
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
                                                          disabled={!allowSearch(values)}
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

                              </LocalizationProvider></form>)}/>
        </div>
    );
}
