import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DetailHandbook.scss'
import { getDetailHandbookByIdService, getRelatedHandbook } from '../../../services/userService';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import Short_des_1 from '../../../components/Short_des_1';
import _ from 'lodash'
import * as actions from "../../../store/actions";
class DetailHandbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            DataHandBook: {},
            RelatedData: []
        }
    }
    async componentDidMount() {
        this.props.fetchCategoryStart();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailHandbookByIdService(id)
            if (res && res.errCode === 0) {
                this.setState({
                    DataHandBook: res.data
                }, async () => {
                    console.log("Check categoryId", this.state.DataHandBook.categoryId)
                    let relatedRes = await getRelatedHandbook(this.state.DataHandBook.categoryId)
                    this.setState({
                        RelatedData: relatedRes.data
                    })
                })
            }
        }
    }
    render() {
        let { DataHandBook, RelatedData } = this.state
        let { language, categories } = this.props
        let image = ''
        let fullname = ''
        let position = ''
        let categoryValue = ''
        if (DataHandBook && DataHandBook.categoryData) {
            categoryValue = language === 'vi' ? DataHandBook.categoryData.valueVi : DataHandBook.categoryData.valueEn

        }
        if (DataHandBook && DataHandBook.DoctorHandbookData && DataHandBook.DoctorHandbookData.positionData) {
            image = DataHandBook.DoctorHandbookData.image
            fullname = DataHandBook.DoctorHandbookData.firstName + ' ' + DataHandBook.DoctorHandbookData.lastName
            position = language === 'vi' ? DataHandBook.DoctorHandbookData.positionData.valueVi : DataHandBook.DoctorHandbookData.positionData.valueEn

        }
        console.log(this.props)
        return (
            <div>
                <div className="hand-book-header-container">
                    <HomeHeader />
                    <div className="nav-header">
                        <div className="box-nav">
                            <i className="fas fa-home"></i>
                            <span>/   Cẩm nang  /    </span>
                            <span>{categoryValue}</span>
                        </div>

                    </div>

                </div>
                <div className="box-container">
                    <h1>{DataHandBook.title}</h1>
                    <div className="note">
                        BookingCare tổng hợp . Góp ý
                    </div>
                    <div className="box-shortdescription">
                        <p>{DataHandBook.shortdescription}</p>
                    </div>
                    <Short_des_1 />
                    <div className="box-markdown">
                        {DataHandBook && !_.isEmpty(DataHandBook) &&
                            <div dangerouslySetInnerHTML={{ __html: DataHandBook.descriptionHTML }}>

                            </div>
                        }
                    </div>
                    <div className="box-actors">
                        <h4>Về tác giả cẩm nang</h4>
                        <div className="box-bg-name-actors">
                            <div className="bg-actors" style={{ backgroundImage: `url(${image})` }}></div>
                            <div className="box-name">
                                <div className="actors-name">{fullname}</div>
                                <div className="actors-position">{position}</div>
                            </div>

                        </div>
                    </div>
                    <div className="box-related-handbook">
                        <h3>Bài viết liên quan</h3>
                        {RelatedData && RelatedData.length > 0 &&
                            RelatedData.map((item, index) => {
                                return (
                                    <a href={`/detail-handbook/${item.id}`}>
                                        <div key={index} className="box-image-name">
                                            <div className="bg-image-related" style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div className="bg-name-related">{item.title}</div>
                                        </div>
                                    </a>
                                )
                            })
                        }


                    </div>
                    <div className="box-category">
                        <h4>DANH MỤC CẨM NANG</h4>
                        <ul>
                            {categories && categories.length > 0 &&
                                categories.map((item, index) => {
                                    return (
                                        <Link to={`/category-handbook/${item.keyMap}`}>
                                            <li key={index}>{language === 'vi' ? item.valueVi : item.valueEn}</li>
                                        </Link>
                                    )
                                })
                            }


                        </ul>
                        <div className="clear"></div>
                    </div>
                </div>
                <HomeFooter />
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        categories: state.admin.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoryStart: () => dispatch(actions.fetchCategoryStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
