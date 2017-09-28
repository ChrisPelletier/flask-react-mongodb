import React, { Component } from 'react';
import { Card, CardHeader, CardBlock, Container, Row,
    Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import 'whatwg-fetch';
import regexes from '../utilities/regexes';
import constants from '../constants';

class RegisterPage extends Component {
    handleEmailChange(event) {
        this.props.onEmailUpdate(event.target.value);
    }

    handlePasswordChange(event) {
        this.props.onPasswordUpdate(event.target.value, this.props.retypePassword);
    }

    handleRetypePasswordChange(event) {
        this.props.onRetypePasswordUpdate(event.target.value, this.props.password);
    }

    handleSubmit(event) {
        this.props.onRegister();
        event.preventDefault();
    }

    render() {
        let disableRegisterButton = !!this.props.passwordError.length || 
            !!this.props.emailError.length ||
            !!this.props.retypePasswordError.length ||
            !this.props.email.length ||
            !this.props.password.length ||
            !this.props.retypePassword.length;
        
        return (
            <Row className="margin-top-50">
                <Col xs={{size: 6, offset: 3}}>
                    <Card>
                        <CardHeader>Register a new user</CardHeader>
                        <CardBlock>
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormGroup row color={this.props.emailError ? "danger":""}>
                                    <Label for="loginEmail" sm={4}>Email</Label>
                                    <Col sm={8}>
                                        <Input type="email" 
                                            name="email" 
                                            id="loginEmail" 
                                            value={this.props.email}
                                            onChange={this.handleEmailChange.bind(this)}
                                            placeholder="email address" />
                                    </Col>
                                    {
                                        this.props.emailError.length ?
                                            <Col sm={{size:8,offset: 4}}><FormFeedback>{this.props.emailError}</FormFeedback></Col>:
                                            ''
                                    }
                                </FormGroup>
                                <FormGroup row color={this.props.passwordError ? "danger":""}>
                                    <Label for="registerPassword" sm={4}>Password</Label>
                                    <Col sm={8}>
                                        <Input type="password" 
                                            name="password" 
                                            id="registerPassword" 
                                            value={this.props.password}
                                            onChange={this.handlePasswordChange.bind(this)}
                                            placeholder="password" />
                                    </Col>
                                    {
                                        this.props.passwordError.length ?
                                            <Col sm={{size:8,offset: 4}}><FormFeedback>{this.props.passwordError}</FormFeedback></Col>:
                                            ''
                                    }
                                </FormGroup>
                                <FormGroup row color={this.props.retypePasswordError || this.props.matchingPasswordError ? "danger":""}>
                                    <Label for="retypePassword" sm={4}>Retype Password</Label>
                                    <Col sm={8}>
                                        <Input type="password" 
                                            name="retypePassword" 
                                            id="retypePassword" 
                                            value={this.props.retypePassword}
                                            onChange={this.handleRetypePasswordChange.bind(this)}
                                            placeholder="retype password" />
                                    </Col>
                                    {
                                        this.props.retypePasswordError.length || this.props.matchingPasswordError.length ?
                                            <Col sm={{size:8,offset: 4}}><FormFeedback>{this.props.retypePasswordError || this.props.matchingPasswordError}</FormFeedback></Col>:
                                            ''
                                    }
                                </FormGroup>
                                {
                                    this.props.registerError ?
                                        <FormGroup row color="danger">
                                            <Col sm={12}><FormFeedback>{this.props.registerError}</FormFeedback></Col>
                                        </FormGroup> :
                                        ''
                                }
                                <Button color="primary" 
                                        className="float-right"
                                        type="submit"
                                        disabled={disableRegisterButton}>
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