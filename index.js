const express = require('express');
const AfricasTalking = require('africastalking');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Replace with your own API key and username
const credentials = {
  apiKey: '97092cda822d5ca895f4ae0b38cde71060628cd8248fd5ef995ca41761b5a98b',
  username: 'sandbox'
};

// Initialize the Africa's Talking SDK
const africastalking = AfricasTalking(credentials);
const airtime = africastalking.Airtime;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set up the home page
app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/send-airtime">
      <label for="phone-number">Enter phone number:</label>
      <input type="text" id="phone-number" name="phone-number" required>
      <br>
      <button type="submit">Send airtime</button>
    </form>
  `);
});

// Set up the /send-airtime route
app.post('/send-airtime', (req, res) => {
  const phoneNumber = req.body['phone-number'];
  const amount = 10;
  const currencyCode = 'KES';

  const options = {
    recipients: [{
      phoneNumber: phoneNumber,
      amount: amount,
      currencyCode: currencyCode
    }]
  };

  airtime.send(options)
    .then(response => {
      console.log(response);
      res.send('Airtime sent successfully!');
    })
    .catch(error => {
      console.log(error);
      res.send('An error occurred while sending airtime.');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});