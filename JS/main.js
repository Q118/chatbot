const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const witService = async (mem) => {
    //send message to server
    console.log(`about to send ${mem}`)
    $.ajax({
        url: '/send',
        type: 'GET',
        data: {
            message: mem
        },
        success: async (data) => {

            if (data.intents[0].confidence > 0.8) {
                const botRes = await handleMention(data);
                appendMessage(`Bot: ${botRes}`)
            } else {
                appendMessage(`Bot: I'm sorry, can you rephrase that?`)
            }
        },
        error: (data) => {
            console.log(data)
        }
    })
}

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const message = messageInput.value //grabs our message
    appendMessage(`You: ${message}`)
    await witService(message)
    messageInput.value = ''
})

const appendMessage = (message) => {
    const messageElement = document.createElement('div')
    if (message.includes('You')) {
        messageElement.style.color = 'blue'
    } else {
        messageElement.style.color = 'red'
    }
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

const handleMention = async (data) => {
    let text = 'Hey!';
    const entities = data.entities;
    const intents = data.intents;

    const customerName = entities['wit$contact:contact'][0].value;
    const reservationDateTime = entities['wit$datetime:reservationDateTime'][0].value;
    const numberOfGuests = entities['wit$number:numberOfGuests'][0].value;


    for (let i = 0; i < intents.length; i++) {
        if (intents[i].name !== 'reservation' || !customerName || !reservationDateTime || !numberOfGuests) {
            text = 'Sorry - could you rephrase that and include details?';
            console.log(entities) //debug
        } else {
            text = 'The table was successfully reserved!'
            //TODO: rework in here the reservationService to check and return the right text and perform necessary edits to db(i.e. tables full or not)
        }
    }
    return text;
}

