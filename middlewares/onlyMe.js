
const onlyMe = (req,res,next) => {
    if(req.user._id == req.query.id){
        next();
    }else{
        console.log("[Forbidden] User cannot access this page");
        res.redirect('/home');
    }
}

module.exports = onlyMe;