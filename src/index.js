import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './ui/App';
import registerServiceWorker from './registerServiceWorker';
import './setupProxy'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
