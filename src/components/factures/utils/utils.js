import {useEffect, useRef} from "react";
import {statusesRIB} from "../../../utils/status-utils";

export const checkInsidePanels = (values) => {

    const {
        numFact, numEng, numAdh,
        domaine, dateEntree,
        dateReceivedStart, dateReceivedEnd,
        idPeriodeFact, dateFact, status, errorCode,
        numId, numJur, raisonSociale,
        department, numClient,
        nom, prenom, dateNai, birdDate,
        nir, cle
    } = values || {};
    let result =  {
        panelInformationGenerales: (domaine || dateEntree || dateReceivedStart || dateReceivedEnd || idPeriodeFact || dateFact || status || errorCode)? true: true,
        panelInformationsEstablishement: (numId || numJur || raisonSociale || department)? true: true,
        panelInformationsBeneficiaires: (numClient || nom || prenom || dateNai || birdDate)? true: true,
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


export const reshapeMotifVsStatus = ({status, nomRefs}) => {
    /**
     * reshaping nomRefs.FACTURE_ERROR trough nomRefs.FACTURE_RLTN_FACTURE_ERROR based on
     */
    if (!status && !nomRefs) return null

    let selectedStatusesForFactureError = {}
    Object.keys(nomRefs.FACTURE_RLTN_FACTURE_ERROR).forEach( el => {
        if (!selectedStatusesForFactureError[nomRefs.FACTURE_RLTN_FACTURE_ERROR[el][0]]) selectedStatusesForFactureError[nomRefs.FACTURE_RLTN_FACTURE_ERROR[el][0]] = []
        selectedStatusesForFactureError[nomRefs.FACTURE_RLTN_FACTURE_ERROR[el][0]].push(el)

    })

    if (status) {
        let _motif = {}
        if (nomRefs && status.length > 0) {
            status?.forEach(stat => {
                if (selectedStatusesForFactureError[stat]) {
                    selectedStatusesForFactureError[stat].forEach(facErr => _motif[facErr] = nomRefs.FACTURE_ERROR[facErr])
                }
            })
        }

        return _motif || null;
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
}
