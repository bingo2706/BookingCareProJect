import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from "../../store/actions";
import { getAllCodeService } from "../../services/userService";
import * as actions from "../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss';
import TableManageUser from './TableManageUser';
import { CRUD_ACTIONS, CommonUtils } from '../../utils/';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrRole = this.props.roleRedux
            let arrPosition = this.props.positionRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;

        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phonenumber: this.state.phonenumber,
                address: this.state.address,
                gender: this.state.gender,
                position: this.state.position,
                role: this.state.role,
                avatar: this.state.avatar
            })

        }
        if (action === CRUD_ACTIONS.UPDATE) {
            this.props.editAUserRedux({
                id: this.state.userEditId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phonenumber: this.state.phonenumber,
                address: this.state.address,
                gender: this.state.gender,
                position: this.state.position,
                role: this.state.role,
                avatar: this.state.avatar
            })
        }
    }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            action: CRUD_ACTIONS.UPDATE,
            userEditId: user.id,
            previewImgURL: imageBase64
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break
            }
        }
        return isValid
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    render() {
        let genders = this.state.genderArr
        let roles = this.state.roleArr
        let positions = this.state.positionArr
        let language = this.props.language
        let { email, password, firstName, lastName, phonenumber, address, gender, role, position, avatar } = this.state
        return (
            <div className="user-redux-container">
                <div className="title">
                    <FormattedMessage id="manage-user.title" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12"><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input type="email" className="form-control"
                                    value={email} onChange={(event) => this.onChangeInput(event, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.UPDATE ? true : false}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input disabled={this.state.action === CRUD_ACTIONS.UPDATE ? true : false} type="password" className="form-control" value={password} onChange={(event) => this.onChangeInput(event, 'password')} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.firstName" /></label>
                                <input type="text" className="form-control" value={firstName} onChange={(event) => this.onChangeInput(event, 'firstName')} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.lastName" /></label>
                                <input type="text" className="form-control" value={lastName} onChange={(event) => this.onChangeInput(event, 'lastName')} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phonenumber" /></label>
                                <input type="text" className="form-control" value={phonenumber} onChange={(event) => this.onChangeInput(event, 'phonenumber')} />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input type="text" className="form-control" value={address} onChange={(event) => this.onChangeInput(event, 'address')} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control" value={gender} onChange={(event) => this.onChangeInput(event, 'gender')}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{language === 'vi' ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control" value={role} onChange={(event) => this.onChangeInput(event, 'role')}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{language === 'vi' ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control" value={position} onChange={(event) => this.onChangeInput(event, 'position')}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{language === 'vi' ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                    <input type="file" id="previewImg"
                                        hidden onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <label className="label-upload" htmlFor="previewImg"

                                    >Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button className={this.state.action === CRUD_ACTIONS.UPDATE ? 'btn btn-warning' : 'btn btn-primary'} onClick={() => this.handleSaveUser()}>
                                    {this.state.action === CRUD_ACTIONS.UPDATE ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser handleEditUserFromParentKey={this.handleEditUserFromParent} />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
