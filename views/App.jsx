import React from 'react';
import { connect } from 'react-redux';
import { fetchObjects } from './actions/objects';


class App extends React.Component {
  componentWillMount() {
    console.log('here');
    this.props.fetchObjects();
  }

  render() {
    console.log('render:' + this.props.items);
    return (
      <div>
        <h2>Hello component, here we are</h2>
      </div>
    );
  }
}

export default connect(
  state => ({
    items: state.objects.objects,
    error: state.objects.error
  }),
  dispatch => ({
    fetchObjects() {
      dispatch(fetchObjects());
    },
  }),
)(App);

//export default App;
