# React Preserve

Preserves your data, and reduces the amount of unnecessary data fetching.

## Basic example

> This example is using a render prop, but Preserve also provides children as a function.

```js
import React, { Component } from 'react';
import Preserve from 'react-preserve';

class App extends Component {
  render() {
    return (
      <Preserve
        storageHook={(item, storage) => {}}
        setInitialDataValue={[]}
        preserveAs={'posts'}
        fetchFrom={'https://jsonplaceholder.typicode.com/posts'}
        render={({ data, fetching, error }) => {
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
      />
    );
  }
}
```
