import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import {Card, CardActions, CardContent, Typography, Button, TextField}  from "@mui/material";
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
import InputAdornment from '@mui/material/InputAdornment';
import { useGetRefsQuery } from "../../../services/refsApi";
import { MaskedInput } from "../../../utils/TextMaskCustom";
import {isValidDate} from '../../../utils/convertor-utils';
import {validators, calcCleFromNir} from '../../../utils/validator-utils';
import {usePrevious} from '../../../utils/status-utils';
import {checker, checkInsidePanels, reshapeMotifVsStatus} from '../utils/utils';
import { setCriterias, initCriterias, selectCriterias } from '../facturesSlice'
import { ConfirmNir } from "../../../utils/ConfirmNir";
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
    const [expanded, setExpanded] = useState({
        panelInformationGenerales: true,
        panelInformationsEstablishement: true,
        panelInformationsBeneficiaires: true,
        panelNIR: true,
    });
    const [openNIRDialog, setOpenNIRDialog] = useState(false);
    const [dotShow, setDotShow] = useState(false);
    const [disableCle, setDisableCle] = useState(true);
    const [motif, setMotif] = useState({});
    const [panelExpanded, setPanelExpanded] = useState(false);
    const prevMotif = usePrevious(motif)

    useEffect(() => {
        // console.log('motif: ', motif)
    }, [motif]);

    const handleChange = (panel) => (event, newExpanded) => {
        if (panel == 'panelNIR' && !expanded.panelNIR) {
            setOpenNIRDialog(true);
        } else {
            setExpanded({...expanded, [panel]: newExpanded});
        }
    };

    const onSubmit = async (values) => {

        await sleep(300);
        dispatch(setCriterias(values));
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

                                    case 'numClient':
                                        //Object.keys(nomRefs.CLIENT)
                                        if (_value?.numClient?.length === 0 ||
                                            (_value?.numClient?.includes('all') && _value?.numClient?.length > Object.keys(nomRefs?.CLIENT).length)
                                        ) _value = {..._value, numClient: undefined}
                                        if (_value?.numClient?.includes('all')) _value = {..._value, numClient: Object.keys(nomRefs?.CLIENT)}
                                    break

                                    case 'errorCode':
                                        //Object.keys(nomRefs.FACTURE_ERROR) actualy from state -> motif
                                        if (_value?.errorCode?.length === 0 ||
                                            (_value?.errorCode?.includes('all') && _value?.errorCode?.length > Object.keys(motif).length)
                                        ) _value = {..._value, errorCode: undefined}
                                        if (_value?.errorCode?.includes('all')) _value = {..._value, errorCode: Object.keys(motif)}
                                    break

                                    case 'status':
                                        //Object.keys(nomRefs.FACTURE_STATUS)
                                        if (_value?.status?.length === 0 ||
                                            (_value?.status?.includes('all') && _value?.status?.length > Object.keys(nomRefs?.FACTURE_STATUS).length)
                                        ) _value = {..._value, status: undefined}
                                        if (_value?.status?.includes('all')) _value = {..._value, status: Object.keys(nomRefs?.FACTURE_STATUS)}
                                        if (_value.errorCode !== undefined) {
                                            _value = {..._value, errorCode: undefined}
                                        }

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
                                  <StyledCard sx={{ display: 'block', minWidth: 775 }} id="FacturesSearchForm" variant="outlined">
                                      <CardHeader
                                          sx={{ bgcolor: '#f1f1f1', display: "flex",  }}
                                          title={<div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>

                                                      <Field name="numFact" validate={validators.composeValidators(validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <div style={{flex: 2, marginRight: '20px'}}>
                                                                  <TextField
                                                                      id="NumFact"
                                                                      type={'number'}
                                                                      variant="standard"
                                                                      error={meta.invalid}
                                                                      placeholder={'Nº facture'}
                                                                      sx={{width: '100%'}}
                                                                      className="RoundedEl"
                                                                      InputProps={{  disableUnderline: true }}
                                                                      {...{...input,
                                                                          inputProps: {
                                                                              ...input.inputProps,
                                                                              step: 1,
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
                                                          size="medium" className='RoundedEl'
                                                          disabled={!checker(values)} >
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
                                                                  <Select
                                                                      id="Domaine"
                                                                      labelId="Domaine-label"
                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Domaine" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}>

                                                                      {Object.keys(nomRefs.FACTURE_DOMAINE).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {nomRefs.FACTURE_DOMAINE[code]}
                                                                          </MenuItem>
                                                                      ))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      <Field name="dateDeSoins">
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

                                                      <Field name="dateReceivedStart" >
                                                          {({ input, meta }) => (
                                                              // <div className={"RoundDate"}>
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Réceptionné du'}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}} />}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateReceivedEnd" validate={ validators.composeValidators(validators.beforeThan(values, 'dateReceivedStart')) }>
                                                          {({ input, meta }) => (
                                                              // <div className={"RoundDate"}>
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'au '}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}} />}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="idPeriodeFact" validate={validators.composeValidators(validators.minValue(22))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" sx={{ flex: '1 0 22%', label: {marginTop: '15px!important'}}}>
                                                                  <MaskedInput
                                                                      id="IdPeriodeFact"
                                                                      autoFocus
                                                                      fullWidth
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

                                                      <Field name="dateFact">
                                                          {({ input, meta }) => (
                                                              // <div className={"RoundDate"}>
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      label={'Date facture'}
                                                                      // error={false}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) =>
                                                                          <TextField style={{flex: 2}}
                                                                                     {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}
                                                                          />}
                                                                  />
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      {(nomRefs && nomRefs?.FACTURE_STATUS) && <Field name="status" format={value => value || []}>

                                                          {({input, meta}) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
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
                                                                          return nomRefs.FACTURE_STATUS[selected[0]];ю
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.status?.length == Object.keys(nomRefs.FACTURE_STATUS).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>

                                                                      {Object.keys(nomRefs.FACTURE_STATUS).map(code => (
                                                                          <MenuItem key={code} value={code}>
                                                                              {nomRefs.FACTURE_STATUS[code]}
                                                                          </MenuItem>
                                                                      ))}

                                                                  </Select>
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      {(nomRefs && nomRefs?.FACTURE_ERROR) && <Field name="errorCode" format={value => value || []}>

                                                          {({input, meta}) => (

                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <InputLabel id="Motif-label">Motif</InputLabel>
                                                                  <Select
                                                                      id="Motif"
                                                                      labelId="Motif-label"
                                                                      multiple
                                                                      {...input}
                                                                      input={<OutlinedInput className="RoundedEl" label="Motif" sx={{minWidth: 200}}/>}
                                                                      MenuProps={{autoFocus: false}}
                                                                      disabled={!Boolean(Object.keys(motif)?.length > 0)}
                                                                      renderValue={(selected) => {
                                                                          if (selected.length > 1) return `${selected.length} motifs sélectionnéеs`
                                                                          return nomRefs.FACTURE_ERROR[selected[0]];
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText primary={(values?.errorCode?.length == Object.keys(nomRefs.FACTURE_ERROR).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                                      </MenuItem>

                                                                    {Object.keys(motif).map(code => (<MenuItem key={code} value={code}>
                                                                            {motif[code]}
                                                                    </MenuItem>))}

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

                                                      <Field name="numId" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="FINESSgeographique"
                                                                      label={'FINESS géographique'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      onBlur={(e)=> {
                                                                          if (e.target.value.length == 8) form.getFieldState('numId').change('0' + e.target.value)
                                                                          return input.onBlur(e)
                                                                      }}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="numJur" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField
                                                                      id="FINESSJuridique"
                                                                      label={'FINESS juridique'}
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

                                                      <Field name="department" validate={validators.composeValidators(validators.mustBeNumber, validators.minValue(2), validators.maxValue(3))}>
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

                                                      {(nomRefs && nomRefs?.CLIENT) && <Field name="numClient" format={value => value || []}>

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
                                                                          if (selected.length > 1) return `${selected.length} AMC sélectionnés`
                                                                          return `(${selected[0]}) ${nomRefs.CLIENT[selected[0]]}`;
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.numClient?.length == Object.keys(nomRefs.CLIENT).length) ?
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
                                                          validators.associated(values, ['prenom', 'dateDeNaissance'], 'Nom')
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
                                                          validators.associated(values, ['nom', 'dateDeNaissance'], 'Prénom')
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

                                                      <Field name="dateDeNaissance" validate={validators.composeValidators(validators.associated(values, ['nom', 'prenom'], 'Date de naissance'))}>
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
                                          numFact, numEng, numAdh,
                                          domaine,
                                          dateDeSoins,
                                          dateReceivedStart, dateReceivedEnd,
                                          idPeriodeFact, dateFact,
                                          status, errorCode,
                                          numId, numJur,
                                          raisonSociale,
                                          department, numClient,
                                          nom, prenom,
                                          dateDeNaissance, birdDate,
                                          nir, cle
                                      } = values?.values;


                                      let _motif = reshapeMotifVsStatus({status, nomRefs})
                                      if (_motif) setMotif(_motif)

                                      if(
                                          domaine || dateDeSoins || dateReceivedStart || dateReceivedEnd || idPeriodeFact || dateFact || status ||
                                          errorCode || numId || numJur || raisonSociale || department || numClient || nom || prenom || dateDeNaissance ||
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




