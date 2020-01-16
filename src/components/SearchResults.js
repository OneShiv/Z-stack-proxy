import React from 'react';
import './SearchResult.scss';

const Searchresult = (props) => {
    return (
        <div className="searchResultRow">
            <div class="ques__title">{props.title}</div>
            <div class="ques_owner_info">
                <div class="ques_owener_avatar">
                    <img style={{
                        height: 50,
                        width: 50
                    }}
                        src={props.owner.profile_image} />
                    <p>{props.owner.display_name}</p>
                </div>
            </div>

        </div>
    )
}

export default Searchresult;