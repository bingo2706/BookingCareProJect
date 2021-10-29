import handbookService from '../services/handbookService';

let createHandbook = async (req, res) => {
    try {
        let infor = await handbookService.createHandbook(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error)
        return res.status(200).json({

            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getDetailHanbookById = async (req, res) => {
    try {
        let infor = await handbookService.getDetailHanbookById(req.query.id);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error)
        return res.status(200).json({

            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getTopHandbookHome = async (req, res) => {
    try {
        let limit = req.query.limit;
        if (!limit) limit = 10;
        let infor = await handbookService.getTopHandbookHome(+limit);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error)
        return res.status(200).json({

            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
module.exports = {
    createHandbook: createHandbook,
    getDetailHanbookById: getDetailHanbookById,
    getTopHandbookHome: getTopHandbookHome
}