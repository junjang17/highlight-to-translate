// Receives messages from content.js, translates the message, and sends it back
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	// set-up variables for api call to yandex
  	let target_lang = request.lang
  	let api_key = "trnsl.1.1.20180802T063445Z.6cdcc4943bd7745a." +
  	              "8ea9ab1d0024d1ea6d2659b320ad8e3751ad8467"
  	let request_text = request.input
  	let http_request = new XMLHttpRequest();
  	let url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + 
  	           api_key + "&text=" + request_text + "&lang=" + target_lang

  	// Listener for the http_request object, sends translation to content.js
  	http_request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        sendResponse({message: response.text});
      }
    }

    http_request.open("POST", url, true);
 	http_request.send();

 	return(true);

});

