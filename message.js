var classObjArray;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //Incoming message from event.js
    if (request.classArray != null) {
      //Store array of classes in variable and create popup
      classObjArray = request.classArray;
      chrome.tabs.create({url: 'popup.html', index: 0});
    //Incoming message from content.js
    } else {
      //Send array of classes to content.js
      sendResponse({array: classObjArray});
    }
  });