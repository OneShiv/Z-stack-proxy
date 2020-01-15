import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

const SearchBar = (props) => {
    const [searchString, setSearchString] = useState('');
    const searchHandler = (str) => {
        setSearchString(() => str);
        props.onSearch(str);
    }
    console.log(props);
    const submitHandler = (e) => {
        e.preventDefault();
        props.onSearch(searchString);
    }
    return (
        <form onSubmit={submitHandler}>
            <TextField
                value={searchString}
                id="standard-full-width"
                label="Search"
                style={{ margin: 8 }}
                placeholder="search text"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(event) => searchHandler(event.target.value)}
            />
        </form>
    )
}

export default SearchBar;