import React, {useState, useRef, useEffect} from 'react';
import { TextField, Autocomplete } from "@mui/material";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Paper from "@material-ui/core/Paper";

const CustomPaper = (props) => {
	return <Paper elevation={8} {...props} style={{position: "relative", zIndex: 99999}} />;
};

export const AutoCompleteCustom = ({options, input, meta, label, selectMsg, deSelectMsg, selectedMsg}) => {

	const [focus, setFocus] = useState(false);
	const [value, setValue] = useState([]);
	const [checkAll, setCheckAll] = useState({title: selectMsg, value: 'all'});

	const selectAll = () => {
		setValue(options);
		input?.onChange(options)
		setCheckAll({title: deSelectMsg, value: 'none'})
	};
	const deSelectAll = () => {
		setValue([]);
		input?.onChange([])
		setCheckAll({title: selectMsg, value: 'all'})
	};

	return (<Autocomplete className="RoundedEl"
	                      disablePortal
	                      multiple
	                      disableClearable
	                      disableCloseOnSelect
	                      clearOnBlur={false}
	                      includeInputInList
	                      value={input.value}
	                      options={[checkAll, ...options]}
	                      getOptionLabel={(option) => option.title}
	                      id="combo-box-demo"
	                      // PaperComponent={CustomPaper}
	                      sx={{ maxHeight: '20px', whiteSpace: "nowrap", textOverflow: 'ellipsis', '& .MuiInputBase-root': {
		                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
							  padding: '2px 15px !important',
			                      '& .MuiIconButton-root': {color: '#000', backgroundColor: 'transparent' }} }}
	                      renderTags={(selected) => {
		                      if (focus) return ''
		                      if (selected.length > 1) return `${selected.length} ${selectedMsg}`
		                      return <span style={{whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}> {`(${selected[0].value}) ${selected[0].title}`} </span>;
	                      }}
	                      renderInput={(params) => <TextField
		                      label={label}
		                      // variant="outlined"
		                      // autoComplete="false"
		                      style={{ whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis'}}
		                      {...{...params, inputProps: { ...params.inputProps } }}
	                      />}
	                      renderOption={(props, option, { inputValue }) => {
		                      const matches = match(option.title, inputValue, { insideWords: true });
		                      const parts = parse(option.title, matches);

							  if (option && (option?.value == 'all' || option?.value == 'none')) return (<li {...props}>
			                      <div style={{ fontWeight: 700 }}> {option?.title} </div>
		                      </li>)

		                      return (
			                      <li {...props}><div> {parts.map((part, index) => (
				                      <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
										{part.text}
									  </span>
			                      ))} </div></li>
		                      );
	                      }}

	                      onChange={(event, newValue, reason) => {

							  if (reason === "selectOption") {
			                      if (newValue.find(el => el.value == 'all')) {
				                      selectAll()
			                      } else if (newValue.find(el => el.value == 'none')) {
				                      deSelectAll()
			                      } else {
				                      setValue(newValue);
				                      input?.onChange(newValue)
			                      }
		                      } else if (reason === "removeOption") {
								  setCheckAll({title: selectMsg, value: 'all'})
			                      setValue(newValue);
								  input?.onChange(newValue)
		                      } else if (reason === "clear") {
			                      setValue([]);
								  input?.onChange([])
								  setCheckAll({title: deSelectMsg, value: 'none'})
		                      }
	                      }}
	                      onFocus={() => { setFocus(true) }}
	                      onBlur={() => { setFocus(false) }}

	/>);
}
