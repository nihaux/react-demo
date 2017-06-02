import React, { Component } from 'react';
import './App.css';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Todo, { TodoList } from './todo';
import axios from 'axios';


const AJAX = 'AJAX';
const AJAX_RESPONSE = 'AJAX_RESPONSE';

const ajaxResponse = (response) => ({
  type: AJAX_RESPONSE,
  payload: {
   response
  }
});

export const get = (url) => ({
  type: AJAX,
  payload: {
    url,
  },
});

const ajaxMiddleware = store => next => action => {

  if (action.type === AJAX) {
    axios.get(action.payload.url).then((response) => {
      store.dispatch(ajaxResponse(response))
    });
  }

  next(action);
}



const initialTodoListState = {
  list: ['toto', 'titi'],
};

const ADD_ITEM = 'ADD_ITEM';
export const addItem = (title) => ({
  type: ADD_ITEM,
  payload: {
    title,
  },
});

const todoReducer = (state = initialTodoListState, action) => {
  switch(action.type) {
    case ADD_ITEM:
      return { ...state, list: [...state.list, action.payload.title ]  };

    case AJAX_RESPONSE: {
      return { ...state, list: [...state.list, ...(action.payload.response.data.results.map((ship) => ship.name))]}
    }
  }

  return state;
};

const rootReducer = combineReducers({
  todo: todoReducer,
  example: (state = {}) => state,
});

const initialState = {
  todo: initialTodoListState,
};

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(
       ajaxMiddleware,
    ),
    // add support for Redux dev tools
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'HELLO WORLD',
    };
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <Todo />
            <Todo />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
