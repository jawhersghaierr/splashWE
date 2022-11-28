import { calcCleFromNir } from "../../../utils/validator-utils";

export const MutatorSetValue = ({setDisableCle, nomRefs}) =>  ([field, value], state, utils) => {

    utils.changeValue(state, field, (value) => {

        let _value = value;

	    if ( field?.modified?.birdDate && _value?.dateNai != null && value == null ) { _value.dateNai = null}

        switch (state.formState.active) {

            case 'nir':
                let cle = calcCleFromNir(value)
                _value.cle = cle || undefined
                setDisableCle(cle ? false : true)
            break

            case 'grоupDisciplines':
                if (_value?.grоupDisciplines?.length === 0 ||
                    (_value?.grоupDisciplines?.includes('all') && _value?.grоupDisciplines?.length > Object.keys(nomRefs.DISCIPLINE_GROUP).length)
                ) _value = {..._value, grоupDisciplines: undefined}
                if (_value?.grоupDisciplines?.includes('all')) _value = {..._value, grоupDisciplines: Object.keys(nomRefs.DISCIPLINE_GROUP)}
            break

            case 'disciplines':
                if (_value?.disciplines?.length === 0 ||
                    (_value?.disciplines?.includes('all') && _value?.disciplines?.length > Object.keys(nomRefs.DISCIPLINE).length)
                ) _value = {..._value, disciplines: undefined}
                if (_value?.disciplines?.includes('all')) _value = {..._value, disciplines: Object.keys(nomRefs.DISCIPLINE)}
            break

        }

        return _value

})}
