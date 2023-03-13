export const checkInsidePanels = (values) => {

    // const {
    //     numVirement, numDecompte, numAdhInd, numPsAPayer, dateTraitement, dateTraitementFin,
    //     status, mntVirement
    // } = values || {};

    let result =  {
        panelInformationsDuVirement: true,
    }
    return result
}



export const reshapeCriterias = ({criterias}) => {
    let {
        dateTraitementStart, dateTraitementEnd,
        status
    } = criterias;

    let filters = {...criterias}

    if (status && status !== undefined) {
        filters.status = [];
        status.forEach(el => filters.status.push(el.value));
    }


    if (dateTraitementStart && dateTraitementStart != '' && dateTraitementStart != undefined) filters.dateTraitementStart = new Date(dateTraitementStart).toLocaleDateString('sv');
    if (dateTraitementEnd && dateTraitementEnd != '' && dateTraitementEnd != undefined) filters.dateTraitementEnd = new Date(dateTraitementEnd).toLocaleDateString('sv');

    filters.cashe = null
    return filters
}
