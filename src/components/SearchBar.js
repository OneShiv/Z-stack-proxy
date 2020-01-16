import React from 'react';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {Button} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.scss';

const SearchBar = (props) => {
    return (
        <div className="searchBarContainer">
            <form onSubmit={props.searchHandler}>
                <TextField
                    error={props.error}
                    value={props.str}
                    id="standard-full-width"
                    label="Search"
                    style={{ margin: 8 }}
                    placeholder="search text"
                    fullWidth
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={props.handleChange('searchString')}
                />
                <Button variant="contained" color="secondary" onClick={props.searchHandler}>
                    Search
                </Button>
            </form>
        </div>
    )
}

export default SearchBar;