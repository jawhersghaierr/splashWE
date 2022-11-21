import {calcCleFromNir} from "../../../utils/validator-utils";
import {getMotifsFromTypes, getStatusFromTypes, getSubMotifsFromMotif, getSubMotifsFromTypes} from "../utils/utils";

export const MutatorSetValue = ({rln, setRln, setDisableCle, nomRefs}) =>  ([field, value], state, utils) => {

	//TODO Move mutators in separated file
		utils.changeValue(state, field, (value) => {

			let _value = value;
			if(field?.modified?.birdDate && value == null) { _value.dateNaiss = null}

			switch (field.active) {
				case 'nir':
					let cle = calcCleFromNir(value)
					_value.cle = cle || undefined
					setDisableCle(cle ? false : true)
					break

				case 'cle':
					break

				case 'amc':
					console.log(_value?.amc)
					if (_value?.amc?.length === 0) _value = {..._value, amc: undefined}
					break

				//TODO Remove it old variant after testing
				//
				// case 'amc': //Object.keys(nomRefs.CLIENT === amc)
				//     if (_value?.amc?.length === 0 ||
				//         (_value?.amc?.includes('all') && _value?.amc?.length > rln.amc.length)
				//     ) _value = {..._value, amc: undefined}
				//     if (_value?.amc?.includes('all')) _value = {..._value, amc: rln.amc}
				//
				// break

				case 'domaine':
					if (_value?.domaine?.length === 0 ||
						(_value?.domaine?.includes('all') && _value?.domaine?.length > Object.keys(nomRefs?.ROC_DOMAINS).length)
					) _value = {..._value, domaine: undefined}
					if (_value?.domaine?.includes('all')) _value = {..._value, domaine: Object.keys(nomRefs?.ROC_DOMAINS)}
					break

				case 'type': //Object.keys(nomRefs.ROC_TYPES)
					if (_value?.type?.length === 0 ||
						(_value?.type?.includes('all') && _value?.type?.length > Object.keys(nomRefs?.ROC_TYPES).length)
					) _value = {..._value, type: undefined}
					if (_value?.type?.includes('all')) _value = {..._value, type: Object.keys(nomRefs?.ROC_TYPES)}
					if (_value.errorCode !== undefined) {
						_value = {..._value, errorCode: undefined}
					}

					if (_value.statut !== undefined) {
						_value = {..._value, statut: undefined}
					}
					if (_value.motif !== undefined) {
						_value = {..._value, motif: undefined}
					}
					if (_value.sousMotif !== undefined) {
						_value = {..._value, sousMotif: undefined}
					}

					/**
					 * TODO MUST BE Tested again && new implementation of AutoComplete
					 * ****************************************************************
					 */
					if (_value.type){

						let statusFromTypes = getStatusFromTypes({nomRefs, type: _value.type})
						let tmpStatut = {}
						Object.keys(nomRefs.ROC_STATUSES).forEach( stat => {
							if (statusFromTypes.includes(stat)) {
								tmpStatut[stat] = nomRefs.ROC_STATUSES[stat]
							}
						})
						if (Object.keys(tmpStatut).length == 0 ) {
							tmpStatut = Object.keys( nomRefs.ROC_STATUSES )
						} else {
							tmpStatut = Object.keys( tmpStatut )
						}

						let motifsFromTypes = getMotifsFromTypes({type: _value.type, nomRefs})
						let tmpMotif = {}
						Object.keys(nomRefs.ROC_MOTIFS).forEach( stat => {
							if (motifsFromTypes.includes(stat)) {
								tmpMotif[stat] = nomRefs.ROC_MOTIFS[stat]
							}
						})
						if (Object.keys(tmpMotif).length == 0 ) {
							tmpMotif = Object.keys( nomRefs.ROC_MOTIFS )
						} else {
							tmpMotif = Object.keys( tmpMotif )
						}

						let tmpSubMotif = {}
						// let tmpSubMotifsFromMotif =  getSubMotifsFromMotif({motif: motifsFromTypes, nomRefs})
						let tmpSubMotifsFromMotif =  getSubMotifsFromTypes({type: _value.type, nomRefs})
						tmpSubMotifsFromMotif.forEach(subCode => {
							tmpSubMotif[subCode] = nomRefs.ROC_SOUS_MOTIFS[subCode]
						})
						if (Object.keys(tmpMotif).length == 0 ) {
							tmpSubMotif = Object.keys( nomRefs.ROC_SOUS_MOTIFS )
						} else {
							tmpSubMotif = Object.keys( tmpSubMotif )
						}

						setRln({
							amc: [...rln.amc],
							localStatus: [...tmpStatut],
							localMotif: [...tmpMotif],
							localSubMotif: [...tmpSubMotif]
						})

					}
					break

				case 'statut': //Object.keys(nomRefs.ROC_STATUSES)

					if (_value?.statut?.length === 0 ||
						(_value?.statut?.includes('all') && _value?.statut?.length > rln.localStatus.length)
					) _value = {..._value, statut: undefined}
					if (_value?.statut?.includes('all')) _value = {..._value, statut: rln.localStatus}

					if ( !( _value?.statut?.length > 0 && ( _value?.statut?.includes('REJETEE') || _value?.statut?.includes('INVALIDE') )) ) {
						if (_value.motif !== undefined) {
							_value = {..._value, motif: undefined}
						}
						if (_value.sousMotif !== undefined) {
							_value = {..._value, sousMotif: undefined}
						}
					}

					break

				case 'motif':
					if (_value?.motif?.length === 0 ||
						(_value?.motif?.includes('all') && _value?.motif?.length > rln.localMotif.length)
					) _value = {..._value, motif: undefined}
					if (_value?.motif?.includes('all')) _value = {..._value, motif: rln.localMotif}

					if (_value.sousMotif !== undefined) {
						_value = {..._value, sousMotif: undefined}
					}

					//____________________________________________________________________________________________________
					if (_value.motif) {
						let tmpSubMotif = {}
						getSubMotifsFromMotif({motif: _value.motif, nomRefs})
							.forEach(subCode => {
								tmpSubMotif[subCode] = nomRefs.ROC_SOUS_MOTIFS[subCode]
							})
						if (Object.keys(tmpSubMotif).length == 0 ) {
							tmpSubMotif = Object.keys( nomRefs.ROC_SOUS_MOTIFS )
						} else {
							tmpSubMotif = Object.keys( tmpSubMotif )
						}

						setRln({
							amc: [...rln.amc],
							localStatus: [...rln.localStatus],
							localMotif: [...rln.localMotif],
							localSubMotif: [...tmpSubMotif]

						})


					}
					break

				case 'sousMotif':
					if (_value?.sousMotif?.length === 0 ||
						(_value?.sousMotif?.includes('all') && _value?.sousMotif?.length > rln.localSubMotif.length)
					) _value = {..._value, sousMotif: undefined}
					if (_value?.sousMotif?.includes('all')) _value = {..._value, sousMotif: rln.localSubMotif}

					break

			}


			return _value

})}
