import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import HomePage from '../containers/HomePage/HomePage';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import CustomScrollbars from '../components/CustomScrollbars';
import DetailDoctor from './HomePage/Doctor/DetailDoctor';
import Doctor from '../routes/Doctor';
import VerifyEmail from '../containers/HomePage/Patient/VerifyEmail';
import DetailSpecialty from './HomePage/Specialty/DetailSpecialty';
import DetailClinic from './HomePage/Clinic/DetailClinic';
import SearchSpecialty from './HomePage/Specialty/SearchSpecialty';
import SearchClinic from './HomePage/Clinic/SearchClinic';
import SearchDoctor from './HomePage/Doctor/SearchDoctor';
import DetailHandbook from './HomePage/Handbook/DetailHandbook';
import CategoryHandbook from './HomePage/Handbook/CategoryHandbook';
import AllHandbook from './HomePage/Handbook/AllHandbook';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">



                        <span className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.HOMEPAGE} exact component={(HomePage)} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                    <Route path={path.DETAIL_HANDBOOK} component={DetailHandbook} />
                                    <Route path={path.CATEGORY_HANDBOOK} component={CategoryHandbook} />
                                    <Route path={path.ALL_HANDBOOK} component={AllHandbook} />
                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                                    <Route path={path.SEARCH_SPECIALTY} component={SearchSpecialty} />
                                    <Route path={path.SEARCH_CLINIC} component={SearchClinic} />
                                    <Route path={path.SEARCH_DOCTOR} component={SearchDoctor} />
                                </Switch>
                            </CustomScrollbars>
                        </span>

                        <ToastContainer
                            position="top-right"
                            autoClose={4000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);