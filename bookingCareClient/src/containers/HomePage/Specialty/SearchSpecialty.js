import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './SearchSpecialty.scss';
import { getAllSpecialtyService } from '../../../services/userService';
class SearchSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecial: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialtyService();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecial: res.data
            })
        }
    }
    render() {
        let { dataSpecial } = this.state

        return (
            <div className="search-specialty-container">
                <div className="search-specialty-header">
                    <Link to={'/home'}><div className="icon"><i className="fas fa-long-arrow-alt-left"></i></div></Link>

                    <div className="search-specialty-header-name">Chuyên khoa</div>
                </div>
                <div className="search-specialty-body">
                    {dataSpecial && dataSpecial.length > 0 &&
                        dataSpecial.map((item, index) => {
                            return (
                                <Link to={`/detail-specialty/${item.id}`}>
                                    <div className="child-item" key={index}>
                                        <div className="child-item-bg" style={{ backgroundImage: `url(${item.image})` }}>

                                        </div>
                                        <div className="child-item-name">{item.name}</div>
                                    </div>
                                </Link>
                            )
                        })
                    }

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

export default connect(mapStateToProps, mapDispatchToProps)(SearchSpecialty);
