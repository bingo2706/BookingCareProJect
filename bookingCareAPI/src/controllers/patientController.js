import patientService from '../services/patientService';


let postBookAppoinment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppoinment(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error)
        return res.status(200).json({

            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let postVerifyBookAppoinment = async (req, res) => {
    try {
        let infor = await patientService.postVerifyBookAppoinment(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log("check error >>", error)
        return res.status(200).json({

            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
module.exports = {
    postBookAppoinment: postBookAppoinment,
    postVerifyBookAppoinment: postVerifyBookAppoinment
}