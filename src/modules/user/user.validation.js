import Joi from "joi"
import { generalfields } from "../../utils/generalfields.js"

//signupSchema
export const signupSchema = Joi.object({
firstName : Joi.string().min(3).max(20).required(),
lastName : Joi.string().min(3).max(20).required(),
email : generalfields.email,
password : generalfields.password,
cpassword : Joi.string().valid(Joi.ref('password')).required(),
gender:Joi.string().valid('Female','Male'),
status:Joi.string().valid('Offline','Online'),
phone : Joi.string()
}).required()

//tokenSchema
export const tokenSchema = Joi.object({
    token : Joi.string().required()
}).required()

//loginSchema
export const loginSchema = Joi.object({
    email : Joi.string().email({ tlds: { allow: ['com', 'net'] }}),
    password : generalfields.password
}).required()

//authSchema
export const authSchema = Joi.object({
   auth: Joi.string().required()
}).required()

//updateSchema
export const updateSchema = Joi.object({
    email : Joi.string().email({ tlds: { allow: ['com', 'net'] }}),
    age : Joi.number(), 
    firstName : Joi.string().min(3).max(20),
    lastName : Joi.string().min(3).max(20),
    phone : Joi.string(),
    userId:generalfields.id
    }).required()

    //delete schema
export const deleteSchema = Joi.object({
    userId : generalfields.id
    }).required()

    //get account data
export const getDataSchema = Joi.object({
        userId : generalfields.id
        }).required()

        //profileSchema
export const profileSchema = Joi.object({
   userId : generalfields.id
}).required()

//updatePasswordSchema
export const updatePasswordSchema = Joi.object({
    userId: generalfields.id,
    oldPassword:generalfields.password,
    newPassword:generalfields.password
}).required();

//sendCodeSchema
export const sendCodeSchema = Joi.object({
    email: generalfields.email
}).required()

//forgetPasswordSchema
export const forgetPasswordSchema = Joi.object({
    email : generalfields.email,
    newPassword : generalfields.password,
    cPassword : Joi.string().valid(Joi.ref('newPassword')).required(),
    code : Joi.string().pattern(new RegExp(/^\d{5}$/)).required()
}).required()

