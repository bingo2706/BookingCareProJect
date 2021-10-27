import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getTopClinicHomeService } from '../../../services/userService';
import { withRouter } from 'react-router';
class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []
        }
    }
    async componentDidMount() {
        let res = await getTopClinicHomeService(10)
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
    }
    handleViewClinic = (data) => {
        if (this.props.history) {
            this.props.history.push(`detail-clinic/${data.id}`)
        }
    }
    render() {
        let settings = this.props.settings
        let { language } = this.props
        let { dataClinic } = this.state
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.facility" /></span>
                        <button className="btn-section"><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings} >
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div onClick={() => this.handleViewClinic(item)} key={index} className="section-customize">
                                            <div style={{ backgroundImage: `url(${item.image})` }} className="bg-image section-medical-facility"></div>
                                            <div>{item.name}</div>
                                        </div>
                                    )
                                })

                            }

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
