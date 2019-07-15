import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import login from './Containers/login-container';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';

const store = configureStore();
// import * as serviceWorker from './serviceWorker';
const routing = (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={login} />
                <Route path="/message" component={App} />
                {/* <Route component={Notfound} /> */}
            </Switch>
        </Router>
    </Provider>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
