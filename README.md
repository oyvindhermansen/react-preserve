# React Preserve

Preserves your data, and reduces the amount of unnecessary data fetching.

## Basic example

```js
import React, { Component } from 'react';
import Preserve from 'react-preserve';

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
                <div>
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
```
