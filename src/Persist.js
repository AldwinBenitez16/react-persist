import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import * as Actions from './Store/actions';
import {bindActionCreators} from 'redux';

let listRef = React.createRef();

const addUser = (e, list, setList) => {
  e.preventDefault();
  let todo = {text: listRef.current.value, isCompleted: false};
  setList([...list, todo]);
  listRef.current.value = '';
} 

const isComplete = (index, list, setList) => {
  const newTodos = [...list]; 
  newTodos[index].isCompleted = true;
  setList(newTodos);
}

const removeUser = (index, list, setList) => {
  const newTodos = [...list];
  newTodos.splice(index, 1);
  setList(newTodos);
}

function Todo() {
  const [list, setList] = useState([]);
  return (
    <div className='list-container'>
      <form className='list-form' onSubmit={ (e) => addUser(e, list, setList) }>
          <input ref={listRef} type='text' />
          <button type='submit' >Add Todo</button>
      </form>
      <ul className='list' >
        {list.map((currList, index) => (
          <li key={index} index={index} style={{textDecoration: currList.isCompleted ? 'line-through' : ''}} list={currList.text} >{currList.text} <button onClick={ () => isComplete(index, list, setList) }>Completed</button> <button onClick={ () => removeUser(index, list, setList) }>X</button></li>
        ))}
      </ul>
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

