import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Cookies from 'universal-cookie';
import 'bootstrap/scss/bootstrap.scss';
import '../styles/app.scss';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import items from './utilities/NavigationItems';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
const cookies = new Cookies();

class App extends Component {
    constructor() {
        super();

        this.state={
            authenticated: cookies.get('jwt')
        }
    }

    handleSuccessfullLogin(jwt) {
        cookies.set('jwt', jwt);
        this.setState({authenticated: jwt});
        history.push('/about');
    }

    handleLogout() {
        this.setState({authenticated: false});
        history.push('/');
    }

    render() {
        let routes = items.map((item, index) => {
            if (!item.requiresAuthentication || (item.requiresAuthentication && this.state.authenticated)) {
                return <Route exact={item.exact} path={item.path} key={index} component={item.component}></Route>
            }
        });
        return (
            <Router history={history}>
                <div>
                    <Header authenticated={this.state.authenticated} onLogout={this.handleLogout.bind(this)} />
                    <Container>
                        <Switch>
                            {routes}
                            <Route exact 
                                   path="/login" 
                                   render={routeProps => <LoginPage onLogin={this.handleSuccessfullLogin.bind(this)} 
                                   {...routeProps}/>}>
                            </Route>
                            <Route exact 
                                   path="/register" 
                                   render={routeProps => <RegisterPage onLogin={this.handleSuccessfullLogin.bind(this)} 
                                   {...routeProps}/>}>
                            </Route>
                            <Redirect to="/"></Redirect>
                        </Switch>
                    </Container>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));