import {calcCleFromNir} from "../../../utils/validator-utils";
import {reshapeMotifVsStatus} from "../utils/utils";

export const handleFormChange = ({nomRefs, setMotif, setDisableCle}) => ([name], state, { changeValue }) => {

    // console.log('name ', name)
    // console.log('nomRefs ', nomRefs)
    console.log('state ', state)
    let values = state.formState.values

    if ( state?.lastFormState?.modified?.birdDate && values?.dateNai != null && values?.birdDate == null ) {
        changeValue(state, 'dateNai', (value) => undefined)
    }

    switch (name) {

        case 'nir':
            let cle = calcCleFromNir(values)
            setDisableCle(cle ? false : true)
            changeValue(state, 'cle', (value) => cle || undefined)
        break

        case 'status':
            console.log('values?.status > ', values?.status)
            console.log('values?.errorCode > ', values?.errorCode)
            setMotif( reshapeMotifVsStatus({status: values?.status, nomRefs}) )
            if (values?.errorCode !== undefined) changeValue(state, 'errorCode', (value) => undefined)
        break


    }

}
