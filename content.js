// Load Jquery
var script = document.createElement("script");
script.src = "jquery-3.3.1.min.js"

// Create popup element to load with text, add to bottom of body
var translate_popup = document.createElement("div");
translate_popup.className = "popup-tag";
document.body.appendChild(translate_popup);

// Add sponsor text to results
var sponsor = document.createElement("a");
sponsor.href = "http://translate.yandex.com/";
var sponsor_txt = document.createTextNode("Powered by Yandex.Translate");
sponsor.appendChild(sponsor_txt);



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
        $("div.popup-tag").css("display","none");
    }

	chrome.runtime.sendMessage({input: t, lang: lang_code}, function(response) {
        selection = response.message
        if(selection != ''){
            $("div.popup-tag").css("display","block");
            $("div.popup-tag").css("top",event.pageY);
            $("div.popup-tag").css("left",event.pageX);
            $("div.popup-tag").text(selection);
        }

	});

});
