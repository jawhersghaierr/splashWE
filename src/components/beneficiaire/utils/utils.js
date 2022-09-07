
export const checker = (values) => {
    const {birdDate, prenom, nom, numeroAdherent, dateDeNaissance, numAdherentFamillial, envCodeList, dateDebutSoins, dateFinSoins} = values || {};
    if(birdDate || prenom || nom || numeroAdherent || dateDeNaissance || numAdherentFamillial || envCodeList || dateDebutSoins || dateFinSoins) {
        return true
    } else {
        return false
    }
}

export const checkInsidePanels = (values) => {

    const {birdDate, prenom, nom, numeroAdherent, dateDeNaissance, numAdherentFamillial, envCodeList, dateDebutSoins, dateFinSoins} = values || {};
    let result =  {
        panelBeneficiaires: (dateDeNaissance || birdDate)? true: false,
        panelInfoOMC: (numAdherentFamillial || envCodeList || dateDebutSoins || dateFinSoins)? true: false,
    }
    console.log(result)
    return result
}
