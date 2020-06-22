
// const SmeeClient = require('smee-client')

// const smee = new SmeeClient({
//   source: 'https://smee.io/abc123',
//   target: 'http://localhost:3000/events',
//   logger: console
// })

// const events = smee.start()

// // Stop forwarding events
// events.close()

// post '/incoming_from_intercom' do
//   request.body.rewind
//   intercom_params = JSON.parse(request.body.read)

//   # Extract the new message, and convert it to plaintext
//   last_message_html = intercom_params['data']['item']['conversation_parts']['conversation_parts'][-1]['body']
//   last_message = Nokogiri::HTML(last_message_html).text

//   # Load the user who we will SMS
//   user = INTERCOM.users.find(id: intercom_params['data']['item']['user']['id'])

//   # Send the response to Twilio
//   unless last_message.strip.empty?
//     TWILIO.messages.create(
//       from: ENV['TWILIO_NUMBER'],
//       to: user.user_id,
//       body: last_message
//     )
//   end
//   "ok"
// end
