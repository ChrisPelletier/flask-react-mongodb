import React, { Component } from 'react';
import { Card, CardHeader, CardBlock, Container, Row,
    Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import 'whatwg-fetch';
import regexes from '../utilities/regexes';
import constants from '../constants';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state={
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            retypePassword: '',
            retypePasswordError: '',
            registerError: ''
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

    handleRetypePasswordChange(event) {
        let retypePasswordError = event.target.value.length === 0 ?
            'Password is required' :
            event.target.value !== this.state.password ?
            'Must match the original password' :
            ''
        this.setState({
            retypePassword: event.target.value,
            retypePasswordError: retypePasswordError    
        });
    }

    handleSubmit(event) {
        const HEADERS = {
            'Content-Type': 'application/json'
        }
        fetch(constants.API_URL + '/user', {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.retypePassword
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error while logging user in.");
            } else {
                return response.json();
            }
        })
        .then((responseData) => {
            fetch(constants.API_URL + '/user/login', {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    email: responseData.email,
                    password: this.state.retypePassword
                })
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("User was created but couldn't log them in.");
                } else {
                    return response.json();
                }
            })
            .then((responseData) => {
                this.props.onLogin(responseData.jwt);
            })
            .catch((error) => {
                console.error(error);
                this.setState({registerError: error.message});
            });
        })
        .catch((error) => {
            console.log(error);
        });
        event.preventDefault();
    }

    render() {
        let disableRegisterButton = !!this.state.passwordError.length || 
            !!this.state.emailError.length ||
            !!this.state.retypePasswordError.length ||
            !this.state.email.length ||
            !this.state.password.length ||
            !this.state.retypePassword.length;
        
        return (
            <Row className="margin-top-50">
                <Col xs={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader>Register a new user</CardHeader>
                        <CardBlock>
                            <Form>
                                <FormGroup row color={this.state.emailError ? "danger":""}>
                                    <Label for="loginEmail" sm={4}>Email</Label>
                                    <Col sm={8}>
                                        <Input type="email" 
                                            name="email" 
                                            id="loginEmail" 
                                            value={this.state.email}
                                            onChange={this.handleEmailChange.bind(this)}
                                            placeholder="email address" />
                                    </Col>
                                    {
                                        this.state.emailError.length ?
                                            <Col sm={{size:8,offset: 4}}><FormFeedback>{this.state.emailError}</FormFeedback></Col>:
                                            ''
                                    }
                                </FormGroup>
                                <FormGroup row color={this.state.passwordError ? "danger":""}>
                                    <Label for="registerPassword" sm={4}>Password</Label>
                                    <Col sm={8}>
                                        <Input type="password" 
                                            name="password" 
                                            id="registerPassword" 
                                            value={this.state.password}
                                            onChange={this.handlePasswordChange.bind(this)}
                                            placeholder="password" />
                                    </Col>
                                    {
                                        this.state.passwordError.length ?
                                            <Col sm={{size:8,offset: 4}}><FormFeedback>{this.state.passwordError}</FormFeedback></Col>:
                                            ''
                                    }
                                </FormGroup>
                                <FormGroup row color={this.state.retypePasswordError ? "danger":""}>
                                    <Label for="retypePassword" sm={4}>Retype Password</Label>
                                    <Col sm={8}>
                                        <Input type="password" 
                                            name="retypePassword" 
                                            id="retypePassword" 
                                            value={this.state.retypePassword}
                                            onChange={this.handleRetypePasswordChange.bind(this)}
                                            placeholder="retype password" />
                                    </Col>
                                    {
                                        this.state.retypePasswordError.length ?
                                            <Col sm={{size:8,offset: 4}}><FormFeedback>{this.state.retypePasswordError}</FormFeedback></Col>:
                                            ''
                                    }
                                </FormGroup>
                                {
                                    this.state.registerError ?
                                        <FormGroup row color="danger">
                                            <Col sm={12}><FormFeedback>{this.state.registerError}</FormFeedback></Col>
                                        </FormGroup> :
                                        ''
                                }
                                <Button color="primary" 
                                        className="pull-right" 
                                        type="submit"
                                        disabled={disableRegisterButton}
                                        onClick={this.handleSubmit.bind(this)}>
                                    Register
                                </Button>
                            </Form>
                        </CardBlock>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default RegisterPage;