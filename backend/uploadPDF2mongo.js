const poppler = require('pdf-poppler');
const path = require('path');


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
        })
        .catch(error => {
            console.error(error);
        });
    }catch(err){
        console.log(err);
    }
}

const main = (userId) => {
    convertPDF2jpg(userId)
}

module.exports = main;
