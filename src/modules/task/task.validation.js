import Joi from 'joi'
import { generalfields } from '../../utils/generalfields.js'

//addTaskSchema
export const addTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('toDo', 'doing', 'done').default('toDo'),
    assignTo: generalfields.id,
    deadline: Joi.date().required(),
  }).required()

//updatetaskschema
export const updatetaskschema = Joi.object({
  taskId :generalfields.id,
  assignTo:generalfields._id,
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid('toDo', 'doing', 'done'),
  }).required()

//deletetaskschema 
export const deletetaskschema = Joi.object({
    taskId :generalfields.id,
    }).required()
  
//authSchema
export const authSchema = Joi.object({
    auth: Joi.string().required()
 }).required()

//getTasksOfUserschema
export const getTasksOfUserschema = Joi.object({
    id :generalfields.id,
    }).required()

//uploadattachmenschema
export const uploadattachmenschema =Joi.object({
  files:generalfields.files,
  taskId :generalfields.id,
  }).required()

