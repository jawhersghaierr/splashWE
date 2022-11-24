export const MutatorSetValue = ({nomRefs}) =>  ([field, value], state, utils) => {

    utils.changeValue(state, field, (value) => {

        let _value = value;

        switch (state.formState.active) {

            case 'status':
                if (_value?.status?.length === 0 ||
                    (_value?.status?.includes('all') && _value?.status?.length > Object.keys(nomRefs.PAIEMENT_VIREMENT_STATUS).length)
                ) _value = {..._value, status: undefined}
                if (_value?.status?.includes('all')) _value = {..._value, status: Object.keys(nomRefs.PAIEMENT_VIREMENT_STATUS)}
            break

        }

        return _value

})}
