import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../utils/';

class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: '',
            filename: '',

        }
    }

    componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64,
                filename: file.name.split('.')[1]
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {

        let { language, isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props

        return (
            <div className="">
                <Modal isOpen={isOpenModal} className={'booking-modal-container'}
                    size="md" centered
                >
                    <div className="modal-header">
                        <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
                        <button onClick={closeRemedyModal} type="button" className="btn btn-time" aria-label="Close">X</button>
                    </div>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Email bệnh nhân</label>
                                <input type="email" className="form-control" value={this.state.email}
                                    onChange={(event) => this.handleOnChangeEmail(event)}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Chọn file đơn thuốc</label>
                                <input onChange={(event) => this.handleOnChangeImage(event)} type="file" className="form-control form-file" />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={this.handleSendRemedy}
                        >
                            Do Something
                        </Button>
                        {' '}
                        <Button onClick={closeRemedyModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
