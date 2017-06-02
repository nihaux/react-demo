import React from 'react';
import axios from 'axios';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpt: 0,
      step: 1,
      ppl: [],
    };
  }

  componentDidMount() {
    axios.get('http://swapi.co/api/people/?page=2')
      .then((result) => {
        this.setState({
          ppl: result.data.results,
        });
      })
  }

  componentWillReceiveProps


  inc = () => {
    this.setState({
      cpt: this.state.cpt + this.state.step,
    });
  }

  dec = () => {
    this.setState({
      cpt: this.state.cpt - this.state.step,
    });
  }

  changeStep = (event) => {
    this.setState({
      step: event.target.value
    })
  }

  save = () => {

  }

  render = () => (
    <div>
      <div
        style={{
          color: 'black',
          fontStyle: 'bold'
        }}
        className="toto"
      >
        {this.state.cpt}
      </div>
      <ul>
      {
        this.state.ppl.map((person) => (
          <li key={person.name} >{person.name}</li>
        ))
      }
      </ul>
      <input onChange={this.changeStep}/>
      <button onClick={this.inc}>+</button>
      <button onClick={() => this.props.onChange(this.state.step)}>-</button>
    </div>
  );
}

export default Counter;
