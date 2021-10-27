import db from "../models/index";
require('dotenv').config();

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    address: data.address
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getTopClinicHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!limit) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            }
            else {
                let data = await db.Clinic.findAll({
                    limit: limit,
                    order: [['createdAt', 'DESC']]
                })
                if (data && data.length > 0) {
                    data = data.map(item => {
                        item.image = new Buffer(item.image, 'base64').toString('binary');
                        return item;
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data: data
                })
            }


        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTopClinicHome: getTopClinicHome,
    createClinic: createClinic
}