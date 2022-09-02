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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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
} from '../beneficiaireSlice'

import './searchAccordion.scss'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import {fr} from "date-fns/locale";


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `none`,
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    border: 'none',
}));

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

    const onSubmit = async (values) => {

        await sleep(300);
        dispatch(setCriterias(values));
    };

    const [expanded, setExpanded] = useState({
        panelBeneficiaires: false,
        panelInfoOMC: false,
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

                        if (_value?.envCodeList?.length === 0 ||
                            (_value?.envCodeList?.includes('all') && _value?.envCodeList?.length > enviroments?.length)
                        ) _value = {..._value, envCodeList: undefined}

                        if (_value?.envCodeList?.includes('all')) _value = {..._value, envCodeList: enviroments?.map(({code})=>code)}

                        return _value

                    })
                }
            }}

            render = {({ handleSubmit, form, submitting, pristine, values, error }) => (
                formRef.current = form,
                <form onSubmit={handleSubmit} >
                <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
                <StyledCard sx={{ display: 'block', minWidth: 775 }} id="BeneficiareSearchForm" variant="outlined">
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
                                        <TextField
                                            id="Prenom"
                                            variant={'standard'}
                                            sx={{width: '100%'}}
                                            error={meta.invalid}
                                            {...input}
                                            placeholder={'Prénom'}
                                            InputProps={{  disableUnderline: true }}
                                            className="RoundedEl"
                                        />
                                        {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="numeroAdherent" validate={validators.composeValidators(validators.maxValue(16))}>
                                {({ input, meta }) => (
                                    <div style={{flex: 2}}>
                                        <TextField
                                            id="AdherentIndividuel"
                                            variant="standard"
                                            error={meta.invalid}
                                            {...input}
                                            placeholder={'Nº Adhérent'}
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
                    <CardContent sx={{ display: 'block', border: 0, padding: 0}}>

                    </CardContent>

                    <Collapse in={panelExpanded} timeout="auto">
                        <CardActions sx={{ display: 'block'}} >

                            <Accordion expanded={expanded.panelBeneficiaires} onChange={handleChange('panelBeneficiaires')}>
                                <AccordionSummary aria-controls="panelDisciplines-content" id="panelDisciplines-header">
                                    <Typography style={{paddingLeft: '5px'}}><b>Informations bénéficiaires</b></Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <Field name="dateDeNaissance">
                                        {({ input: {onChange, value, ...rest}, meta }) => (
                                            <div className={"RoundDate"}>
                                                <DatePicker

                                                    error={false}
                                                    sx={{borderRadius: '20px'}}
                                                    onChange={(newDate) => {
                                                        if (isValidDate(newDate) || form.getFieldState('birdDate').value == null) {
                                                            form.getFieldState('birdDate').change(newDate)
                                                            onChange(newDate)
                                                        }
                                                    }}
                                                    inputFormat="dd/MM/yyyy"
                                                    placeholder={'jj/mm/aaaa'}
                                                    value={(value === '' || value == undefined || value == null  || value == 'null' )? null: value}

                                                    renderInput={({ inputRef, inputProps, InputProps }) => {

                                                        const {
                                                            disabled,
                                                            onChange,
                                                            readOnly,
                                                            type,
                                                            value
                                                        } = inputProps

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
                                                                }}/>
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
                                <AccordionDetails sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                                    {enviroments && <Field name="envCodeList" format={value => value || []}>

                                        {({input, meta}) => (
                                            <FormControl sx={{ m: 1, flex: 2, marginRight: '20px!important'}} className="RoundedEl">
                                                <InputLabel id="Enviroment-label">Sélectionner</InputLabel>
                                                <Select
                                                    id="Enviroment"
                                                    labelId="Enviroment-label"
                                                    multiple

                                                    {...input}
                                                    input={<OutlinedInput className="RoundedEl" label="Enviroment" sx={{minWidth: 200}}/>}
                                                    MenuProps={{autoFocus: false}}
                                                    renderValue={(selected) => {
                                                        if (selected.length > 1) {
                                                            return `${selected.length} enviroments sélectionnéеs`
                                                        }
                                                        return enviroments.find(item => item.code.toString() === selected.toString())?.libelle || '';
                                                    }}>

                                                    <MenuItem value="all" key='selectAll'>
                                                        <ListItemText
                                                            primary={(values?.enviroments?.length == enviroments.length) ? <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                    </MenuItem>

                                                    {enviroments.map(({code, libelle}) => (
                                                        <MenuItem key={code} value={code}>
                                                            {libelle}
                                                        </MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                        )}
                                    </Field>}

                                    <Field name="dateDebutSoins" >
                                        {({ input, meta }) => (
                                            <FormControl className="RoundDate" sx={{ marginRight: '20px!important'}}>
                                                <DatePicker
                                                    label="Date de référence du"
                                                    inputFormat="dd/MM/yyyy"
                                                    value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                    onChange={input?.onChange || null}
                                                    renderInput={(params) =>
                                                        <TextField style={{flex: 2}} {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}} />}
                                                />
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="dateFinSoins">
                                        {({ input, meta }) => (
                                            <FormControl className="RoundDate">
                                                <DatePicker
                                                    label="au"
                                                    inputFormat="dd/MM/yyyy"
                                                    value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                                    onChange={input?.onChange || null}
                                                    renderInput={(params) =>
                                                        <TextField style={{flex: 2}} {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}} />}

                                                />
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
                                    disabled={!checker(values)}
                                    style={{marginRight: '15px'}}
                                >
                                    Effacer
                                </Button>
                                <Button variant="contained"
                                        type="submit" size="medium"
                                        disabled={!checker(values) || error || pristine}
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
                       prenom,
                       nom,
                       numeroAdherent,
                       birdDate,
                       envCodeList,
                       dateDeNaissance,
                       numAdherentFamillial,
                       dateDebutSoins,
                       dateFinSoins
                   } = values?.values;

                    if(birdDate || envCodeList || dateDeNaissance || numAdherentFamillial || dateDebutSoins || dateFinSoins) {
                        setDotShow(true)
                    } else {
                        setDotShow(false)
                    }
               }}/>}
                </LocalizationProvider></form>)}/>
        </div>
    );
}




