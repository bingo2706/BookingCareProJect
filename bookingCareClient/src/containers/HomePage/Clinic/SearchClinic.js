import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import '../Specialty/SearchSpecialty.scss';
import { getAllClinicService } from '../../../services/userService';
class SearchClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: [],
            keyword: ''
        }
    }
    async componentDidMount() {
        let res = await getAllClinicService();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
    }
    handleOnChangeInput = (event) => {
        this.setState({
            keyword: event.target.value
        })

    }
    handleSearchClinic = (ketqua) => {
        this.state.dataClinic.forEach((item) => {
            if (item.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1) {
                ketqua.push(item)
            }
        })
    }
    render() {
        let ketqua = []
        this.handleSearchClinic(ketqua)

        return (
            <div className="search-specialty-container">
                <div className="search-header-container">
                    <div className="search-specialty-header">
                        <Link to={'/home'}><div className="icon"><i className="fas fa-long-arrow-alt-left"></i></div></Link>

                        <div className="search-specialty-header-name">Bệnh viện, phòng khám</div>
                    </div>
                    <div className="search-header">
                        <input onChange={(event) => this.handleOnChangeInput(event)} type="text" placeholder="Tìm kiếm cơ bệnh viện phòng khám" className="search-input" />
                    </div>
                </div>
                <div className="search-specialty-body">
                    {ketqua && ketqua.length > 0 &&
                        ketqua.map((item, index) => {
                            return (
                                <Link to={`/detail-clinic/${item.id}`}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchClinic);
