// import {statusesRIB} from "../../../utils/status-utils";

export const checkInsidePanels = (values) => {

    const {
        // dateDebutSoin, dateDebutSoinFin,
        // grоupDisciplines, disciplines, numeroPsJuridique, complNumTitre,
        // dateDebutHospitalisation, dateDebutHospitalisationFin,
        // status,
        // totalRc,
        // dateFacture, dateFactureFin,
        // receivedDate, receivedDateFin,
        // creationDate, creationDateFin,
        // factureRc,
        // numEnv,
        // provenance,
        // nom, prenom,
        // dateNaissance, birthDate,
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
        // panelInformationsBeneficiaires: (numClient || nom || prenom || dateNaissance || birthDate)? true: true,
        panelNIR: (nir || cle)? true: false,
    }
    // console.log(result)
    return result
}


export const reshapeCriterias = ({criterias}) => {

    let {
        dateDebutSoinsStart, dateDebutSoinsEnd, disciplines, groupDisciplines,
        dateDebutHospitalisationStart, dateDebutHospitalisationEnd,
        dateFactureStart, dateFactureEnd,
        dateReceptionStart, dateReceptionEnd,
        dateTraitementStart, dateTraitementEnd,
        dateNaissance, birthDate,
        nir, cle, status, numeroEnvironnement,
        provenance
    } = criterias;

    let filters = {...criterias}

    if (dateDebutSoinsStart && dateDebutSoinsStart != '' && dateDebutSoinsStart != undefined) filters.dateDebutSoinsStart = new Date(dateDebutSoinsStart).toLocaleDateString('sv');
    if (dateDebutSoinsEnd && dateDebutSoinsEnd != '' && dateDebutSoinsEnd != undefined) filters.dateDebutSoinsEnd = new Date(dateDebutSoinsEnd).toLocaleDateString('sv');

    if (dateDebutHospitalisationStart && dateDebutHospitalisationStart != '' && dateDebutHospitalisationStart != undefined) filters.dateDebutHospitalisationStart = new Date(dateDebutHospitalisationStart).toLocaleDateString('sv');
    if (dateDebutHospitalisationEnd && dateDebutHospitalisationEnd != '' && dateDebutHospitalisationEnd != undefined) filters.dateDebutHospitalisationEnd = new Date(dateDebutHospitalisationEnd).toLocaleDateString('sv');

    if (dateFactureStart && dateFactureStart != '' && dateFactureStart != undefined) filters.dateFactureStart = new Date(dateFactureStart).toLocaleDateString('sv');
    if (dateFactureEnd && dateFactureEnd != '' && dateFactureEnd != undefined) filters.dateFactureEnd = new Date(dateFactureEnd).toLocaleDateString('sv');

    if (dateReceptionStart && dateReceptionStart != '' && dateReceptionStart != undefined) filters.dateReceptionStart = new Date(dateReceptionStart).toLocaleDateString('sv');
    if (dateReceptionEnd && dateReceptionEnd != '' && dateReceptionEnd != undefined) filters.dateReceptionEnd = new Date(dateReceptionEnd).toLocaleDateString('sv');

    if (dateTraitementStart && dateTraitementStart != '' && dateTraitementStart != undefined) filters.dateTraitementStart = new Date(dateTraitementStart).toLocaleDateString('sv');
    if (dateTraitementEnd && dateTraitementEnd != '' && dateTraitementEnd != undefined) filters.dateTraitementEnd = new Date(dateTraitementEnd).toLocaleDateString('sv');

    if (dateNaissance && dateNaissance != '' && dateNaissance != undefined) {
        filters.dateNaissance = new Date(dateNaissance).toLocaleDateString('sv').replaceAll('-', '');
    }

    if (birthDate && birthDate != '' && birthDate != undefined) {
        if (birthDate instanceof Date && !isNaN(birthDate)){
            filters.dateNaissance = new Date(birthDate).toLocaleDateString('sv').replaceAll('-', '');
        } else filters.dateNaissance = birthDate.split('/').reverse().join('');
    }


    if (nir && nir != undefined && cle && cle != undefined) {
        filters.nir = `${nir}${(cle.length < 2 )? '0' + cle: cle}`
    }

    if (status && status !== undefined) {
        filters.status = [];
        status.forEach(el => filters.status.push(el.value));
    }
    if (numeroEnvironnement && numeroEnvironnement !== undefined) {
        filters.numeroEnvironnement = [];
        numeroEnvironnement.forEach(el => filters.numeroEnvironnement.push(el.value));
    }
    if (provenance && provenance !== undefined) {
        filters.provenance = [];
        provenance.forEach(el => filters.provenance.push(el.value));
    }
    if (groupDisciplines && groupDisciplines !== undefined) {
        filters.groupDisciplines = [];
        groupDisciplines.forEach(el => filters.groupDisciplines.push(el.value));
    }
    if (disciplines && disciplines !== undefined) {
        filters.discipline = [];
        disciplines.forEach(el => filters.discipline.push(el.value));
    }

    filters.cashe = null;
    return filters;
}
