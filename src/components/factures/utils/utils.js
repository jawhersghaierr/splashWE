import {useEffect, useRef} from "react";
import {statusesRIB} from "../../ps/utils/utils";

export const facturesStatus = {
    Valide: {label: 'Valide', color: '#C7F99F'},
    Radié: {label: 'Radié', color: '#FFA3A3'},
    Suspendu: {label: 'Suspendu', color: '#FFD4AD'},

    ANNULEE: {label: "Annulée",color: '#FFA3A3'},
    A_RECYCLER: {label: "A recycler", color: '#FFD4AD'},
    BAP: {label: "Bon à payer", color: '#C7F99F'},
    EN_ATTENTE: {label: "En attente", color: '#FFD4AD'},
    PAYEE: {label: "Payee", color: '#C7F99F'},
    PENDING: {label: "En cours", color: '#FFD4AD'},
    REJETEE: {label: "Rejetée", color: '#FFA3A3'},
    REMBOURSEE: {label: "Remboursee", color: '#C7F99F'}
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

/**
 *
 * @param values from final-form
 * @param associed array of strings (keys from form)
 * @returns {function(*=): string}
 */
const associated = (values, associed) => value => {

    let isOk = true
    let needed = {}

    if (associed && value && value !== undefined && value !== '') {

        Object.keys(associed).forEach(el=> {

            if ( el == 'dateDeNaissance' && (!values[el] || values[el] == undefined || values[el] == '') ){

                if (
                    ( !values['birdDate'] || values['birdDate'] == undefined || values['birdDate'] == '' )
                ){
                    isOk = false
                    needed[el] = associed[el]
                }
            } else if ( !values[el] || values[el] == undefined || values[el] == '' ){
                isOk = false
                needed[el] = associed[el]
            }
        })
    }

    return (isOk) ? undefined : `need more values (${Object.values(needed).join(', ')})`
}

const biggerThan = (values, than) => value => {
    let date1, date2 = null;
    console.log('values[Object.keys(than)[0]] > ', values[Object.keys(than)[0]])

    if ( value && value !== undefined && value !== '' && values[Object.keys(than)[0]] && values[Object.keys(than)[0]] !== '' && values[Object.keys(than)[0]] !== undefined ){
        date1 = new Date(value).toLocaleDateString('fr');
        date2 = new Date(values[Object.keys(than)[0]]).toLocaleDateString('fr');

        console.log(date1)
        console.log(date2)

        if (date1 < date2) return `should be Bigger than ${Object.values(than)[0]}`
    }
    return undefined
}

const lowerThan = (values, than) => value => {

    let date1, date2 = null;

    console.log('values[Object.keys(than)[0]] > ', values[Object.keys(than)[0]])

    if (
        value && value !== undefined && value !== '' &&
        values[Object.keys(than)[0]] && values[Object.keys(than)[0]] !== '' && values[Object.keys(than)[0]] !== undefined
    ){
        date1 = new Date(value).toLocaleDateString('fr');
        date2 = new Date(values[Object.keys(than)[0]]).toLocaleDateString('fr');

        console.log(date1)
        console.log(date2)

        if (date1 > date2) return `should be Lower than ${Object.values(than)[0]}`
    }
    return undefined
}

export const validators = {
    composeValidators,
    required,
    mustBeNumber,
    minValue,
    maxValue,
    associated,
    biggerThan,
    lowerThan,
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
    if(numFact || numEng || numAdh || domaine || dateDeSoins || dateReceivedStart || dateReceivedEnd || idPeriodeFact || dateFact || status ||
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


export const calcCleFromNir = (values) => {
    let ssn = {};
    ssn.cle = null

    let cle = null;
    let {nir} = values

    if (nir?.length > 13) {
        console.log('invalid number')
    }

    // let pattern = /^([1278])(\d{2})(0[1-9]|1[0-2]|20)(\d{2}|2[AB])(\d{3})(\d{3})(\d{2})/i;
    let pattern = /^([1278])(\d{2})(0[1-9]|1[0-2]|20)(\d{2}|2[AB])(\d{3})(\d{3})/i;
    let match = pattern.exec(nir);
    let valid = false

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

        console.log('ssn: ', ssn)
        console.log('cle = ', cle);

        valid = true;
        return cle
        // form.getFieldState('cle').change(cle)
        // 27 41 14 75 66 941

    }else {
        console.log('not match')
        return null
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



export const dateConvertNaissanceRAW = (dat) => {
    if (dat && dat !== undefined && dat !== '') {
        return dat?.split('-').reverse().join('/')
    } else {
        return '';
    }
}

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

export const convertDate = (dat) => {
    if (dat && dat !== undefined && dat !== '') {
        return new Date(dat).toLocaleDateString('fr');
    } else {
        return '';
    }
}


export const currencyFormatter = new Intl.NumberFormat('fr', {
    style: 'currency',
    currency: 'EUR',
});
//
// export const IntlDateWithHHMM = (dateStr) => {
//     const p = new Intl.DateTimeFormat('fr', {
//         year:'numeric',
//         month:'2-digit',
//         day:'2-digit',
//         hour:'2-digit',
//         minute:'2-digit',
//         second:'2-digit',
//         hour12: false,
//         timeZone:'UTC'
//     }).formatToParts(dateStr).reduce((acc, part) => {
//         acc[part.type] = part.value;
//         return acc;
//     }, {});
//
//     return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
// };
