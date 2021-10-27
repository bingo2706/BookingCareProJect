import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postBookAppoinment } from '../../../../services/userService'
import { toast } from 'react-toastify';
import moment from 'moment';
import localization from 'moment/locale/vi';
import _ from 'lodash'
class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: '',
            phonenumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            listGender: [],
            doctorId: '',
            timeType: '',
            date: ''

        }
    }
    buildDataInputSelect = (Inputdata) => {
        let result = [];
        let { language } = this.props
        if (Inputdata && Inputdata.length > 0) {
            Inputdata.map((item, index) => {
                let object = {}

                object.label = language === 'vi' ? item.valueVi : item.valueEn
                object.value = item.keyMap;
                result.push(object)
            })

        }

        return result;
    }
    componentDidMount() {
        this.props.fetchGenderStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrGender !== this.props.arrGender) {
            let dataSelect = this.buildDataInputSelect(this.props.arrGender)
            this.setState({
                listGender: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.arrGender)
            this.setState({
                listGender: dataSelect
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {

            this.setState({
                doctorId: this.props.dataTime.doctorId,
                timeType: this.props.dataTime.timeType,
                date: this.props.dataTime.date
            })
        }
    }
    handleOnChangeInput = (event, name) => {
        let valueInput = event.target.value;
        let copyState = { ...this.state }
        copyState[name] = valueInput
        this.setState({
            ...copyState
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (selectedGender) => {
        this.setState({ selectedGender })

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
            return `${time} - ${this.upperCaseFirstLetter(date)}`

        } else {
            return ''
        }

    }
    renderNameDoctor = (dataTime) => {
        let { language } = this.props;

        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === 'vi' ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}` :
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`

            return name

        } else {
            return ''
        }

    }
    handleConfirmBooking = async () => {

        let res = await postBookAppoinment({
            fullname: this.state.fullname,
            phonenumber: this.state.phonenumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            birthday: new Date(this.state.birthday).getTime(),
            doctorId: this.state.doctorId,
            selectedGender: this.state.selectedGender,
            timeType: this.state.timeType,
            date: this.state.date,
            language: this.props.language,
            dateSchedule: this.renderTimeBooking(this.props.dataTime),
            doctorName: this.renderNameDoctor(this.props.dataTime)
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!')
            this.props.closeBookingModal();
            this.setState({
                fullname: '',
                phonenumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                selectedGender: '',
                listGender: [],
                doctorId: '',
                timeType: '',
                date: '',

            })
        } else {
            toast.error(res.errMessage)
        }
    }
    render() {
        let { dataTime } = this.props
        let { language } = this.props

        return (
            <div className="">
                <Modal isOpen={this.props.isOpenModal} className={'booking-modal-container'}
                    size="lg" centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left"><FormattedMessage id="patient.booking-modal.infor-schedule" /></span>
                            <span className="right"
                                onClick={this.props.closeBookingModal}
                            ><i className="fas fa-times"></i></span>
                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={this.props.dataTime.doctorId}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 from-group">
                                    <label><FormattedMessage id="patient.booking-modal.fullname" /></label>
                                    <input value={this.state.fullname} onChange={(event) => this.handleOnChangeInput(event, 'fullname')} type="text" className="form-control" />
                                </div>
                                <div className="col-6 from-group">
                                    <label><FormattedMessage id="patient.booking-modal.phonenumber" /></label>
                                    <input value={this.state.phonenumber} onChange={(event) => this.handleOnChangeInput(event, 'phonenumber')} type="text" className="form-control" />
                                </div>
                                <div className="col-6 from-group">
                                    <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                    <input value={this.state.email} onChange={(event) => this.handleOnChangeInput(event, 'email')} type="text" className="form-control" />
                                </div>
                                <div className="col-6 from-group">
                                    <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input value={this.state.address} onChange={(event) => this.handleOnChangeInput(event, 'address')} type="text" className="form-control" />
                                </div>
                                <div className="col-12 from-group">
                                    <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input value={this.state.reason} onChange={(event) => this.handleOnChangeInput(event, 'reason')} type="text" className="form-control" />
                                </div>
                                <div className="col-6 from-group">
                                    <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                    <DatePicker className="form-control" onChange={this.handleOnChangeDatePicker}
                                        value={this.state.birthday}

                                    />
                                </div>
                                <div className="col-6 from-group">
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.listGender}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button onClick={() => this.handleConfirmBooking()} className="btn btn-primary"><FormattedMessage id="patient.booking-modal.Confirm" /></button>
                            <button onClick={this.props.closeBookingModal} className="btn btn-danger"><FormattedMessage id="patient.booking-modal.cancel" /></button>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        arrGender: state.admin.genders,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
