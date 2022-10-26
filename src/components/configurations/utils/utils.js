
export const checkInsidePanels = (values) => {

    const {
        label, referenceDate , status, environment, provenance, discipline, factureContext, canalReception, dcs
    } = values || {};

    return Boolean(status || environment || provenance || discipline || factureContext || canalReception || dcs)
}

