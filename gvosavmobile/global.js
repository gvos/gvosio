import React from 'react';

/*  global.js is a js file containing all the global variables.
*   namely, receive, send and balance.
*/

/*  receive is a global variable and will be used to store the information
*   when when sending the image.
*   sender is the person sending the image.
*   message is a string which contains the location of image
*   paid is an integer variable which can take values -1, 0 or 1.
*   paid = -1 => the receiver has an image in his inbox, but he hasn't paid to view the image.
*   paid = 0 => the receiver has no image in his inbox.
*   paid = 1 => the receiver has an image in his inbox and has already paid for it. Hence, he can view the image.
*/

let receive = {
  "bob@gvos.io": {
    "sender": "",
    "message": "",
    "paid": 0,
  },
  "alice@gvos.io": {
    "sender": "",
    "message": "",
    "paid": 0,
  }
};

/*  Initially, send variable was supposed to store the count of messages sent by a user.
*   but, never needed this function. Might use it in the future.
*/
let send = {
  "bob@gvos.io": 0,
  "alice@gvos.io": 0
};

/*  balance is a variable which store the balance of every user.
*   It will be updated in the ReceiverScreen.js file.
*/

let balance = {
  "bob@gvos.io": 1000,
  "alice@gvos.io": 1000
};

global.SEND = send;
global.RECEIVE = receive;
global.BALANCE = balance;