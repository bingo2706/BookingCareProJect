import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import './TableManageUser.scss';
class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers != this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }
    render() {
        let arrUsers = this.state.usersRedux
        return (


            <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                        <button
                                            onClick={() => this.handleDeleteUser(item)}
                                            className="btn-delete"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>


        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
