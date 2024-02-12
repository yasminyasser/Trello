import jwt from 'jsonwebtoken'
import userModel from '../../DB/model/User.model.js'



const auth =  async (req, res, next) => {
        try {
            const { auth } = req.headers
            if (!auth?.startsWith(process.env.BEARERtOKEN)) {
                return next(new Error('invalid bearer token'), { cause: 400 })
            }
            const token = auth.split(process.env.BEARERtOKEN)[1]
            if (!token) {
                return next(new Error('invalid token'), { cause: 400 })
            }
            const payload = jwt.verify(token, process.env.TOKEN_SEGNATURE)
            if (!payload?._id) {
                return next(new Error('invalid payload'), { cause: 400 })
            }
            const user = await userModel.findOne({ _id: payload._id }).select('userName email status isDeleted')
            if (!user) {
                return next(new Error('not register account'), { cause: 404 })
            }
            if (user.status == 'Offline') {
                return next(new Error('please login'), { cause: 404 })
            }
            if (user.isDeleted) {
                return next(new Error('you are soft deleted,please login again'), { cause: 404 })
            }
        

            req.user = user
            next()
        }
        catch (error) {
         return res.json({ message: error.message, stack: error.stack });
        }
    }

export default auth 

