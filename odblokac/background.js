chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if(message.method == "getToken"){
    chrome.storage.local.get('birdztoken',function(items){
      sendResponse(items.birdztoken);
      
    });
  }
return true;
});