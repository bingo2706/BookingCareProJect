import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import './ManagePatient.scss';
import * as actions from "../../store/actions";
import { toast } from 'react-toastify';
import _ from 'lodash';
import DatePicker from '../../components/Input/DatePicker';
import { getAllPatientForDoctor, PostSendRemedy } from '../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {

        await this.getDataPatien();

    }
    getDataPatien = async () => {
        let { user } = this.props
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime()
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnChangeDatePicker = async (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {

            await this.getDataPatien();
        })

    }

    handleBtnConfirm = (item) => {
        console.log(item)
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            date: item.date,
            fullname: item.patientData.lastName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false
        })
    }
    sendRemedy = async (dataFormModal) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })

        let res = await PostSendRemedy({
            email: dataFormModal.email,
            imgBase64: dataFormModal.imgBase64,
            doctorId: dataModal.doctorId,
            timeType: dataModal.timeType,
            patientId: dataModal.patientId,
            date: dataModal.date,
            language: this.props.language,
            patientName: dataModal.fullname,
            filename: dataFormModal.filename
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success("Send Remedy succeed!")
            await this.getDataPatien()
            this.setState({
                isOpenRemedyModal: false
            })
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error(res.errMessage)
        }
    }

    render() {
        let { dataPatient, dataModal } = this.state
        let { language } = this.props
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className="manage-patient-container">
                        <div className="title">
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-3 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker className="form-control" onChange={this.handleOnChangeDatePicker}
                                    value={this.state.currentDate}

                                />
                            </div>
                            <div className="col-12">
                                <table id="TableManageUser">
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Số điện thoại</th>
                                            <th>Thao tác</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <td>{index + 1}</td>
                                                        <td>{language === 'vi' ? item.timeTypeDataBooking.valueVi : item.timeTypeDataBooking.valueEn}</td>
                                                        <td>{item.patientData.lastName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{language === 'vi' ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn}</td>
                                                        <td>{item.patientData.phonenumber}</td>
                                                        <td style={{ width: '15%' }}>
                                                            <button onClick={() => this.handleBtnConfirm(item)} className="btn btn-primary mr-3">Xác nhận</button>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr><td colSpan="7" style={{ textAlign: 'center' }}>No data</td></tr>
                                        }



                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal isOpenModal={this.state.isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />


                </LoadingOverlay>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {

        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
