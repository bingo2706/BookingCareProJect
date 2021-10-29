import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Short_des_2.scss'
class Short_des_2 extends Component {

    render() {
        return (
            <div className="short-des-2">
                <p>Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu cầu, thông qua hệ thống đặt khám BookingCare.</p>
                <ul>
                    <li>Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu kinh nghiệm</li>
                    <li>Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch) </li>
                    <li>Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám trước</li>
                    <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
                </ul>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Short_des_2);
