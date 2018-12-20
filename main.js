function validURL(str) {
  // uses Regex to check if argument is a valid URL
  var regex = /https:(.*?)/;
  return regex.test(str);
}

function stripHTML(string) {
  // Uses Regex to remove extra HTML tags and stylings auto added by google
  string = string.replace(/<div(.*?)>/g, "\n<div>");
  string = string.replace(/<li(.*?)>/g, "\n<li>");
  string = string.replace(/<span(.*?)>/g, "\n<span>");
  string = string.replace(/ class="(.*?)"/g, "");
  string = string.replace(/<c-data(.*?)c-data>/g, "");
  string = string.replace(/ style="(.*?)"/g, "");
  string = string.replace(/<svg(.*?)svg>/g, "");
  string = string.replace(/src="\/\/lh3/g, 'src="https://lh3');
  return string;
}

function missingLinks(string) {
  // Checks for missing links/URLs in HTML tags we remove
  var tempArray = string.split(`jsdata="`); // Tag URLs are placed under
  var links = tempArray.map(element => {
    // Removes excess text after end of potential URL
    var tempPos = element.indexOf(`"`);
    return element.slice(0, tempPos);
  });
  linkResponse = links // Checks each item if valid URL
    .join("")
    .split(";")
    .filter(validURL)
    .join("<br />");

  return `<h2>Possible Links from Post</h2><div>${linkResponse}</div>`;
}

var container = document.getElementById("main-container");

// Example data URL
// https://plus.google.com/u/0/102289168070925023224/posts/1SLdHaEQRox
var dataTest = [
  // "102289168070925023224/posts/1SLdHaEQRox",
  // "117851667474088470845/posts/UTDEu4ZmsGg",
  // "100360270239060842263/posts/9ydyybbbmu6",
  // "115220067777452261937/posts/VY6wYGdCu9n",
  "115220067777452261937/posts/3F4ua3HbDDP"
];

// To run script on your page, simply replace dataTest
// With an array of all post ID's similiar to the above data.
dataTest.forEach(page => {
  // Iterates through each post ID and pulls the HTML for that post and adds it to body of page
  let url = `https://plus.google.com/${page}`;
  axios.get(url).then(function(response) {
    // Isolates the individual post from the entire page HTML
    let postStart = response.data.indexOf(`<div class="m2bmxb" jsname="WsjYwc">`); // Start of post
    let postEnd = response.data.indexOf(`<div class="Qq9qDe">`); // End of post
    let htmlResponse = response.data.slice(postStart, postEnd);
    let newPost = stripHTML(htmlResponse); // Plain HTML of Post
    let postLinks = missingLinks(htmlResponse); // Possible removed links
    container.innerHTML += `<div>${newPost + postLinks}</div>`;
  });
});
