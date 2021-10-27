import specialtyService from '../services/specialtyService';

let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error)
        return res.status(200).json({

            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getTopSpecialtyHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await specialtyService.getTopSpecialtyHome(+limit);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getAllSpecialty = async (req, res) => {

    try {
        let response = await specialtyService.getAllSpecialty();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getDetailSpecialtyById = async (req, res) => {

    try {
        let response = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
module.exports = {
    createSpecialty: createSpecialty,
    getTopSpecialtyHome: getTopSpecialtyHome,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}