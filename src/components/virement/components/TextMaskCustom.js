import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { IMaskMixin } from "react-imask";
import {TextField} from "@material-ui/core";
import Input from '@mui/material/Input';
import { InputLabel } from '@mui/material';

export const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
	const { onChange, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask="0000000 00"
			// definitions={{
			// 	'#': /[1-9]/,
			// }}
			inputRef={ref}
			onAccept={(value) => onChange({ target: { name: props.name, value } })}
			overwrite
		/>
	);
});

TextMaskCustom.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};



export const IMaskPhoneInput = IMaskMixin(({ ...props }) => {
	return <div style={{margin:'0 5px'}}>
		<InputLabel id={`${props?.id}-label`}>
			{props?.label}
		</InputLabel>
		<Input {...props} disableUnderline={true} style={{border: '1px solid #aaa', height: '42px'}}/>
	</div>
})
