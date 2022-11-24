import { statusesRIB } from '../../../utils/status-utils';

export const MutatorSetValue = () =>  ([field, value], state, utils) => {

    utils.changeValue(state, field, (value) => {

        let _value = value;

        let statusRibs = {};
        for (let key in statusesRIB) {
            statusRibs[key] = statusesRIB[key].label;
        }

        switch (state.formState.active) {

            case 'statutRibs':
                if (_value?.statutRibs?.length === 0 ||
                    (_value?.statutRibs?.includes('all') && _value?.statutRibs?.length > Object.keys(statusRibs).length)
                ) _value = {..._value, statutRibs: undefined}
                if (_value?.statutRibs?.includes('all')) _value = {..._value, statutRibs: Object.keys(statusRibs)}
            break

        }

        return _value

})}
