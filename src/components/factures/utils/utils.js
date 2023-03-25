import {IntlDateWithHHMM} from "../../../utils/convertor-utils";

export const checkInsidePanels = (values) => {

    const {
        domaine, dateEntree,
        dateReceivedStart, dateReceivedEnd,
        identifiantPeriodeFacturation, dateFacture, status, codeErreur,
        finessGeographique, finessJuridique, raisonSociale,
        department, numeroAmc,
        nom, prenom, dateNaissance, birthDate,
        nir, cle
    } = values || {};
    let result =  {
        panelInformationGenerales: (domaine || dateEntree || dateReceivedStart || dateReceivedEnd || identifiantPeriodeFacturation || dateFacture || status || codeErreur)? true: true,
        panelInformationsEstablishement: (finessGeographique || finessJuridique || raisonSociale || department)? true: true,
        panelInformationsBeneficiaires: (numeroAmc || nom || prenom || dateNaissance || birthDate)? true: true,
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
                if (selectedStatusesForFactureError[stat]) {
                    selectedStatusesForFactureError[stat].forEach(factErr =>
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
        dateEntree, dateReceivedStart, dateReceivedEnd, identifiantPeriodeFacturation, dateFacture, status,
        codeErreur, numeroAmc, dateNaissance, birthDate, nir, cle
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

    if (dateFacture && dateFacture != '' && dateFacture != undefined) {
        filters.dateFacture = new Date(dateFacture).toLocaleDateString('sv');//.toISOString()
    }

    if (dateNaissance && dateNaissance != '' && dateNaissance != undefined) {
        filters.dateNaissance = new Date(dateNaissance).toLocaleDateString('sv').replaceAll('-', '');
    }

    if (birthDate && birthDate != '' && birthDate != undefined) {
        if (birthDate instanceof Date && !isNaN(birthDate)){
            filters.dateNaissance = new Date(birthDate).toLocaleDateString('sv').replaceAll('-', '');
        } else filters.dateNaissance = birthDate.split('/').reverse().join('');
    }

    delete filters.birthDate;

    if (nir && nir != undefined && cle && cle != undefined) {
        filters.nir = `${nir}${(cle.length < 2 )? '0' + cle: cle}`
    }

    /**
     * Reshapes from AutoComplete
     */
    if (numeroAmc && numeroAmc !== undefined) {
        filters.numeroAmc = []
        numeroAmc.forEach(el => filters.numeroAmc.push(el.value))
    }
    if (codeErreur && codeErreur !== undefined) {
        filters.codeErreur = []
        codeErreur.forEach(el => filters.codeErreur.push(el.value))
    }
    if (status && status !== undefined) {
        filters.status = []
        status.forEach(el => filters.status.push(el.value))
    }
    //^^^^^^^^^^^^^^^^^^Reshapes from AutoComplete^^^^^^^^^^^^^^^^^^^^^^^^^

    if (identifiantPeriodeFacturation && identifiantPeriodeFacturation !== '' && identifiantPeriodeFacturation !== undefined) {
        if (identifiantPeriodeFacturation.length > 22 && identifiantPeriodeFacturation.length < 27) filters.identifiantPeriodeFacturation = identifiantPeriodeFacturation.substring(0, 22);

        if (identifiantPeriodeFacturation.length == 27) {
            identifiantPeriodeFacturation = identifiantPeriodeFacturation.split(' / ')
            filters.occurrenceId = identifiantPeriodeFacturation[1]
            filters.identifiantPeriodeFacturation = identifiantPeriodeFacturation[0]
        }
    }
    filters.cashe = null

    console.log('filters ', filters)
    return filters
}
