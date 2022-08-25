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

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from "date-fns/locale";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {
    validators,
    checker,
    checkInsidePanels,
    isValidDate
} from '../utils/utils';

import {
    setCriterias,
    initCriterias,
    selectCriterias,
} from '../configurationSlice'

import './searchAccordion.scss'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import {useGetRefsQuery} from "../../../services/refsApi";


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
                                                      <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '15px 5px'}}>
                                                          <DatePicker
                                                              label={'Date de reference'}
                                                              inputFormat="dd/MM/yyyy"
                                                              onChange={(newDate) => {

                                                                  if (isValidDate(newDate)) {
                                                                      onChange(newDate)
                                                                  } else {
                                                                      onChange('null')
                                                                  }
                                                              }}
                                                              value={(value === '' || value == undefined)? null: value}
                                                              renderInput={(params) =>
                                                                  <TextField {...params} style={{flex: 2}}/>}
                                                          />
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
                                                  disabled={!checker(values)} >
                                                  <SearchIcon/>Rechercher
                                              </Button>
                                          </div>}
                                      />

                                      <CardContent sx={{ display: 'block', border: 0, padding: 0}}> </CardContent>

                                      <Collapse in={panelExpanded} timeout="auto">
                                          <CardActions sx={{ display: 'block'}} >



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
                                          numFact,
                                          numEng,
                                          numAdh,
                                          domaine,
                                          dateDeSoins,
                                          dateReceivedStart,
                                          dateReceivedEnd,
                                          idPeriodeFact,
                                          dateFact,
                                          status,
                                          errorCode,
                                          numId,
                                          numJur,
                                          raisonSociale,
                                          department,
                                          numClient,
                                          nom,
                                          prenom,
                                          dateDeNaissance,
                                          birdDate,
                                          nir,
                                          cle
                                      } = values?.values;

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



