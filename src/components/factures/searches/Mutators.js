import {calcCleFromNir} from "../../../utils/validator-utils";
import {reshapeMotifVsStatus} from "../utils/utils";

export const handleFormChange = ({nomRefs, setMotif, setDisableCle}) => ([name], state, { changeValue }) => {

    // console.log('name ', name)
    // console.log('nomRefs ', nomRefs)
    console.log('state ', state)
    let values = state.formState.values

    if ( state?.lastFormState?.modified?.birthDate && values?.dateNaissance != null && values?.birthDate == null ) {
        changeValue(state, 'dateNaissance', (value) => undefined)
    }

    switch (name) {

        case 'nir':
            let cle = calcCleFromNir(values)
            setDisableCle(cle ? false : true)
            changeValue(state, 'cle', (value) => cle || undefined)
        break

        case 'status':
            console.log('values?.status > ', values?.status)
            console.log('values?.codeErreur > ', values?.codeErreur)
            setMotif( reshapeMotifVsStatus({status: values?.status, nomRefs}) )
            if (values?.codeErreur !== undefined) changeValue(state, 'codeErreur', (value) => undefined)
        break


    }

}
