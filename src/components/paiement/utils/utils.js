import {statusesRIB} from "../../../utils/status-utils";

export const checkInsidePanels = (values) => {

    const {
        dateDebutSoin, dateDebutSoinFin,
        grоupDisciplines, disciplines, numeroPsJuridique, complNumTitre,
        dateDebutHospitalisation, dateDebutHospitalisationFin,
        status,
        totalRc,
        dateFacture, dateFactureFin,
        receivedDate, receivedDateFin,
        creationDate, creationDateFin,
        factureRc,
        numEnv,
        provenance,
        nom, prenom,
        dateDeNaissance, birdDate,
        nir, cle
    } = values || {};

    let result =  {

        panelSoins: true,
        panelInformationsDuPaiement: true,
        panelInformationsDeLaFacture: true,
        panelInformationSupplementaires: true,
        panelInformationbeneficiaires: true,

        // panelInformationGenerales: (domaine || dateDeSoins || dateReceivedStart || dateReceivedEnd || idPeriodeFact || dateFact || status || errorCode)? true: true,
        // panelInformationsEstablishement: (numId || numJur || raisonSociale || department)? true: true,
        // panelInformationsBeneficiaires: (numClient || nom || prenom || dateDeNaissance || birdDate)? true: true,
        panelNIR: (nir || cle)? true: false,
    }
    // console.log(result)
    return result
}




export const statusRow = (formattedValue) => {

    let res = {}
    formattedValue?.forEach((stat, i) => {
        res[stat.statutRib] = {}
        res[stat.statutRib] = {...stat, ...statusesRIB[stat.statutRib]};
    })

    if (res.ATT?.count > 0) return {...res, ATT: {...res.ATT, shown: true}};
    if (res.REF?.count > 0) return {...res, REF: {...res.REF, shown: true}};
    if (res.MIS?.count > 0) return {...res, MIS: {...res.MIS, shown: true}};
    if (res.NA?.count > 0) return {...res, NA: {...res.NA, shown: true}};
    if (res.ACT?.count > 0) return {...res, ACT: {...res.ACT, shown: true}};

    return res;
}



