import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Specialty.scss';
import { getTopSpecialtyHomeService } from '../../../services/userService';
import { withRouter } from 'react-router';
class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getTopSpecialtyHomeService(10)
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }
    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`detail-specialty/${specialty.id}`)
        }

    }
    render() {
        let settings = this.props.settings
        let { language } = this.props
        let { dataSpecialty } = this.state

        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.specialty" /></span>
                        <button className="btn-section"><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings} >
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div onClick={() => this.handleViewDetailSpecialty(item)} key={index} className="section-customize">
                                            <div style={{ backgroundImage: `url(${item.image})` }} className="bg-image section-specialty"></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
