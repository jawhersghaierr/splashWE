import {useEffect, useRef} from "react";

/**
 * Labels and Colors for Statuses
 * *******************************************************************************************************************
 */

export const paiementsVirementStatus = {
    DOUBLON: {label: 'Doublon', color: '#FFA3A3'},
    VALIDE: {label: 'Valide', color: '#C7F99F'},
}

// export const rocStatus = {
//     VALIDE: {label: 'Valide', color: '#C7F99F'},
//     INVALIDE: {label: 'Remboursé', color: '#B3EFF8'},
//     CALCULEE: {label: 'Suspendu', color: '#FFD4AD'},
//     ACCORDEE: {label: 'Erreur d\'extraction', color: '#FFA3A3'},
//     REJETEE: {label: "Rejetée", color: '#FFA3A3'},
// }

export const rocStatus = {
    VALIDE: {label: 'Valide', color: '#C7F99F'},
    INVALIDE: {label: 'Invalide', color: '#FFA3A3'},
    CALCULEE: {label: 'Calculée', color: '#C7F99F'},
    ACCORDEE: {label: 'Accordée', color: '#C7F99F'},
    REJETEE: {label: "Rejetée", color: '#FFA3A3'},
    ANNULEE: {label: "Annulée", color: '#FFD4AD'},
    FACTUREE: {label: "Facturée", color: '#B3EFF8'}
}

export const paiementsStatus = {
    VALIDE: {label: 'Valide', color: '#C7F99F'},
    VALIDE_HCP: {label: 'Valide HCP', color: '#C7F99F'},
    SUSPENDU: {label: 'Suspendu', color: '#FFD4AD'},
    ERREUR_EXTRACTION: {label: 'Erreur d\'extraction', color: '#FFA3A3'},
    EN_ATTENTE: {label: 'En attente', color: '#FFD4AD'},
    EXTRAIT: {label: 'Extrait', color: '#C7F99F'},
    ERREUR: {label: 'Erreur', color: '#FFA3A3'},
    ANNULE: {label: 'Annulé', color: '#FFA3A3'},
    PAYE: {label: 'Payé', color: '#C7F99F'},
    REMBOURSE: {label: 'Remboursé', color: '#B3EFF8'},
    EN_COURS: {label: 'En cours', color: '#FFD4AD'}
}

export const factureConfigurationStatus = {
    A: {label: 'Active', color: '#C7F99F'},
    S: {label: 'Suspendue', color: '#FFD4AD'},
    I: {label: 'Inactive', color: '#FFA3A3'},
}


export const statusesRIB = {
    ATT: {label: 'En attente', color: '#FFD4AD'},
    REF: {label: 'Refusé', color: '#FFA3A3'},
    MIS: {label: 'Manquant', color: '#B3EFF8'},
    NA: {label: 'Inactif', color: '#99ACBB'},
    ACT: {label: 'Validé', color: '#C7F99F'}
}

export const facturesStatus = {
    Valide: {label: 'Valide', color: '#C7F99F'},
    Radié: {label: 'Radié', color: '#FFA3A3'},
    Suspendu: {label: 'Suspendu', color: '#FFD4AD'},
    ANNULEE: {label: "Annulée",color: '#FFA3A3'},
    A_RECYCLER: {label: "A recycler", color: '#FFD4AD'},
    BAP: {label: "Bon à payer", color: '#C7F99F'},
    EN_ATTENTE: {label: "En attente", color: '#FFD4AD'},
    PAYEE: {label: "Payée", color: '#C7F99F'},
    PENDING: {label: "En cours", color: '#FFD4AD'},
    REJETEE: {label: "Rejetée", color: '#FFA3A3'},
    REMBOURSEE: {label: "Remboursée", color: '#B3EFF8'}
}

export const benefStatuses = {
    Valide: {label: 'Valide', color: '#C7F99F'},
    Radié: {label: 'Radié', color: '#FFA3A3'},
    Suspendu: {label: 'Suspendu', color: '#FFD4AD'},
}


/**
 * Form Validators
 * *******************************************************************************************************************
 */
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

const noFutureDate = () => value => {

    let date1, date2 = null;

    if ( value && value !== undefined && value !== ''  ){
        date1 = new Date(value)
        date2 = new Date();
        if (date1 > date2) return `La date ne peut pas être ultérieure à la date du jour`
    }
    return undefined
}

const notBiggerThan = max => value => {
    let result = (isNaN(value) || value === undefined || Number(value) < Number(max)) ? undefined : `maximum ${max-0.01}`
    return result;
}





const beforeThan = (values, thanField) => value => {
    let date1, date2 = null;

    if ( value && value !== undefined && value !== '' && values[thanField] && values[thanField] !== '' && values[thanField] !== undefined ){
        date1 = new Date(value)
        date2 = new Date(values[thanField])

        if (date1 < date2) return `Date après le: ${convertDate(values[thanField])}`
    }
    return undefined
}

const afterThan = (values, thanField) => value => {

    let date1, date2 = null;

    if (
        value && value !== undefined && value !== '' &&
        values[thanField] && values[thanField] !== '' && values[thanField] !== undefined
    ){
        date1 = new Date(value)
        date2 = new Date(values[thanField])

        if (date1 > date2) return `should be Lower than ${Object.values(thanField)}`
    }
    return undefined
}

