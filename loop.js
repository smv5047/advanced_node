//node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
  //node does 3 checks
  //Check 1: any pending setTimeout, setInterval, setImmediate
  //Check 2: Any pending OS task like server listening to some port
  //Check 3: Any long running programs such as a function call within FS module (to read off HD)
  //if any of 3 arrays of these checkes, shouldContinue() will return false
  return (
    pendingTimess.length || pendingOSTasks.length || pendingOperations.length
  );
}

//Entire body executes in one 'tick'
//keeps executing until shouldContinue() returns falsy
while (shouldContinue()) {
  //1)Node Looks at pendingTimers and sees if any functions are ready to be called. setTimerout, setInterval
  //2) Node looks at pending OSTaks and pendingOperations
  //3) Pause execution. Continue when..
  // a new pendingOSTask is done
  // - a new pendingOperation is done
  //-a timer is about to complete
  // 4) Look at pendingTimers - Call any setImmediate
  // 5) Handle any 'close' events
}

//exit back to terminal
