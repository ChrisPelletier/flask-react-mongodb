import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from 'reactstrap';
import '../../styles/app.scss';
import Header from './Header';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import items from '../utilities/NavigationItems';
import createBrowserHistory from 'history/createBrowserHistory';
import * as userActions from '../actions/userActions';
import * as jwtActions from '../actions/jwtActions';
import * as loginActions from '../actions/loginActions';
import * as registerActions from '../actions/registerActions';

const history = createBrowserHistory();

class AppContainer extends Component {
    componentWillMount() {
        this.props.jwtActions.getJwt();
    }

    handleLogout() {
        this.props.jwtActions.removeJwt();
        history.push('/');
    }

    handleLogin() {
        this.props.loginActions.fetchLogin(this.props.login.email, this.props.login.password)
        .then(response => {
            this.props.jwtActions.setJwt(response.jwt);
            history.push('/about');
        }); 
    }

    handleRegister() {
        this.props.registerActions.fetchRegister(this.props.register.email, this.props.register.retypePassword)
        .then(response => {
            this.props.loginActions.fetchLogin(response.email, this.props.register.retypePassword)
            .then(loginResponse => {
                this.props.jwtActions.setJwt(loginResponse.jwt);
                history.push('/about');
            })
        });
    }

    render() {
        let routes = items.map((item, index) => {
            return <Route exact={item.exact} path={item.path} key={index} component={item.component}></Route>
        });
        return (
            <Router history={history}>
                <div>
                    <Header authenticated={this.props.jwt} onLogout={this.handleLogout.bind(this)} />
                    <Container>
                        <Switch>
                            {routes}
                            <Route exact 
                                   path="/login" 
                                   render={routeProps => <LoginPage onLogin={this.handleLogin.bind(this)}
                                   onEmailUpdate={this.props.loginActions.updateEmail.bind(this)}
                                   onPasswordUpdate={this.props.loginActions.updatePassword.bind(this)}
                                   email={this.props.login.email}
                                   password={this.props.login.password}
                                   loginError={this.props.login.loginError}
                                   emailError={this.props.login.emailError}
                                   passwordError={this.props.login.passwordError}
                                   {...routeProps}/>}>
                            </Route>
                            <Route exact 
                                   path="/register" 
                                   render={routeProps => <RegisterPage onRegister={this.handleRegister.bind(this)}
                                   onEmailUpdate={this.props.registerActions.updateEmail.bind(this)}
                                   onPasswordUpdate={this.props.registerActions.updatePassword.bind(this)}
                                   onRetypePasswordUpdate={this.props.registerActions.updateRetypePassword.bind(this)}
                                   email={this.props.register.email}
                                   emailError={this.props.register.emailError}
                                   password={this.props.register.password}
                                   passwordError={this.props.register.passwordError}
                                   retypePassword={this.props.register.retypePassword}
                                   retypePasswordError={this.props.register.retypePasswordError}
                                   matchingPasswordError={this.props.register.matchingPasswordError}
                                   registerError={this.props.register.registerError}
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

const mapStateToProps = (state) => {
    return {
        jwt: state.jwt,
        login: {...state.login},
        register: {...state.register}
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        jwtActions: bindActionCreators(jwtActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch),
        registerActions: bindActionCreators(registerActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppContainer);