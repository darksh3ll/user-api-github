import React from 'react';
import "../assets/styles/usercell.css"

const UserCell = ( item ) => {
    const { avatar_url, login,html_url } = item
    return (
        <div className="container">
            <img className="avatarImg" src={avatar_url} alt="avatar" />
            <p className="login">{login}</p>
            <a href={html_url} rel="noopener" target="_blank">github</a>
        </div>
    );
}

export default UserCell