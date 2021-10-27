import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailabelTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    async componentDidMount() {
        let { language } = this.props
        let arrDate = this.getArrDays(language)
        if (this.props.doctorId) {
            let res = await getScheduleDoctorByDate(this.props.doctorId, arrDate[0].value);
            this.setState({
                allAvailabelTime: res.data ? res.data : []
            })
        }

        this.setState({
            allDays: arrDate,
        })



    }
    upperCaseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let arrDate = [];
        for (let i = 0; i < 5; i++) {
            let object = {};
            if (language === 'vi') {
                if (i === 0) {
                    let labelVi2 = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${labelVi2}`
                    object.label = today
                } else {
                    object.label = this.upperCaseFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'));
                }

            }
            else {
                if (i === 0) {
                    let labelVi2 = moment(new Date()).format('DD/MM');
                    let today = `Today - ${labelVi2}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(object);
        }
        return arrDate;

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let arrDate = this.getArrDays(this.props.language)
            this.setState({
                allDays: arrDate
            })
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let { language } = this.props
            let arrDate = this.getArrDays(language)
            if (arrDate && arrDate.length > 0) {
                let res = await getScheduleDoctorByDate(this.props.doctorId, arrDate[0].value);
                this.setState({
                    allDays: arrDate,
                    allAvailabelTime: res.data ? res.data : []
                })
            }
        }
    }
    handleOnChangeSelect = async (event) => {

        if (this.props.doctorId) {
            let doctorId = this.props.doctorId
            let res = await getScheduleDoctorByDate(doctorId, event.target.value);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailabelTime: res.data ? res.data : []
                })
            }

        }
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        let { allDays, allAvailabelTime, isOpenModalBooking } = this.state
        let { language } = this.props
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option key={index}
                                            value={item.value}
                                        >{item.label}</option>
                                    )
                                })
                            }


                        </select>
                    </div>
                    <div className="all-availabel-time">
                        <div className="text-calendar">
                            <span><i className="fas fa-calendar-alt"></i><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                        </div>
                        <div className="time-content">
                            {allAvailabelTime && allAvailabelTime.length > 0 ?
                                <>
                                    <div className="time-content-btns">
                                        {allAvailabelTime.map((item, index) => {
                                            return (
                                                <button className={language === 'vi' ? 'btn btn-vi' : 'btn btn-en'} key={index}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >{language === 'vi' ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}</button>
                                            )
                                        })}
                                    </div>


                                    <div className="book-free">
                                        <span><FormattedMessage id="patient.detail-doctor.choose" /> <i className="far fa-hand-point-up"></i> <FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                    </div>
                                </>
                                :

                                <div><FormattedMessage id="patient.detail-doctor.not-schedule" /></div>

                            }


                        </div>
                    </div>
                </div>
                <BookingModal isOpenModal={this.state.isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={this.state.dataScheduleTimeModal}
                />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
