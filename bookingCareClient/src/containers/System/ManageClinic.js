import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../utils/';
import { createNewClinic } from '../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.language !== this.props.language) {

        }
    }
    handleOnChangeInput = (event, name) => {
        let copyState = { ...this.state }
        copyState[name] = event.target.value
        this.setState({
            ...copyState
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveNewclinic = async () => {

        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success("Save clinic infor succeed!")
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                address: ''
            })
        } else {
            toast.error("Save clinic infor failed!")
        }
    }
    render() {


        return (
            <div className="manage-clinic-container">
                <div className="title">QUẢN LÝ PHÒNG KHÁM</div>

                <div className="add-new-clinic row">
                    <div className="col-6 form-group">
                        <label>Tên phòng khám</label>
                        <input value={this.state.name} onChange={(event) => this.handleOnChangeInput(event, 'name')} type="text" className="form-control" />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh phòng khám</label>
                        <input onChange={(event) => this.handleOnChangeImage(event)} type="file" className="form-control-file" />
                    </div>
                    <div className="col-6 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input value={this.state.address} onChange={(event) => this.handleOnChangeInput(event, 'address')} type="text" className="form-control" />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button onClick={() => this.handleSaveNewclinic()} className="btn btn-primary mt-3">Lưu thông tin</button>
                    </div>
                </div>

            </div>

        );
    }

}

const mapStateToProps = state => {
    return {

        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
