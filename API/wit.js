const axios = require('axios');

const sendMessage = async (message) => {
    try {
        const response = await axios.get(`https://api.wit.ai/message?v=20220422&q=${message}`, {
            headers: {
                Authorization: 'Bearer 5WOWFMQQCBBKZPAUXN2ZHCOZMPU7XLUL'
            }
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}


// console.log(sendMessage().then(res => console.log(res)).catch(err => console.log(err)));

module.exports = sendMessage;