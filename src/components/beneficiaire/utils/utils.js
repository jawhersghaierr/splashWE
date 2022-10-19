
export const checkInsidePanels = (values) => {

    const {birdDate, prenom, nom, numeroAdherent, dateNaissance, numAdherentFamillial, envCodeList, dateDebutSoins, dateFinSoins} = values || {};
    let result =  {
        panelBeneficiaires: (dateNaissance || birdDate)? true: false,
        panelInfoOMC: (numAdherentFamillial || envCodeList || dateDebutSoins || dateFinSoins)? true: false,
    }
    console.log(result)
    return result
}

export const reshapeCriterias = ({criterias}) => {
    let {
        prenom,
        nom,
        numeroAdherent,
        birdDate,
        dateNaissance,
        numAdherentFamillial,
        envCodeList,
        dateDebutSoins,
        dateFinSoins
    } = criterias;

    let filters = {...criterias}

    if (dateDebutSoins && dateDebutSoins != '' && dateDebutSoins != undefined) {
        filters.dateDebutSoins = new Date(dateDebutSoins).toLocaleDateString('sv');
    }
    if (dateFinSoins && dateFinSoins != '' && dateFinSoins != undefined) {
        filters.dateFinSoins = new Date(dateFinSoins).toLocaleDateString('sv');
    }

    if (dateNaissance && dateNaissance != '' && dateNaissance != undefined) {
        filters.dateNaissance = new Date(dateNaissance).toLocaleDateString('sv').replaceAll('-', '');
    }

    if (birdDate && birdDate != '' && birdDate != undefined) {
        if (birdDate instanceof Date && !isNaN(birdDate)){
            filters.dateNaissance = new Date(birdDate).toLocaleDateString('sv').replaceAll('-', '');
        } else filters.dateNaissance = birdDate.split('/').reverse().join('');
    }


    filters.cashe = null
    return filters
}
