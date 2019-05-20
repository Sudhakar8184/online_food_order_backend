const mongoose = require('mongoose')
var isProduction = process.env.NODE_ENV === 'production';
if(!isProduction){
mongoose.connect('mongodb://medical:medical123@ds145093.mlab.com:45093/medical',
(err,db)=>{
    if(!err)
    {
      console.log('Database connected successfully');
    }else{
            console.log('mongoose connection failed')
    }
  });
  mongoose.set('debug', true);
}else{
  mongoose.connect('mongodb://medical:medical123@ds145093.mlab.com:45093/medical',
(err,db)=>{
    if(!err)
    {
      console.log('Database connected successfully');
    }else{
            console.log('mongoose connection failed')
    }
  });
  mongoose.set('debug', true);
}

// mongoose.connection.on('connected',function(){
//     console.log('mongoose connection successfull')
// })

// mongoose.connection.on('disconnected',function(){
//     console.log('mongoose connection failed')
// })