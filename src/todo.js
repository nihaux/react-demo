import React from 'react';
import { connect } from 'react-redux';
import { addItem, get } from './App';

const getTodoList = (state) => state.todo.list;

export class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      urlValue: '',
    };
  }

  changeValue = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  add = () => {
    this.props.add(this.state.inputValue);
  }

  changeUrlValue = (event) => {
    this.setState({
      urlValue: event.target.value,
    });
  }

  get = () => {
    this.props.getUrlInTodo(this.state.urlValue);
  }

  render = () => (
    <div>
      <ul>
        {this.props.list.map((elt) => <li>{elt}</li>)}
      </ul>
      <input type="text" value={this.state.inputValue} onChange={this.changeValue} /> <button onClick={this.add}>ADD</button>
      <input type="text" value={this.state.urlValue} onChange={this.changeUrlValue} /> <button onClick={this.get}>GET</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  list: getTodoList(state),
});

const mapDispatchToProps = (dispatch) => ({
  add: (title) => dispatch(addItem(title)),
  getUrlInTodo: (url) => dispatch(get(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
