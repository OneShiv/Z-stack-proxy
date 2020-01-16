import React from 'react';
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Checkbox, Radio, FormGroup } from '@material-ui/core';
import Loading from './Loading';
const FilterSection = (props) => {
    const { handleChange, value } = props;
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '50% 50%'
        }}>
            <ul style={{
                display: 'inline-block'
            }}>
                <FormControl component="fieldset" className="form-control">
                    <FormLabel component="legend">Tog Tags</FormLabel>
                    <RadioGroup aria-label="Top Tags" name="top-tag" onChange={handleChange('selectedTag')}>
                        {value.tags.map(tag => (<FormControlLabel value={tag.name} control={<Radio />} label={tag.name} />))}
                        {props.tagsLoading && <Loading />}
                    </RadioGroup>
                </FormControl>
            </ul>
            <div className="other-filters">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Other Filters</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={value.accepted} onChange={handleChange('accepted')} value="accepted" />}
                            label="Accepted"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={value.unanswered} onChange={handleChange('unanswered')} value="unanswered" />}
                            label="Unanswered"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={value.score} onChange={handleChange('score')} value="score" />}
                            label="Score 3+"
                        />
                    </FormGroup>
                </FormControl>
            </div>
        </div>
    )
}

export default FilterSection;