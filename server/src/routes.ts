import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer'

const routes = express.Router();
const upload = multer(multerConfig)

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';
import AccessTokenMiddleware from './middlewares/AccessTokenMiddleware';
import RefreshTokenController from './controllers/RefreshTokenController';
import TeacherController from './controllers/TeacherController';

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();
const teacherController = new TeacherController();

routes.post('/classes', AccessTokenMiddleware, classesController.create);
routes.put('/classes', AccessTokenMiddleware, classesController.update);
routes.get('/classes_by_filters', AccessTokenMiddleware, classesController.indexByFilters);
routes.get('/classes', AccessTokenMiddleware, classesController.indexByUserPk)

routes.post('/connections', AccessTokenMiddleware, connectionsController.create);
routes.get('/connections', AccessTokenMiddleware, connectionsController.index);

routes.post('/users', usersController.create);
routes.get('/users', AccessTokenMiddleware, usersController.index)

routes.put('/teacher_image', AccessTokenMiddleware, upload.single('file'), teacherController.updateAvatar)

routes.post('/verify_email/:token', usersController.confirmEmail);
routes.post('/forgot_password', usersController.forgotPassword);
routes.post('/reset_password/:token', usersController.resetPassword);
routes.post('/autenticate', usersController.autenticate);
routes.post('/update_refresh_token/', RefreshTokenController.updateRefreshToken)

export default routes