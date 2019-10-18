import React from 'react';
import { connect } from 'react-redux';
import * as Actions from './Store/actions';
import {bindActionCreators} from 'redux';

class Persist extends React.Component {
  
  userRef = React.createRef();
  handleSubmit = (e) => {
    e.preventDefault();
    const { updateUser } = this.props;
    const name = this.userRef.current.value;
    updateUser(name);
    this.userRef.current.value = '';
    console.log(this.props.username);
  }

  getUser = () => {
    const { username } =  this.props;
  }

  render() {
    const { username } = this.props;
    return (
      <div className="App">
      <h1><b>{'Current User: '}</b>{username.toUpperCase()}</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type='text' ref={this.userRef} />
          <button type='submit' >Submit</button>
        </form>
      </div>
    );
  }
}

// Allows us to turn the state to props
const mapStateToProps = (state) => ({
    username: state.username
})

// allows us to access store actions
const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateUser: Actions.updateUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Persist);

