const UserModel = require("./../models/userModel");

exports.registerUser = async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.loginUser = async(req, res) =>{
    const userExists = await UserModel.exists({ username: req.body.username });
    if (userExists){
    UserModel.findOne({ username: req.body.username },function (err, person) {
        console.log(person);
        res.status(201).json({
            status: "Success",
            user: person
        });
      });
    }else{
        res.status(404).json({
            status: "Fail"
        });
    }
};

exports.savedUser = async(req, res)=>{
    console.log(req.body._id)
    UserModel.findOne({_id: req.body._id}, function(err, person){
        res.status(201).json({
            status: "Success",
            user: person
        });
    });
};