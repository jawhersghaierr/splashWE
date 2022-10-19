export const addCriteriasForGetRequest = ({url, filters}) => {
	if(filters) {
		Object.keys(filters).forEach((key, index) => {
			if (filters[key] && filters[key] !== 'null' && filters[key] !== undefined && filters[key] !== '') {
				url += `${(url.includes('?')? '&': '?')}${key}=${filters[key]}`;
			}
		})
	}
	return url
}

export const pageSize = 20
