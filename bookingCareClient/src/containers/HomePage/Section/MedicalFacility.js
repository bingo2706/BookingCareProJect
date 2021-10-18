import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {

    render() {
        let settings = this.props.settings

        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings} >
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div>Hệ thống Y tế Thu Cúc</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div>Hệ thống Y tế Thu Cúc</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div>Hệ thống Y tế Thu Cúc</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div>Hệ thống Y tế Thu Cúc</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div>Hệ thống Y tế Thu Cúc</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div>Hệ thống Y tế Thu Cúc</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div>Hệ thống Y tế Thu Cúc</div>
                            </div>
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
