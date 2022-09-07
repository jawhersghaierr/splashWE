import React, {useState, useRef} from 'react'
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

import { validators, isValidDate } from '../../../utils/utils';
import { checker, checkInsidePanels } from '../utils/utils';

import { setCriterias, initCriterias, selectCriterias } from '../configurationSlice'

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
    const {enviroments, enviromentsIsFetching, enviromentsIsSuccess} = props;
    const formRef= useRef(null);
    const {data: nomRefs, isFetching: nomRefsIsFetching, isSuccess: nomRefsIsSuccess} = useGetRefsQuery();

    const onSubmit = async (values) => {

        await sleep(300);
        dispatch(setCriterias(values));
    };

    const [expanded, setExpanded] = useState({
        panelInformationGenerales: true,
        panelInformationsEstablishement: true,
        panelInformationsBeneficiaires: true,
        panelNIR: true,
    });
    const [dotShow, setDotShow] = useState(false);

    const [panelExpanded, setPanelExpanded] = useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded({...expanded, [panel]: newExpanded});
    };

    const handleAccordionPanel = () => (event) => {
        if (!panelExpanded) {
            let {values} = formRef.current?.getState()
            console.log(values);
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


                              //Object.keys(nomRefs.FACTURE_STATUS)
                              if (_value?.status?.length === 0 ||
                                  (_value?.status?.includes('all') && _value?.status?.length > Object.keys(nomRefs?.FACTURE_STATUS).length)
                              ) _value = {..._value, status: undefined}
                              if (_value?.status?.includes('all')) _value = {..._value, status: Object.keys(nomRefs?.FACTURE_STATUS)}

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

                                              <Field name="libelle">
                                                  {({ input, meta }) => (
                                                      <div style={{flex: 2, marginRight: '20px'}}>
                                                          <TextField
                                                              id="Libelle"
                                                              variant="standard"
                                                              error={meta.invalid}
                                                              {...input}
                                                              placeholder={'Libelle'}
                                                              sx={{width: '100%'}}
                                                              className="RoundedEl"
                                                              InputProps={{  disableUnderline: true }}
                                                          />
                                                          {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                      </div>
                                                  )}
                                              </Field>

                                              <Field name="dateDeReference">
                                                  {({ input:{onChange, value}, meta }) => (
                                                      <FormControl style={{ flex: '1 0 21%'}} className={"RoundHeaderDate"}>
                                                          <DatePicker
                                                              inputFormat="dd/MM/yyyy"
                                                              onChange={(newDate) => {

                                                                  if (isValidDate(newDate)) {
                                                                      onChange(newDate)
                                                                  } else {
                                                                      // meta.setValue({error: 'invalid date'})
                                                                      // onChange('null')
                                                                  }
                                                              }}
                                                              value={(value === '' || value == undefined)? null: value}
                                                              renderInput={(params) =>
                                                                  <div style={{flex: 2, marginRight: '20px'}}>
                                                                      <TextField
                                                                          id="Libelle"
                                                                          variant="standard"
                                                                          error={meta.invalid}
                                                                          {...{...params, inputProps: {...params.inputProps, placeholder : "Date de reference"}, InputProps: {...params.InputProps, disableUnderline: true} } }
                                                                          placeholder={'Libelle'}
                                                                          sx={{width: '100%'}}
                                                                          className="RoundedEl"
                                                                      />
                                                                      {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                                  </div>}
                                                          />
                                                      </FormControl>
                                                  )}
                                              </Field>

                                              <Field name="statut">
                                                  {({ input, meta }) => (
                                                      <div style={{width: '260px', display: 'flex'}}>
                                                          <Checkbox defaultChecked sx={{'&.MuiCheckbox-root': {color: '#003154'}}}  />
                                                          <Typography component="div" className='verticalTxt'><b>Seuls les éléments actifs</b></Typography>
                                                      </div>
                                                  )}
                                              </Field>


                                              {props?.code == 'control' && <div style={{width: 150, display: 'flex'}}>
                                                  {!panelExpanded &&
                                                  <IconButton onClick={handleAccordionPanel()} sx={{height: '45px'}}>
                                                      <Badge color="secondary" variant="dot"
                                                             invisible={!dotShow}><AddCircleIcon/></Badge>
                                                  </IconButton>}
                                                  {panelExpanded && <IconButton
                                                      onClick={handleAccordionPanel()}><DoDisturbOnIcon/></IconButton>}
                                                  <Typography component="div" className='verticalTxt'><b>Critères</b></Typography>
                                              </div>}
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
                                          <CardActions sx={{ display: 'flex', flexDirection: 'row'}} >




                                              <Field name="enviroment"  validate={validators.composeValidators(validators.minValue(3), validators.maxValue(51))}>
                                                  {({ input, meta }) => (
                                                      <div>
                                                          <TextField
                                                              id="Enviroment"
                                                              sx={{width: 360}}

                                                              label="Enviroment"
                                                              variant="outlined"
                                                              error={meta.invalid}
                                                              {...input}
                                                              className="RoundedEl"
                                                          />
                                                          {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                      </div>
                                                  )}
                                              </Field>

                                              <Field name="provanance"  validate={validators.composeValidators(validators.minValue(3), validators.maxValue(51))}>
                                                  {({ input, meta }) => (
                                                      <div>
                                                          <TextField
                                                              id="Provanance"
                                                              sx={{width: 360}}

                                                              label="Provanance"
                                                              variant="outlined"
                                                              error={meta.invalid}
                                                              {...input}
                                                              className="RoundedEl"
                                                          />
                                                          {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                                      </div>
                                                  )}
                                              </Field>

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
                                          libelle,
                                          dateDeReference,

                                      } = values?.values;

                                      if(
                                          libelle || dateDeReference
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




