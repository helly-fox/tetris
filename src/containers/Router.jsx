import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import NotFound from 'src/containers/NotFound';

export default () => {
    return (
        <Router history={browserHistory}>
            <Route path="*" component={NotFound} />
        </Router>
    );
};
