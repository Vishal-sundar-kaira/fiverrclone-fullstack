exports.register = (req, res) => {
    try{
        const newUser=new User({
            username:"vishal",
            email:"kairavishal37@gmail.com",
            password:"vishal1234",
            country:"india"
        })
    }catch(err){
        res.status(500).send("Something went wrong in try catch")
    }
};
exports.deleteuser = (req, res) => {
    res.send("it works bro");
};
exports.deleteuser = (req, res) => {
    res.send("it works bro");
};