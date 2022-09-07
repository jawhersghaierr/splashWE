
export const checker = (values) => {
    const {
        libelle,
        dateDeReference,
    } = values || {};
    if( libelle || dateDeReference) {
        return true
    } else {
        return false
    }
}

export const checkInsidePanels = (values) => {

    const {
        libelle,
        dateDeReference,
    } = values || {};
    let result =  {
        panelInformationGenerales: (libelle || dateDeReference)? true: false,
        panelNIR: (true)? true: false,
    }
    console.log(result)
    return result
}

