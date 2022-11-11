import React, {useState, useRef, useEffect} from 'react';
import { TextField, Autocomplete } from "@mui/material";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

export const AutoCompleteCustom = ({id, options, input, meta, label, selectMsg, deSelectMsg, selectedMsg}) => {

	const [focus, setFocus] = useState(false);
	const [checkAll, setCheckAll] = useState({title: selectMsg, value: 'all'});

	const selectAll = () => {
		input?.onChange(options)
		setCheckAll({title: deSelectMsg, value: 'none'})
	};
	const deSelectAll = () => {
		input?.onChange([])
		setCheckAll({title: selectMsg, value: 'all'})
	};

	return (<Autocomplete className="RoundedEl"
	                      disablePortal
	                      multiple
	                      disableClearable
	                      disableCloseOnSelect
	                      clearOnBlur={true}
	                      includeInputInList
	                      value={input.value}
	                      options={[checkAll, ...options]}
	                      getOptionLabel={(option) => option.title}
	                      id={id}
	                      sx={{
							  '& .MuiAutocomplete-input': {minWidth: '0 !important', padding: '5px !important'},
						  }}
	                      renderTags={(selected) => {
		                      if (focus) return ''
		                      if (selected.length > 1) return `${selected.length} ${selectedMsg}`
		                      return <span style={{whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '93%' }}> {selected[0].title} </span>;
	                      }}
	                      renderInput={(params) => <TextField
		                      label={label}
		                      variant="outlined"
		                      autoComplete="false"
							  sx={{'& .MuiButtonBase-root, .MuiIconButton-root': {
								  backgroundColor: 'transparent !important',
								  color: 'rgba(0, 0, 0, 0.54) !important'
							  }}}
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
				                      input?.onChange(newValue)
			                      }
		                      } else if (reason === "removeOption") {
								  setCheckAll({title: selectMsg, value: 'all'})
								  input?.onChange(newValue)
		                      } else if (reason === "clear") {
								  input?.onChange([])
								  setCheckAll({title: deSelectMsg, value: 'none'})
		                      }
	                      }}
	                      onFocus={() => { setFocus(true) }}
	                      onBlur={() => { setFocus(false) }}

	/>);
}
