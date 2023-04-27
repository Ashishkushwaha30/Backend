const multer=require("multer");
const express = require('express');
const router = express.Router();
const File=require('../models/Files');
const path = require('path');


const storage=multer.diskStorage({
  destination:'./pdf',
  filename:(req,file,cb)=>{
      return cb(null,`${file.originalname}`)
  },
});

const upload=multer({
  storage:storage,
})

router.post('/upload', upload.single('file'), async (req, res) => {

  const { originalname, buffer} = req.file;
  const extension = path.extname(originalname);

  if (extension !== '.pdf') {
    return res.status(400).send('Only PDF files are allowed');
  }

  const file = new File({
    _id:req.body.id,
    name: originalname,
    link:`http://localhost:5000/api/pdf/${originalname}`,
    chapter:req.body.chapter,
    time:req.body.time,
    Bstyle:req.body.Bstyle,
    title:req.body.title,
    desc:req.body.desc
    
  });

  await file.save();

  res.send('PDF uploaded successfully');
});


router.get('/', async (req, res) => {
    //const _id = req.params.id;
  
    try {
      
      const pdfs = await File.find({}, '_id name link chapter time Bstyle title desc');
      //const pdfsName = await File.find({}, 'name');
      const count = await File.countDocuments();
  
      if (!pdfs) {
        return res.status(404).send('PDF not found');
      }
      
      // res.setHeader('Content-Type', 'application/pdf');
      res.send({count,pdfs});

    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
module.exports=router;