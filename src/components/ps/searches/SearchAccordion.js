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

import {statusesRIB, validators, checker, checkInsidePanels} from '../utils/utils'
import {
    setCriterias,
    initCriterias,
    selectCriterias,
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
    const criterias = useSelector(selectCriterias);
    const {disciplines, disciplinesIsFetching, disciplinesIsSuccess} = props;

    const onSubmit = async (values) => {

        await sleep(300);
        dispatch(setCriterias(values));
    };

    const [expanded, setExpanded] = useState({
        panelDisciplines: false,
        panelAdresse: false,
        panelStatutRibs: false,
    });
    const [dotShow, setDotShow] = useState(false);

    const [panelExpanded, setPanelExpanded] = useState(false);

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
                            (_value?.statutRibs?.includes('all') && _value?.statutRibs?.length > Object.keys(statusesRIB).length)
                        ) _value = {..._value, statutRibs: undefined}

                        if (_value?.statutRibs?.includes('all')) _value = {..._value, statutRibs: Object.keys(statusesRIB).map((code)=>code)}

                        return _value

                    })
                }
            }}

            render = {({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit} >
                <StyledCard sx={{ display: 'block', minWidth: 775 }} id="FinalForm" variant="outlined">
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
                                        // sx={{ borderRadius: '20px', background: '#fff', padding: '5px 15px', width: 1 }}
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
                                    {disciplines && <Field name="disciplines" format={value => value || []}>

                                        {({input, meta}) => (
                                            <FormControl sx={{ m: 1, width: 300 }} className="RoundedEl">
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
                                                            return `${selected.length} disciplines sélectionnéеs`
                                                        }
                                                        return disciplines.find(item => item.code.toString() === selected.toString())?.libelle || '';
                                                    }}
                                                >

                                                    <MenuItem value="all" key='selectAll'>
                                                        <ListItemText
                                                            primary={(values?.disciplines?.length == disciplines.length) ? <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
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

                            <Accordion expanded={expanded.panelAdresse} onChange={handleChange('panelAdresse')}>
                                <AccordionSummary aria-controls="panelAdresse-content" id="panelAdresse-header">
                                    <Typography>Adresse</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{display: 'flex'}}>

                                    <Field name="codePostal"
                                           validate={validators.composeValidators(validators.mustBeNumber, validators.minValue(5), validators.maxValue(6))}>
                                        {({ input, meta }) => (
                                            <div style={{marginRight: '15px'}}>
                                                <TextField
                                                    id="CodePostal"
                                                    sx={{width: 360}}

                                                    error={meta.invalid}
                                                    label="Code Postal"
                                                    variant="outlined"
                                                    {...input}
                                                    className="RoundedEl"
                                                />
                                                {meta.error && meta.touched && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="ville"  validate={validators.composeValidators(validators.minValue(3), validators.maxValue(51))}>
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

                                    <Field name="statutRibs" format={value => value || []}>

                                        {({ input, meta }) => (
                                            <FormControl sx={{ m: 1, width: 300 }} className="RoundedEl">
                                                <InputLabel id="StatutRib-label">Statut RIB</InputLabel>
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
                                                            return `${selected.length} statuts sélectionnés`
                                                        }
                                                        return statusesRIB[selected[0]].label || '';
                                                    }}
                                                >
                                                    <MenuItem value="all" key='selectAll'>
                                                        <ListItemText sx={{fontWeight: 400}}
                                                                      primary={(values?.statutRibs?.length == Object.keys(statusesRIB).length) ? <b>Désélectionner tout</b> : <b>Sélectionner tout</b>}/>
                                                    </MenuItem>
                                                    {Object.keys(statusesRIB).map(code => (
                                                        <MenuItem key={code} value={code} >
                                                            {statusesRIB[code].label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
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
                                        disabled={submitting || pristine}
                                        className="RoundedEl">
                                    <SearchIcon/>Rechercher
                                </Button>

                            </div>
                        </CardActions>
                    </Collapse>
                </StyledCard>
               {<FormSpy onChange={(values) => {
                   form.mutators.setValue(values)
                   const {disciplines, statutRibs, codePostal, ville} = values?.values;
                    if(disciplines || statutRibs || codePostal || ville) {
                        setDotShow(true)
                    } else {
                        setDotShow(false)
                    }
               }}/>}
            </form>)}/>
        </div>
    );
}


