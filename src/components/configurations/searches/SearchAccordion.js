import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import {Card, CardActions, CardContent, Typography, Button, TextField}  from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { FormSpy, Form, Field, FieldProps, FieldRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Collapse from '@mui/material/Collapse';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { fr } from "date-fns/locale";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {useGetRefsQuery} from "../../../services/refsApi";

import { allowSearch, selectDeselectAllValues, validators } from '../../../utils/validator-utils';
import { checkInsidePanels } from '../utils/utils';

import { setCriterias, initCriterias, selectCriterias } from '../configurationsSlice'

import './searchAccordion.scss'
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import {ListItemText} from "@material-ui/core";


const StyledCard = styled(Card)(({ theme }) => ({
    "&.MuiPaper-rounded": {
        border: 0,
        borderRadius: '30px',
    },
}));


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function SearchAccordion(props) {

    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();
    const dispatch = useDispatch();
    const criterias = useSelector(selectCriterias);
    const formRef= useRef(null);
    const {moreCriterias} = props;
    const [dotShow, setDotShow] = useState(false);
    const [panelExpanded, setPanelExpanded] = useState(false);


    const onSubmit = async (values) => {
        dispatch(setCriterias({...values, cashe: Math.random()}));
    };

    const handleAccordionPanel = () => (event) => {
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

                              switch (field.active) {
                                  case 'discipline':
                                      const disciplineObj = selectDeselectAllValues(value, nomRefs.DISCIPLINE, field.active);
                                      _value.discipline = disciplineObj ? disciplineObj[field.active] : value[field.active];
                                  break

                                  case 'factureContext':
                                      const factureContextObj = selectDeselectAllValues(value, nomRefs.FACTURE_CONTEXT, field.active);
                                      _value.factureContext = factureContextObj ? factureContextObj[field.active] : value[field.active];
                                  break

                                  case 'canalReception':
                                      const canalReceptiontObj = selectDeselectAllValues(value, nomRefs.FACTURE_CANAL_INTEGRATION, field.active);
                                      _value.canalReception = canalReceptiontObj ? canalReceptiontObj[field.active] : value[field.active];
                                  break

                                  case 'dcs':
                                      const dcsObj = selectDeselectAllValues(value, nomRefs.DCS, field.active);
                                      _value.dcs = dcsObj ? dcsObj[field.active] : value[field.active];
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
                                  <StyledCard sx={{ display: 'block', minWidth: 775 }} id="ConfigurationsSearchForm" variant="outlined">
                                      <CardHeader sx={{
                                          bgcolor: '#f1f1f1',
                                          display: "flex",
                                          '&.MuiCardHeader-root': {
                                              margin: '0',
                                              padding: '15px',
                                          },
                                          '& .MuiInputBase-input': {
                                              margin: '0',
                                              padding: '5px 14px !important'
                                          },
                                          fieldset: { border: 'none' }
                                      }}
                                          title={<div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>

                                              <Field name="c">
                                                  {({ input, meta }) => (
                                                      <div style={{flex: 2, marginRight: '20px'}}>
                                                          <TextField
                                                              id="Libelle"
                                                              variant="standard"
                                                              error={meta.invalid}
                                                              {...input}
                                                              placeholder={'Libellé'}
                                                              sx={{width: '100%'}}
                                                              className="RoundedEl"
                                                              InputProps={{  disableUnderline: true }}
                                                          />
                                                          {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                      </div>
                                                  )}
                                              </Field>

                                              <Field name="referenceDate" validate={validators.composeValidators(validators.noFutureDate())} >
                                                  {({ input, meta }) => (
                                                      <FormControl className="RoundDate" style={{ flex: '1 0 21%', marginRight: '15px'}}>
                                                          <DatePicker
                                                              label={'Date de référence'}
                                                              inputFormat="dd/MM/yyyy"
                                                              value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                              onChange={input?.onChange || null}
                                                              maxDate={new Date()}
                                                              renderInput={(params) =>
                                                                  <TextField
                                                                      className="RoundedEl"
                                                                      sx={{width: '100%', flex: 2,  }}
                                                                      {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}
                                                                  />}
                                                          />
                                                          {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                      </FormControl>
                                                  )}
                                              </Field>

                                              <Field name="status" component="input" type="checkbox">
                                                  {({ input, meta }) => (
                                                      <div style={{width: '260px', display: 'flex'}}>
                                                          <Checkbox
                                                              sx={{'&.MuiCheckbox-root': {color: '#003154'}}}
                                                              {...input}
                                                              // defaultChecked
                                                          />
                                                          <Typography component="div" className='verticalTxt'><b>Seuls les éléments actifs</b></Typography>
                                                      </div>
                                                  )}
                                              </Field>


                                              {moreCriterias && <div style={{width: 150, display: 'flex'}}>
                                                  {!panelExpanded &&
                                                  <IconButton onClick={handleAccordionPanel()} sx={{height: '45px'}}>
                                                      <Badge color="secondary" variant="dot"
                                                             invisible={!dotShow}><AddCircleIcon/></Badge>
                                                  </IconButton>}
                                                  {panelExpanded && <IconButton
                                                      onClick={handleAccordionPanel()}><DoDisturbOnIcon/></IconButton>}
                                                  <Typography component="div"
                                                              className='verticalTxt'><b>Critères</b></Typography>
                                              </div>}
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
                                          <CardActions sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start'}} >

                                              <Field name="environment"  validate={validators.composeValidators(validators.minValue(3), validators.maxValue(51))}>
                                                  {({ input, meta }) => (
                                                      <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: 360}}>
                                                          <TextField
                                                              id="Enviroment"
                                                              sx={{maxWidth: 360}}
                                                              label="Environnement"
                                                              variant="outlined"
                                                              error={meta.invalid}
                                                              {...input}
                                                              className="RoundedEl"
                                                          />
                                                          {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                      </FormControl>
                                                  )}
                                              </Field>

                                              <Field name="provenance"  validate={validators.composeValidators(validators.minValue(3), validators.maxValue(51))}>
                                                  {({ input, meta }) => (
                                                      <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: 360}}>
                                                          <TextField
                                                              id="Provanance"
                                                              variant="outlined"
                                                              label="Provenance"
                                                              error={meta.invalid}
                                                              {...input}
                                                              className="RoundedEl"
                                                          />
                                                          {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                      </FormControl>
                                                  )}
                                              </Field>


                                              {(nomRefs && nomRefs?.DISCIPLINE) && <Field name="discipline" format={value => value || []}>
                                                  {({input, meta}) => (
                                                      <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: 360}}>
                                                          <InputLabel id="NumClient-label">Discipline</InputLabel>
                                                          <Select
                                                              id="Discipline"
                                                              labelId="Discipline-label"
                                                              multiple
                                                              {...input}
                                                              input={<OutlinedInput className="RoundedEl" label="Discipline" sx={{minWidth: 200}}/>}
                                                              MenuProps={{autoFocus: false}}
                                                              renderValue={(selected) => {
                                                                  if (selected.length > 1) return `${selected.length} Discipline sélectionnés`
                                                                  return nomRefs.DISCIPLINE[selected[0]];
                                                              }}>

                                                              <MenuItem value="all" key='selectAll'>
                                                                  <ListItemText
                                                                      primary={(values?.discipline?.length == Object.keys(nomRefs.DISCIPLINE).length) ?
                                                                          <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                              </MenuItem>

                                                              {Object.keys(nomRefs.DISCIPLINE).map(code => (
                                                                  <MenuItem key={code} value={code}>
                                                                      {nomRefs.DISCIPLINE[code]}
                                                                  </MenuItem>
                                                              ))}

                                                          </Select>
                                                      </FormControl>
                                                  )}
                                              </Field>}


                                              {(nomRefs && nomRefs?.FACTURE_CONTEXT) && <Field name="factureContext" format={value => value || []}>
                                                  {({input, meta}) => (
                                                      <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: 360}}>
                                                          <InputLabel id="NumClient-label">Contexte de la facture</InputLabel>
                                                          <Select
                                                              id="FactureContext"
                                                              labelId="FactureContext-label"
                                                              multiple
                                                              {...input}
                                                              input={<OutlinedInput className="RoundedEl" label="FactureContext" sx={{minWidth: 200}}/>}
                                                              MenuProps={{autoFocus: false}}
                                                              renderValue={(selected) => {
                                                                  if (selected.length > 1) return `${selected.length} Facture Context sélectionnés`
                                                                  return nomRefs.FACTURE_CONTEXT[selected[0]];
                                                              }}>

                                                              <MenuItem value="all" key='selectAll'>
                                                                  <ListItemText
                                                                      primary={(values?.factureContext?.length == Object.keys(nomRefs.FACTURE_CONTEXT).length) ?
                                                                          <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                              </MenuItem>

                                                              {Object.keys(nomRefs.FACTURE_CONTEXT).map(code => (
                                                                  <MenuItem key={code} value={code}>
                                                                      {nomRefs.FACTURE_CONTEXT[code]}
                                                                  </MenuItem>
                                                              ))}

                                                          </Select>
                                                      </FormControl>
                                                  )}
                                              </Field>}

                                              {(nomRefs && nomRefs?.FACTURE_CANAL_INTEGRATION) && <Field name="canalReception" format={value => value || []}>
                                                  {({input, meta}) => (
                                                      <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: 360}}>
                                                          <InputLabel id="NumClient-label">Canal de réception</InputLabel>
                                                          <Select
                                                              id="CanalReception"
                                                              labelId="CanalReception-label"
                                                              multiple
                                                              {...input}
                                                              input={<OutlinedInput className="RoundedEl" label="CanalReception" sx={{minWidth: 200}}/>}
                                                              MenuProps={{autoFocus: false}}
                                                              renderValue={(selected) => {
                                                                  if (selected.length > 1) return `${selected.length} Canal de réception sélectionnés`
                                                                  return nomRefs.FACTURE_CANAL_INTEGRATION[selected[0]];
                                                              }}>

                                                              <MenuItem value="all" key='selectAll'>
                                                                  <ListItemText
                                                                      primary={(values?.canalReception?.length == Object.keys(nomRefs.FACTURE_CANAL_INTEGRATION).length) ?
                                                                          <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                              </MenuItem>

                                                              {Object.keys(nomRefs.FACTURE_CANAL_INTEGRATION).map(code => (
                                                                  <MenuItem key={code} value={code}>
                                                                      {nomRefs.FACTURE_CANAL_INTEGRATION[code]}
                                                                  </MenuItem>
                                                              ))}

                                                          </Select>
                                                      </FormControl>
                                                  )}
                                              </Field>}

                                              {(nomRefs && nomRefs?.DCS) && <Field name="dcs" format={value => value || []}>
                                                  {({input, meta}) => (
                                                      <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: 360}}>
                                                          <InputLabel id="Dcs-label">Domaine d'activité</InputLabel>
                                                          <Select
                                                              id="Dcs"
                                                              labelId="Dcs-label"
                                                              multiple
                                                              {...input}
                                                              input={<OutlinedInput className="RoundedEl" label="Dcs" sx={{minWidth: 200}}/>}
                                                              MenuProps={{autoFocus: false}}
                                                              renderValue={(selected) => {
                                                                  if (selected.length > 1) return `${selected.length} Domaines sélectionnés`
                                                                  return nomRefs.DCS[selected[0]];
                                                              }}>

                                                              <MenuItem value="all" key='selectAll'>
                                                                  <ListItemText
                                                                      primary={(values?.dcs?.length == Object.keys(nomRefs.DCS).length) ?
                                                                          <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                              </MenuItem>

                                                              {Object.keys(nomRefs.DCS).map(code => (
                                                                  <MenuItem key={code} value={code}>
                                                                      {nomRefs.DCS[code]}
                                                                  </MenuItem>
                                                              ))}

                                                          </Select>
                                                      </FormControl>
                                                  )}
                                              </Field>}

                                              <div style={{ margin: '10px', textAlign: 'right', flex: 1, minWidth: '95%'}}>

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
                                          label, referenceDate, status, environment, provenance, discipline, factureContext, canalReception, dcs
                                      } = values?.values;

                                      if( environment || provenance || discipline || factureContext || canalReception || dcs ) {
                                          setDotShow(true)
                                      } else {
                                          setDotShow(false)
                                      }
                                  }}/>}
                              </LocalizationProvider></form>)}/>
        </div>
    );
}




