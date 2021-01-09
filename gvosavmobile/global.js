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