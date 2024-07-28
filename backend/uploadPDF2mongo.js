const poppler = require('pdf-poppler');
const path = require('path');
const ChatGPTapi = require('./ChatGPTapi');
const fs = require('fs');

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


const main = async (userId) => {
    await convertPDF2jpg(userId);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const Data = await ChatGPTapi(userId);
    console.log(Data);
}

module.exports = main;
