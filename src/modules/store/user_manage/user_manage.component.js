import React from 'react';
import './user_manage.style.scss';

export class UserManageScreen extends React.Component {
    render() {
        return (
            <div className="user-manage">
                <text onClick={() => { }} className="primary">Active User 1</text><br/>
                <text onClick={() => { }} className="primary">Active User 2</text>
            </div>
        )
    }
}