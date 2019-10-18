import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import * as Actions from './Store/actions';
import {bindActionCreators} from 'redux';

let listRef = React.createRef();

const addUser = (e, setList) => {
  e.preventDefault();
  let todo = listRef.current.value;
} 

function Todo() {
  const [list, setList] = useState([]);
  return (
    <div className='list-container'>
      <ul className='list' >
        {list.map((currList, index) => (
          <li key={index} index={index} list={currList} ></li>
        ))}
      </ul>
      <form className='list-form' onSubmit={ (e) => addUser(e, setList) }>
          <input ref={listRef} type='text' />
          <button type='submit' >Add Todo</button>
      </form>
    </div>
  )
}

class Persist extends Component {
  
  userRef = React.createRef();
  handleSubmit = (e) => {
    e.preventDefault();
    const { updateUser } = this.props;
    const name = this.userRef.current.value;
    if(name.length === 0) {
      alert("Please Enter A Username")
    } else {
      updateUser({ username: name, login: true});
      this.userRef.current.value = '';
    }
  }

  logOff = () => {
    const { updateUser } = this.props;
    updateUser({ username: '', login: false});
  }

  render() {
    const { username, login } = this.props;
    return (
      <div className="App">
      {login ? 
      (
        <div>
          <h1><b>{'Welcome: '}</b>{ username }</h1>
          <button onClick={() => this.logOff()}>{'Log Off'}</button>
          <Todo />
        </div>
      ) 
      : 
      (
        <form onSubmit={(e) => this.handleSubmit(e)}>
            <h1>{'Please Login'}</h1>
            <input type='text' ref={this.userRef} />
            <button type='submit' >Log In</button>
        </form>
      )}
      </div>
    );
  }
}

// Allows us to turn the state to props
const mapStateToProps = (state) => ({
    username: state.user.username,
    login: state.user.login
})

// allows us to access store actions
const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateUser: Actions.updateUser
}, dispatch)

const ConnectedPersist = connect(mapStateToProps, mapDispatchToProps)(Persist);

export default ConnectedPersist;

