export const MutatorSetValue = ({nomRefs}) =>  ([field, value], state, utils) => {

    utils.changeValue(state, field, (value) => {

        let _value = value;

        switch (state.formState.active) {

            case 'discipline':
                if (_value?.discipline?.length === 0 ||
                    (_value?.discipline?.includes('all') && _value?.discipline?.length > Object.keys(nomRefs.DISCIPLINE).length)
                ) _value = {..._value, discipline: undefined}
                if (_value?.discipline?.includes('all')) _value = {..._value, discipline: Object.keys(nomRefs.DISCIPLINE)}
            break

            case 'factureContext':
                if (_value?.factureContext?.length === 0 ||
                    (_value?.factureContext?.includes('all') && _value?.factureContext?.length > Object.keys(nomRefs.FACTURE_CONTEXT).length)
                ) _value = {..._value, factureContext: undefined}
                if (_value?.factureContext?.includes('all')) _value = {..._value, factureContext: Object.keys(nomRefs.FACTURE_CONTEXT)}
            break

            case 'canalReception':
                if (_value?.canalReception?.length === 0 ||
                    (_value?.canalReception?.includes('all') && _value?.canalReception?.length > Object.keys(nomRefs.FACTURE_CANAL_INTEGRATION).length)
                ) _value = {..._value, canalReception: undefined}
                if (_value?.canalReception?.includes('all')) _value = {..._value, canalReception: Object.keys(nomRefs.FACTURE_CANAL_INTEGRATION)}
            break

            case 'dcs':
                if (_value?.dcs?.length === 0 ||
                    (_value?.dcs?.includes('all') && _value?.dcs?.length > Object.keys(nomRefs.DCS).length)
                ) _value = {..._value, dcs: undefined}
                if (_value?.dcs?.includes('all')) _value = {..._value, dcs: Object.keys(nomRefs.DCS)}
            break

            case 'status':
                if (!!_value.status) _value.referenceDate = undefined
            break

        }

        return _value

})}
