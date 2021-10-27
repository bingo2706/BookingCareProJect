import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppoinment } from '../../../services/userService';
import './VerifyEmail.scss';
import HomeHeader from '../HomeHeader';
import _ from 'lodash';


class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')
            let res = await postVerifyBookAppoinment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        let { statusVerify, errCode } = this.state

        return (
            <div>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ? <div className="infor-booking">Xác nhận lịch hẹn thành công</div>
                                : <div className="infor-booking">Lịch hẹn đã tồn tại hoặc đã xác nhận</div>
                            }
                        </div>
                    }
                </div>


            </div>

        );
    }

}

const mapStateToProps = state => {
    return {

        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
