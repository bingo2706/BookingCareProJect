import express from "express";
import userController from "../controllers/userController";
import doctorController from '../controllers/doctorController';
let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("hello")
    })

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    router.get('/api/allcode', userController.getAllCode);
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);

    return app.use("/", router);
}

module.exports = initwebRoutes;