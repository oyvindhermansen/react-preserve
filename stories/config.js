import { configure } from '@storybook/react';

function loadStories() {
  require('./Preserve.js');
}

configure(loadStories, module);
