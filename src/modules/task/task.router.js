import Router from 'express'
import { asyncHandler } from '../../utils/asyncHandler.js'
import * as taskController from './controller/task.controller.js'
import validation from '../../middleware/validation.js'
import * as taskValidation from './task.validation.js'
import auth from '../../middleware/auth.js'
import uploadFilecloud, { fileValidation } from '../../utils/multer.js'

const router = Router()
 //add task
router.post('/addTask',
validation(taskValidation.authSchema,true),
auth,
validation(taskValidation.addTaskSchema),
asyncHandler(taskController.addtask))

//update task
.put ('/updateTask/:taskId',
validation(taskValidation.authSchema,true),
auth,
validation(taskValidation.updatetaskschema),
asyncHandler(taskController.updateTask))

//delete task
.delete ('/deleteTask/:taskId',
validation(taskValidation.authSchema,true),
auth,
validation(taskValidation.deletetaskschema),
asyncHandler(taskController.deleteTask))

//task with user
.get('/tasksWuser',
asyncHandler(taskController.tasksWuser))

//tasks of user
.get('/tasksofuser/:id',
validation(taskValidation.getTasksOfUserschema),
asyncHandler(taskController.getTasksOfUser))

//incomplete tasks
.get('/incompletetasks',
asyncHandler(taskController.incompletetasks))

//upload attatchment
.put('/uploadattachmen/:taskId',
validation(taskValidation.authSchema,true),
auth,
uploadFilecloud(fileValidation.file).array('files',3),
validation(taskValidation.uploadattachmenschema),
asyncHandler(taskController.uploadattachmen))


export default router 