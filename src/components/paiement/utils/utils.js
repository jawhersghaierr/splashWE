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


export const reshapeCriterias = ({criterias}) => {

    let {
        dateDebutSoin, dateDebutSoinFin, disciplines, grоupDisciplines,
        dateDebutHospitalisation, dateDebutHospitalisationFin,
        dateFacture, dateFactureFin,
        receivedDate, receivedDateFin,
        creationDate, creationDateFin,
        dateDeNaissance, birdDate,
        nir, cle, status, numEnv,
        provenance
    } = criterias;

    let filters = {...criterias}

    if (dateDebutSoin && dateDebutSoin != '' && dateDebutSoin != undefined) filters.dateDebutSoin = new Date(dateDebutSoin).toLocaleDateString('sv');
    if (dateDebutSoinFin && dateDebutSoinFin != '' && dateDebutSoinFin != undefined) filters.dateDebutSoinFin = new Date(dateDebutSoinFin).toLocaleDateString('sv');

    if (dateDebutHospitalisation && dateDebutHospitalisation != '' && dateDebutHospitalisation != undefined) filters.dateDebutHospitalisation = new Date(dateDebutHospitalisation).toLocaleDateString('sv');
    if (dateDebutHospitalisationFin && dateDebutHospitalisationFin != '' && dateDebutHospitalisationFin != undefined) filters.dateDebutHospitalisationFin = new Date(dateDebutHospitalisationFin).toLocaleDateString('sv');

    if (dateFacture && dateFacture != '' && dateFacture != undefined) filters.dateFacture = new Date(dateFacture).toLocaleDateString('sv');
    if (dateFactureFin && dateFactureFin != '' && dateFactureFin != undefined) filters.dateFactureFin = new Date(dateFactureFin).toLocaleDateString('sv');

    if (receivedDate && receivedDate != '' && receivedDate != undefined) filters.receivedDate = new Date(receivedDate).toLocaleDateString('sv');
    if (receivedDateFin && receivedDateFin != '' && receivedDateFin != undefined) filters.receivedDateFin = new Date(receivedDateFin).toLocaleDateString('sv');

    if (creationDate && creationDate != '' && creationDate != undefined) filters.creationDate = new Date(creationDate).toLocaleDateString('sv');
    if (creationDateFin && creationDateFin != '' && creationDateFin != undefined) filters.creationDateFin = new Date(creationDateFin).toLocaleDateString('sv');

    if (dateDeNaissance && dateDeNaissance != '' && dateDeNaissance != undefined) {
        filters.dateDeNaissance = new Date(dateDeNaissance).toLocaleDateString('sv').replaceAll('-', '');
    }

    if (birdDate && birdDate != '' && birdDate != undefined) {
        if (birdDate instanceof Date && !isNaN(birdDate)){
            filters.dateDeNaissance = new Date(birdDate).toLocaleDateString('sv').replaceAll('-', '');
        } else filters.dateDeNaissance = birdDate.split('/').reverse().join('');
    }


    if (nir && nir != undefined && cle && cle != undefined) {
        filters.nir = `${nir}${(cle.length < 2 )? '0' + cle: cle}`
    }

    if (status && status !== undefined) {
        filters.status = [];
        status.forEach(el => filters.status.push(el.value));
    }
    if (numEnv && numEnv !== undefined) {
        filters.numEnv = [];
        numEnv.forEach(el => filters.numEnv.push(el.value));
    }
    if (provenance && provenance !== undefined) {
        filters.provenance = [];
        provenance.forEach(el => filters.provenance.push(el.value));
    }
    if (grоupDisciplines && grоupDisciplines !== undefined) {
        filters.grоupDisciplines = [];
        grоupDisciplines.forEach(el => filters.grоupDisciplines.push(el.value));
    }
    if (disciplines && disciplines !== undefined) {
        filters.disciplines = [];
        disciplines.forEach(el => filters.disciplines.push(el.value));
    }

    filters.cashe = null;
    return filters;
}
