import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <p>React here!</p>
    <div className="animal__image animal__image--lion" />
  </div>
);

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
