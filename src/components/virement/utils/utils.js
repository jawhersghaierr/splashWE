
export const checker = (values) => {
    const {
        numVirement,
        numDecompte,
        numAdhInd,
        numPsAPayer,
        dateTraitement,
        dateTraitementFin,
        status,
        mntVirement
    } = values || {};

    if( numVirement || numDecompte || numAdhInd || numPsAPayer || dateTraitement || dateTraitementFin || status || mntVirement ) {
        return true
    } else {
        return false
    }
}

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



