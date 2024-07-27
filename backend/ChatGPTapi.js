require('dotenv').config();
const fs = require('fs');
const pdfParse = require('pdf-parse');
const axios = require('axios');

// ฟังก์ชันสำหรับการอ่านไฟล์ PDF และแปลงเป็นข้อความ
const readPdf = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        console.log(data);
        return data.text;
    } catch (err) {
        console.error('Error reading PDF:', err);
        return null;
    }
};

async function analyzeTextWithChatGPT(text) {
    const { CHATGPT_KEY } = process.env;
    const Key = process.env.CHATGPT_KEY || CHATGPT_KEY;
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await axios.post(
            endpoint,
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: `
                            ***Context***
                            You are my assistant. I will send a Text to you.
                            Text that i will send to you is come from Resume(PDF file). I use fs and pdfParse library to read a Resume so my text has a strange structure and seems disjointed.
                            You work is to compose and extract data from Text follow as my instruction.
                            ***Key information**
                            The text is " ${text} ".
                            Then You have to response in JSON follow as this structure.
                            {
                            "Output":[
                                {
                                "Firstname": "",
                                "Lastname": "",
                                "university": "",
                                "Experience": "",
                                "skill": "",
                                "summary": "",
                                }
                            ]
                            }
                            ***Role of you***
                            1. If data cannot be found as my instruction then you can response null for that field.
                            2. your message response have to be a JSON structure Only!. Do not push any Word in your response because I have to use JSON.parse with your message response.
                            `}
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${Key}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (err) {
        console.error('Error calling ChatGPT API:', err);
    }
}

const ChatGPTapi = async () => {
    const text = await readPdf('../frontend/public/Resume/Resume.pdf');

    try{
        if (text) {
            const analysis = await analyzeTextWithChatGPT(text);
            const output = await JSON.parse(analysis);
            return output;
        } else {
            console.log('can not read PDF');
            return null;
        }
    }catch(err){
        console.log('Internal server error',err);
        return 'NOT_JSON';
    }
};

module.exports = ChatGPTapi;
