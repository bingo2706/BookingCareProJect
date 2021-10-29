import db from "../models/index";
require('dotenv').config();

let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.title || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown || !data.shortdescription || !data.categoryId || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                await db.Handbook.create({
                    title: data.title,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    shortdescription: data.shortdescription,
                    categoryId: data.categoryId,
                    doctorId: data.doctorId
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
let getDetailHanbookById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let res = await db.Handbook.findOne({
                    where: { id: id },
                    include: [
                        {
                            model: db.Allcode, as: 'categoryData', attributes: ['valueEn', 'valueVi']
                        },
                        {
                            model: db.User, as: 'DoctorHandbookData', attributes: ['lastName', 'firstName', 'image'],
                            include: [

                                { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        },
                    ],
                    raw: false,
                    nest: true
                })
                if (res && res.image) {
                    res.image = new Buffer(res.image, 'base64').toString('binary');
                }

                if (res.DoctorHandbookData && res.DoctorHandbookData.image) {
                    res.DoctorHandbookData.image = new Buffer(res.DoctorHandbookData.image, 'base64').toString('binary');

                }
                resolve({
                    errCode: 0,
                    data: res
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getTopHandbookHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!limit) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let data = await db.Handbook.findAll({
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
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getRelatedHandbook = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!categoryId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                console.log("Check categoryid>>", categoryId)
                let data = await db.Handbook.findAll({
                    limit: 6,
                    where: { categoryId: categoryId },
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
                    data: data
                })
            }

        }
        catch (error) {
            reject(error)
        }

    })
}
let getHandbookByCategoryId = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!categoryId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let data = await db.Handbook.findAll({
                    where: { categoryId: categoryId },
                    include: [
                        {
                            model: db.Allcode, as: 'categoryData', attributes: ['valueEn', 'valueVi']
                        },

                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.length > 0) {
                    data = data.map(item => {
                        item.image = new Buffer(item.image, 'base64').toString('binary');
                        return item;
                    })
                }
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        }
        catch (error) {
            reject(error)
        }

    })
}
let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {


            let data = await db.Handbook.findAll({

            })
            if (data && data.length > 0) {
                data = data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                data: data
            })


        }
        catch (error) {
            reject(error)
        }

    })
}
module.exports = {
    createHandbook: createHandbook,
    getDetailHanbookById: getDetailHanbookById,
    getTopHandbookHome: getTopHandbookHome,
    getRelatedHandbook: getRelatedHandbook,
    getHandbookByCategoryId: getHandbookByCategoryId,
    getAllHandbook: getAllHandbook
}