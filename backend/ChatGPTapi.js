require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const sendImageToChatGPT = async (imagePath, apiEndpoint, apiKey) => {
    try {

        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = imageBuffer.toString('base64');

        const data = {
            model: 'gpt-4o-mini',
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: [
                    {
                     type: "text",
                     text:                     `***Context***
                     You are my assistant. I will send a Text to you.
                     Text that i will send to you is come from Resume(JPG file).
                     You work is to compose and extract data from Text follow as my instruction.
                     ***Key information**
                     Then You have to response in JSON follow as this structure.
                     {
                         "Output":[
                             {
                                 "Firstname": "",
                                 "Lastname": "",
                                 "university": "",
                                 "Experience": "",
                                 "skill": "",
                                 "summary": "this field is summary of Resume Do not empty or null"
                             }
                         ]
                     }
                     ***Role of you***
                     1. If data cannot be found as my instruction then you can response null for that field.
                    `
                    },{
                        type: "image_url",
                        image_url: {
                            url: `data:image/jpeg;base64,${imageBase64}`
                        }
                    }
                ]
                }
            ]
        };

        const config = {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(apiEndpoint, data, config);

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}


const extractJSON = (input) => {
    const startIndex = input.indexOf('{');
    const endIndex = input.lastIndexOf('}') + 1;
    const jsonString = input.slice(startIndex, endIndex);
    return JSON.parse(jsonString);
}

const ChatGPTapi = async (userId) =>{

    const imagePath = `../frontend/public/Resume/${userId}-1.jpg`;
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    const { CHATGPT_KEY } = process.env;
    const apiKey = process.env.CHATGPT_KEY || CHATGPT_KEY;

    const StringData = await sendImageToChatGPT(imagePath, apiEndpoint, apiKey);
    const JsonData = await extractJSON(StringData);
    return JsonData;
}

module.exports = ChatGPTapi;

