var mongoose = require('mongoose')
var Pharma =  mongoose.model('Pharmamodel')
module.exports = {
  postDetails: async (req, res) => {
    try {
      let data = JSON.parse(JSON.stringify(req.body.data));
     console.log(data)
     data.vendor= req.body.vendor_id
     var pharma = new Pharma(data);
     console.log(">>>???", pharma);
     let pharmadata = await pharma.save();
     if (pharmadata) 
     {
     return res.json({ success: true });
     }
     else
     return res.json({ success: false });
    } 
    catch (error) {
      console.log("error", error);
    }
},
getpostAll: async (req,res) => {
  try {
    
   let pharmadata = await Pharma.find({});
   if (pharmadata) 
   return res.json({ success: true, data: pharmadata });
   else
   return res.json({ success: false });
  } 
  catch (error) {
    console.log("error", error);
  }
},
getpostDetails: async (req,res) => {
  try {
    console.log(req.query)
   let pharmadata = await Pharma.findById(mongoose.Types.ObjectId(req.query.post_id)).populate('user');
   if (pharmadata) 
   return res.json({ success: true, data: pharmadata });
   else
   return res.json({ success: false });
  } 
  catch (error) {
    console.log("error", error);
  }
},
getposts: async (req,res) => {
  try {
    console.log(req.query)
   let pharmadata = await Pharma.find({vendor: mongoose.Types.ObjectId(req.query.vendor_id)});
   if (pharmadata) 
   return res.json({ success: true, data: pharmadata });
   else
   return res.json({ success: false });
  } 
  catch (error) {
    console.log("error", error);
  }
}
};