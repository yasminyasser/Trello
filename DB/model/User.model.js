import {Schema , Types, model } from 'mongoose'

const userSchema = new Schema ({
    firstName:{
    type: String , 
    required : [true , "firstName required"] ,
    min : [3,'minimum length 3 char'],
    max : [20,'max length 20 char'],
    lowercase : true 
},
    lastName:{
        type : String , 
        required : [true , "lastName required"] ,
        min : [3,'minimum length 3 char'],
        max : [20,'max length 20 char'],
        lowercase : true ,
},
    userName : {
        type : String , 
        unique : [true, 'userNmae must be unique']
    },
     email:{
        type : String , 
        required : [true , 'email must be required'] ,
        unique : [true, 'email must be unique']
     },
     password :{
        type : String , 
        required : [true, 'password must be required'] 
     },
    gender:{
        type : String , 
        enum : ['female','male'],
        default : 'female'
    },
    status:{
        type:String,
        default :'Offline',
        enum : ['Offline','Online']
    },
    confirmEmail : {
        type : Boolean , 
        default : false 
    },
    isDeleted: {
        type: Boolean,
        default: false,
      },
age : Number,
phone:String,
      code:String
},{timestamps:true
})


const userModel = model('User', userSchema)

export default userModel