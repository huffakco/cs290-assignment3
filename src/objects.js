/**
* Create an object literal with the following key value pairs:
* type: {string} 'Goldfish'
* brand: {string} 'Pepperidge Farm'
* flavor: {string} 'Cheddar'
* count: {number} 2000
* It should be returned directly by the following function
* @return {object} - the object literal
*/

function returnObjectLiteral() {
  //your code here
  return ({type: 'Goldfish',
           brand: 'Pepperidge Farm',
           flavor: 'Cheddar',
           count: 2000}); //Modify ONLY this line
  //end your code
}

/**
* Create a constructor function for a `MessageLog` object.
* @constructor
* @param {string} user - The user associated to the message log
* The string indicating the user should be stored in the user property of the
* object instances.
*
* In addition, the following methods should be
* callable on a MessageLog object:
* logMessage( {string} messageText, {number} direction) - This should log a
* message
* as either being sent or received. A direction of 0 indicates it is a message
* the user sent. A direction of 1 indicates it is a message the user received.
* Behavior for other numbers is undefined.
* getSentMessage({number} n) - returns as a string, the content of the nth most
* recently sent message. To conserve memory, the object should only keep the
* last 5 message. n=0 retrieves the most recent n=4 retrieves the least recent
* of the 5.
* totalSent() - returns an integer indicating the total number of messages sent
* totalReceived() - returns an integer indicating the total number of messages
* received
*/

//your code here
function MessageLog(user) {
  this.user = user;
  this.countSent = 0;
  this.countRcvd = 0;
  this.sentLog = new Array(5);
  this.rcvdLog = new Array(5);

  this.calculateCurrOpen = function(currCount)
  {
     var ii = (currCount) % 5;
     return (ii);
  };

  this.logMessage = function(messageText, direction) {
    /* only track valid directions */
    if (direction >= 0 && direction <= 1)
    {
      /* increment counters for directions */
      if (direction !== 1)
      {
        this.sentLog[this.calculateCurrOpen(this.countSent)] = messageText;
        this.countSent++;
      }
      else
      {
        this.rcvdLog[this.calculateCurrOpen(this.countRcvd)] = messageText;
        this.countRcvd++;
        systemLog.totalCountRcvd(1);
      }
    }
    else
    {
      /* what to do if bad direction? */
      /* Decision: Nothing logged */
    }
    return;
  };

  this.getSentMessage = function(n) {
    if (n >= 0 && n < 5)
    {
      if (this.countSent >= 5)
      {
        return ('' +
              this.sentLog[this.calculateCurrOpen(this.countSent - 1 - n)]);
      }
      else
      {
        return ('' + this.sentLog[this.calculateCurrOpen(n)]);
      }
    }
    else
    {
      return ('SOMETHING WENT TERRIBLY WRONG, MESSAGE NO LONGER IN THE LOG!');
    }
  };

  this.totalSent = function() {
    return (this.countSent);
  };

  this.totalReceived = function() {
    return (this.countRcvd);
  };
}
//end your code

/**
* Add a method to the MessageLog prototype:
* lastReceivedMessage() - returns the message text of the last message the user
* received.
*/
//your code here
  MessageLog.prototype.lastReceivedMessage = function() {
      return ('' + this.rcvdLog[this.calculateCurrOpen(this.countRcvd - 1)]);
   };

/*** Add a method to the MessageLog prototype called systemReceived().
* This method should return the total number of messages received for all
* instances of message logs. So if you have logs A and B, A has received
* 3 messages, B has received 8. systemReceived() should return 11. You
* may need to do more than simply add a method to make this functionality
* work. **/
  /* Define an object to hold the counter for total messages received */
  function SystemLog() {
    this.rcvdCounter = 0;
    this.totalCountRcvd = function (num) {
      this.rcvdCounter += num;
      return (this.rcvdCounter);
    }
  }

  /* Make an instance of that object */
  systemLog = new SystemLog();
  
  /* add method to MessageLog prototype to get total messages received */
  MessageLog.prototype.systemReceived = function() {
    return (systemLog.totalCountRcvd(0));
  };

//end your code

/**
* Create an instance of a `MessageLog` for the user "BlackHatGuy". Have the
* instance receive 3 messages: "foo", "bar" and "baz", received in that order.
* Assign it to the variable myLog.
*/

//your code here
  myLog = new MessageLog('BlackHatGuy');
  myLog.logMessage('foo', 1);
  myLog.logMessage('bar', 1);
  myLog.logMessage('baz', 1);
//end your code
