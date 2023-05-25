const express = require('express');
const AfricasTalking = require('africastalking');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// Replace with your own API key and username
const credentials = {
  apiKey: 'b454272b3985c778116f94395bb16a13d47a7768555ec24ef665ff5ce8167816',
  username: 'teamofsix'
};

// Initialize the Africa's Talking SDK
const africastalking = AfricasTalking(credentials);

const airtime = africastalking.AIRTIME;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set up the home page
app.get('/', (req, res) => {
  res.send(`
  <form method="POST" action="/send-airtime" style="background-color: #f2f2f2; padding: 20px;">
  <label for="phone-number" style="color: #333;">Enter phone number:</label>
  <input type="text" id="phone-number" name="phone-number" required style="background-color: #fff; border: 1px solid #ccc; padding: 5px; margin: 5px 0;">
  <br>
  <button type="submit" style="background-color: #4CAF50; color: #fff; border: none; padding: 10px 20px; margin-top: 10px; cursor: pointer;">Send airtime</button>
</form>
  `);
});

// Set up the /send-airtime route
app.post('/send-airtime', (req, res) => {
  const phoneNumber = req.body['phone-number'];
  const amount = 5;
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
