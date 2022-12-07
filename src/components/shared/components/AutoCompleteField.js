import React, {useState, useRef, useEffect} from 'react';
import {TextField, Autocomplete, FormControl} from "@mui/material";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import {OnChange} from "react-final-form-listeners";
import {Field} from "react-final-form";

export const AutoCompleteField = ({id, name, options=[], label, selectMsg, deSelectMsg, selectedMsg, handleFormChange, multiple, disabled, FormControlStyle}) => {

	const [focus, setFocus] = useState(false);
	const [checkAll, setCheckAll] = useState({title: selectMsg, value: 'all'});

	return (
		<Field name={name} multiple={multiple} format={value => value || []}>
			{({input, meta}) => (
				<FormControl className="RoundDate" style={(FormControlStyle)? {...FormControlStyle}: { flex: '1 0 21%', margin: '15px 5px', maxWidth: '24%' }}>
					{options && <Autocomplete className="RoundedEl"
					                          disabled={disabled}
					                          id={id}
					                          value={input.value}
					                          options={(multiple)? [checkAll, ...options]: options}
					                          disablePortal={true}
					                          multiple={multiple}
					                          disableClearable
					                          disableCloseOnSelect
					                          openOnFocus
					                          clearOnBlur={true}
					                          includeInputInList
					                          noOptionsText="pas d'options disponibles"
					                          getOptionLabel={(option, value) => {
						                          // console.log('getOptionLabel option ', option)
						                          // console.log('getOptionLabel value ', value)

						                          return option.title
					                          }}
					                          isOptionEqualToValue={(option, value) => {
												  // console.log('isOptionEqualToValue option ', option)
												  // console.log('isOptionEqualToValue value ', value)

						                          return option.value === value.value
					                          }}
					                          sx={{ '& .MuiAutocomplete-input': {minWidth: '0 !important', padding: '5px !important'} }}
					                          renderTags={(selected) => {
												  if (multiple) {
													  if (focus) return '';
													  if (selected.length > 1) {
														  return <span style={{
															  whiteSpace: "nowrap",
															  overflow: 'hidden',
															  textOverflow: 'ellipsis',
															  maxWidth: '93%'
														  }}> {selected.length} {selectedMsg} </span>;
													  }
													  return <span style={{
														  whiteSpace: "nowrap",
														  overflow: 'hidden',
														  textOverflow: 'ellipsis',
														  maxWidth: '93%'
													  }}> {selected[0].title} </span>;
												  } else {
													  return <span style={{
														  whiteSpace: "nowrap",
														  overflow: 'hidden',
														  textOverflow: 'ellipsis',
														  maxWidth: '93%'
													  }}> {selected.title} </span>;
												  }
					                          }}
					                          renderInput={(params) => <TextField
						                          label={label}
						                          variant="outlined"
						                          autoComplete="false"
						                          sx={{'& .MuiButtonBase-root, .MuiIconButton-root': {
								                          backgroundColor: 'transparent !important',
								                          color: 'rgba(0, 0, 0, 0.54) !important',
								                          textOverflow: 'ellipsis',
								                          whiteSpace: 'nowrap'
							                          }}}
						                          {...params}
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
						                          if (multiple) {
							                          if (reason === "selectOption") {
								                          if (newValue.find(el => el.value == 'all')) {
									                          setCheckAll({title: deSelectMsg, value: 'none'})
									                          input?.onChange(options)
								                          } else if (newValue.length == 0 || newValue.find(el => el.value == 'none')) {
									                          setCheckAll({title: selectMsg, value: 'all'})
									                          input?.onChange(undefined)
								                          } else input.onChange(newValue);

							                          } else if (reason === "removeOption") {
								                          if(newValue.length == 0) {
									                          input.onChange(undefined)
								                          } else input.onChange(newValue)
							                          } else if (reason === "clear") {
								                          setCheckAll({title: selectMsg, value: 'all'})
								                          input?.onChange(undefined)
							                          }
						                          }else {
							                          if (reason === "selectOption") {
								                          input.onChange(newValue);
							                          } else if (reason === "removeOption" || reason === "clear") {
								                          input?.onChange(undefined)
							                          }
						                          }}
											  }
					                          onFocus={() => { setFocus(true) }}
					                          onBlur={() => { setFocus(false) }}

					/>}
					{handleFormChange && <OnChange name={name}>
						{() => handleFormChange(name)}
					</OnChange>}

				</FormControl>
			)}
		</Field>
	);
}
