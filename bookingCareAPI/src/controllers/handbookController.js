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

module.exports = {
    createHandbook: createHandbook
}