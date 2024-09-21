require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const connectToChatGPT = async (Job_Description,apiEndpoint, apiKey) => {
    try {
        const data = {
            model: 'gpt-4o-mini',
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: [
                    {
                     type: "text",
                     text:                     `
                        ***Context***
                        You are my assistant. I will send a Job Description to you.
                        Your task is to compose and extract keywords and required experience from the Job Post following my instructions.
                        I will use your response to match between Job requirements and user Data. to Recommend Most relevant job.
                        ***Key information***
                        "keyword": (Field of skill like hard skill and soft skill)
                        "Experience": (Highlight the Skill, Position, and How long for that position) 
                        ***Role of you***
                        1. If data cannot be found as my instruction then you can response empty string for that field.
                        2. You have to response in JSON follow as this structure.
                            {
                                "Output":[
                                    {
                                        "Experience": "your combined Experience response here (max 300 characters)", 
                                        "keyword": "your combined keyword response here (max 300 characters)"
                                    }
                                ]
                            }
                        3. Combine all experiences into a single string for "Experience" and all keywords into a single string for "keyword." 
                        Separate different experiences or keywords using commas.
                        4.Ensure the response for "Experience" is no longer than 300 characters and "keyword" no longer than 300 characters. 
                        If it exceeds the limit, summarize or shorten the content.
                        5.Only Response in english even an input is thai.
                    `
                    },{
                        type: "text",
                        text: `This is a Job_Description :
                        Position: ${Job_Description.Position}
                        Requirements ${Job_Description.Requirements}
                        Qualifications ${Job_Description.Qualifications}
                        Experience ${Job_Description.Experience}
                        `
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

const ExtractDataJobPost = async (Job_Description) =>{

    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    const { CHATGPT_KEY } = process.env;
    const apiKey = process.env.CHATGPT_KEY || CHATGPT_KEY;

    const StringData = await connectToChatGPT(Job_Description,apiEndpoint, apiKey);
    const JsonData = await extractJSON(StringData);
    console.log(JsonData);
    return JsonData;
}

module.exports = ExtractDataJobPost;

