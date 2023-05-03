const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema({
    _id:String,
    name: String,
    link: String,
    chapter:String,
    time:String,
    Bstyle:String,
    title:String,
    desc:String
  });

  const File= mongoose.model('file', FileSchema);
  module.exports=File;