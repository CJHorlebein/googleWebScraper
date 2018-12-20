var container = document.getElementById("main-container");
var baseURL = "https://plus.google.com/";
var data1 = [
  "117851667474088470845/posts/UTDEu4ZmsGg"
  // "100360270239060842263/posts/9ydyybbbmu6"
  //   "115220067777452261937/posts/VY6wYGdCu9n",
  //   "115220067777452261937/posts/3F4ua3HbDDP"
];
var stringStart = `<div class="m2bmxb" jsname="WsjYwc">`;
var stringEnd = `<div class="Qq9qDe">`;

var temp, start, end;
var HTML = [];

function validURL(str) {
  var regex = /https:(.*?)/;
  var res = regex.test(str);
  return res;
}

function stripHTML(string) {
  var tempString = string.split(`jsdata="`);
  var links = tempString.map(element => {
    var tempPos = element.indexOf(`"`);
    return element.slice(0, tempPos);
  });
  links = links
    .slice(0, -1)
    .join("")
    .split(";");

  var linkResponse = links.filter(validURL);

  string = string.replace(/<div(.*?)>/g, "\n<div>");
  // string = string.replace(/<a(.*?)>/g, "\n<div>");
  string = string.replace(/<li(.*?)>/g, "\n<li>");
  string = string.replace(/<span(.*?)>/g, "\n<span>");
  string = string.replace(/ class="(.*?)"/g, "");
  string = string.replace(/<c-data(.*?)c-data>/g, "");
  string = string.replace(/ style="(.*?)"/g, "");
  string = string.replace(/<svg(.*?)svg>/g, "");
  string = string.replace(/src="\/\/lh3/g, 'src="https://lh3');
  return string + `<h2>Possible Links from Post</h2><div>${linkResponse.join("<br />")}</div>`;
}

data.forEach(page => {
  let url = baseURL + page;
  axios.get(url).then(function(response) {
    temp = response.data;
    start = temp.indexOf(stringStart);
    end = temp.indexOf(stringEnd);
    var newPost = stripHTML(temp.slice(start, end));
    HTML.push(newPost);
    container.innerHTML += newPost;
  });
});
