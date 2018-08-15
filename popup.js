let load_popup = function(){
	let api_key = //Insert YANDEX API KEY Here (https://translate.yandex.com/developers/keys)
	let ui = "en"
	let url = "https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=" +
			  api_key + "&ui=" + ui
	let http_request = new XMLHttpRequest();


	// Make Api call for available languages, load into the popup
	http_request.onreadystatechange = function() {
	   if (this.readyState === 4 && this.status === 200) {
	     	let response = JSON.parse(this.responseText);
	     
			let select = document.getElementById("target");
			for(index in response.langs) {
			    select.options[select.options.length] = 
			    new Option(response.langs[index], index);
			}
	   }
	 }

	http_request.open("POST", url, true);
	http_request.send();
};

load_popup();

document.getElementById("apply").addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	let dropdown = document.getElementById("target");
		let value = dropdown.options[dropdown.selectedIndex].value;
 		 chrome.tabs.sendMessage(tabs[0].id, {target_lang: value})
	});
});
