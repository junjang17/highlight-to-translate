// Function selects text from DOM
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

// By default, language code is english
var lang_code = "en"

// Create listener for change in language
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	lang_code = request.target_lang
  	
});

// Listener for highlighted text -- sends text to background to be translated
document.addEventListener("mouseup", function(){
	t = getSelectionText()
	if (t != ""){
		chrome.runtime.sendMessage({input: t, lang: lang_code}, 
			function(response) {
				alert(response.message)
			});
	}
});
