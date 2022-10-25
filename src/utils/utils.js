export const addCriteriasForGetRequest = ({url, filters, prepareForDownload = false}) => {
	let concatSymbol = '&'
	if (prepareForDownload) concatSymbol = '%26'
	if(filters) {
		Object.keys(filters).forEach((key, index) => {
			if (filters[key] && filters[key] !== 'null' && filters[key] !== undefined && filters[key] !== '') {
				url += `${(url.includes('?')? concatSymbol: '?')}${key}=${filters[key]}`;
			}
		})
	}

	console.log('url > ', url)
	return url
}

export const pageSize = 20
