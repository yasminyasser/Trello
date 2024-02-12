import connection from '../DB/connection.js'
import userRouter from './modules/user/user.router.js'
import taskRouter from './modules/task/task.router.js'
import { globalError } from './utils/asynchandler.js'

const bootstrap = (app,express)=>{
app.use(express.json({}))
//setup API routing
app.use('/user',userRouter)
app.use('/task',taskRouter)
app.all('*',(req,res,next)=>{
res.send("in_valid routing please check url or method")
})
app.use(globalError)
connection()
}

export default bootstrap