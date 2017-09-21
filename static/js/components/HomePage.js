import React, { Component } from 'react';
import { Jumbotron, Row, Col, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div className="margin-top-50">
                <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                        <Jumbotron fluid>
                            <Container fluid>
                                <h1 className="display-3">Welcome!</h1>
                                <p className="lead">
                                    Thank you for visiting my website. Here you will find
                                    information about myself including my work history and
                                    any past and present projects I am working on, 
                                    including this one.
                                </p>
                                <hr className="my-2" />
                                <p>
                                    To see the rest of the content you need to login or 
                                    register <Link to="/register">here</Link>
                                </p>
                            </Container>
                        </Jumbotron>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HomePage;