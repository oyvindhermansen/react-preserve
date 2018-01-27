// @flow
import * as React from 'react';
import isEqual from 'lodash.isequal';

type Props = {
  children: (localStorageData: Storage) => React.Node,
  item: string,
  data: any
};

export default class Preserve extends React.Component<Props> {
  componentDidMount() {
    if (typeof window === undefined) {
      throw new Error(`Window is not available`);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { item, data } = this.props;

    console.log('NEXT', nextProps);

    if (!isEqual(nextProps.data, data)) {
      localStorage.setItem(item, JSON.stringify(nextProps.data));
    }
  }

  render() {
    const { children, item } = this.props;
    const storage = localStorage.getItem(item);

    if (storage === null || storage === undefined) {
      return null;
    }

    const localStorageData = JSON.parse(storage);

    return children(localStorageData);
  }
}
