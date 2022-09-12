
export const checker = (values) => {
    const { label, referenceDate, status, environment, provenance, discipline, factureContext, canalReception, dcs } = values || {};
    if( label || referenceDate || !status || status || environment || provenance || discipline || factureContext || canalReception || dcs ) {
        return true
    } else {
        return false
    }
}

export const checkInsidePanels = (values) => {

    const {
        label, referenceDate, status, environment, provenance, discipline, factureContext, canalReception, dcs
    } = values || {};

    return Boolean(status || environment || provenance || discipline || factureContext || canalReception || dcs)
}

