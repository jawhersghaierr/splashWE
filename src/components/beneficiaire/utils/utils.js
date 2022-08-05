import {useEffect, useRef} from "react";

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



export const statusRow = (formattedValue) => {

    let res = {}
    formattedValue?.forEach((stat, i) => {
        res[stat.statutRib] = {}
        res[stat.statutRib] = {...stat, ...statusesRIB[stat.statutRib]};
    })
    /*
        Ако има поне 1 ПС чийто риб е en attente - показваме En attente
        Aко има поне 1 ПС чийто риб е refused - показваме Refusé
        Ако ПС-ите нямат риб или той е деактивиран - показваме Manquant
        Ако ПС-ите нямат активна конвенция - тогава показваме Inactif
        Ако всичките рибове на ПС са валидирани - показваме Validé
    */

    if (res.ATT?.count > 0) return {...res, ATT: {...res.ATT, shown: true}};
    if (res.REF?.count > 0) return {...res, REF: {...res.REF, shown: true}};
    if (res.MIS?.count > 0) return {...res, MIS: {...res.MIS, shown: true}};
    if (res.NA?.count > 0) return {...res, NA: {...res.NA, shown: true}};
    if (res.ACT?.count > 0) return {...res, ACT: {...res.ACT, shown: true}};

    return res;
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
    console.log('checkInsidePanels > ', values)
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
