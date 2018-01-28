# React Preserve

Preserves your data, and reduces the amount of unnecessary data fetching.

## Basic example

> This example is using children as a function, but Preserve also provides a render prop.

```js
import React, { Component } from 'react';
import Preserve from 'react-preserve';

class App extends Component {
  render() {
    return (
      <Preserve
        setInitialDataValue={[]}
        preserveAs={'posts'}
        fetchFrom={'https://jsonplaceholder.typicode.com/posts'}
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
