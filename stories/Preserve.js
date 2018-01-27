import React from 'react';
import { storiesOf } from '@storybook/react';
import Preserve from '../src/index';

class App extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(res =>
        this.setState({
          data: res
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    const { data } = this.state;

    if (!data) return null;

    const posts = data.map(item => {
      return <li>{item.title}</li>;
    });

    return (
      <Preserve data={data} item={'posts'}>
        {localStorage => {
          return (
            <div>
              <App />
              <h1>Posts</h1>
              {localStorage &&
                localStorage.map(item => {
                  <p>
                    {item.title} - {item.name}
                  </p>;
                })}
            </div>
          );
        }}
      </Preserve>
    );
  }
}

storiesOf('Stay', module).add('The core', () => <App />);
