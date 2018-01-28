import Preserve from '../src/index';
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
      <Preserve
        setInitialDataValue={[]}
        preserveAs={'posts'}
        url={'https://jsonplaceholder.typicode.com/posts'}
      >
        {({ data, fetching, error }) => {
          return fetching ? (
            <p>Loading....</p> // Will only happen once.
          ) : (
            data.map(item => {
              return (
                <div key={item.id}>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              );
            })
          );
        }}
      </Preserve>
    );
  }
}

render(<App />, document.getElementById('root'));
