import db from "../models/index";
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();
let buildUrlEmail = (doctorId, token) => {

    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
}


let postBookAppoinment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullname) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullname,
                    time: data.dateSchedule,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                })

                if (user && user[0]) {

                    let bookingData = await db.Booking.findOne({
                        where: {
                            patientId: user[0].id,
                            timeType: data.timeType,
                            date: data.date
                        }
                    })
                    if (bookingData) {
                        resolve({
                            errCode: 2,
                            errMessage: 'Schedule already exists, please choose another time'
                        })
                    } else {
                        await db.Booking.create({
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        })
                    }

                }
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
let postVerifyBookAppoinment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let appoinment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appoinment) {
                    appoinment.statusId = 'S2'
                    await appoinment.save();
                    resolve({
                        errCode: 0,
                        errMessage: "Update the appointment succeed!"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or does not exist"
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    postBookAppoinment: postBookAppoinment,
    postVerifyBookAppoinment: postVerifyBookAppoinment
}