import React, { Component } from 'react';
import UserCell from '../components/UserCell';
import '../assets/styles/home.css'
import { setTimeout } from 'timers';

export default class Home extends Component {
    state = {
        value: "",
        users: [],
    };
    componentDidMount(){
        this.timer = null
    }
    handleChange = event => {
        const value = event.target.value;
        this.setState({ value })
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            if (value.length >= 2) {
                this.fetchData(value)
            }
        }, 1000);

    }

    fetchData = async (value) => {
        const API_URL = ` https://api.github.com/search/users?q=${value}`
        const data = await fetch(API_URL);
        const json = await data.json();
        this.setState({ users: json.items })
    };

    render() {
        //destructurings.
        const { value } = this.state;
        return (
            <>
                {this.renderInput({ value })}
                <h4>Resultat:{this.state.users.length}</h4>
                {this.renderListUsers()}
            </>
        )
    }
    renderInput = ({ value }) => (
        <input
            className="searchValue"
            type="text"
            value={value}
            maxLength={20}
            placeholder="Search users"
            onChange={this.handleChange}
        />
    )
    renderListUsers = () => (
        this.state.users.map((item) => <UserCell {...item} key={item.id} />)
    )
}
