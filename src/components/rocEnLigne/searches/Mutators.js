import {calcCleFromNir} from "../../../utils/validator-utils";
import {
	checkForRejeteOrAnuleOrMore,
	getMotifsFromTypes,
	getStatusFromTypes,
	getSubMotifsFromMotif,
	getSubMotifsFromTypes
} from "../utils/utils";

export const handleFormChange = ({nomRefs, rln, setRln, setDisableCle}) => ([name], state, { changeValue }) => {
	// console.log('name ', name)
	// console.log('nomRefs ', nomRefs)
	// console.log('state ', state)

	let values = state.formState.values

	switch (name) {

		case 'amc':
			changeValue( state, 'cle', (value) => {
				if (value?.length === 0) return undefined
				return value
			})
		break

		case 'nir':
			let cle = calcCleFromNir(values)
			setDisableCle(cle ? false : true)
			changeValue( state, 'cle', (value) => cle || undefined )
		break

		case 'type':
			changeValue(state, name, (value) => {
				if (value?.length === 0 || (value?.includes('all') && value?.length > Object.keys(nomRefs?.ROC_TYPES).length) ) return undefined
				if (value?.includes('all')) return Object.keys(nomRefs?.ROC_TYPES)

					let statusFromTypes = getStatusFromTypes({type: value, nomRefs})
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

					let motifsFromTypes = getMotifsFromTypes({type: value, nomRefs})
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
					let tmpSubMotifsFromMotif =  getSubMotifsFromTypes({type: value, nomRefs})
					tmpSubMotifsFromMotif.forEach(subCode => {
						tmpSubMotif[subCode] = nomRefs.ROC_SOUS_MOTIFS[subCode]
					})
					if (Object.keys(tmpMotif).length == 0 ) {
						tmpSubMotif = Object.keys( nomRefs.ROC_SOUS_MOTIFS )
					} else {
						tmpSubMotif = Object.keys( tmpSubMotif )
					}

					setRln({
						amc: rln.amc,
						localDomaine: rln.localDomaine,
						localStatus: tmpStatut.map(code => ({value: code, title: nomRefs.ROC_STATUSES[code]})),
						localMotif: tmpMotif,
						localSubMotif: tmpSubMotif,
						localMotif1: tmpMotif.map(code => ({value: code, title: nomRefs.ROC_MOTIFS[code]})),
						localSubMotif1: tmpSubMotif.map(code => ({value: code, title: nomRefs.ROC_SOUS_MOTIFS[code]})),
					})



				return value
			})
			changeValue(state, 'statut', (value) => undefined)
			changeValue(state, 'motif', (value) => undefined)
			changeValue(state, 'sousMotif', (value) => undefined)
		break

		case 'domaine':
		break

		case 'statut':
			if (!checkForRejeteOrAnuleOrMore(state?.formState?.values?.statut)){
				changeValue(state, 'motif', (value) => undefined)
				changeValue(state, 'sousMotif', (value) => undefined)
			}
		break

		case 'motif':
			let tmpSubMotif = {}, localSubMotif1 = []
			let SubMotifsFromMotif = getSubMotifsFromMotif({motif: values?.motif, nomRefs})

			SubMotifsFromMotif.forEach(subCode => {
					tmpSubMotif[subCode] = nomRefs.ROC_SOUS_MOTIFS[subCode]
				})
			if (Object.keys(tmpSubMotif).length == 0 ) {
				tmpSubMotif = Object.keys( nomRefs.ROC_SOUS_MOTIFS )
			} else {
				tmpSubMotif = Object.keys( tmpSubMotif )
			}

			setRln({
				amc: rln.amc,
				localDomaine: rln.localDomaine,
				localStatus: rln.localStatus,
				localMotif: rln.localMotif,
				localMotif1: rln.localMotif1,
				localSubMotif: tmpSubMotif,
				localSubMotif1: tmpSubMotif.map(code => ({value: code, title: nomRefs.ROC_SOUS_MOTIFS[code]})),
			})

			changeValue(state, 'sousMotif', (value) => undefined)
		break

	}


}
