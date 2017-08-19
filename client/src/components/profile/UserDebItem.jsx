import React from 'react';
import {
  Link
} from 'react-router-dom';

const UserDebItem = (props) => {

  return (
    <div className="userDebateItem">
      {props.debate.topic }
    </div>
  )
}

export default UserDebItem;


