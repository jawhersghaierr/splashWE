export const statusesRIB = {
    ATT: {label: 'En attente', color: '#FFD4AD'},
    REF: {label: 'Refusé', color: '#FFA3A3'},
    MIS: {label: 'Manquant', color: '#B3EFF8'},
    NA: {label: 'Inactif', color: '#99ACBB'},
    ACT: {label: 'Validé', color: '#C7F99F'}
}


const composeValidators = (...validators) => value => {
    let result = validators.reduce((error, validator) => {
        return error || validator(value)
    }, undefined)
    return result;
}

const required = value => (value ? undefined : 'Required')

const mustBeNumber = value => {
    let result = value;
    if (value) result = isNaN(value) ? 'Format incorrect' : undefined
    return result;
}

const minValue = min => value => {
    let result = (value === undefined || value.toString().length >= min) ? undefined : `minimum ${min} caractères`
    return result;
}

const maxValue = max => value => {
    let result = (value === undefined || value.toString().length < max) ? undefined : `maximum ${max-1} caractères`
    return result;
}


export const validators = {
    composeValidators,
    required,
    mustBeNumber,
    minValue,
    maxValue
}
