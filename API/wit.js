const axios = require('axios');



const sendMessage = async (message, token) => {
    try {
        const response = await axios.get(`https://api.wit.ai/message?v=20220422&q=${message}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = sendMessage;