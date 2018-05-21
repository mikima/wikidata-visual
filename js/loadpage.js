function loadPage(_id){
	var basedata = 

	$.getJSON("https://www.wikidata.org/wiki/Special:EntityData/Q" + _id + ".json", function(data) {

	var obj = data['entities'][('Q'+_id)];
	console.log(obj)

	var name = obj['labels']['en']['value']
	
	var description = obj['descriptions']['en']['value']
	console.log(description);
	//try to laod image
	


	if(obj['claims']['P18'] != null) {
		var imageName = obj['claims']['P18'][0]['mainsnak']['datavalue']['value'];
		$.getJSON("https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=File:" + imageName + "&iiprop=url&prop=imageinfo&callback=?", function(data) {
    		
			var imageURL = data['query']['pages'][Object.keys(data['query']['pages'])[0]]['imageinfo'][0]['url']
			console.log(imageURL)
			document.body.style.backgroundImage = "url('"+imageURL+"')";
    	});
	} else {
		console.log('no wikidata image')
		//try on enwiki
		if(obj['sitelinks']['enwiki']) {
			console.log(obj['sitelinks']['enwiki'])

			//get main image for the page
			var url = "https://en.wikipedia.org/w/api.php?&callback=?&action=query&piprop=original&prop=pageimages&format=json&titles="+obj['sitelinks']['enwiki']['title']
			console.log(encodeURI(url))
			$.getJSON(encodeURI(url), function(data) {
				console.log(data);
				var imageURL = data['query']['pages'][Object.keys(data['query']['pages'])[0]]['original']['source']
				console.log(imageURL)
				document.body.style.backgroundImage = "url('"+imageURL+"')";
	    	});

		}
	}

});
}

loadPage(57)