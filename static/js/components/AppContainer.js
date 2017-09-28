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

    render() {
        console.log(this.props);
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

const mapStateToProps = (state) => {
    return {
        jwt: state.jwt,
        login: {...state.login}
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        jwtActions: bindActionCreators(jwtActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppContainer);