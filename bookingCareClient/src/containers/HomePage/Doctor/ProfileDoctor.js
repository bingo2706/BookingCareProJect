import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import NumberFormat from 'react-number-format';
import { getProfileDoctorById } from '../../../services/userService';
import _ from 'lodash';
import localization from 'moment/locale/vi';
import moment from 'moment';
import { withRouter } from 'react-router';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data

            }
        }
        return result
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data
            })
        }
        if (this.props.language !== prevProps.language) {

        }
    }
    upperCaseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props;

        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === 'vi' ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')
            let time = language === 'vi' ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            return (
                <>
                    <div className="time-content">
                        <div className="time">{time} - {this.upperCaseFirstLetter(date)}</div>
                        <div><i class="far fa-calendar-check"></i> <FormattedMessage id="patient.booking-modal.free-booking" /></div>
                    </div>
                </>
            )
        } else {
            return (
                <></>
            )
        }

    }

    render() {
        let { dataProfile } = this.state
        let { language, dataTime, isShowLinkDetail, isShowPrice } = this.props
        let price = dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceData ? dataProfile.Doctor_Infor.priceData : '';
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }

        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-left" style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>

                    </div>
                    <div className="content-right">
                        <div className="up">
                            {language === 'vi' ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                <span>
                                    {dataProfile.Markdown.description}
                                </span>
                            }
                        </div>
                    </div>

                </div>
                {isShowLinkDetail === true &&
                    <div className="see-more"><Link to={`/detail-doctor/${this.state.dataProfile.id}`} >Xem thêm</Link></div>
                }
                {isShowPrice === true &&
                    <div className="price">
                        <FormattedMessage id="patient.booking-modal.fee" />: {language === 'vi' ? <NumberFormat value={price.valueVi} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                            : <NumberFormat value={price.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />
                        }
                    </div>
                }

                {this.renderTimeBooking(dataTime)}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor));
