import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FormSpy, Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'

import {
    CardActions, TextField, Collapse, InputLabel,
    Button, Badge, CardContent, CardHeader, FormControl, Typography, InputAdornment, IconButton
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fr } from "date-fns/locale";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {useGetRefsQuery} from "../../../services/refsApi";
import { setCriterias, initCriterias, selectCriterias } from '../virementsSlice'
import { Accordion, AccordionDetails, StyledCard } from "../../shared";

import { checkInsidePanels } from '../utils/utils'
import { allowSearch, validators } from '../../../utils/validator-utils';

import { AutoCompleteField } from "../../shared/components/AutoCompleteField";
import { handleFormChange } from "./Mutators";
import './searchAccordion.scss'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function SearchAccordion(props) {

    const dispatch = useDispatch();
    const criterias = useSelector(selectCriterias);

    const formRef= useRef(null);
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    const [expanded, setExpanded] = useState({
        panelInformationsDuVirement: true,
    });

    const [dotShow, setDotShow] = useState(false);
    const [panelExpanded, setPanelExpanded] = useState(false);
    const [paiementStatus, setPaiementStatus] = useState([]);
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        if (nomRefsIsSuccess) {
            const paiementStatus = Object.keys(nomRefs.PAIEMENT_VIREMENT_STATUS).map( code => ({ value: code, title: nomRefs.PAIEMENT_VIREMENT_STATUS[code] }) );
            setPaiementStatus(paiementStatus);
            setFirstRender(false);
        }
    }, [nomRefs, nomRefsIsSuccess])

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded({...expanded, [panel]: newExpanded});
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
    };

    return (
        <div className={'formContent'}>
            <Form onSubmit={onSubmit}
                  initialValues={{ ...criterias }}
                  mutators={{ ...arrayMutators, handleFormChange: handleFormChange({nomRefs}) }}
                  render = {({ handleSubmit, form, submitting, pristine, values }) => (
                      formRef.current = form,
                          <form onSubmit={handleSubmit} >
                              <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
                                  <StyledCard id="VirementsSearchForm" variant="outlined" sx={{ display: 'block', minWidth: 775, overflow: 'visible',
                                      '& .MuiCardHeader-root': {borderRadius: (panelExpanded)?'34px 34px 0 0 !important': '34px!important'}
                                  }}>
                                      <CardHeader
                                          sx={{
                                              bgcolor: '#f1f1f1',
                                              display: "flex",
                                              '&.MuiCardHeader-root': { margin: '0', padding: '15px' },
                                              '& .MuiInputBase-input': { margin: '0', padding: '5px 14px !important' },
                                              fieldset: { border: 'none' }
                                          }}
                                          title={<div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>

                                                      <Field name="numVirement" validate={validators.composeValidators(validators.maxValue(8))}>
                                                          {({ input, meta }) => (
                                                              <div style={{flex: 1, marginRight: '20px'}}>
                                                                  <TextField
                                                                      id="NumVirement"
                                                                      variant="standard"
                                                                      error={meta.invalid}
                                                                      placeholder={'Nº virement'}
                                                                      sx={{width: '100%'}}
                                                                      className="RoundedEl"
                                                                      InputProps={{  disableUnderline: true }}
                                                                      {...{
                                                                          ...input,
                                                                          inputProps: {
                                                                              ...input.inputProps,
                                                                              lang: 'fr'
                                                                          }
                                                                      }}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>

                                                      <Field name="numDecompte" validate={validators.composeValidators(validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <div style={{flex: 1, marginRight: '20px'}}>
                                                                  <TextField
                                                                      id="NumDecompte"
                                                                      variant={'standard'}
                                                                      sx={{width: '100%'}}
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      placeholder={'Nº décompte'}
                                                                      InputProps={{  disableUnderline: true }}
                                                                      className="RoundedEl"
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>

                                                      <Field name="numPsAPayer" validate={validators.composeValidators(validators.minValue(8), validators.maxValue(10))}>
                                                          {({ input, meta }) => (
                                                              <div style={{flex: 1}}>
                                                                  <TextField
                                                                      id="NumPsAPayer"
                                                                      variant="standard"
                                                                      error={meta.invalid}
                                                                      {...input}
                                                                      onBlur={(e)=> {
                                                                          if (e.target.value.length == 8) form.getFieldState('numPsAPayer').change('0' + e.target.value)
                                                                          return input.onBlur(e)
                                                                      }}
                                                                      placeholder={'Nº de facturation PS'}
                                                                      sx={{width: '100%'}}
                                                                      className="RoundedEl"
                                                                      InputProps={{  disableUnderline: true }}
                                                                  />
                                                                  {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </div>
                                                          )}
                                                      </Field>

                                                      <Field name="dateTraitement" validate={validators.composeValidators(validators.noFutureDate())} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 11%', marginLeft: '25px', maxWidth: '225px' }}>

                                                                  <DatePicker
                                                                      label={'Date d\'émission du'}
                                                                      maxDate={new Date()}
                                                                      inputFormat="dd/MM/yyyy"
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) =>
                                                                          <TextField
                                                                              className="RoundedEl"
                                                                              sx={{width: '100%', flex: 2,  }}
                                                                              error={meta.invalid}
                                                                              {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}
                                                                          />}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
                                                          )}
                                                      </Field>

                                                      <Field name="dateTraitementFin" validate={validators.composeValidators(validators.beforeThan(values, 'dateTraitement'), validators.noFutureDate())} >
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundDate" style={{ flex: '1 0 11%', marginLeft: '25px', marginRight: '25px', maxWidth: '225px' }}>
                                                                  <DatePicker
                                                                      inputFormat="dd/MM/yyyy"
                                                                      maxDate={new Date()}
                                                                      label={'Date d\'émission аu'}
                                                                      value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                                      onChange={input?.onChange || null}
                                                                      renderInput={(params) =>
                                                                          <TextField
                                                                              className="RoundedEl"
                                                                              sx={{width: '100%', flex: 2,  }}
                                                                              error={meta.invalid}
                                                                              {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}
                                                                          />}
                                                                  />
                                                                  {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                              </FormControl>
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

                                              <Accordion expanded={expanded.panelInformationsDuVirement} onChange={handleChange('panelInformationsDuVirement')}>

                                                  <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>

                                                      <AutoCompleteField id="Statut" name="status"
                                                                         multiple={true}
                                                                         label={'Statut du virement'}
                                                                         options={paiementStatus}
                                                                         selectMsg={'Sélectionner tout'}
                                                                         deSelectMsg={'Désélectionner tout'}
                                                                         selectedMsg={'statuts sélectionnés'}
                                                                         handleFormChange={form.mutators.handleFormChange}
                                                      />

                                                      <Field name="mntVirement" validate={validators.composeValidators(validators.notBiggerThan(10000000))}>
                                                          {({ input, meta }) => (
                                                              <FormControl className="RoundedEl" style={{ flex: '1 0 21%', margin: '15px 5px', maxWidth: '24.5%'}}>
                                                                  <TextField
                                                                      id="MntVirement"
                                                                      type={'number'}
                                                                      label={'Montant'}
                                                                      variant="outlined"
                                                                      error={meta.invalid}
                                                                      {...{...input,
                                                                          inputProps: {
                                                                              ...input.inputProps,
                                                                              step: 0.01,
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
                                                      style={{marginRight: '15px'}}>
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
                                          numVirement, numDecompte, numAdhInd,
                                          numPsAPayer, dateTraitement, dateTraitementFin,
                                          status, mntVirement
                                      } = values?.values;

                                      if( status || mntVirement ) {
                                          setDotShow(true)
                                      } else {
                                          setDotShow(false)
                                      }
                                  }}/>


                              </LocalizationProvider></form>)}/>
        </div>
    );
}




