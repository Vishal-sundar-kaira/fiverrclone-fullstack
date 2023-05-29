const createError=(status,message)=>{
    console.log("error")
    const err=new Error()
    err.status=status
    err.message=message

    return err;
}
module.exports = createError;