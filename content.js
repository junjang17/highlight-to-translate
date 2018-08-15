// Load Jquery
var script = document.createElement("script");
script.src = "jquery-3.3.1.min.js"

// Create popup element to load with text, add to bottom of body
var translate_popup = document.createElement("span");
translate_popup.className = "popup-tag";
document.body.appendChild(translate_popup);

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
var lang_code = "en";

// Create listener for change in language
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	lang_code = request.target_lang
});

// Listener for highlighted text -- sends text to background to be translated
document.addEventListener("mouseup", function(event){
	t = getSelectionText();
    if (t == ""){
        $("span.popup-tag").css("display","none");
    }

	chrome.runtime.sendMessage({input: t, lang: lang_code}, function(response) {
        selection = response.message
        if(selection != ''){
            $("span.popup-tag").css("display","block");
            $("span.popup-tag").css("top",event.pageY);
            $("span.popup-tag").css("left",event.pageX);
            $("span.popup-tag").text(selection);
        }

	});

});
