import axios from 'axios'

export async function generateBase64(prompt, size) {
    try{
        prompt = prompt.substring(0, 500);

        const token = 'Bearer ' + process.env.OPENAI_API
    
        const data = { 
            prompt: prompt,
            n: 1,
            size: size,
            response_format: "b64_json"
        }
        const res = await axios.post("https://api.openai.com/v1/images/generations", data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        // console.log(res.status);

        if (res.status == 200) {
            return res.data['data'][0]['b64_json'];
        }
        return null;
        
    } catch (err) {
        console.log(err);
        return null;
    }
}