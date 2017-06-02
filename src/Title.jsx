import React from 'react';
import proptypes from 'prop-types';

class Title extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'TOTO',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.str,
    });
    if (this.props.str === 'HELLO WORLD' && nextProps.str === 'CACA') {
      this.setState({
        title: 'HOLA GARCON',
      });
    }
  }

  render = () => (
    <h1 style={{color: this.props.color}}>{this.state.title}</h1>
  );
}

Title.propTypes = {
  str: proptypes.string.isRequired,
  color: proptypes.string,
}


export const BlueTitle = (props) => (
  <Title color="blue" {...props} />
);


export default Title;
