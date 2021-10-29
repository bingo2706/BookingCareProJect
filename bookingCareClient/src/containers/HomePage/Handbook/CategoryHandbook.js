import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './CategoryHandbook.scss'
import { getHandbookByCategoryId } from '../../../services/userService';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import _ from 'lodash'
import * as actions from "../../../store/actions";
class CategoryHandbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            DataHandBook: []
        }
    }
    async componentDidMount() {
        this.props.fetchCategoryStart();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getHandbookByCategoryId(id)
            if (res && res.errCode === 0) {
                this.setState({
                    DataHandBook: res.data
                })
            }
        }
    }
    render() {
        let { DataHandBook } = this.state
        let { language, categories } = this.props
        let categoryTitle = ''
        if (DataHandBook && DataHandBook.length > 0 && DataHandBook[0].categoryData) {
            categoryTitle = language === 'vi' ? DataHandBook[0].categoryData.valueVi : DataHandBook[0].categoryData.valueEn
        }
        console.log(DataHandBook)
        return (
            <div>
                <div className="hand-book-header-container">
                    <HomeHeader />
                    <div className="nav-header">
                        <div className="box-nav">
                            <i className="fas fa-home"></i>
                            <span>/   Cẩm nang  /    </span>
                            <h1>{categoryTitle}</h1>
                        </div>

                    </div>

                </div>
                <div className="box-container">
                    <div className="box-category-handbook">

                        {DataHandBook && DataHandBook.length > 0 &&
                            DataHandBook.map((item, index) => {
                                return (
                                    <Link to={`/detail-handbook/${item.id}`}>
                                        <div key={index} className="box-image-name">
                                            <div className="bg-image-related" style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div className="bg-name-related">{item.title}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        }


                    </div>

                </div>
                <div className="box-category-2">
                    <h4>DANH MỤC CẨM NANG</h4>
                    <ul>
                        {categories && categories.length > 0 &&
                            categories.map((item, index) => {
                                return (
                                    <a href={`/category-handbook/${item.keyMap}`}>
                                        <li key={index}>{language === 'vi' ? item.valueVi : item.valueEn}</li>
                                    </a>
                                )
                            })
                        }


                    </ul>
                    <div className="clear"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHandbook);
