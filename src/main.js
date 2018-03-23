import React from 'react';
import ReactDOM from 'react-dom';

import App from 'src/containers/App';

if (module.hot) {
    module.hot.accept();
}

const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
document.getElementsByTagName('head')[0].appendChild(meta);


ReactDOM.render(<App />, document.getElementById('root'));
