import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class About extends Component {

    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về FrontEnd Programmer
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="350px"
                            src="https://www.youtube.com/embed/e4EZSBASYU4"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                    <div className="content-right">
                        <p>"Có ý kiến cho rằng, các thông tin về bác sĩ và cơ sở y tế đầy rẫy trên Internet. Và người bệnh cũng không gặp khó khăn gì trong việc tìm hiểu thông tin và đặt lịch khám với bác sĩ, cơ sở y tế.
                            Vậy tại sao người dùng lại cần đặt lịch khám thông qua hệ thống đặt khám như BookingCare?"</p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
