var mongoose = require('mongoose')
var User =  mongoose.model('Usermodel')
var Pharma =  mongoose.model('Pharmamodel')
var bcrypt = require('bcrypt');
var jwtService = require('./v1/auth')
module.exports = {
  signup: async (req, res) => {
    try {
      let data = JSON.parse(JSON.stringify(req.body));
      let useremail = await User.find({ email: data.email }).count();
      if (!useremail) {
        var user = new User(data);
        user.password = bcrypt.hashSync(data.password, 10);
        let userdata = await user.save();
        if (userdata) return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.body);
      let data = JSON.parse(JSON.stringify(req.body));
      const user = await User.find({ email: data.email });
      if (user.length) {
        console.log(data.password, user);
        if (bcrypt.compareSync(data.password, user[0].password))
          return res.json({
            success: "success",
            role:user[0].role,
            token: jwtService.createToken(user[0]),
            _id: user[0]._id
          });
        else 
        return res.json({ success: false });
      }else{
        return res.json({ success: false });
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  addtoLists: async(req, res)=>{
    let data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    const user = await Pharma.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.pharma_id)},{$addToSet:{ user : req.body.user_id}});
    if(user){
        return res.json({success:true})
    } else{
        return res.json({success:false})
    }
  },
  myLists: async(req, res)=>{
    let data = JSON.parse(JSON.stringify(req.query))
    console.log(data)
    const user = await Pharma.find({user:{$in : mongoose.Types.ObjectId(data.id)}}).populate('vendor')
    if(user){
        return res.json({success:true,data:user})
    } else{
        return res.json({success:false})
    }
  },
  getUserDetail: async(req, res)=>{
    let data = JSON.parse(JSON.stringify(req.query))
    console.log(data)
    const user = await User.find({_id: mongoose.Types.ObjectId(data.id)})
    if(user){
        return res.json({success:true,data:user})
    } else{
        return res.json({success:false})
    }
  },
  deleteFromLists: async(req, res)=>{
    let data = JSON.parse(JSON.stringify(req.body))
    const user = await Pharma.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.pharma_id)},{$pull :{ user : req.body.user_id}});
    if(user){
      let main = await Pharma.find({user:{$in : mongoose.Types.ObjectId(data.user_id)}}) 
        return res.json({success:true,data:main})
    } else{
        return res.json({success:false})
    }
  },
  deleteFromVendorList: async(req, res)=>{
    let data = JSON.parse(JSON.stringify(req.body))
    const user = await Pharma.deleteOne({ _id: mongoose.Types.ObjectId(data.pharma_id)});
    if(user){
      let main
      if(req.body.user_id)
       main = await Pharma.find({vendor : mongoose.Types.ObjectId(data.user_id)}) 
      else
       main = await Pharma.find({}) 
        return res.json({success:true,data:main})
    } else{
        return res.json({success:false})
    }
  },
  deleteFromAdminLists: async(req, res)=>{
    let data = JSON.parse(JSON.stringify(req.body))
    const user = await Pharma.deleteOne({ _id: mongoose.Types.ObjectId(data.pharma_id)});
    if(user){
      let main
       main = await Pharma.find({}) 
        return res.json({success:true,data:main})
    } else{
        return res.json({success:false})
    }
  }
};