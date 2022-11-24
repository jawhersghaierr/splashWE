import {calcCleFromNir} from "../../../utils/validator-utils";
import {reshapeMotifVsStatus} from "../utils/utils";

export const MutatorSetValue = ({setMotif, setDisableCle, nomRefs}) =>  ([field, value], state, utils) => {

    utils.changeValue(state, field, (value) => {

        let _value = value;

	    if ( field?.modified?.birdDate && _value?.dateNai != null && value == null ) { _value.dateNai = null}

        let motif = reshapeMotifVsStatus({status: _value?.status, nomRefs})
        if (motif) {
            setMotif(motif)
        } else motif = {}



        switch (state.formState.active) {

            case 'nir':
                let cle = calcCleFromNir(value)
                _value.cle = cle || undefined
                setDisableCle(cle ? false : true)
            break

            case 'numClient':
                if (_value?.numClient?.length === 0 ||
                    (_value?.numClient?.includes('all') && _value?.numClient?.length > Object.keys(nomRefs?.CLIENT).length)
                ) _value = {..._value, numClient: undefined}
                if (_value?.numClient?.includes('all')) _value = {..._value, numClient: Object.keys(nomRefs?.CLIENT)}
            break

            case 'errorCode':
                if (_value?.errorCode?.length === 0 ||
                    (_value?.errorCode?.includes('all') && _value?.errorCode?.length > Object.keys(motif).length)
                ) _value = {..._value, errorCode: undefined}
                if (_value?.errorCode?.includes('all')) _value = {..._value, errorCode: Object.keys(motif)}
            break

            case 'status':
                if (_value?.status?.length === 0 ||
                    (_value?.status?.includes('all') && _value?.status?.length > Object.keys(nomRefs.FACTURE_STATUS).length)
                ) _value = {..._value, status: undefined}
                if (_value?.status?.includes('all')) _value = {..._value, status: Object.keys(nomRefs.FACTURE_STATUS)}
                if (_value.errorCode !== undefined) _value = {..._value, errorCode: undefined}
            break

        }

        return _value

})}
