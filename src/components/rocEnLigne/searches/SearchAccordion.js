import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Card, CardActions, CardContent, Typography, Button, TextField, CircularProgress} from "@mui/material";
import { styled } from '@mui/material/styles';
import arrayMutators from 'final-form-arrays'
import InputLabel from '@mui/material/InputLabel';
import Collapse from '@mui/material/Collapse';
import Badge from '@mui/material/Badge';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { FormSpy, Form, Field } from 'react-final-form';
import { ListItemText } from "@material-ui/core";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fr } from "date-fns/locale";
import { useGetRefsQuery } from "../../../services/refsApi";
import { MaskedInput } from "../../shared/customTextField/TextMaskCustom";
import {validators, calcCleFromNir, allowSearch} from '../../../utils/validator-utils';
import {
    checkInsidePanels, getMotifsFromTypes,
    getStatusFromTypes, getSubMotifsFromMotif, getSubMotifsFromTypes,
} from '../utils/utils';
import { selectCriterias, setCriterias, initCriterias } from '../rocEnLigneSlice';
import { ConfirmNir, PanelNIR } from "../../shared/modals";
import { Accordion, AccordionSummary, AccordionDetails } from "../../shared/Accordion";

import './searchAccordion.scss'
import {isValidDate} from "../../../utils/convertor-utils";
import {AutoCompleteCustom} from "../../shared/components/AutoCompleteCustom";

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

    const [rln, setRln] = useState({
        amc: null,
        localStatus: null,
        localMotif: null,
        localSubMotif: null
    })

    useEffect(() => {
        if (nomRefsIsSuccess) {

            let _tmpAmc = {}, amc1 = []
            Object.keys(nomRefs.CLIENT).forEach(cl=> {
                if (nomRefs.ROC_AMCS.includes(cl)) {
                    _tmpAmc[cl] = nomRefs.CLIENT[cl]
                    amc1.push({value:cl, title: `(${cl}) ${nomRefs.CLIENT[cl]}`})
                }
            })

            console.log(amc1)

            setRln({
                amc: Object.keys( _tmpAmc ),
                amc1,
                localStatus: Object.keys( nomRefs.ROC_STATUSES ),
                localMotif: Object.keys( nomRefs.ROC_MOTIFS ),
                localSubMotif: Object.keys( nomRefs.ROC_SOUS_MOTIFS )
            })

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
                  initialValues={{ ...criterias }}
                  mutators={{
                      ...arrayMutators,
                      setValue: ([field, value], state, utils) => {

                          utils.changeValue(state, field, (value) => {

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

                                    // case 'amc': //Object.keys(nomRefs.CLIENT === amc)
                                    //     if (_value?.amc?.length === 0 ||
                                    //         (_value?.amc?.includes('all') && _value?.amc?.length > rln.amc.length)
                                    //     ) _value = {..._value, amc: undefined}
                                    //     if (_value?.amc?.includes('all')) _value = {..._value, amc: rln.amc}
                                    //
                                    // break

                                    case 'domaine':
                                        if (_value?.domaine?.length === 0 ||
                                            (_value?.domaine?.includes('all') && _value?.domaine?.length > Object.keys(nomRefs?.ROC_DOMAINS).length)
                                        ) _value = {..._value, domaine: undefined}
                                        if (_value?.domaine?.includes('all')) _value = {..._value, domaine: Object.keys(nomRefs?.ROC_DOMAINS)}
                                    break

                                    case 'type': //Object.keys(nomRefs.ROC_TYPES)
                                        if (_value?.type?.length === 0 ||
                                            (_value?.type?.includes('all') && _value?.type?.length > Object.keys(nomRefs?.ROC_TYPES).length)
                                        ) _value = {..._value, type: undefined}
                                        if (_value?.type?.includes('all')) _value = {..._value, type: Object.keys(nomRefs?.ROC_TYPES)}
                                        if (_value.errorCode !== undefined) {
                                            _value = {..._value, errorCode: undefined}
                                        }

                                        if (_value.statut !== undefined) {
                                            _value = {..._value, statut: undefined}
                                        }
                                        if (_value.motif !== undefined) {
                                            _value = {..._value, motif: undefined}
                                        }
                                        if (_value.sousMotif !== undefined) {
                                            _value = {..._value, sousMotif: undefined}
                                        }

                                        /**
                                         * TODO MUST BE FIXED
                                         * ****************************************************************
                                         */
                                        if (_value.type){

                                            let statusFromTypes = getStatusFromTypes({nomRefs, type: _value.type})
                                            let tmpStatut = {}
                                            Object.keys(nomRefs.ROC_STATUSES).forEach( stat => {
                                                if (statusFromTypes.includes(stat)) {
                                                    tmpStatut[stat] = nomRefs.ROC_STATUSES[stat]
                                                }
                                            })
                                            if (Object.keys(tmpStatut).length == 0 ) {
                                                tmpStatut = Object.keys( nomRefs.ROC_STATUSES )
                                            } else {
                                                tmpStatut = Object.keys( tmpStatut )
                                            }

                                            let motifsFromTypes = getMotifsFromTypes({type: _value.type, nomRefs})
                                            let tmpMotif = {}
                                            Object.keys(nomRefs.ROC_MOTIFS).forEach( stat => {
                                                if (motifsFromTypes.includes(stat)) {
                                                    tmpMotif[stat] = nomRefs.ROC_MOTIFS[stat]
                                                }
                                            })
                                            if (Object.keys(tmpMotif).length == 0 ) {
                                                tmpMotif = Object.keys( nomRefs.ROC_MOTIFS )
                                            } else {
                                                tmpMotif = Object.keys( tmpMotif )
                                            }

                                            let tmpSubMotif = {}
                                            // let tmpSubMotifsFromMotif =  getSubMotifsFromMotif({motif: motifsFromTypes, nomRefs})
                                            let tmpSubMotifsFromMotif =  getSubMotifsFromTypes({type: _value.type, nomRefs})
                                            tmpSubMotifsFromMotif.forEach(subCode => {
                                                tmpSubMotif[subCode] = nomRefs.ROC_SOUS_MOTIFS[subCode]
                                            })
                                            if (Object.keys(tmpMotif).length == 0 ) {
                                                tmpSubMotif = Object.keys( nomRefs.ROC_SOUS_MOTIFS )
                                            } else {
                                                tmpSubMotif = Object.keys( tmpSubMotif )
                                            }

                                            setRln({
                                                amc: [...rln.amc],
                                                localStatus: [...tmpStatut],
                                                localMotif: [...tmpMotif],
                                                localSubMotif: [...tmpSubMotif]
                                            })

                                        }
                                    break

                                    case 'statut': //Object.keys(nomRefs.ROC_STATUSES)

                                        if (_value?.statut?.length === 0 ||
                                            (_value?.statut?.includes('all') && _value?.statut?.length > rln.localStatus.length)
                                        ) _value = {..._value, statut: undefined}
                                        if (_value?.statut?.includes('all')) _value = {..._value, statut: rln.localStatus}

                                        if ( !( _value?.statut?.length > 0 && ( _value?.statut?.includes('REJETEE') || _value?.statut?.includes('INVALIDE') )) ) {
                                            if (_value.motif !== undefined) {
                                                _value = {..._value, motif: undefined}
                                            }
                                            if (_value.sousMotif !== undefined) {
                                                _value = {..._value, sousMotif: undefined}
                                            }
                                        }

                                    break

                                    case 'motif':
                                        if (_value?.motif?.length === 0 ||
                                            (_value?.motif?.includes('all') && _value?.motif?.length > rln.localMotif.length)
                                        ) _value = {..._value, motif: undefined}
                                        if (_value?.motif?.includes('all')) _value = {..._value, motif: rln.localMotif}

                                        if (_value.sousMotif !== undefined) {
                                            _value = {..._value, sousMotif: undefined}
                                        }

                                        //____________________________________________________________________________________________________
                                        if (_value.motif) {
                                            let tmpSubMotif = {}
                                            getSubMotifsFromMotif({motif: _value.motif, nomRefs})
                                                .forEach(subCode => {
                                                    tmpSubMotif[subCode] = nomRefs.ROC_SOUS_MOTIFS[subCode]
                                                })
                                            if (Object.keys(tmpSubMotif).length == 0 ) {
                                                tmpSubMotif = Object.keys( nomRefs.ROC_SOUS_MOTIFS )
                                            } else {
                                                tmpSubMotif = Object.keys( tmpSubMotif )
                                            }

                                            setRln({
                                                amc: [...rln.amc],
                                                localStatus: [...rln.localStatus],
                                                localMotif: [...rln.localMotif],
                                                localSubMotif: [...tmpSubMotif]

                                            })


                                        }
                                        break

                                    case 'sousMotif':
                                        if (_value?.sousMotif?.length === 0 ||
                                            (_value?.sousMotif?.includes('all') && _value?.sousMotif?.length > rln.localSubMotif.length)
                                        ) _value = {..._value, sousMotif: undefined}
                                        if (_value?.sousMotif?.includes('all')) _value = {..._value, sousMotif: rln.localSubMotif}

                                    break

                                }


                              return _value

                          })
                      }
                  }}

                  render = {({ handleSubmit, form, submitting, pristine, values }) => (
                      formRef.current = form,
                          <form onSubmit={handleSubmit} >
                              <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
                                  <StyledCard id="RocEnLigneSearchForm"
                                      sx={{ display: 'block', minWidth: 775, overflow: 'visible',
                                          '& .MuiCardHeader-root': {borderRadius: (panelExpanded)?'34px 34px 0 0 !important': '34px!important'}
                                      }}
                                      variant="outlined">
                                      <CardHeader
                                          sx={{ bgcolor: '#f1f1f1', display: "flex" }}
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
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DateTimePicker
                                                                      label={'Réceptionné du'}
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
                                                                  <DateTimePicker
                                                                      label={'au '}
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
                                                                  <MaskedInput
                                                                      id="IdPerFact"
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


                                                      {(nomRefs && rln?.localStatus) && <Field name="statut" format={value => value || []}>

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
                                                                          return nomRefs.ROC_STATUSES[selected[0]];
                                                                      }}>

                                                                      <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.statut?.length == Object.keys(rln.localStatus).length) ?
                                                                                  <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
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
                                                                          <ListItemText primary={(values?.motif?.length == nomRefs.ROC_MOTIFS.length) ?
                                                                              <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
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
                                                                          return nomRefs.ROC_SOUS_MOTIFS[selected[0]];
                                                                      }}>

                                                                      {rln?.localSubMotif && <MenuItem value="all" key='selectAll'>
                                                                          <ListItemText
                                                                              primary={(values?.sousMotif?.length == rln.localSubMotif.length) ?
                                                                                  <b>Désélectionner tout</b> :
                                                                                  <b>Sélectionner tout</b>}/>
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
                                                                  <TextField id="FINESSgeographique"
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
                                                                  <TextField id="FINESSJuridique"
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
                                                                  <TextField id="RaisonSociale"
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
                                                                  <TextField id="Department"
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
                                                                  {/*<InputLabel id="NumClient-label">AMC</InputLabel>*/}
                                                                  {/*{rln?.amc && <Select*/}
                                                                  {/*    id="NumClient"*/}
                                                                  {/*    labelId="NumClient-label"*/}
                                                                  {/*    multiple*/}
                                                                  {/*    {...input}*/}
                                                                  {/*    input={<OutlinedInput className="RoundedEl" label="NumClient" sx={{minWidth: 200}}/>}*/}
                                                                  {/*    MenuProps={{autoFocus: false}}*/}
                                                                  {/*    renderValue={(selected) => {*/}
                                                                  {/*        if (selected.length > 1) return `${selected.length} AMC sélectionnées`*/}
                                                                  {/*        return `(${selected[0]}) ${nomRefs.CLIENT[selected[0]]}`;*/}
                                                                  {/*    }}>*/}

                                                                  {/*    <MenuItem value="all" key='selectAll'>*/}
                                                                  {/*        <ListItemText primary={(values?.amc?.length == rln.amc.length) ? <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>*/}
                                                                  {/*    </MenuItem>*/}

                                                                  {/*    {rln.amc.map(code => (*/}
                                                                  {/*        <MenuItem key={code} value={code}>*/}
                                                                  {/*            {`(${code}) ${nomRefs.CLIENT[code]}`}*/}
                                                                  {/*        </MenuItem>*/}
                                                                  {/*    ))}*/}

                                                                  {/*</Select>}*/}
                                                                  {rln.amc1 && rln.amc1.length > 0 &&
                                                                    <AutoCompleteCustom id="NumClient" input={input}
                                                                                        meta={meta}
                                                                                        options={rln.amc1}
                                                                                        selectMsg={'Sélectionner tout'}
                                                                                        deSelectMsg={'Désélectionner tout'}
                                                                                        selectedMsg={'AMC sélectionnées'}
                                                                                        label={'AMC'}/>}
                                                              </FormControl>
                                                          )}
                                                      </Field>}

                                                      <Field name="nom" validate={validators.composeValidators( validators.maxValue(51) )}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <TextField id="Nom"
                                                                      label={'Nom'}
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
                                                                  <TextField id="Prenom"
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
                                                          {({ input, meta }) => (
                                                              <div className={"RoundDate"} style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                                  <DatePicker
                                                                      error={false}
                                                                      sx={{borderRadius: '20px', flex: 2}}

                                                                      inputFormat="dd/MM/yyyy"

                                                                      value={(input.value === '' || input.value == undefined || input.value == null  || input.value == 'null' )? null: input.value}

                                                                      renderInput={({ inputRef, inputProps, InputProps }) => {

                                                                          const { disabled, onChange, readOnly, type, value } = inputProps

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

                                  }}/>}

                              </LocalizationProvider></form>)}/>
        </div>
    );
}




