const poppler = require('pdf-poppler');
const path = require('path');
const ChatGPTapi = require('./ChatGPTapi');
const fs = require('fs');
const Resume = require('./model/resume');

const convertPDF2jpg = async (userId) => {

    try{

    let file = '../frontend/public/Resume/Resume.pdf';
    let opts = {
        format: 'jpeg',
        out_dir: path.dirname(file),
        out_prefix: userId,
        page: null
    }

    poppler.convert(file, opts)
        .then(res => {

            console.log('Successfully converted');

            fs.unlink('../frontend/public/Resume/Resume.pdf', (err) => {
                if (err) {
                  console.error('Error occurred while trying to remove file:', err);
                } else {
                  console.log('File removed successfully!');
                }
              });
        })
        .catch(error => {
            console.error(error);
        });
    }catch(err){
        console.log(err);
    }
}

const uploadData2Mongo = async (userId,data) =>{
    try{
        const Validate = await Resume.findOneAndUpdate(
            { userId: userId },
            { $set: {
                Experience:  data.Output[0].Experience,
                Skill:       data.Output[0].Skill,
                Degree:      data.Output[0].Degree,
                
                userId:      userId,
            } },
            { new: true, upsert: true }
          );
    }catch(err){
        console.log(err);
    }
}


const main = async (userId) => {
    await convertPDF2jpg(userId);
    await new Promise(resolve => setTimeout(resolve, 4000));
    const Data = await ChatGPTapi(userId);
    if(Data.Output[0].Experience === '-' && Data.Output[0].Skill === "-" && Data.Output[0].Degree === "-"){
        try{
            const Validate = await Resume.findOneAndUpdate(
                { userId: userId },
                { $set: {
                    Experience:  "null",
                    Skill:       "null",
                    Degree:      "null",
                    
                    userId:      userId,
                } },
                { new: true, upsert: true }
              );
        }catch(err){
            console.log(err);
        }
        return res.status(400).json({ message: 'This file is not Resume'});
    }else{
        uploadData2Mongo(userId,Data);
    }
}

module.exports = main;
