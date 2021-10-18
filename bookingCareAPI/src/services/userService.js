import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let hashUserPasswordFromBcrypt = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found!'
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. plz try other email`
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, Plz try another email!'
                })
            } else {
                let hashPassword = await hashUserPasswordFromBcrypt(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    roleId: data.role,
                    positionId: data.position,
                    gender: data.gender,
                    phonenumber: data.phonenumber,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundUser = await db.User.findOne({
                where: { id: userId }
            })
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }
            await db.User.destroy({
                where: { id: userId }
            })
            resolve({
                errCode: 0,
                message: `The user is deleted`
            })
        } catch (error) {
            reject(error)
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.role || !data.position || !data.gender) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.roleId = data.role;
                user.gender = data.gender;
                user.positionId = data.position;
                if (data.avatar) {
                    user.image = data.avatar
                }
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update the user succeeds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                })
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}