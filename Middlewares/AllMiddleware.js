import UserModal from '../modals/Users.model.js'

export const checkUserId = async (req,res,next)=>{
    try{
       const {id} = req.body;
       const user = await UserModal.findById(id)
       if(user){
        next()
       }else{
        return res.status(404).json({message:"user not found",success:false })
       }
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}