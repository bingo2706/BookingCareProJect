import db from "../models/index";
require('dotenv').config();

let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.title || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown || !data.shortdescription || !data.categoryId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                await db.Handbook.create({
                    title: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    shortdescription: data.shortdescription,
                    categoryId: data.categoryId
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

module.exports = {
    createHandbook: createHandbook
}