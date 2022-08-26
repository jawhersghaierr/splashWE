import {useEffect, useRef} from "react";
import {statusesRIB} from "../../ps/utils/utils";

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
        cle} = values || {};
    if(domaine || dateDeSoins || dateReceivedStart || dateReceivedEnd || idPeriodeFact || dateFact || status ||
        errorCode || numId || numJur || raisonSociale || department || numClient || nom || prenom || dateDeNaissance ||
        birdDate || nir || cle) {
        return true
    } else {
        return false
    }
}

export const checkInsidePanels = (values) => {

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
        cle} = values || {};
    let result =  {
        panelInformationGenerales: (domaine || dateDeSoins || dateReceivedStart || dateReceivedEnd || idPeriodeFact || dateFact || status || errorCode)? true: true,
        panelInformationsEstablishement: (numId || numJur || raisonSociale || department)? true: true,
        panelInformationsBeneficiaires: (numClient || nom || prenom || dateDeNaissance || birdDate)? true: true,
        panelNIR: (nir || cle)? true: false,
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
