// import {statusesRIB} from "../../../utils/status-utils";
import {IntlDateWithHHMM} from "../../../utils/convertor-utils";

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

// export const statusRow = (formattedValue) => {
//
//     let res = {}
//     formattedValue?.forEach((stat, i) => {
//         res[stat.statutRib] = {}
//         res[stat.statutRib] = {...stat, ...statusesRIB[stat.statutRib]};
//     })
//     /*
//         Ако има поне 1 ПС чийто риб е en attente - показваме En attente
//         Aко има поне 1 ПС чийто риб е refused - показваме Refusé
//         Ако ПС-ите нямат риб или той е деактивиран - показваме Manquant
//         Ако ПС-ите нямат активна конвенция - тогава показваме Inactif
//         Ако всичките рибове на ПС са валидирани - показваме Validé
//     */
//
//     if (res.ATT?.count > 0) return {...res, ATT: {...res.ATT, shown: true}};
//     if (res.REF?.count > 0) return {...res, REF: {...res.REF, shown: true}};
//     if (res.MIS?.count > 0) return {...res, MIS: {...res.MIS, shown: true}};
//     if (res.NA?.count > 0) return {...res, NA: {...res.NA, shown: true}};
//     if (res.ACT?.count > 0) return {...res, ACT: {...res.ACT, shown: true}};
//
//     return res;
// }

/**
 *
 * @param status
 * @param nomRefs
 * @returns {null|{}}
 */
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
    console.log('selectedStatusesForFactureError ', selectedStatusesForFactureError)
    /**
     * selectedStatusesForFactureError:
     * {
     *      REJETEE: [
     *          doublon,
     *          zero-total-rc,
     *          no-id-periode-fact,
     *          ...
     *      ],
     *      ANNULEE: [
     *          error-taux,
     *          error-fact
     *      ]
     * }
     *
     */

    if (status) {
        let _motif = []
        if (nomRefs && status.length > 0) {
            status?.forEach(stat => {
                if (selectedStatusesForFactureError[stat.value]) {
                    selectedStatusesForFactureError[stat.value].forEach(factErr =>
                        _motif.push({value: factErr, title: nomRefs.FACTURE_ERROR[factErr]})
                    )
                }
            })
        }

        console.log('_motif ', _motif)
        return _motif || null;
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
}


/**
 *
 * @param criterias
 * @returns {*}
 */
export const reshapeCriterias = ({criterias}) => {
    let {
        dateEntree, dateReceivedStart, dateReceivedEnd, idPeriodeFact, dateFact, status,
        errorCode, numId, numJur, raisonSociale, department, numClient, nom, prenom, dateNai, birdDate, nir, cle
    } = criterias;

    let filters = {...criterias}

    if (dateEntree && dateEntree != '' && dateEntree != undefined) {
        filters.dateEntree = new Date(dateEntree).toLocaleDateString('sv');
    }

    if (dateReceivedStart && dateReceivedStart != '' && dateReceivedStart != undefined) {
        filters.dateReceivedStart = IntlDateWithHHMM(dateReceivedStart);
        // filters.dateReceivedStart = new Date(dateReceivedStart).toLocaleDateString('sv');//.toISOString()
    }

    if (dateReceivedEnd && dateReceivedEnd != '' && dateReceivedEnd != undefined) {
        filters.dateReceivedEnd = IntlDateWithHHMM(dateReceivedEnd);
        // filters.dateReceivedEnd = new Date(dateReceivedEnd).toLocaleDateString('sv');//.toISOString()
    }

    if (dateFact && dateFact != '' && dateFact != undefined) {
        filters.dateFact = new Date(dateFact).toLocaleDateString('sv');//.toISOString()
    }

    if (dateNai && dateNai != '' && dateNai != undefined) {
        filters.dateNai = new Date(dateNai).toLocaleDateString('sv').replaceAll('-', '');
    }

    if (birdDate && birdDate != '' && birdDate != undefined) {
        if (birdDate instanceof Date && !isNaN(birdDate)){
            filters.dateNai = new Date(birdDate).toLocaleDateString('sv').replaceAll('-', '');
        } else filters.dateNai = birdDate.split('/').reverse().join('');
    }

    delete filters.birdDate;

    if (nir && nir != undefined && cle && cle != undefined) {
        filters.nir = `${nir}${(cle.length < 2 )? '0' + cle: cle}`
    }

    /**
     * Reshapes from AutoComplete
     */
    if (numClient && numClient !== undefined) {
        filters.numClient = []
        numClient.forEach(el => filters.numClient.push(el.value))
    }
    if (errorCode && errorCode !== undefined) {
        filters.errorCode = []
        errorCode.forEach(el => filters.errorCode.push(el.value))
    }
    if (status && status !== undefined) {
        filters.status = []
        status.forEach(el => filters.status.push(el.value))
    }
    //^^^^^^^^^^^^^^^^^^Reshapes from AutoComplete^^^^^^^^^^^^^^^^^^^^^^^^^

    if (idPeriodeFact && idPeriodeFact !== '' && idPeriodeFact !== undefined) {
        if (idPeriodeFact.length > 22 && idPeriodeFact.length < 27) filters.idPeriodeFact = idPeriodeFact.substring(0, 22);

        if (idPeriodeFact.length == 27) {
            idPeriodeFact = idPeriodeFact.split(' / ')
            filters.occId = idPeriodeFact[1]
            filters.idPeriodeFact = idPeriodeFact[0]
        }
    }
    filters.cashe = null

    console.log('filters ', filters)
    return filters
}
