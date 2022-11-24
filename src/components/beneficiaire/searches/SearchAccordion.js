import React, {useState, useRef, useEffect, useLayoutEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, CardActions, TextField, CircularProgress } from "@mui/material";
import { Badge, Button, CardHeader, CardContent, FormControl, InputAdornment, Typography } from "@mui/material";

import { FormSpy, Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'

import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SearchIcon from '@mui/icons-material/Search';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fr } from "date-fns/locale";

import { isValidDate } from '../../../utils/convertor-utils';
import { allowSearch, validators } from '../../../utils/validator-utils';
import { checkInsidePanels } from '../utils/utils';
import { AutoCompleteCustom, Accordion, AccordionSummary, AccordionDetails, StyledCard } from "../../shared";

import { initCriterias, setCriterias, selectCriterias } from '../beneficiaireSlice'

import './searchAccordion.scss'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function SearchAccordion(props) {

    const [firstRender, setFirstRender] = useState(true);
    useLayoutEffect(() => {
        setFirstRender(false);
    }, []);

    const dispatch = useDispatch();
    const criterias = useSelector(selectCriterias);
    const {enviroments, enviromentsIsFetching, enviromentsIsSuccess} = props;
    const formRef= useRef(null);

    const onSubmit = async (values) => {
        await sleep(300);
        dispatch(setCriterias({...values, cashe: Math.random()}));
    };

    const [expanded, setExpanded] = useState({
        panelBeneficiaires: false,
        panelInfoOMC: false,
    });
    const [dotShow, setDotShow] = useState(false);

    const [panelExpanded, setPanelExpanded] = useState(false);

    const [newEnviroments, setNewEnviroments] = useState([]);

    useEffect(() => {
        if (enviromentsIsSuccess) {
            const newEnviroments = enviroments.map(({code, libelle}) => ({value: code, title: libelle}));
            setNewEnviroments(newEnviroments);
        }
    }, [enviroments, enviromentsIsSuccess]);

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

    if (enviromentsIsFetching) return <CircularProgress/>

    return (
        <div className={'formContent'}>
        <Form onSubmit={onSubmit}
            initialValues={{ ...criterias }}
            mutators={{ ...arrayMutators, setValue: ([field, value], state, utils) => {

                    utils.changeValue(state, field, (value) => {
                        let _value = value;

                        if (field?.modified?.birdDate && value == null) { _value.dateNaissance = null}

                        return _value;

                    });
                }
            }}

            render = {({ handleSubmit, form, submitting, pristine, values, error }) => (
                formRef.current = form,
                <form onSubmit={handleSubmit} >
                <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
                <StyledCard id="BeneficiareSearchForm" variant="outlined"
                    sx={{ display: 'block', minWidth: 775, overflow: 'visible',
                    '& .MuiCardHeader-root': {borderRadius: (panelExpanded)?'34px 34px 0 0 !important': '34px!important'}
                    }}>
                    <CardHeader sx={{ bgcolor: '#f1f1f1', display: "flex",  }}

                        title={<div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>

                            <Field name="nom" validate={validators.composeValidators(validators.maxValue(51))}>
                                {({ input, meta }) => (
                                    <div style={{flex: 2, marginRight: '20px'}}>
                                        <TextField
                                            id="Nom"
                                            variant="standard"
                                            error={meta.invalid}
                                            {...input}
                                            placeholder={'Nom'}
                                            sx={{width: '100%'}}
                                            className="RoundedEl"
                                            InputProps={{  disableUnderline: true }}
                                        />
                                        {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="prenom" validate={validators.composeValidators(validators.maxValue(51))}>
                                {({ input, meta }) => (
                                    <div style={{flex: 2, marginRight: '20px'}}>
                                        <TextField id="Prenom" variant={'standard'}
                                            error={meta.invalid}
                                            {...input}
                                            placeholder={'Prénom'}
                                            sx={{width: '100%'}} className="RoundedEl"
                                            InputProps={{  disableUnderline: true }}
                                        />
                                        {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="numeroAdherent" validate={validators.composeValidators(validators.maxValue(16))}>
                                {({ input, meta }) => (
                                    <div style={{flex: 2}}>
                                        <TextField id="AdherentIndividuel" variant="standard"
                                            error={meta.invalid}
                                            {...input}
                                            placeholder={'Nº adhérent'}
                                            sx={{width: '100%'}} className="RoundedEl"
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
                            <Button type="submit" variant="contained"
                                size="medium" className='RoundedEl'
                                disabled={!allowSearch(values)} >
                                <SearchIcon/>Rechercher
                            </Button>
                        </div>}
                    />
                    <CardContent sx={{ display: 'block', border: 0, padding: 0}}>

                    </CardContent>

                    <Collapse in={panelExpanded} timeout="auto">
                        <CardActions sx={{ display: 'block'}} >

                            <Accordion expanded={expanded.panelBeneficiaires} onChange={handleChange('panelBeneficiaires')}>
                                <AccordionSummary aria-controls="panelDisciplines-content" id="panelDisciplines-header">
                                    <Typography style={{paddingLeft: '5px'}}><b>Informations bénéficiaires</b></Typography>
                                </AccordionSummary>

                                <AccordionDetails>

                                    <Field name="dateNaissance">
                                        {({ input, meta }) => (
                                            <div className={"RoundDate"}>
                                                <DatePicker

                                                    error={false}
                                                    sx={{borderRadius: '20px'}}
                                                    onChange={(newDate) => {
                                                        if (isValidDate(newDate) || form.getFieldState('birdDate').value == null) {
                                                            form.getFieldState('birdDate').change(newDate)
                                                            input.onChange(newDate)
                                                        }
                                                    }}
                                                    inputFormat="dd/MM/yyyy"
                                                    placeholder={'jj/mm/aaaa'}
                                                    value={(input.value === '' || input.value == undefined || input.value == null  || input.value == 'null' )? null: input.value}

                                                    renderInput={({ inputRef, inputProps, InputProps }) => {

                                                        const { disabled, onChange, readOnly, type, value } = inputProps

                                                        return <>
                                                            <TextField
                                                                label="Date de naissance"
                                                                ref={inputRef}
                                                                disabled={disabled}
                                                                onChange={(event)=> {
                                                                    form.getFieldState('birdDate').change(event.target.value)
                                                                    onChange(event)
                                                                }}
                                                                placeholder={"jj/mm/aaaa"}
                                                                readOnly={readOnly}
                                                                type={type}
                                                                value={value}
                                                                className="RoundDate"
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            {InputProps?.endAdornment}
                                                                        </InputAdornment>)
                                                                }}
                                                                onBlur={(e)=> {
                                                                    if (e.target.value.length !== 10) form.getFieldState('dateNaissance').change(undefined)
                                                                    return input.onBlur(e)
                                                                }}
                                                            />
                                                        </>
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

                            <Accordion expanded={expanded.panelInfoOMC} onChange={handleChange('panelInfoOMC')}>
                                <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                    <Typography style={{marginLeft: '5px'}}><b>Informations environnement</b></Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>

                                    {enviroments && <Field name="envCodeList" format={value => value || []}>

                                        {({input, meta}) => (
                                            <FormControl sx={{ m: 1, flex: 2, marginRight: '20px!important', maxWidth: '24.5%'}} className="RoundedEl">
                                                <AutoCompleteCustom id="Enviroment" label={'Environnement'}
                                                    meta={meta}
                                                    input={input}
                                                    options={newEnviroments}
                                                    selectMsg={'Sélectionner tout'}
                                                    deSelectMsg={'Désélectionner tout'}
                                                    selectedMsg={'environnement sélectionnées'}
                                                />
                                            </FormControl>
                                        )}
                                    </Field>}

                                    <Field name="dateDebutSoins" validate={validators.composeValidators( validators.noFutureDate(), validators.associated(values, ['dateFinSoins'], 'Date de référence au') )}>
                                        {({ input, meta }) => (
                                            <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '0px 15px'}}>
                                                <DatePicker
                                                    label="Date de référence du"
                                                    inputFormat="dd/MM/yyyy"
                                                    maxDate={new Date()}
                                                    value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                    onChange={input?.onChange || null}
                                                    renderInput={(params) =>
                                                        <TextField style={{flex: 2}}
                                                                   {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}
                                                        />}
                                                />
                                                {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="dateFinSoins" validate={validators.composeValidators( validators.noFutureDate(), validators.beforeThan(values, 'dateDebutSoins'), validators.associated(values, ['dateDebutSoins'], 'Date de référence du') )}>
                                        {({ input, meta }) => (
                                            <FormControl className="RoundDate" style={{ flex: '1 0 21%', margin: '0 15px'}}>
                                                <DatePicker
                                                    label="au"
                                                    inputFormat="dd/MM/yyyy"
                                                    maxDate={new Date()}
                                                    value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                    onChange={input?.onChange || null}
                                                    renderInput={(params) =>
                                                        <TextField style={{flex: 2}}
                                                                   {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}
                                                        />}
                                                />
                                                {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                            </FormControl>
                                        )}
                                    </Field>

                                </AccordionDetails>
                            </Accordion>


                            <div style={{ margin: '10px', textAlign: 'right'}}>

                                <Button type="button" variant="contained" disabled={!allowSearch(values)}
                                        onClick={()=> {
                                            dispatch(initCriterias());
                                            form.reset()
                                        }}
                                        className="RoundedEl" style={{marginRight: '15px'}} >
                                    Effacer
                                </Button>
                                <Button variant="contained" type="submit" size="medium" disabled={!allowSearch(values) || error || pristine} className="RoundedEl">
                                    <SearchIcon/>Rechercher
                                </Button>

                            </div>
                        </CardActions>
                    </Collapse>
                </StyledCard>
               <FormSpy onChange={firstRender? ()=>{}: (values) => {
                   form.mutators.setValue(values)
                   const {
                       prenom, nom, numeroAdherent,
                       envCodeList,
                       birdDate, dateNaissance,
                       numAdherentFamillial,
                       dateDebutSoins, dateFinSoins
                   } = values?.values;

                    if(birdDate || envCodeList || dateNaissance || numAdherentFamillial || dateDebutSoins || dateFinSoins) {
                        setDotShow(true)
                    } else {
                        setDotShow(false)
                    }
               }}/>
                </LocalizationProvider></form>)}/>
        </div>
    );
}




