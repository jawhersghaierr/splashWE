import * as React from 'react';

export const VirtLink = ({label, onclick}) => {

	return (<span style={{color: '#00C9E9', cursor: 'pointer'}} onClick={onclick}><b>{label}</b></span>);
}
