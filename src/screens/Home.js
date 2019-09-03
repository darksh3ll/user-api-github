import React, { Component } from 'react';
import UserCell from '../components/UserCell';
import '../assets/styles/home.css'

export default class Home extends Component {

  state = {
    value: "",
    users: [],
    totalCount: 0,
    nextPage: 1
  };

  componentDidMount() {
    this.timer = null
  };

  next = () => {
    const {nextPage} = this.state
    this.setState({nextPage: nextPage + 1})
    this.fetchData()
  };

  previous = () => {
    const {nextPage} = this.state
    this.setState({nextPage: this.state.nextPage - 1})
    this.fetchData(nextPage)
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({value});
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (value.length >= 2) {
        this.fetchData()
      }
    }, 1000);

  };

  fetchData = async () => {
    const {value, nextPage} = this.state;
    try {
      const API_URL = `https://api.github.com/search/users?q=${value}&page=${nextPage}&per_page=8`;
      const data = await fetch(API_URL);
      const json = await data.json();
      this.setState({totalCount: json.total_count})
      this.setState({users: json.items})
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {value, totalCount, users} = this.state;

    return (
      <>
        {this.renderInput({value})}
        {totalCount > 1 ? <h4 className="totalCount">{totalCount} users <span role="img" aria-label="icon">👦</span></h4> : null}
        {users.length > 0
          ? this.renderListUsers()
          : <h1><span role="img" aria-label="icon">😢</span> No Data</h1>
        }
        {totalCount > 10 ? this.renderButton() : null}
      </>
    )
  };

  renderInput = ({value}) => (
    <input
      className="searchValue"
      type="text"
      value={value}
      maxLength={20}
      placeholder="Search users"
      onChange={this.handleChange}
    />
  );

  renderListUsers = () => (
    this.state.users.map((item) => <UserCell {...item} key={item.id}/>)
  )

  renderButton = () => (
    <div className="boxBtn">
      <button disabled={this.state.nextPage === 1} className="btn" onClick={this.previous}>Previous</button>
      <button className="btn" onClick={this.next}>Next</button>
    </div>
  )

}
