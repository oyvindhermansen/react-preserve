// @flow
import 'babel-polyfill';
import * as React from 'react';

type PreserveInterface = {
  data: any | null,
  fetching: boolean,
  error: null
};

type Props = {
  children: PreserveInterface => React.Node,
  setInitialDataValue: any,
  preserveAs: string,
  url: string,
  render?: PreserveInterface => React.Node
};

type State = {
  data: any | null,
  fetching: boolean,
  error: null
};

export default class Preserve extends React.Component<Props, State> {
  state = {
    data: this.props.setInitialDataValue || null,
    fetching: false,
    error: null
  };

  componentDidMount() {
    const { preserveAs } = this.props;
    const isStored = localStorage.getItem(preserveAs);

    if (!isStored) {
      this.fetchData();
    }
  }

  async fetchData() {
    const { url, preserveAs } = this.props;
    const { data } = this.state;

    this.setState({ fetching: true });

    if (!url) {
      throw new Error(`No URL to fetch from`);
    }

    try {
      const response = await fetch(url);
      const json = await response.json();

      this.setState(
        {
          fetching: false,
          error: null,
          data: json
        },
        () => {
          if (response.ok && json) {
            localStorage.setItem(preserveAs, JSON.stringify(json));
          }
        }
      );
    } catch (error) {
      this.setState({
        fetching: false,
        error
      });
    }
  }

  render() {
    const { children, preserveAs, render } = this.props;
    const { data, fetching, error } = this.state;
    const storage = localStorage.getItem(preserveAs);
    const dataToUse = storage ? JSON.parse(storage) : data;

    if (render) {
      return render({
        data: dataToUse,
        fetching,
        error
      });
    }

    return children({
      data: dataToUse,
      fetching,
      error
    });
  }
}
