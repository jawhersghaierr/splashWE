
export const checkInsidePanels = (values) => {

    const {birdDate, prenom, nom, numeroAdherent, dateNaissance, numAdherentFamillial, envCodeList, dateDebutSoins, dateFinSoins} = values || {};
    let result =  {
        panelBeneficiaires: (dateNaissance || birdDate)? true: false,
        panelInfoOMC: (numAdherentFamillial || envCodeList || dateDebutSoins || dateFinSoins)? true: false,
    }
    console.log(result)
    return result
}
