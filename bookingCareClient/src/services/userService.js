import axios from "../axios";
import { toast } from "react-toastify";
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}
const getAllCodeService = (inputData) => {
    return axios.get(`/api/allcode?type=${inputData}`)
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data)
}
const getDetailInforDoctor = (userId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${userId}`)
}
const saveBulkScheduledoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postBookAppoinment = (data) => {
    return axios.post('/api/patient-book-appoinment', data)
}
export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService, getAllCodeService, editUserService,
    getTopDoctorHomeService, getAllDoctorsService,
    saveDetailDoctorService, getDetailInforDoctor,
    saveBulkScheduledoctor, getScheduleDoctorByDate,
    getExtraInforDoctorById, getProfileDoctorById,
    postBookAppoinment
}