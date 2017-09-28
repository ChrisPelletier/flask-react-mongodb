import React, { Component } from 'react';
import { Card, CardHeader, CardBlock, CardFooter, Container, Row,
     Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import constants from '../constants';

class LoginPage extends Component {
    handleEmailChange(event) {
        this.props.onEmailUpdate(event.target.value);
    }

    handlePasswordChange(event) {
        this.props.onPasswordUpdate(event.target.value);
    }

    handleSubmit(event) {
        this.props.onLogin();
        event.preventDefault();
    }

    render() {
        let disableLoginButton = !!this.props.passwordError.length || 
            !!this.props.emailError.length ||
            !this.props.email.length ||
            !this.props.password.length;

        return (
            <Row className="margin-top-50">
                <Col xs={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader>User Login</CardHeader>
                        <CardBlock>
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormGroup row color={this.props.emailError ? "danger":""}>
                                    <Label for="loginEmail" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input type="email" 
                                               name="email" 
                                               id="loginEmail" 
                                               value={this.props.email}
                                               onChange={this.handleEmailChange.bind(this)}
                                               placeholder="email address" />
                                    </Col>
                                    {
                                        this.props.emailError.length ?
                                            <Col sm={{size:10,offset: 2}}><FormFeedback>{this.props.emailError}</FormFeedback></Col>:
                                            ''
                                    }
                                </FormGroup>
                                <FormGroup row color={this.props.passwordError ? "danger":""}>
                                    <Label for="loginPassword" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input type="password" 
                                               name="password" 
                                               id="loginPassword" 
                                               value={this.props.password}
                                               onChange={this.handlePasswordChange.bind(this)}
                                               placeholder="password" />
                                    </Col>
                                    {
                                        this.props.passwordError.length ?
                                            <Col sm={{size:10,offset: 2}}><FormFeedback>{this.props.passwordError}</FormFeedback></Col>:
                                            ''
                                    }
                                </FormGroup>
                                {
                                    this.props.loginError ?
                                        <FormGroup row color="danger">
                                            <Col sm={12}><FormFeedback>{this.props.loginError}</FormFeedback></Col>
                                        </FormGroup> :
                                        ''
                                }
                                <Button color="primary" 
                                        className="float-right" 
                                        type="submit"
                                        disabled={disableLoginButton}>
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