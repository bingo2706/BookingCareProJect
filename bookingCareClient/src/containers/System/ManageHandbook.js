import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import './ManageClinic.scss';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../utils/';
import { PostHandbook } from '../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class ManageHanbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            shortdescription: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            doctorId: '',
            categoryId: '',
            listCategory: [],
            selectedCategory: '',
        }
    }
    componentDidMount() {
        this.props.fetchCategoryStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.categories !== this.props.categories) {
            let dataSelect = this.buildDataInputSelect(this.props.categories)
            this.setState({
                listCategory: dataSelect
            })
        }
    }
    buildDataInputSelect = (Inputdata) => {
        let result = [];
        let { language } = this.props
        if (Inputdata && Inputdata.length > 0) {
            Inputdata.map((item, index) => {
                let object = {}

                object.label = language === 'vi' ? item.valueVi : item.valueEn
                object.value = item.keyMap;
                result.push(object)
            })

        }

        return result;
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

    handleChangeSelect = (selectedCategory) => {
        this.setState({ selectedCategory })

    }

    handleSaveNewHanbook = async () => {

        let res = await PostHandbook({
            title: this.state.title,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
            shortdescription: this.state.shortdescription,
            categoryId: this.state.selectedCategory.value,
            doctorId: this.props.user.id
        })
        if (res && res.errCode === 0) {
            toast.success("Save handbook infor succeed!")
            this.setState({
                title: '',
                shortdescription: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                doctorId: '',
                categoryId: '',
                selectedCategory: '',
            })
        } else {
            toast.error("Save handbook infor failed!")
        }
    }
    render() {


        return (
            <div className="manage-clinic-container">
                <div className="title">QUẢN LÝ CẨM NANG</div>

                <div className="add-new-clinic row">
                    <div className="col-6 form-group">
                        <label>Tên cẩm nang</label>
                        <input value={this.state.title} onChange={(event) => this.handleOnChangeInput(event, 'title')} type="text" className="form-control" />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh cẩm nang</label>
                        <input onChange={(event) => this.handleOnChangeImage(event)} type="file" className="form-control-file" />
                    </div>
                    <div className="col-6 form-group">
                        <label>Mô tả ngắn cẩm nang</label>
                        <input value={this.state.shortdescription} onChange={(event) => this.handleOnChangeInput(event, 'shortdescription')} type="text" className="form-control" />
                    </div>
                    <div className="col-6 form-group">
                        <label>Danh mục</label>
                        <Select
                            value={this.state.selectedCategory}
                            onChange={this.handleChangeSelect}
                            options={this.state.listCategory}
                        />
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
                        <button onClick={() => this.handleSaveNewHanbook()} className="btn btn-primary mt-3">Lưu thông tin</button>
                    </div>
                </div>

            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        language: state.app.language,
        categories: state.admin.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoryStart: () => dispatch(actions.fetchCategoryStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHanbook);
