import React from 'react';
import './SearchResult.scss';
import ReactHtmlParser from 'react-html-parser';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Loading from './Loading';
const Searchresult = (props) => {
    if (props.resultsLoading) {
        return <Loading />
    }
    return (
        <div className="searchResultRow">
            <Typography variant="h6" gutterBottom onClick={() => props.clickPost(props)}>
                {props.title}
            </Typography>
            <Typography variant="subtitle" gutterBottom className="ques_body">
                {ReactHtmlParser(props.body.substring(0, 100))}
            </Typography>
            <div className="ques_desc_avatar">
                <div className="ques_owner_info">
                    <div className="ques_owener_avatar">
                        <img src={props.owner.profile_image} />
                        <p style={{ marginLeft: 10 }}>{props.owner.display_name}</p>
                    </div>
                </div>
                <div className='tags-container'>
                    {props.tags.map(tag => <Chip label={tag} />)}
                </div>
            </div>
        </div>
    )
}

export default Searchresult;