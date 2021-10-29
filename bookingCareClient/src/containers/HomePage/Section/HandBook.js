import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Specialty.scss';
import { getTopHandbookService } from '../../../services/userService';
class HandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHandbook: []
        }
    }
    async componentDidMount() {
        let res = await getTopHandbookService(10);
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data
            })
        }
    }
    render() {
        let settings = this.props.settings
        let { dataHandbook } = this.state

        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.handbook" /></span>
                        <button className="btn-section"><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings} >
                            {dataHandbook && dataHandbook.length > 0 &&
                                dataHandbook.map((item, index) => {
                                    return (
                                        <div key={index} className="section-customize">
                                            <div style={{ backgroundImage: `url(${item.image})` }} className="bg-image section-handbook"></div>
                                            <div className="text-name">{item.title}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
