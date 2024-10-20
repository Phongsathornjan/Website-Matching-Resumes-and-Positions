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
                        "type": "text",
                        "text": `
                            ***Context***
                            You are my assistant. I will send base64 from a Resume (JPG file) to you. 
                            Your task is to extract Skill, Degree, and Work Experience from Resume following my instructions. 
                            I will use your response to match between Job requirements and user data, to recommend the most relevant job.
                        
                            ***Key information***
                            1. "Skill": (Get all types of skills like hard skills, soft skills, technical skills, and tools used in the job).
                                Example Data : [English, Python, Java, HTML/CSS, PHP, Typescript, Javascript, NodeJs(Express), React, dart(Flutter), MySQL, NoSQL(MongoDB, Firebase), Git, Postman, Power BI]
                            2. "Degree": (From those who are currently studying or who have recently graduated, I would like to answer with a degree and field of study).
                                (Example: Bachelor's degree in Computer Science)  
                                - Use this format: ".....'s degree in ......." for other. If none, use "-".
                            3. "Work Experience": (Experience in Position and how long for that position). 
                                - Only extract data that explicitly mentions a position and duration. Do not infer or make creative guesses about the position or the number of years.
                                - Use this format: "... year in {Position}" if a position is specified.
                                - If the experience mentions a Position (in the format: month/year - month/year), calculate the difference in months and convert it into years.
                                    (Example: (Jan 2024 - Mar 2024) = 3 months --> 0.25 years).
                                - If something is a **project** such as thesis, class, course, or anything that begins or ends with the word **project**, it is not counted as work experience. 
                                - If no position title is specified or if the job duration is unclear, return "-" in "Experience".
                                - If the position is ongoing (Example: (Jan 2024 - present)), use the current date to calculate.
                                - If no formal work experience is provided, return "-" for "Experience".
                                - If the work experience is in the same position, + the number of years can be increased. 
                                By converting to pivot first and then converting to years, such as Data Engineer (Jan 2023 - Dec 2023) = 12 Month = 1 Year 
                                and Data Engineer (Jan 2024 - May 2024) = 3 Month = 0.25 Year, so it will be 1.25 Year, wanting Response in this format (Example : 1.25 Year in Data Engineer)
                            - Combine all experiences into a single string for "Experience", all skills into a single string for "Skills", and all degrees into a single string for "Degree."
                            
                            ***Rules***
                            1. Only respond based on what you see in the document.
                            2. Do not infer or guess any information that is not explicitly mentioned.
                            3. Do not include any experience related to thesis, class, course, or anything that begins or ends with the word "project".
                            4. Format the response in JSON as follows:
                                {
                                    "Output": [
                                        {
                                            "Experience": "your Experience response here", 
                                            "Skill": "your Skill response here",
                                            "Degree": "your Degree response here"
                                        }
                                    ]
                                }
                            5. Respond only in English even if the input is in another language.
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
    console.log(JsonData);
    return JsonData;
}

module.exports = ChatGPTapi;

