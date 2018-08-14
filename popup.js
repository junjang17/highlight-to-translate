let load_popup = function(){
	let api_key = "trnsl.1.1.20180802T063445Z.6cdcc4943bd7745a." +
	  	          "8ea9ab1d0024d1ea6d2659b320ad8e3751ad8467"
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

let toggle = false;



load_popup();

document.getElementById("apply").addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	let dropdown = document.getElementById("target");
		let value = dropdown.options[dropdown.selectedIndex].value;
 		 chrome.tabs.sendMessage(tabs[0].id, {target_lang: value})
	});
});
