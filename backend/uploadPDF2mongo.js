const poppler = require('pdf-poppler');
const path = require('path');
const ChatGPTapi = require('./ChatGPTapi');
const fs = require('fs');
const Resume = require('./model/resume');
const { validate } = require('./model/user');

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
                university:  data.Output[0].university,
                Experience:  data.Output[0].Experience,
                skill:       data.Output[0].skill,
                summary:     data.Output[0].summary,
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    const Data = await ChatGPTapi(userId);
    uploadData2Mongo(userId,Data);
}

module.exports = main;
