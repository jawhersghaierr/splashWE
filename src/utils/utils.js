import React from "react";

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

	return url
}

export const pageSize = 20

export const renderCell = ({row, value, field}) => <div id={`${field}_${row?.id}`}>{value}</div>
