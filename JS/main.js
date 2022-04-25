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
        success: function (data) {
            console.log(data)
            if (data.intents[0].confidence > 0.8) {
                // appendMessage(`Bot: ${JSON.stringify(data, null, 2)}`)
                appendMessage(`Bot: ${handleMention(data)}`)
            } else {
                appendMessage(`Bot: I'm sorry, can you rephrase that?`)
            }
        },
        error: function (data) {
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

const handleMention = (data) => {
    let text = 'Hey!';
    const entities = data.entities;

    const { intent, customerName, reservationDateTime, numberOfGuests } = entities;

    if (!intent || intent !== 'reservation' || !customerName || !reservationDateTime || !numberOfGuests) {
        text = 'Sorry - could you rephrase that and include details?';
        console.log(entities);
    } else {
        text = 'The table was successfully reserved!'
        //TODO: rework in here the reservationService to check and return the right text and perform necessary edits to db
    }

    return text;

}

