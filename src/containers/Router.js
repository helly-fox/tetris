import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import LoginContainer from 'src/containers/LoginContainer';
import NotFound from 'src/containers/NotFound';

export default () => {
    return (
        <Router history={browserHistory}>
            <Route path="/login" component={LoginContainer}/>
            <Route path="*" component={NotFound} />
        </Router>
    );
};
