import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import HomeHeader from '../HomeHeader';
import _ from 'lodash';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicByIdService } from '../../../services/userService';
import HomeFooter from '../HomeFooter';
class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id


            let res = await getDetailClinicByIdService(id);

            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                            return item;
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {

        }
    }
    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id


            let res = await getDetailClinicByIdService(id);

            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                            return item;
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state
        let { language } = this.props
        console.log(dataDetailClinic)
        return (
            <div>
                <HomeHeader />
                <div className="clinic-detail-container">

                    <div className="intro-clinic">
                        <div className="content-left">
                            <div className="avatar-img" style={{ backgroundImage: `url(${dataDetailClinic.image})` }}>

                            </div>
                            <div className="content-left-body">
                                <span className="content-left-name">{dataDetailClinic.name}</span>
                                <span className="content-left-address"><i className="fas fa-map-marker-alt"></i> {dataDetailClinic.address}</span>
                            </div>
                        </div>
                        <div className="content-right">
                            Đặt lịch khám
                        </div>
                    </div>
                    <div className="short-des-1">
                        <div className="icon">
                            <i className="fas fa-lightbulb"></i>
                        </div>
                        <div className="text">
                            BookingCare là Nền tảng Y tế Chăm sóc sức khỏe toàn diện kết nối người dùng với dịch vụ y tế - chăm sóc sức khỏe hiệu quả, tin cậy với trên 100 bệnh viện, phòng khám uy tín, hơn 600 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ y tế chất lượng cao.
                        </div>
                    </div>
                    <div className="short-des-2">
                        <p>Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu cầu, Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám BookingCare.</p>
                        <ul>
                            <li>Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu kinh nghiệm</li>
                            <li>Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch) </li>
                            <li>Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám trước</li>
                            <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
                        </ul>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div key={index} className="each-doctor">
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            //   dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule doctorId={item} />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor doctorId={item} />
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="description-clinic">
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>

                            </div>
                        }
                    </div>

                </div>
                <HomeFooter />

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
