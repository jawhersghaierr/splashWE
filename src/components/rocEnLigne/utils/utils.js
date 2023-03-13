import {statusesRIB} from "../../../utils/status-utils";
import {IntlDateWithHHMM} from "../../../utils/convertor-utils";

export const checkInsidePanels = (values) => {

    const {
        domaine, dateAdmission,
        dateDebutReception, dateFinReception,
        identifiantPeriodeFacturation, statut, motif, sousMotif,
        finessGeographique, finessJuridique, raisonSociale,
        departement, numeroAmc,
        nom, prenom, dateNaissance, birthDate,
        nir, cle
    } = values || {};
    let result =  {
        panelInformationGenerales: (domaine || dateAdmission || dateDebutReception || dateFinReception || identifiantPeriodeFacturation, statut, motif, sousMotif)? true: true,
        panelInformationsEstablishement: (finessGeographique || finessJuridique || raisonSociale || departement)? true: true,
        panelInformationsBeneficiaires: (numeroAmc || nom || prenom || dateNaissance || birthDate)? true: true,
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
        type.forEach(_type => Object.keys(nomRefs.ROC_RLTN_STATUSES_TYPES)
                                .forEach(_stat => nomRefs.ROC_RLTN_STATUSES_TYPES[_stat]
                                    .includes(_type)
                                        && tmpStatus.push(_stat)
                                )
        )
        tmpStatus = [...new Set(tmpStatus)]
    } else tmpStatus = Object.keys( nomRefs.ROC_STATUSES )

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



export const getSubMotifsFromTypes = ({type = [], nomRefs}) => {
    let tmpMotifs = []
    if (type.length > 0 && nomRefs) {
        type.forEach(_type => {
            // console.log('getSubMotifsFromTypes_type ', _type)
            if (_type !== 'all') tmpMotifs = [...nomRefs.ROC_RLTN_TYPES_SUB_MOTIFS[_type], ...tmpMotifs]
        })
        tmpMotifs = [...new Set(tmpMotifs)]

    } else tmpMotifs = Object.keys( nomRefs.ROC_SOUS_MOTIFS )

    return tmpMotifs
}


export const getSubMotifsFromMotif = ({motif = [], nomRefs}) => {

    let tmpSubCode = []
    if (motif && motif.length > 0) {
        motif.forEach(_motif => {
            // console.log('getSubMotifsFromMotif_motif ', _motif)
            if (_motif !== 'all' && nomRefs.ROC_RLTN_MOTIFS_SOUS_MOTIFS[_motif.value]) {
                tmpSubCode = [...nomRefs.ROC_RLTN_MOTIFS_SOUS_MOTIFS[_motif.value], ...tmpSubCode]
            }
        })
        tmpSubCode = [...new Set(tmpSubCode)]
    } else return []

    return tmpSubCode
}
export const changeSubMotifsFromMotifs = ({motif = [], nomRefs, rln, setRln}) => {

    let tmpSubCode = [], subMotifs = []
    if (motif && motif.length > 0) {
        motif.forEach(_motif => {
            // console.log('changeSubMotifsFromMotifs _motif ', _motif)
            if (_motif !== 'all' && nomRefs.ROC_RLTN_MOTIFS_SOUS_MOTIFS[_motif]) tmpSubCode = [...nomRefs.ROC_RLTN_MOTIFS_SOUS_MOTIFS[_motif], ...tmpSubCode]
        })
        tmpSubCode = [...new Set(tmpSubCode)]

    } else return []

    tmpSubCode.forEach( subCode => subMotifs[subCode] = nomRefs.ROC_SOUS_MOTIFS[subCode] )

    return subMotifs
}


export const checkForRejeteOrAnuleOrMore = (statuses) => {
    let result = true
    if (statuses && statuses !== undefined) {
        result = false
        statuses.forEach(statut => {
            if (statut.value == 'REJETEE' || statut.value == 'INVALIDE') result = true
        })
    }
    return result
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
        dateDebutReception, dateFinReception, identifiantPeriodeFacturation, dateAdmission,
        domaine, statut, motif, sousMotif,
        numeroAmc, dateNaissance, birthDate,
        nir, cle
    } = criterias;

    let filters = {...criterias}

    // if (dateDeSoins && dateDeSoins != '' && dateDeSoins != undefined) {
    //     filters.dateDeSoins = new Date(dateDeSoins).toLocaleDateString('sv');
    // }
    if (dateAdmission && dateAdmission != '' && dateAdmission != undefined) {
        filters.dateAdmission = new Date(dateAdmission).toLocaleDateString('sv');
    }

    if (dateDebutReception && dateDebutReception != '' && dateDebutReception != undefined) {
        filters.dateDebutReception = IntlDateWithHHMM(dateDebutReception)
        // filters.receptionDateStart = new Date(receptionDateStart).toISOString()//.toLocaleDateString('sv');
    }

    if (dateFinReception && dateFinReception != '' && dateFinReception != undefined) {
        filters.dateFinReception = IntlDateWithHHMM(dateFinReception)
        // filters.receptionDateEnd = new Date(receptionDateEnd).toISOString()//.toLocaleDateString('sv');//
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

    if (identifiantPeriodeFacturation && identifiantPeriodeFacturation !== '' && identifiantPeriodeFacturation !== undefined) {
        if (identifiantPeriodeFacturation.length > 22 && identifiantPeriodeFacturation.length < 27) filters.identifiantPeriodeFacturation = identifiantPeriodeFacturation.substring(0, 22);

        if (identifiantPeriodeFacturation.length == 27) {
            identifiantPeriodeFacturation = identifiantPeriodeFacturation.split(' / ')
            filters.occurrenceId = identifiantPeriodeFacturation[1]
            filters.identifiantPeriodeFacturation = identifiantPeriodeFacturation[0]
        }
    }

    if (nir && nir != undefined) {
        filters.nirNumero = nir;
    }

    if (cle && cle != undefined) {
        filters.nirCle = cle;
    }
    /**
     * just for Facturation
     *
                    if (nir && nir != undefined && cle && cle != undefined) {
                    filters.nir = `${nir}${(cle.length < 2 )? '0' + cle: cle}`
                }
     */

    /**
     * Reshapes from AutoComplete
     */
    if (numeroAmc && numeroAmc !== undefined) {
        filters.numeroAmc = []
        numeroAmc.forEach(el => filters.numeroAmc.push(el.value))
    }
    if (domaine && domaine !== undefined) {
        filters.domaine = []
        domaine.forEach(el => filters.domaine.push(el.value))
    }
    if (statut && statut !== undefined) {
        filters.statut = []
        statut.forEach(el => filters.statut.push(el.value))
    }
    if (motif && motif !== undefined) {
        filters.motif = []
        motif.forEach(el => filters.motif.push(el.value))
    }
    if (sousMotif && sousMotif !== undefined) {
        filters.sousMotif = []
        sousMotif.forEach(el => filters.sousMotif.push(el.value))
    }
    //^^^^^^^^^^^^^^^^^^Reshapes from AutoComplete^^^^^^^^^^^^^^^^^^^^^^^^^


    filters.cashe = null
    return filters

}


// export const getSubMotifsFromMotifsFromTypes = ({type = [], nomRefs}) => {
//     let tmpMotifs = []
//     if (type.length > 0) {
//         type.forEach(_type => tmpMotifs = [...nomRefs.ROC_RLTN_TYPES_MOTIFS[_type], ...tmpMotifs])
//         tmpMotifs = [...new Set(tmpMotifs)]
//
//     } else tmpMotifs = Object.keys( nomRefs.ROC_SOUS_MOTIFS )
//
//     return tmpMotifs
// }
//
//
// export const getAvailableTypesFromStatuses = ({statut = [], nomRefs}) => {
//     let tmpTypes = []
//     statut.forEach( _statut => {
//         // console.log('getAvailableTypesFromStatuses_statut ', _statut)
//         if (_statut !== 'all') tmpTypes = [...nomRefs.ROC_RLTN_STATUSES_TYPES[_statut], ...tmpTypes]
//     })
//     tmpTypes = [...new Set(tmpTypes)]
//
//     return tmpTypes
// }
