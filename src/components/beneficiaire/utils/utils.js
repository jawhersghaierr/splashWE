import {useEffect, useRef} from "react";

export const benefStatuses = {
    Valide: {label: 'Valide', color: '#C7F99F'},
    Radié: {label: 'Radié', color: '#FFA3A3'},
    Suspendu: {label: 'Suspendu', color: '#FFD4AD'},
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


export const checker = (values) => {
    const {birdDate, prenom, nom, numAdherentIndividuel, dateDeNaissance, numAdherentFamillial, enviroment, dateDebutSoins, dateFinSoins} = values || {};
    if(birdDate || prenom || nom || numAdherentIndividuel || dateDeNaissance || numAdherentFamillial || enviroment || dateDebutSoins || dateFinSoins) {
        return true
    } else {
        return false
    }
}

export const checkInsidePanels = (values) => {

    const {birdDate, prenom, nom, numAdherentIndividuel, dateDeNaissance, numAdherentFamillial, enviroment, dateDebutSoins, dateFinSoins} = values || {};
    let result =  {
        panelBeneficiaires: (dateDeNaissance || birdDate)? true: false,
        panelInfoOMC: (numAdherentFamillial || enviroment || dateDebutSoins || dateFinSoins)? true: false,
    }
    console.log(result)
    return result
}

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    },[value]);
    return ref.current;
}

export const isValidDate = (d) => {
    try {
        d.toISOString();
        return true;
    }
    catch(ex) {
        return false;
    }
}

export const dateConvertNaissance = (dat) => {
    if (dat && dat !== undefined && dat !== '') {
        return dat?.split('-').reverse().join('/')
    } else {
        return '';
    }
}

export const convertDate = (dat) => {
    if (dat && dat !== undefined && dat !== '') {
        return new Date(dat).toLocaleDateString('en-GB');
    } else {
        return '';
    }
}
