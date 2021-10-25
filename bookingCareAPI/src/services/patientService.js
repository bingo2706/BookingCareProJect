import db from "../models/index";

let postBookAppoinment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
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
                            timeType: data.timeType
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

module.exports = {
    postBookAppoinment: postBookAppoinment
}