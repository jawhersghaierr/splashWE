
export const checkInsidePanels = (values) => {

    const {birthDate, dateNaissance, codeEnvironnementList, dateDebutSoins, dateFinSoins} = values || {};
    let result =  {
        panelBeneficiaires: (dateNaissance || birthDate)? true: false,
        panelInfoOMC: (codeEnvironnementList || dateDebutSoins || dateFinSoins)? true: false,
    }
    return result
}

export const reshapeCriterias = ({criterias}) => {
    let {
        birthDate, dateNaissance,
        codeEnvironnementList,
        dateDebutSoins, dateFinSoins
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

    if (birthDate && birthDate != '' && birthDate != undefined) {
        if (birthDate instanceof Date && !isNaN(birthDate)){
            filters.dateNaissance = new Date(birthDate).toLocaleDateString('sv').replaceAll('-', '');
        } else filters.dateNaissance = birthDate.split('/').reverse().join('');
    }

    if (codeEnvironnementList && codeEnvironnementList !== undefined) {
        filters.codeEnvironnementList = [];
        codeEnvironnementList.forEach(el => filters.codeEnvironnementList.push(el.value));
    }

    filters.cashe = null;
    return filters;
}
