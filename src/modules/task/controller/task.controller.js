import taskModel from "../../../../DB/model/Task.model.js";
import userModel from "../../../../DB/model/User.model.js";
import cloudinary from '../../../utils/cloudinary.js'


// 1-add task with status (toDo)(user must be logged in)
export const addtask = async (req, res,next) => {
    const { title, description,deadline,assignTo} = req.body
    const {_id} = req.user;
    const userexist = await userModel.findById({_id})
    if(! userexist){
        return next(new Error ('user not found'),{cause:404})
                }
                const assigntoExist = await userModel.findById({_id:assignTo})
                if(! assigntoExist){
                    return next(new Error ('assignedTo user not found'),{cause:404})
                            }
                const task = await taskModel.create({title,description, deadline,assignTo,userID : req.user._id});
                return res.status(201).json({msg:"task added successfully ",task})
  }
                          
//2-update task (title , description , status) and assign task to other user(user must be logged in) (creator only can update task)
export const updateTask = async (req, res,next) => {
            const {taskId} = req.params
            const userID = req.user._id;
            const { title, description, status , assignTo} = req.body;
        const task = await taskModel.findById({_id:taskId})
        if(!task){
            return next(new Error ('task not found'),{cause:404})
        }
         const assignedUser = await userModel.findOne({assignTo});
        if (!assignedUser) {

      return next(new Error ('Assigned user not found' ),{cause:404})
        }

        if (task.userID.equals(userID)){
          const updatetask = await taskModel.findByIdAndUpdate({_id:taskId},{ title, description, status, assignTo },{new:true})
          return res.status(200).json({msg:"task updated successfully", updatetask})
        
                }
                return next(new Error ('you are not the owner of the task' ),{cause:400})
            }

//3-delete task(user must be logged in) (creator only can delete task)
export const deleteTask = async (req, res,next) => {
        const {taskId} = req.params
        const userID = req.user._id;
        const task = await taskModel.findById({_id:taskId})
        if(!task){
            return next(new Error ('task not found'),{cause:404})
        }
    if (task.userID.equals(userID)){
                const findtask = await taskModel.findById({_id:taskId})
                 if (findtask.attachments && findtask.attachments.length > 0) {
              for (const attachment of findtask.attachments) {
                  await cloudinary.uploader.destroy(attachment.public_id)}
              const deletetask = await taskModel.deleteOne({_id:taskId})
                return res.status(200).json({msg:"task deleted successfully"})
            }}
            return next(new Error ('you are not the owner of the task' ),{cause:400})
    }

// 4-get all tasks with user data
export const tasksWuser= async (req, res) => {
    const tasks = await taskModel.find().populate('userID assignTo', 'userName email')

    return tasks.length == 0 ? next(new Error('no tasks found'),{cause : 404}) : res.status(200).json({ msg: 'Done', tasks });
 
}

//5-get tasks of oneUser with user data (user must be logged in)
export const getTasksOfUser = async (req, res, next) => {
     const {id} = req.params;
     const user = await userModel.findById(id)
     console.log(user);
     if (! user){
        return next(new Error ('invalid id' ),{cause:400})
     }
      const task = await taskModel.find({assignTo:id}).populate('assignTo');
      return task.length == 0 ? next(new Error('no tasks found'),{cause : 404}) : res.status(200).json({ msg: 'Tasks retrieved successfully', task });
    }

// 6-get all tasks that not done after deadline
export const incompletetasks = async (req, res,next) => {
    const today = new Date()
    const tasks = await taskModel.find({
      deadline: { $lt: today },
      status: { $ne: 'done' }
    });

    return res.json({ msg: 'Done', tasks });
  }

//upload attachment to task
export const uploadattachmen = async (req, res,next) => {
  console.log(req.files);
  const attachments = []
  const {taskId} = req.params
  const userID = req.user._id;
  const files = req.files
        for (const file of files) {
            const {public_id , secure_url} = await cloudinary.uploader.upload(file.path,
                {folder : `${process.env.APP_NAME}/${taskId}`})
        attachments.push({public_id , secure_url})
            }
    const task = await taskModel.findById({_id:taskId})  
    if(!task){
        return next(new Error ('task not found'))
    }
    if (task.userID.equals(userID)){
      const task = await taskModel.findByIdAndUpdate({_id:taskId},{$set : { attachments:attachments}},{new:true})
       return res.json({ message: 'Attachment uploaded successfully', task });
  }
  return next(new Error ('you are not the owner of the task' ))
}