/**
 *
 * @param values from final-form
 * @param associed array of strings (keys from form)
 * @returns {function(*=): string}
 */
const associated = (values, associed, nameMsg) => value => {

    let isOk = true

    if (associed && value && value !== undefined && value !== '') {
        isOk = false
        associed.forEach(el=> {

            if ( el == 'dateDeNaissance' && (!values[el] || values[el] == undefined || values[el] == '') ){

                if ( !(!values['birdDate'] || values['birdDate'] == undefined || values['birdDate'] == '') ){
                    isOk = true
                }
            } else if ( !(!values[el] || values[el] == undefined || values[el] == '') ){
                isOk = true
            }
        })
    }

    return (isOk) ? undefined : `Vous ne pouvez pas rechercher un bénéficiaire uniquement par ${nameMsg?.toLowerCase()}. Merci d'ajouter un critère de recherche.`
}


const composeValidators = (...validators) => value => {
    let result = validators.reduce((error, validator) => {
        return error || validator(value)
    }, undefined)
    return result;
}

export const validators = {
    composeValidators,
    required,
    mustBeNumber,
    minValue,
    maxValue,
    noFutureDate,
    associated,
    beforeThan,
    afterThan,
    notBiggerThan
}


/**
 *  Hook for Previous State
 * *******************************************************************************************************************
 */
export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    },[value]);
    return ref.current;
}


/**
 * Calculate CLE from National Identification Number
 * *******************************************************************************************************************
 */
export const calcCleFromNir = (values) => {
    let ssn = {};
    ssn.cle = null

    let cle = null;
    let {nir} = values

    if (nir?.length > 13) {
        console.log('invalid number')
    }

    let pattern = /^([1278])(\d{2})(0[1-9]|1[0-2]|20)(\d{2}|2[AB])(\d{3})(\d{3})/i;
    let match = pattern.exec(nir);

    if (match && !ssn.cle ) {

        ssn.gender = match[1]
        ssn.year = match[2];
        ssn.month = match[3];
        ssn.department = match[4];
        ssn.city = match[5];
        ssn.certificate = match[6];
        ssn.key = match[7];

        if (ssn.certificate == '000' || ssn.key * 1 > 97) {
            console.log('invalid certificate')
            return null
        }

        if (ssn.department == '2A') {
            ssn.department = '19';
        } else if (ssn.department == '2B') {
            ssn.department = '18'
        } else if (ssn.department == '97') {
            ssn.department += ssn.city[0];
            if (ssn.department * 1 < 970 || ssn.department * 1 >= 989) {
                console.log('invalid department');
                return null
            }
            ssn.city = ssn.city.substring(1);
            if (ssn.city * 1 < 1 || ssn.city * 1 > 90) {
                console.log('invalid city');
                return null
            }
        } else if (ssn.city * 1 < 1 || ssn.city * 1 > 990) {
            console.log('invalid city');
            return null
        }

        let insee = ssn.gender +
            ssn.year + ssn.month +
            ssn.department.replace('A', '0').replace('B', '0') +
            ssn.city + ssn.certificate;

        cle = 97 - (insee * 1) % 97;
        if (cle < 9) cle = '0' + cle;
        return cle

    } else {
        return null
    }
}


/**
 * Date Formatters
 * *******************************************************************************************************************
 */

export const dateConvertNaissanceRAW = (dat) => {
    if (dat && dat !== undefined && dat !== '') {
        return dat?.split('-').reverse().join('/')
    } else {
        return '';
    }
}

/**
 *
 * @param dat String yyyy-mm-dd (Can be Lunar type, meaning there have no restriction in number of days and month as 1900-35-35)
 * @returns {string} dd/mm/yyyy
 */
export const dateConvertNaissance = (dat) => {
    if (dat == undefined) return ''

    let pattern = /^(\d{4})(\d{2})(\d{2})/i;
    let match = pattern.exec(dat);
    let ssn = {}

    ssn.year = match[1];
    ssn.month = match[2];
    ssn.day = match[3];

    if (dat && dat !== undefined && dat !== '') {
        let {year, month, day} = ssn;
        return `${day}/${month}/${year}`
    } else {
        return '';
    }
}
/**
 *
 * @param dat String yyyy-mm-dd
 * @param hh if true add in result HH:MM:SS
 * @returns {string} dd/mm/yyyy hh:mm:ss
 */
export const convertDate = (dat, hh = false) => {
    if (dat && dat !== undefined && dat !== '') {
        if (!hh) {
            return new Date(dat).toLocaleDateString('fr');
        } else {
            return new Date(dat).toLocaleString('fr', {hour12: false})
        }
    } else {
        return '';
    }
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

/**
 *
 * @param dateStr
 * console.log(new Intl.DateTimeFormat('en-US').format(date));
 * @constructor
 */
export const IntlDateWithHHMM = (dateStr) => {
    const p = new Intl.DateTimeFormat('fr', {
        year:'numeric',
        month:'2-digit',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
        hour12: false,
        // timeZone:'UTC'
    }).formatToParts(dateStr).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
    }, {});

    return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}.000Z`;
};


/**
 *
 * @type {Intl.NumberFormat}
 *
 * usage currencyFormatter.format(20)
 * return 20,00 €
 */
export const currencyFormatter = new Intl.NumberFormat('fr', {
    style: 'currency',
    currency: 'EUR',
});


