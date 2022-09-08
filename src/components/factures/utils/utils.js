import {useEffect, useRef} from "react";
import {statusesRIB} from "../../../utils/utils";

export const checker = (values) => {
    const {
        numFact, numEng, numAdh,
        domaine, dateDeSoins,
        dateReceivedStart, dateReceivedEnd,
        idPeriodeFact, dateFact,
        status, errorCode,
        numId, numJur,
        raisonSociale,
        department, numClient,
        nom, prenom, dateDeNaissance, birdDate,
        nir, cle
    } = values || {};
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
        numFact, numEng, numAdh,
        domaine, dateDeSoins,
        dateReceivedStart, dateReceivedEnd,
        idPeriodeFact, dateFact, status, errorCode,
        numId, numJur, raisonSociale,
        department, numClient,
        nom, prenom, dateDeNaissance, birdDate,
        nir, cle
    } = values || {};
    let result =  {
        panelInformationGenerales: (domaine || dateDeSoins || dateReceivedStart || dateReceivedEnd || idPeriodeFact || dateFact || status || errorCode)? true: true,
        panelInformationsEstablishement: (numId || numJur || raisonSociale || department)? true: true,
        panelInformationsBeneficiaires: (numClient || nom || prenom || dateDeNaissance || birdDate)? true: true,
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
