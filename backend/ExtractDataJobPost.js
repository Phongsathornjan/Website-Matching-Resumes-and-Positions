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
                        1. "Skill": (Get all types of skills by Highlight on hard skills, technical skills, and tools used in the job in "JobDescription" , "Qualifications / Requirement" ,"Experience").
                            Put in skill without these words: knowledge of , Understanding of , Familiarity with , Experinece in , Experinece with , Strong in . 
                            Example Data : [English, Python, Java, HTML/CSS, PHP, Typescript, Javascript, NodeJs(Express), React, dart(Flutter), MySQL, NoSQL(MongoDB, Firebase), Git, Postman, Power BI]
                        2. "Degree": (Get all types of Degree From those who are currently studying or who have recently graduated, I would like to answer with a degree and field of study).
                            (Example: Bachelor's degree in Computer Science , Computer Engineer)
                            - Use this format: ".....'s degree in ......." and another if have. If none, use "-".  
                        3. "keyExperience": (Experience in Position and how long need for that position) 
                            - Only extract data that explicitly mentions a position and duration. Do not infer or make creative guesses about the position or the number of years.
                            - Use this format: "... year in {Position}".
                            - If no work experience is required, new graduates are welcome, or those with no experience are welcome, return "-" for "experience".
                            - if it be ..... years of experience in position Use this format: "... year in {Position}" from "keyExperience"
                            Put in keyExperience without these words: Junior , Senior. if has.                            
                            - if it be ..... years of experience in Skill , Tool , program. Use this format: "... year in {Position}" by use Position from Position input from post.
                            Put in keyExperience without these words: Junior , Senior. if has.
                            - if experinece is newly Graduated or has related experience ...... years. you can return "-" for "experience".
                            - If the experience is a range, such as "1-3 years in {Position}", answer with the lowest number, which will be "1 years in {Position}". 
                            But if there is also 0 year, the answer will be "-". For example, for 0-3 years in {Position}, answer as "-".
                            
                            - Combine all experiences into a single string for "Experience", all skills into a single string for "Skills", and all degrees into a single string for "Degree."
                        ***Role of you***
                        1. If data cannot be found as my instruction then you can response empty string for that field.
                        2. Do not infer or guess any information that is not explicitly mentioned.
                        3. You have to response in JSON follow as this structure.
                            {
                                "Output":[
                                    {
                                        "keyExperience": "your experience response here ", 
                                        "Skill": "your skill response here ",
                                        "Degree": "your degree response here "
                                    }
                                ]
                            }

                        4. Only respond in English, even if the input is in another language.
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

