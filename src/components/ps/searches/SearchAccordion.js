import React, {useEffect, useLayoutEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { FormSpy, Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'

import { Collapse, CardActions, TextField}  from "@mui/material";
import { Button, Badge, CardContent, CardHeader, FormControl, MenuItem, OutlinedInput, Select, IconButton, Typography } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SearchIcon from '@mui/icons-material/Search';

import { checkInsidePanels } from '../utils/utils';
import { statusesRIB } from '../../../utils/status-utils';
import { allowSearch, selectDeselectAllValues, validators } from '../../../utils/validator-utils';

import { setCriterias, initCriterias, selectCriterias } from '../psSlice';

import { StyledCard, Accordion, AccordionSummary, AccordionDetails } from "../../shared";

import { AutoCompleteField } from "../../shared/components/AutoCompleteField";
import { MutatorSetValue } from "./Mutators";
import './searchAccordion.scss'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function SearchAccordion(props) {

    const [firstRender, setFirstRender] = useState(true);
    useLayoutEffect(() => {
        setFirstRender(false);
    }, []);


    const dispatch = useDispatch();
    const criterias = useSelector(selectCriterias);
    const {disciplines, disciplinesIsFetching, disciplinesIsSuccess} = props;

    const onSubmit = async (values) => {

        await sleep(300);
        dispatch(setCriterias({...values, cashe: Math.random()}));
    };

    const [expanded, setExpanded] = useState({
        panelDisciplines: false,
        panelAdresse: false,
        panelStatutRibs: false,
    });
    const [dotShow, setDotShow] = useState(false);

    const [panelExpanded, setPanelExpanded] = useState(false);

    const [newDisciplines, setNewDisciplines] = useState([]);
    const newStatusesRIB = Object.keys(statusesRIB).map(ribKey => ({value: ribKey, title: statusesRIB[ribKey]?.label}))

    useEffect(() => {
        if (disciplinesIsSuccess) {
            const newDisciplines = disciplines.map(({code, libelle}) => ({value: code, title: libelle}));
            setNewDisciplines(newDisciplines);
        }
    }, [disciplines, disciplinesIsSuccess]);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded({...expanded, [panel]: newExpanded});
    };

    const handleAccordionPanel = () => (event) => {
        if (!panelExpanded) {
            setExpanded(checkInsidePanels(criterias))
        }
        setPanelExpanded(!panelExpanded);
    };

    return (
        <div className={'formContent'}>
        <Form onSubmit={onSubmit}
            initialValues={{ ...criterias }}
            mutators={{ ...arrayMutators, setValue: MutatorSetValue() }}
            render = {({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit} >
                <StyledCard id="FinalForm" variant="outlined"
                    sx={{ display: 'block', minWidth: 775, overflow: 'visible',
                        '& .MuiCardHeader-root': {borderRadius: (panelExpanded)?'34px 34px 0 0 !important': '34px!important'}
                    }} >

                    <CardHeader sx={{ bgcolor: '#f1f1f1', display: "flex",  }}
                        title={<div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Field name="numPartenaire" validate={validators.composeValidators(validators.minValue(3), validators.maxValue(10))}>
                                {({ input, meta }) => (
                                    <div style={{flex: 2, marginRight: '20px'}}>
                                        <TextField
                                            id="NumPartenaire"
                                            variant={'standard'}
                                            sx={{width: '100%'}}
                                            error={meta.invalid}
                                            {...input}
                                            placeholder={'Nº de partenaire'}
                                            // sx={{ borderRadius: '20px', background: '#fff', padding: '5px 15px', width: 1}}
                                            InputProps={{  disableUnderline: true }}
                                            className="RoundedEl"
                                        />
                                        {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="raisonSociale" validate={validators.composeValidators(validators.minValue(3), validators.maxValue(61))}>

                            {({ input, meta }) => (
                                <div style={{flex: 2}}>
                                    <TextField
                                        id="РaisonSociale"
                                        variant="standard"
                                        error={meta.invalid}
                                        {...input}
                                        placeholder={'Raison sociale'}
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
                            <Button variant="contained" type="submit" size="medium" className='RoundedEl' disabled={submitting || pristine} >
                                <SearchIcon/>Rechercher
                            </Button>
                        </div>}
                    />
                    <CardContent sx={{ display: 'block', border: 0, padding: 0}}>
                    </CardContent>
                    <Collapse in={panelExpanded} timeout="auto">
                        <CardActions sx={{ display: 'block'}} >

                            <Accordion expanded={expanded.panelDisciplines} onChange={handleChange('panelDisciplines')}>
                                <AccordionSummary aria-controls="panelDisciplines-content" id="panelDisciplines-header">
                                    <Typography>Discipline(s)</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <AutoCompleteField id="Disciplines" name="disciplines"
                                                       multiple={true}
                                                       label={'Discipline'}
                                                       options={newDisciplines}
                                                       selectMsg={'Sélectionner tout'}
                                                       deSelectMsg={'Désélectionner tout'}
                                                       selectedMsg={'disciplines sélectionnées'}
                                                       FormControlStyle={{ minWidth: '31%', flex: '1 0 31%'}}
                                                       // handleFormChange={form.mutators.handleFormChange}
                                    />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded.panelAdresse} onChange={handleChange('panelAdresse')}>
                                <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                    <Typography>Adresse</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{display: 'flex'}}>

                                    <Field name="codePostal"
                                           validate={validators.composeValidators(validators.mustBeNumber, validators.minValue(5), validators.maxValue(6))}>
                                        {({ input, meta }) => (
                                            <div style={{marginRight: '15px'}} >
                                                <TextField id="CodePostal" label="Code Postal" className="RoundedEl" sx={{minWidth: '31%', flex: '1 0 31%'}}
                                                    error={meta.invalid}
                                                    variant="outlined"
                                                    {...input}
                                                />
                                                {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="ville"  validate={validators.composeValidators(validators.minValue(3), validators.maxValue(51))}>
                                        {({ input, meta }) => (
                                            <div>
                                                <TextField id="Ville" label="Ville" sx={{width: 360}} className="RoundedEl"
                                                    variant="outlined"
                                                    error={meta.invalid}
                                                    {...input}
                                                />
                                                {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded.panelStatutRibs} onChange={handleChange('panelStatutRibs')}>
                                <AccordionSummary aria-controls="panelStatutRibs-content" id="panelStatutRibs-header">
                                    <Typography>Statut(s) RIB</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <AutoCompleteField id="StatutRibs" name="statutRibs"
                                                       multiple={true}
                                                       label={'Statut RIB'}
                                                       options={newStatusesRIB}
                                                       selectMsg={'Sélectionner tout'}
                                                       deSelectMsg={'Désélectionner tout'}
                                                       selectedMsg={'statuts sélectionnés'}
                                                       FormControlStyle={{ minWidth: '31%', flex: '1 0 31%'}}
                                                    // handleFormChange={form.mutators.handleFormChange}
                                    />

                                </AccordionDetails>
                            </Accordion>

                            <div style={{ margin: '10px', textAlign: 'right'}}>

                                <Button type="button" variant="contained" className="RoundedEl" style={{marginRight: '15px'}}
                                        onClick={()=> {
                                            dispatch(initCriterias());
                                            form.reset()
                                        }}
                                        disabled={!allowSearch(values)} >
                                        Effacer
                                </Button>

                                <Button variant="contained" type="submit" size="medium" className="RoundedEl"
                                        disabled={submitting || pristine} >
                                    <SearchIcon/>Rechercher
                                </Button>

                            </div>

                        </CardActions>

                    </Collapse>

                </StyledCard>

               <FormSpy subscription={{values: true}} onChange={firstRender? ()=>{}: (values) => {
                   form.mutators.setValue(values)
                   const {disciplines, statutRibs, codePostal, ville} = values?.values;
                    if(disciplines || statutRibs || codePostal || ville) {
                        setDotShow(true)
                    } else {
                        setDotShow(false)
                    }
               }}/>
            </form>)}/>
        </div>
    );
}


