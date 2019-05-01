import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import camelCase from 'lodash/camelCase';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';

import { getStyles } from '../../styles/jss/common/matSimpleTags';

interface IInputProps extends Autosuggest.InputProps<string> {}

export interface IMatSimpleTagsProps {
  tags?: string[];
  label?: string;
  className?: string;
  tagSuggestions?: string[];
  onChange?: (selectedTags: string[]) => void;
}

function MatSimpleTags({
  tags = [],
  label = 'Tags',
  className,
  tagSuggestions = [],
  onChange = () => {} // tslint:disable-line no-empty
 }: IMatSimpleTagsProps) {
  const classes = makeStyles(getStyles)();
  const [selectedTags, _setSelectedTags] = useState<string[]>(tags);
  const [inputVal, setInputVal] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const setSelectedTags = useCallback((selectedTags: string[]) => {
    _setSelectedTags(selectedTags);
    onChange(selectedTags);
  }, []);

  const onKeyDownadjustInputWidth = useCallback((evt: React.KeyboardEvent<any>) => {
    const inputElem = evt.target as HTMLInputElement;
    let calcText: string;
    
    let calcElem: HTMLDivElement;
    if (!(calcElem = document.getElementById('pxWidthCalcElem') as HTMLDivElement)) {
      calcElem = document.createElement('div');
      calcElem.style.position = 'absolute';
      calcElem.style.visibility = 'hidden';
      document.body.append(calcElem);
    }

    if (evt.key === 'Enter') {
      calcText = '';
    } else if (evt.key === 'Backspace') {
      calcText = inputElem.value.slice(0, inputElem.value.length - 1);
    } else {
      calcText = inputElem.value + evt.key;
    }

    calcElem.innerText = calcText.replace(/\s/ig, 'a');
    inputElem.style.width = calcElem.clientWidth + 1 + 'px';
  }, []);

  const renderInputComponent = useCallback(({ ref, onKeyDown, onKeyPress, ...other }: IInputProps) => {
    return (
      <TextField className={className} label={label} fullWidth margin="dense"
        InputProps={{
          inputRef: (node) => {
            inputRef.current = node;
            ref(node);
          },
          startAdornment: selectedTags.length ? selectedTags.map((tag, i) => (
            <Chip key={i} className={classes.tagChip} classes={{ deleteIcon: classes.tagChipDeleteIcon }}
              label={tag} onDelete={() => {
                const newSelectedTags = selectedTags.filter(t => t !== tag);
                setSelectedTags(newSelectedTags);
              }} />
          )) : null,
          classes: {
            root: "flex-wrap align-items-baseline",
            input: classes.tagInput
          }
        }}
        InputLabelProps={{
          ...(selectedTags.length ? { shrink: true } : null)
        }}
        onKeyPress={evt => {
          onKeyDownadjustInputWidth(evt);
          // tslint:disable-next-line no-unused-expression
          onKeyPress && onKeyPress(evt);
        }}
        onKeyDown={evt => {
          if (evt.key === 'Backspace') {
            if (!inputVal.length)
              setSelectedTags(selectedTags.slice(0, selectedTags.length - 1));
            else
              onKeyDownadjustInputWidth(evt);
          } else if (inputVal.trim().length && evt.key === 'Enter') {
            // Sanitize
            const sanitized = deburr(inputVal.trim()).replace(/[^a-zA-Z0-9\-\s]/ig, '');
            const newTag = camelCase(sanitized).trim();

            if (newTag && !selectedTags.some(t => t.toLowerCase() === newTag))
              setSelectedTags([...selectedTags, newTag]);

            setInputVal('');
            onKeyDownadjustInputWidth(evt);
          }
          
          // tslint:disable-next-line no-unused-expression
          onKeyDown && onKeyDown(evt);
        }}
        {...other as any} />
    );
  }, [inputVal, selectedTags, label, className]);

  const onSuggestionFetch = useCallback(({ value }: { value: string }) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let addedCount = 0;
    let res: string[] = [];

    if (inputLength) {
      const lookIn = tagSuggestions.filter(tagSugg => !selectedTags.some(tag => tagSugg === tag));
      res = inputLength === 0 ? [] : lookIn.filter(tagSugg => {
        const keep = addedCount < 10 && tagSugg.slice(0, inputLength).toLowerCase() === inputValue;
        if (keep) addedCount += 1;
  
        return keep;
      });
    }

    setSuggestions(res);
  }, [selectedTags, tagSuggestions]);

  const onSuggestionsClear = useCallback(() => setSuggestions([]), []);
  const getSuggestionValue = useCallback((suggestion: string) => suggestion, []);

  const renderSuggestion = useCallback<Autosuggest.RenderSuggestion<string>>((
    suggestion,
    { isHighlighted, query }
  ) => {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
                <strong key={String(index)} style={{ fontWeight: 300 }}>
                  {part.text}
                </strong>
              ),
          )}
        </div>
      </MenuItem>
    );
  }, []);

  const renderSuggestionContainer = useCallback<Autosuggest.RenderSuggestionsContainer>((options) => (
    <Paper {...options.containerProps} square>
      {options.children}
    </Paper>
  ), []);

  const onSuggestionSelected = useCallback<Autosuggest.OnSuggestionSelected<string>>((
    evt, { suggestionValue }
  ) => {
    setSelectedTags([...selectedTags, suggestionValue]);
    setInputVal('');
  }, [selectedTags]);

  return (
    <Autosuggest suggestions={suggestions}
      renderInputComponent={renderInputComponent}
      onSuggestionsFetchRequested={onSuggestionFetch}
      onSuggestionsClearRequested={onSuggestionsClear}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderSuggestionsContainer={renderSuggestionContainer}
      onSuggestionSelected={onSuggestionSelected}
      inputProps={{
        value: inputVal,
        onChange: (evt, { newValue }) => setInputVal(newValue)
      }} />
  );
}

MatSimpleTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  tagSuggestions: PropTypes.arrayOf(PropTypes.string)
};

export default MatSimpleTags;