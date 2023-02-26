import React, {useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Form, Field } from 'react-final-form';

import SearchIcon from '@mui/icons-material/Search';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Button, CardHeader, FormControl, TextField }  from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fr } from "date-fns/locale";

import { setCriterias, initCriterias, selectCriterias } from '../intraitablesSlice'
import { allowSearch, validators } from '../../../utils/validator-utils';
import { StyledCard } from "../../shared";

import './searchAccordion.scss'


export default function SearchAccordion(props) {

    const dispatch = useDispatch();
    const criterias = useSelector(selectCriterias);
    const formRef= useRef(null);

    const onSubmit = (values) => dispatch(setCriterias(values));

    return (
        <div className={'formContent'}>
        <Form onSubmit={onSubmit}
            initialValues={{ ...criterias }}
            render = {({ handleSubmit, form, submitting, pristine, values }) => (
                formRef.current = form,
                <form onSubmit={handleSubmit} >
                <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
                <StyledCard sx={{ display: 'block', minWidth: 775 }} id="IntraitablesSearchForm" variant="outlined">
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


                            <Field name="periodFrom" validate={validators.composeValidators(validators.noFutureDate())} >
                                {({ input, meta }) => (
                                    <FormControl className="RoundDate" style={{ flex: '1 0 21%', marginRight: '15px'}}>
                                        <DatePicker
                                            label={'Date d\'intégration du *'}
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
                            <Field name="periodTo" validate={validators.composeValidators(validators.beforeThan(values, 'periodFrom'), validators.noFutureDate())} >
                                {({ input, meta }) => (
                                    <FormControl className="RoundDate" style={{ flex: '1 0 21%'}}>
                                        <DatePicker
                                            label={'au'}
                                            inputFormat="dd/MM/yyyy"
                                            value={(input?.value === '' || input?.value == undefined)  ? null : input?.value}
                                            onChange={input?.onChange || null}
                                            maxDate={new Date()}
                                            renderInput={(params) =>
                                                <div style={{flex: 2, marginRight: '20px', outline: 'none',}}>
                                                    <TextField
                                                        className="RoundedEl"
                                                        sx={{width: '100%', flex: 2 }}
                                                        error={meta.invalid}
                                                        {...{...params, inputProps: {...params.inputProps, placeholder : "jj/mm/aaaa"}}}
                                                    />
                                                </div>}
                                        />
                                        {meta.error && <span className={'MetaErrInfo'}>{meta.error}</span>}
                                    </FormControl>
                                )}
                            </Field>

                            <Button
                                variant="contained"
                                type="button"
                                onClick={()=> {
                                    dispatch(initCriterias());
                                    form.reset()
                                }}
                                className="RoundedEl"
                                disabled={!allowSearch(values)}
                                style={{marginRight: '15px'}} >
                                Effacer
                            </Button>

                            <Button
                                variant="contained"
                                type="submit"
                                size="medium" className='RoundedEl'
                                disabled={!allowSearch(values)} >
                                <SearchIcon/>Rechercher
                            </Button>
                        </div>}
                    />

                </StyledCard>

                </LocalizationProvider></form>)}/>
        </div>
    );
}




