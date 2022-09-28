import {useEffect, useRef} from "react";
import {statusesRIB} from "../../../utils/utils";

export const checker = (values) => {
    const {
        type, numEng, numAdh,
        domaine, dateAdmission,
        receptionDateStart, receptionDateEnd,
        occId, dateFact,
        statut, motif, sousMotif,
        finessGeo, finessJur,
        raisonSociale,
        dеpartement, amc,
        nom, prenom, dateNaiss, birdDate,
        nir, cle
    } = values || {};
    if(type || numEng || numAdh || domaine || dateAdmission || receptionDateStart || receptionDateEnd || occId || dateFact || statut ||
        motif || finessGeo || finessJur || raisonSociale || dеpartement || amc || nom || prenom || dateNaiss ||
        birdDate || nir || cle) {
        return true
    } else {
        return false
    }
}

export const checkInsidePanels = (values) => {

    const {
        type, numEng, numAdh,
        domaine, dateAdmission,
        receptionDateStart, receptionDateEnd,
        occId, dateFact, statut, motif,
        finessGeo, finessJur, raisonSociale,
        dеpartement, amc, sousMotif,
        nom, prenom, dateNaiss, birdDate,
        nir, cle
    } = values || {};
    let result =  {
        panelInformationGenerales: (domaine || dateAdmission || receptionDateStart || receptionDateEnd || occId || dateFact )? true: true,
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




// ROC_RLTN_STATUSES_TYPES
// ROC_RLTN_TYPES_MOTIFS
// ROC_RLTN_MOTIFS_SOUS_MOTIFS

export const reshapeStatusFromTypes = ({type, nomRefs}) => {
    let tmpTypes = []
    // debugger
    type.forEach( _type =>
        nomRefs.ROC_RLTN_STATUSES_TYPES.filter( e => Object.values(e)[0].includes(_type) && e ).forEach( e => tmpTypes.push(Object.keys(e)[0]) )
    )

    return [...new Set(tmpTypes)]
}

export const reshapeMotifsFromTypes = ({type, nomRefs}) => {
    let tmpTypes = []
    // debugger
    type.forEach( _type =>
        nomRefs.ROC_RLTN_TYPES_MOTIFS.filter( e => Object.values(e)[0].includes(_type) && e ).forEach( e => tmpTypes.push(Object.keys(e)[0]) )
    )

    return [...new Set(tmpTypes)]
}


export const reshapeSubMotifsFromMotif = ({motif, nomRefs}) => {
    let tmpSubMotif = []
    let result = {}

    motif.forEach( mot => {
        let tmpResult = nomRefs.ROC_RLTN_MOTIFS_SOUS_MOTIFS.find(sub => mot == Object.keys(sub)[0])
        if ( tmpResult && Object.values(tmpResult).length > 0 ) Object.values(tmpResult).forEach(el => tmpSubMotif.push(el))
    })

    tmpSubMotif.flat().forEach(el => {if (nomRefs.ROC_SOUS_MOTIFS[el]) result[el] = nomRefs.ROC_SOUS_MOTIFS[el]})
    return (Object.keys(result).length > 0)? result : null;
}


export const reshapeMotifFromStatus = ({statut, nomRefs}) => {
    /**
     * reshaping nomRefs.ROC_MOTIFS trough nomRefs.ROC_RLTN_STATUSES_TYPES based on localStatus
     */
    if (!statut && !nomRefs) return null

    if (statut) {
        let _motif = {}
        if (nomRefs && statut.length > 0) {
            statut?.forEach(stat => {

                nomRefs.ROC_RLTN_STATUSES_TYPES?.filter(ee => {
                    if (Object.values(ee).find(e => e == stat)) return Object.keys(ee)
                }).map(code=>_motif[Object.keys(code)[0]] =  nomRefs.ROC_MOTIFS[Object.keys(code)[0]])

            })
        }
        return _motif || null;
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
}
