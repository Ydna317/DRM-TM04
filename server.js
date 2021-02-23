// Dependencies
const { json } = require('body-parser');
const express = require('express');
//const path = require('path');
// Sets up the Express App
const app = express();
const PORT = 3000;
const NUM_OF_TABLES = 5;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// class Customer {
//   // Just like constructor functions, classes can accept arguments
//   constructor(newName, newPhone, newEmail, newId) {
//     this.name = newName;
//     this.phone = newPhone;
//     this.email = newEmail;
//     this.id = newId;
//   }
//   printInfo() {
//     //console.log(JSON.stringify(this));
//     console.log(`Name: ${this.name}`);
//     console.log(`Phone: ${this.phone}`);
//     console.log(`Email: ${this.email}`);
//     console.log(`Id: ${this.id}`);
//   }
// }
var reservationList = [];
var waitingList = [];
function addCustomer(newCustomer) {
  let result = false;
  if (reservationList.length < NUM_OF_TABLES) {
    reservationList.push(newCustomer);
    result = true;
  } else {
    waitingList.push(newCustomer);
  }
  console.log('Tables:');
  console.log(JSON.stringify(reservationList));
  console.log('Waiting List:');
  console.log(JSON.stringify(waitingList));
//   for (let customer of reservationList) {
//     //reservation.printInfo();
//     console.log(JSON.stringify(customer));
//   }
//   console.log('Waiting List:');
//   for (let customer of waitingList) {
//     //customer.printInfo();
//     console.log(JSON.stringify(customer));
//  }
  return result;
}
// Routes
app.get('/api/tables', (req, res) => res.json(reservationList));
app.get('/api/waitlist', (req, res) => res.json(waitingList));
// Create New Reservations - takes in JSON input
app.post('/api/newcustomer', (req, res) => {
  const newCustomer = req.body;
  const result = addCustomer(newCustomer);
  res.json(result);
});
// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

// DEPENDENCIES
// We need to include the path package to get the correct file path for our html

const path = require('path');

// ROUTING

module.exports = (app) => {
  // => HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content 
  app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname, 'reserve.html'));
  });

  // If no matching route is found default to home
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
  });
};