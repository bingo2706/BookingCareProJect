import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DoctorExtraInfor.scss';
import NumberFormat from 'react-number-format';
import { getExtraInforDoctorById } from '../../../services/userService';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }
    componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let res = await getExtraInforDoctorById(this.props.doctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state
        let { language } = this.props
        let province = extraInfor && extraInfor.provinceData ? extraInfor.provinceData : ''
        let nameClinic = extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''
        let note = extraInfor && extraInfor.note ? extraInfor.note : ''
        let addressClinic = extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic + ', ' : ''
        let price = extraInfor && extraInfor.priceData ? extraInfor.priceData : '';
        let payment = extraInfor && extraInfor.paymentData ? extraInfor.paymentData : ''
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address"><FormattedMessage id="patient.extra-infor-doctor.text-address" /></div>
                    <div className="name-clinic">{nameClinic}</div>
                    <div className="detail-address">
                        {addressClinic}
                        {language === 'vi' ? province.valueVi : province.valueEn}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false &&
                        <div className="short-infor">
                            <span className="title-price"><FormattedMessage id="patient.extra-infor-doctor.price" /></span>: {language === 'vi' ? <NumberFormat value={price.valueVi} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                : <NumberFormat value={price.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />
                            }
                            <br></br>
                            < span className="text-more" onClick={() => this.showHideDetailInfor(true)}>
                                <FormattedMessage id="patient.extra-infor-doctor.detail" />
                            </span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className="title-price"><FormattedMessage id="patient.extra-infor-doctor.price" />: .</div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left"><FormattedMessage id="patient.extra-infor-doctor.price" /></span>
                                    <span className="right">{language === 'vi' ? <NumberFormat value={price.valueVi} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                        : <NumberFormat value={price.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />
                                    }</span>
                                </div>
                                <div className="note">
                                    {note}
                                </div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id="patient.extra-infor-doctor.payment" /> {language === 'vi' ? payment.valueVi : payment.valueEn}
                            </div>
                            <div className="hide-price">
                                <span className="text-more" onClick={() => this.showHideDetailInfor(false)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
