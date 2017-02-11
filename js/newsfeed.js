
//function to send a GET request asynchronously
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText); // if successful call the anonymous function with the response returned as a parameter
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

//process the url and return the domain name + tld
function extractDomain(url)
{
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];
    return domain;
}

//function to calculate the time difference between the date passed as a parameter and current time. 
function timeSince(date) {
	var postDate = new Date(date);
	var currentDate = new Date();

	var seconds = Math.floor((currentDate - postDate) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

(function(window){
	var json_obj;
	var url = "data/hackernews.json";
	httpGetAsync(url, function(result)
	{
		json_obj = JSON.parse(result);
		for(var i = 1; i < 100; ++i)
		{
			localStorage.setItem(i, JSON.stringify(json_obj[i])); //save data into local storage
			var post = JSON.parse(localStorage.getItem(i)); //get data from local storage
		    var parentContainer = document.getElementById("#article-container");
		 	var article = document.createElement("div");
		    article.className = "article";
		    article.innerHTML = "<a href = " + post.url + " target=_blank" + ">" + post.title + "</a>" + "<h5>" + " (" + extractDomain(post.url) + ") " + "" + "</h5>" + "<h6>" + post.num_points + " points" + " by " + post.author + " " + timeSince(post.created_at) + " ago" + " | hide | " + post.num_comments + " comments" + "</h6>" + "<br />"; //retrieve the required parts from the object
		    parentContainer.appendChild(article);
		}
	});
})();