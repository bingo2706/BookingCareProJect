import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../services/userService';


const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {

            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getDoctorPrice();
        this.props.getDoctorProvince();
        this.props.getDoctorPayment();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.arrPrice !== this.props.arrPrice) {
            let dataSelect = this.buildDataInputSelect(this.props.arrPrice, 'DOCTORS')
            this.setState({
                listPrice: dataSelect
            })
        }
        if (prevProps.arrPayment !== this.props.arrPayment) {
            let dataSelect = this.buildDataInputSelect(this.props.arrPayment, 'DOCTORS')
            this.setState({
                listPayment: dataSelect
            })
        }
        if (prevProps.arrProvince !== this.props.arrProvince) {
            let dataSelect = this.buildDataInputSelect(this.props.arrProvince, 'DOCTORS')
            this.setState({
                listProvince: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let doctorSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let ProvinceSelect = this.buildDataInputSelect(this.props.arrProvince, 'DOCTORS');
            let PaymentSelect = this.buildDataInputSelect(this.props.arrPayment, 'DOCTORS');
            let PriceSelect = this.buildDataInputSelect(this.props.arrPrice, 'DOCTORS')
            this.setState({
                listDoctors: doctorSelect,
                listPayment: PaymentSelect,
                listPrice: PriceSelect,
                listProvince: ProvinceSelect
            })
        }
    }
    buildDataInputSelect = (Inputdata, type) => {
        let result = [];
        let { language } = this.props
        if (Inputdata && Inputdata.length > 0) {
            Inputdata.map((item, index) => {
                let object = {}
                let labelVi = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueVi
                let labelEn = type === 'USERS' ? `${item.lastName} ${item.firstName}` : `${item.valueEn} USD`
                object.label = language === 'vi' ? labelVi : labelEn
                object.value = type === 'USERS' ? item.id : item.keyMap;
                result.push(object)
            })

        }

        return result;
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveDetailDoctor({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? 'UPDATE' : 'CREATE',
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })
        let { listPayment, listPrice, listProvince } = this.state
        let res = await getDetailInforDoctor(selectedOption.value)

        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let note = '';
            if (res.data.Doctor_Infor) {
                let paymentId = res.data.Doctor_Infor.paymentId;
                let priceId = res.data.Doctor_Infor.priceId;
                let provinceId = res.data.Doctor_Infor.provinceId
                note = res.data.Doctor_Infor.note === null ? '' : res.data.Doctor_Infor.note
                let selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                let selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })

                let selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                this.setState({
                    nameClinic: res.data.Doctor_Infor.nameClinic,
                    addressClinic: res.data.Doctor_Infor.addressClinic,
                    selectedPrice: selectedPrice,
                    note: note,
                    selectedPayment: selectedPayment,
                    selectedProvince: selectedProvince
                })
            } else {
                this.setState({
                    nameClinic: '',
                    addressClinic: '',
                    note: '',
                    selectedPrice: '',
                    selectedPayment: '',
                    selectedProvince: ''
                })
            }

            this.setState({
                description: markdown.description,
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                hasOldData: true
            })
        } else {
            this.setState({
                description: '',
                contentHTML: '',
                contentMarkdown: '',
                hasOldData: false
            })
        }
    }
    handleOnchangeText = (event, name) => {
        let stateCopy = { ...this.state }
        stateCopy[name] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { hasOldData } = this.state

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title"><FormattedMessage id="admin.manage-doctor.title" /></div>
                <div className="more-infor">
                    <div className="content-left from-group">
                        <label><FormattedMessage id="admin.manage-doctor.choose-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                        />
                    </div>
                    <div className="content-right">
                        <label><FormattedMessage id="admin.manage-doctor.infor-intro" /></label>
                        <textarea className="form-control" rows="4"
                            onChange={(event) => this.handleOnchangeText(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.choose-price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedPrice"
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-price-1" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.choose-payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedPayment"
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-payment-1" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.choose-province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedProvince"
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-province-1" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.name-clinic" /></label>
                        <input type="text" className="form-control" value={this.state.nameClinic} onChange={(event) => this.handleOnchangeText(event, 'nameClinic')} />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
                        <input type="text" className="form-control" value={this.state.addressClinic} onChange={(event) => this.handleOnchangeText(event, 'addressClinic')} />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input type="text" className="form-control" value={this.state.note} onChange={(event) => this.handleOnchangeText(event, 'note')} />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'btn btn-warning mt-3 ml-3 mb-3' : 'btn btn-primary mt-3 ml-3 mb-3'}
                >{hasOldData === false ? <FormattedMessage id="admin.manage-doctor.save-infor" /> : <FormattedMessage id="admin.manage-doctor.edit-infor" />}</button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        arrPrice: state.admin.prices,
        arrPayment: state.admin.payments,
        arrProvince: state.admin.provinces
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getDoctorPrice: () => dispatch(actions.getDoctorPrice()),
        getDoctorPayment: () => dispatch(actions.getDoctorPayment()),
        getDoctorProvince: () => dispatch(actions.getDoctorProvince()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
