import { calcCleFromNir } from "../../../utils/validator-utils";

export const handleFormChange = ({nomRefs, setDisableCle}) => ([name], state, { changeValue }) => {

    let values = state.formState.values
    // if ( field?.modified?.birthDate && _value?.dateNaissance != null && value == null ) { _value.dateNaissance = null}

    switch (name) {

        case 'nir':
            let cle = calcCleFromNir(values)
            setDisableCle(cle ? false : true)
            changeValue(state, 'cle', (value) => cle || undefined)
            break
    }

}
