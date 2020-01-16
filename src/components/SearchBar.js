import React from 'react';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={props.handleChange('searchString')}
                />
                <FontAwesomeIcon className="searchbar-svg" icon={faSearch} />
            </form>
        </div>
    )
}

export default SearchBar;