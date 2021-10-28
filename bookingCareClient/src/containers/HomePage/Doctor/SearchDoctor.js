import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import '../Specialty/SearchSpecialty.scss';
import { getAllDoctorsService } from '../../../services/userService';
class SearchDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataDoctor: []
        }
    }
    async componentDidMount() {
        let res = await getAllDoctorsService();
        if (res && res.errCode === 0) {
            this.setState({
                dataDoctor: res.data
            })
        }
    }
    render() {
        let { dataDoctor } = this.state

        console.log(dataDoctor)
        return (
            <div className="search-specialty-container">
                <div className="search-specialty-header">
                    <Link to={'/home'}><div className="icon"><i className="fas fa-long-arrow-alt-left"></i></div></Link>

                    <div className="search-specialty-header-name">Bác sĩ</div>
                </div>
                <div className="search-specialty-body">
                    {dataDoctor && dataDoctor.length > 0 &&
                        dataDoctor.map((item, index) => {
                            let fullname = `${item.firstName} ${item.lastName}`
                            return (
                                <Link to={`/detail-doctor/${item.id}`}>
                                    <div className="child-item" key={index}>
                                        <div className="child-item-bg" style={{ backgroundImage: `url(${item.image})` }}>

                                        </div>
                                        <div>
                                            <div className="child-item-name">{item.positionData.valueVi}, {fullname}</div>
                                            {item.Doctor_Infor && item.Doctor_Infor.specialtyData &&
                                                <div className="child-item-sub-name">{item.Doctor_Infor.specialtyData.name}</div>
                                            }
                                        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(SearchDoctor);
