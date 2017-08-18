import React from 'react';
import {
  Link
} from 'react-router-dom';

const DebateItem = (props) => {

  return (
    <li className="debate-item-style">
    	<Link className="cruise" to={`debates/${props.debate.topic.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`} onClick={()=>props.debateSelectHandler(props.debate)}>
      {props.debate.topic }
    	</Link>
  	</li>
  )
}

export default DebateItem;