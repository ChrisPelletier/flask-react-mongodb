import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import * as jwtActions from '../actions/jwtActions';

class AboutPage extends Component {
    render() {
        console.log(this);
        return (
            <div className="margin-top-50">
                <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                        <h1>About</h1>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        jwt: state.jwt,
        user: {...state.user}
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        jwtActions: bindActionCreators(jwtActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AboutPage);