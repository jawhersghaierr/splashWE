export const checkInsidePanels = (values) => {

    const {
        numVirement, numDecompte, numAdhInd, numPsAPayer, dateTraitement, dateTraitementFin,
        status, mntVirement
    } = values || {};

    let result =  {
        panelInformationsDuVirement: true,
    }
    return result
}



export const reshapeCriterias = ({criterias}) => {
    let {
        numVirement, numDecompte,
        numAdhInd, numPsAPayer,
        dateTraitement, dateTraitementFin,
        status, mntVirement
    } = criterias;

    let filters = {...criterias}

    if (status && status !== undefined) {
        filters.status = [];
        status.forEach(el => filters.status.push(el.value));
    }


    if (dateTraitement && dateTraitement != '' && dateTraitement != undefined) filters.dateTraitement = new Date(dateTraitement).toLocaleDateString('sv');
    if (dateTraitementFin && dateTraitementFin != '' && dateTraitementFin != undefined) filters.dateTraitementFin = new Date(dateTraitementFin).toLocaleDateString('sv');

    filters.cashe = null
    return filters
}
