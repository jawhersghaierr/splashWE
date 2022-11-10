import {statusesRIB} from "../../../utils/status-utils";
import {IntlDateWithHHMM} from "../../../utils/convertor-utils";

export const checkInsidePanels = (values) => {

    const {
        type, numEng, numAdh,
        domaine, dateAdmission,
        receptionDateStart, receptionDateEnd,
        idPerFact, dateFact, statut, motif,
        finessGeo, finessJur, raisonSociale,
        dеpartement, amc, sousMotif,
        nom, prenom, dateNaiss, birdDate,
        nir, cle
    } = values || {};
    let result =  {
        panelInformationGenerales: (domaine || dateAdmission || receptionDateStart || receptionDateEnd || idPerFact || dateFact )? true: true,
        panelInformationsEstablishement: (finessGeo || finessJur || raisonSociale || dеpartement)? true: true,
        panelInformationsBeneficiaires: (amc || nom || prenom || dateNaiss || birdDate)? true: true,
        panelNIR: (nir || cle)? true: false,
    }
    return result
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

const REL_TYPE_STATUS = {
    IDB: ['VALIDE', 'INVALIDE', 'REJETEE'],
    SIM: ['CALCULEE', 'INVALIDE', 'REJETEE', 'ANNULEE'],
    CLC: ['ACCORDEE', 'INVALIDE', 'REJETEE', 'FACTUREE', 'ANNULEE'],
    DEL: ['VALIDE', 'INVALIDE', 'REJETEE']
}


/**
 *
 * @param type
 * @param nomRefs
 * @returns {*[]}
 */
// ROC_RLTN_STATUSES_TYPES
// ROC_RLTN_TYPES_MOTIFS
// ROC_RLTN_MOTIFS_SOUS_MOTIFS

export const getStatusFromTypes = ({type = [], nomRefs}) => {
    let tmpStatus = []
    if (type.length > 0) {
        type.forEach(_type => Object.keys(nomRefs.ROC_RLTN_STATUSES_TYPES).forEach(_stat => nomRefs.ROC_RLTN_STATUSES_TYPES[_stat].includes(_type) && tmpStatus.push(_stat)))
        tmpStatus = [...new Set(tmpStatus)]
    } else tmpStatus = Object.keys( nomRefs.ROC_STATUSES )

    // console.log('available types >', type)
    // console.log('getStatusFromTypes >', tmpStatus)
    return tmpStatus
}

export const getMotifsFromTypes = ({type = [], nomRefs}) => {
    let tmpMotifs = []
    if (type.length > 0 ) {
        type.forEach(_type => {
            if (_type !== 'all') tmpMotifs = [...nomRefs.ROC_RLTN_TYPES_MOTIFS[_type], ...tmpMotifs]
        })
        tmpMotifs = [...new Set(tmpMotifs)]
    } else tmpMotifs = Object.keys( nomRefs.ROC_MOTIFS )

    return tmpMotifs
}

export const getSubMotifsFromMotifsFromTypes = ({type = [], nomRefs}) => {
    let tmpMotifs = []
    if (type.length > 0) {
        type.forEach(_type => tmpMotifs = [...nomRefs.ROC_RLTN_TYPES_MOTIFS[_type], ...tmpMotifs])
        tmpMotifs = [...new Set(tmpMotifs)]

    } else tmpMotifs = Object.keys( nomRefs.ROC_SOUS_MOTIFS )

    return tmpMotifs
}


export const getAvailableTypesFromStatuses = ({statut = [], nomRefs}) => {
    let tmpTypes = []
    statut.forEach( _statut => {
        if (_statut !== 'all') tmpTypes = [...nomRefs.ROC_RLTN_STATUSES_TYPES[_statut], ...tmpTypes]
    })
    tmpTypes = [...new Set(tmpTypes)]

    return tmpTypes
}

export const getSubMotifsFromTypes = ({type = [], nomRefs}) => {
    let tmpMotifs = []
    if (type.length > 0 && nomRefs) {
        type.forEach(_type => {
            if (_type !== 'all') tmpMotifs = [...nomRefs.ROC_RLTN_TYPES_SUB_MOTIFS[_type], ...tmpMotifs]
        })
        tmpMotifs = [...new Set(tmpMotifs)]

    } else tmpMotifs = Object.keys( nomRefs.ROC_SOUS_MOTIFS )

    return tmpMotifs
}


export const getSubMotifsFromMotif = ({motif = [], nomRefs}) => {
    console.log('getSubMotifsFromMotif -> motif ', motif)
    let tmpSubCode = []
    if (motif && motif.length > 0) {
        motif.forEach(_motif => {
            if (_motif !== 'all' && nomRefs.ROC_RLTN_MOTIFS_SOUS_MOTIFS[_motif]) tmpSubCode = [...nomRefs.ROC_RLTN_MOTIFS_SOUS_MOTIFS[_motif], ...tmpSubCode]
        })
        tmpSubCode = [...new Set(tmpSubCode)]
    } else return []

    return tmpSubCode
}


// TODO to be checked one more time and optimise
/**
 *
 * @param statut
 * @param nomRefs
 * @returns {null|{}}
 */
export const reshapeMotifFromStatus = ({statut, nomRefs}) => {
    /**
     *
     *
     *
     // ROC_RLTN_TYPES_MOTIFS
     // ROC_RLTN_STATUSES_TYPES
     * reshaping nomRefs.ROC_MOTIFS trough nomRefs.ROC_RLTN_STATUSES_TYPES based on localStatus
     */
    if (!statut && !nomRefs) return null
    console.log('chosen statuts ', statut)
    if (statut) {

        let _motif = {}

        if (nomRefs && statut.length > 0) {

            nomRefs.ROC_RLTN_STATUSES_TYPES
            statut?.forEach(stat => {


            })
        }
        return _motif || null;
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
}



export const reshapeCriterias = ({criterias}) => {
    let {
        dateDeSoins, receptionDateStart, receptionDateEnd, idPerFact, dateFact, status, dateAdmission, amc,
        errorCode, numId, numJur, raisonSociale, department, numClient, nom, prenom, dateNaiss, birdDate, nir, cle
    } = criterias;

    let filters = {...criterias}

    if (dateDeSoins && dateDeSoins != '' && dateDeSoins != undefined) {
        filters.dateDeSoins = new Date(dateDeSoins).toLocaleDateString('sv');
    }
    if (dateAdmission && dateAdmission != '' && dateAdmission != undefined) {
        filters.dateAdmission = new Date(dateAdmission).toLocaleDateString('sv');
    }
    if (receptionDateStart && receptionDateStart != '' && receptionDateStart != undefined) {
        filters.receptionDateStart = IntlDateWithHHMM(receptionDateStart)
        // filters.receptionDateStart = new Date(receptionDateStart).toISOString()//.toLocaleDateString('sv');
    }

    if (receptionDateEnd && receptionDateEnd != '' && receptionDateEnd != undefined) {
        filters.receptionDateEnd = IntlDateWithHHMM(receptionDateEnd)
        // filters.receptionDateEnd = new Date(receptionDateEnd).toISOString()//.toLocaleDateString('sv');//
    }

    if (dateNaiss && dateNaiss != '' && dateNaiss != undefined) {
        filters.dateNaiss = new Date(dateNaiss).toLocaleDateString('sv').replaceAll('-', '');
    }

    if (birdDate && birdDate != '' && birdDate != undefined) {
        if (birdDate instanceof Date && !isNaN(birdDate)){
            filters.dateNaiss = new Date(birdDate).toLocaleDateString('sv').replaceAll('-', '');
        } else filters.dateNaiss = birdDate.split('/').reverse().join('');
    }

    delete filters.birdDate;

    if (idPerFact && idPerFact !== '' && idPerFact !== undefined) {
        if (idPerFact.length > 22 && idPerFact.length < 27) filters.idPerFact = idPerFact.substring(0, 22);

        if (idPerFact.length == 27) {
            idPerFact = idPerFact.split(' / ')
            filters.occId = idPerFact[1]
            filters.idPerFact = idPerFact[0]
        }
    }
    /**
     * just for Facturation
     *
                    if (nir && nir != undefined && cle && cle != undefined) {
                    filters.nir = `${nir}${(cle.length < 2 )? '0' + cle: cle}`
                }

     */

    if (amc && amc !== undefined) {
        filters.amc = []
        amc.forEach(el => filters.amc.push(el.value))
    }


    filters.cashe = null
    return filters

}
