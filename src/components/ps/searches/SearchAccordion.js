import React, {useState} from 'react'
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

import {
    setCriterias,
    selectCriterias,
    selectNumCriterias,
} from '../psSlice'

import './searchAccordion.scss'

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
    const numCriterias = useSelector(selectNumCriterias);
    const {disciplines, disciplinesIsFetching, disciplinesIsSuccess} = props;

    const onSubmit = async (values) => {

        await sleep(300);
        dispatch(setCriterias(values));
    };

    const [expanded, setExpanded] = useState({
        panel1: true,
        panel2: false,
        panel3: false,
        panel4: false,
        panel5: false,
        panel6: false,
    });

    const [panelExpanded, setPanelExpanded] = useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded({...expanded, [panel]: newExpanded});
    };

    const handleAccordionPanel = () => (event) => {
        setPanelExpanded(!panelExpanded);
    };

    const statusesRIB = [
        {libelle: 'ATT', code: 'ATT'},
        {libelle: 'ACT', code: 'ACT'},
        {libelle: 'REF', code: 'REF'},
        {libelle: 'NA', code: 'NA'}
    ];


    return (
        <div className={'formContent'}>
        <Form onSubmit={onSubmit}
            mutators={{
                ...arrayMutators,
                setValue: ([field, value], state, utils) => {
                    utils.changeValue(state, field, (value) => {
                        let _value = value;

                        if (_value?.disciplines?.length === 0 ||
                            (_value?.disciplines?.includes('all') && _value?.disciplines?.length > disciplines?.length)
                        ) _value = {..._value, disciplines: undefined}

                        if (_value?.disciplines?.includes('all')) _value = {..._value, disciplines: disciplines?.map(({code})=>code)}

                        if (_value?.statutRibs?.length === 0 ||
                            (_value?.statutRibs?.includes('all') && _value?.statutRibs?.length > statusesRIB?.length)
                        ) _value = {..._value, statutRibs: undefined}

                        if (_value?.statutRibs?.includes('all')) _value = {..._value, statutRibs: statusesRIB?.map(({code})=>code)}

                        return _value

                    })
                }
            }}

            render = {({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit} >
                <StyledCard sx={{ display: 'block', minWidth: 775 }} id="FinalForm" variant="outlined">
                    <CardHeader sx={{ bgcolor: '#f1f1f1', display: "flex",  }}

                        title={<div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Field name="numPartenaire" validate={composeValidators(mustBeNumber, minValue(3), maxValue(10))}>
                                {({ input, meta }) => (
                                    <div style={{flex: 2, marginRight: '20px'}}>
                                        <TextField
                                            id="NumPartenaire"
                                            variant="standard"
                                            error={meta.invalid}
                                            {...input}
                                            placeholder={'Nº de partenaire'}
                                            sx={{ borderRadius: '20px', background: '#fff', padding: '5px 15px', width: 1}}
                                            InputProps={{  disableUnderline: true }}
                                        />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <Field name="raisonSociale" >

                            {({ input, meta }) => (
                                <div style={{flex: 2}}>
                                    <TextField
                                        id="РaisonSociale"
                                        variant="standard"
                                        error={meta.invalid}
                                        {...input}
                                        placeholder={'Raison sociale'}
                                        sx={{ borderRadius: '20px', background: '#fff', padding: '5px 15px', width: 1 }}
                                        InputProps={{  disableUnderline: true }}
                                    />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                            </Field>
                            <div style={{width: 150, display: 'flex'}}>
                                {!panelExpanded && <IconButton onClick={handleAccordionPanel()}>
                                    <Badge color="secondary" variant="dot" invisible={false}><AddCircleIcon/></Badge>
                                </IconButton>}
                                {panelExpanded && <IconButton onClick={handleAccordionPanel()}><DoDisturbOnIcon/></IconButton>}
                                <Typography component="div" className='verticalTxt'><b>{(panelExpanded)? 'Criteries' : 'Effaser'} </b>{numCriterias}</Typography>
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

                            <Accordion expanded={expanded.panel1} onChange={handleChange('panel1')}>
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                    <Typography>Disciplines</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {disciplines && <Field name="disciplines" format={value => value || []}>

                                        {({input, meta}) => (
                                            <FormControl sx={{ m: 1, width: 300 }}>
                                                <InputLabel id="Disciplines-label">Discipline</InputLabel>
                                                <Select
                                                    id="Disciplines"
                                                    labelId="Disciplines-label"
                                                    multiple
                                                    sx={{width: 360}}
                                                    {...input}
                                                    input={<OutlinedInput className="RoundedEl" label="Disciplines"/>}
                                                    MenuProps={{autoFocus: false}}
                                                    renderValue={(selected) => {
                                                        if (selected.length > 1) {
                                                            return `${selected.length} disciplines séléctionnées`
                                                        }
                                                        return disciplines.find(item => item.code.toString() === selected.toString())?.libelle || '';
                                                    }}
                                                >

                                                    <MenuItem value="all" key='selectAll'>
                                                        <ListItemText
                                                            primary={(values?.disciplines?.length == disciplines.length) ? "Deselect All" : "Select All"}/>
                                                    </MenuItem>
                                                    {disciplines.map(({code, libelle}) => (
                                                        <MenuItem key={code} value={code}>
                                                            {libelle}
                                                        </MenuItem>
                                                    ))}
                                            </Select></FormControl>
                                        )}
                                    </Field>}

                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded.panel2} onChange={handleChange('panel2')}>
                                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                    <Typography>Adresse</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{display: 'flex'}}>

                                    <Field name="codePostal" >
                                        {({ input, meta }) => (
                                            <div>
                                                <TextField
                                                    id="CodePostal"
                                                    sx={{width: 360}}

                                                    error={meta.invalid}
                                                    label="Code Postal"
                                                    variant="outlined"
                                                    {...input}
                                                    className="RoundedEl"
                                                />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="ville">
                                        {({ input, meta }) => (
                                            <div>
                                                <TextField
                                                    id="Ville"
                                                    sx={{width: 360}}

                                                    label="Ville"
                                                    variant="outlined"
                                                    error={meta.invalid}
                                                    {...input}
                                                    className="RoundedEl"
                                                />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded.panel3} onChange={handleChange('panel3')}>
                                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                    <Typography>Statut du RIB</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <Field name="statutRibs" format={value => value || []}>

                                        {({ input, meta }) => (
                                            <FormControl sx={{ m: 1, width: 300 }}>
                                                <InputLabel id="StatutRib-label">StatutRib</InputLabel>
                                                <Select
                                                    id="StatutRibs"
                                                    labelId="StatutRib-label"
                                                    multiple
                                                    MenuProps={{autoFocus: false}}
                                                    {...input}
                                                    input={<OutlinedInput className="RoundedEl" label="StatutRibs"/>}
                                                    className="RoundedEl"
                                                    renderValue={(selected) => {
                                                        if (selected.length > 1) {
                                                            return `${selected.length} statuts séléctionnées`
                                                        }
                                                        return statusesRIB.find(item => item.code.toString() === selected.toString())?.libelle || '';
                                                    }}
                                                >
                                                    <MenuItem value="all" key='selectAll'>
                                                        <ListItemText sx={{fontWeight: 400}}
                                                            primary={(values?.statutRibs?.length == statusesRIB.length) ? "Deselect All" : "Select All"}/>
                                                    </MenuItem>
                                                    {statusesRIB.map(({code, libelle}) => (
                                                        <MenuItem key={code} value={code} >
                                                            {libelle}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Field>

                                </AccordionDetails>
                            </Accordion>

                            <div style={{ margin: '10px', padding:'10px'}}>

                                <Button variant="contained" type="submit" size="medium" disabled={submitting || pristine} className="RoundedEl">
                                    <SearchIcon/>Rechercher
                                </Button>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={form.reset}
                                    className="RoundedEl"
                                    disabled={submitting || pristine}
                                >
                                    Reset
                                </Button>
                            </div>
                        </CardActions>
                    </Collapse>
                </StyledCard>
               {<FormSpy onChange={(values)=>{
                   form.mutators.setValue(values)
               }}/>}
            </form>)}/>
        </div>
    );
}



const composeValidators = (...validators) => value => {
    let result = validators.reduce((error, validator) => error || validator(value), undefined)
    return result;
}

const required = value => (value ? undefined : 'Required')

const mustBeNumber = value => {
    let result = value;
    if (value) result = isNaN(value) ? 'Must be a number' : undefined
    return result;
}

const minValue = min => value => {
    let result = isNaN(value) || value.toString().length >= min ? undefined : `Should be greater than ${min} symbols`
    return result;
}

const maxValue = max => value => {
    let result = isNaN(value) || value.toString().length < max ? undefined : `Should be less than ${max} symbols`
    return result;
}
