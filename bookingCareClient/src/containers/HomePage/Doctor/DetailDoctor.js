import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DetailDoctor.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailInforDoctor } from '../../../services/userService';
class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }
    render() {
        let { language } = this.props
        let { detailDoctor } = this.state
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <div >
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left" style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>

                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === 'vi' ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">

                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>

                            </div>
                        }
                    </div>
                    <div className="comment-doctor">

                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
