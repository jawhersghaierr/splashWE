
export const checkInsidePanels = (values) => {

    const {
        label, refDate , status, environment, provenance, discipline, factureContext, canalReception, dcs
    } = values || {};

    return Boolean(status || environment || provenance || discipline || factureContext || canalReception || dcs)
}

