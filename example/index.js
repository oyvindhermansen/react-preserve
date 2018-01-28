import Preserve from '../src/index';
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  storageHook = (item, data) => {
    console.log({
      item,
      data
    });
  };

  render() {
    return (
      <Preserve
        storageHook={this.storageHook}
        setInitialDataValue={[]}
        preserveAs={'posts'}
        fetchFrom={'https://jsonplaceholder.typicode.com/posts'}
        render={({ data, fetching, error }) => {
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
      />
    );
  }
}

render(<App />, document.getElementById('root'));
