import React, { Component } from 'react';
import { Card, CardHeader, CardBlock, CardFooter, Container, Row,
     Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import regexes from '../utilities/regexes';
import constants from '../constants';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state={
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            loginError: ''
        }
    }

    handleEmailChange(event) {
        let emailError = event.target.value.length === 0 ?
            'Email is required' :
            !regexes.email.test(event.target.value) ?
            'Must enter a valid email address' :
            ''
        this.setState({
            email: event.target.value,
            emailError: emailError
        });
    }

    handlePasswordChange(event) {
        let passwordError = event.target.value.length === 0 ?
            'Password is required' :
            ''
        this.setState({
            password: event.target.value,
            passwordError: passwordError    
        });
    }

    handleSubmit(event) {
        fetch(constants.API_URL + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then((response) => {
            if (!response.ok) {
                if(response.status === 401) {
                    throw new Error("Unable to find matching email and password.");
                } else {
                    throw new Error("Error while logging user in.");
                }
            } else {
                return response.json();
            }
        })
        .then((responseData) => {
            this.props.onLogin(responseData.jwt);
        })
        .catch((error) => {
            console.error(error);
            this.setState({loginError: error.message});
        });
        event.preventDefault();
    }

    render() {
        let disableLoginButton = !!this.state.passwordError.length || 
            !!this.state.emailError.length ||
            !this.state.email.length ||
            !this.state.password.length;

        return (
            <Row className="margin-top-50">
                <Col xs={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader>User Login</CardHeader>
                        <CardBlock>
                            <Form>
                                <FormGroup row color={this.state.emailError ? "danger":""}>
                                    <Label for="loginEmail" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input type="email" 
                                               name="email" 
                                               id="loginEmail" 
                                               value={this.state.email}
                                               onChange={this.handleEmailChange.bind(this)}
                                               placeholder="email address" />
                                    </Col>
                                    {
                                        this.state.emailError.length ?
                                            <Col sm={{size:10,offset: 2}}><FormFeedback>{this.state.emailError}</FormFeedback></Col>:
                                            ''
                                    }
                                </FormGroup>
                                <FormGroup row color={this.state.passwordError ? "danger":""}>
                                    <Label for="loginPassword" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input type="password" 
                                               name="password" 
                                               id="loginPassword" 
                                               value={this.state.password}
                                               onChange={this.handlePasswordChange.bind(this)}
                                               placeholder="password" />
                                    </Col>
                                    {
                                        this.state.passwordError.length ?
                                            <Col sm={{size:10,offset: 2}}><FormFeedback>{this.state.passwordError}</FormFeedback></Col>:
                                            ''
                                    }
                                </FormGroup>
                                {
                                    this.state.loginError ?
                                        <FormGroup row color="danger">
                                            <Col sm={12}><FormFeedback>{this.state.loginError}</FormFeedback></Col>
                                        </FormGroup> :
                                        ''
                                }
                                <Button color="primary" 
                                        className="float-right" 
                                        type="submit"
                                        disabled={disableLoginButton}
                                        onClick={this.handleSubmit.bind(this)}>
                                        Login
                                        </Button>
                            </Form>
                        </CardBlock>
                        <CardFooter className="login-footer">
                            If you do not have an account sign up <Link to="/register">here</Link>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default LoginPage;