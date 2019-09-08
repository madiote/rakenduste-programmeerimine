const x = window.location;
console.log(x);
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title");
const cost = urlParams.get("cost");
const src = urlParams.get("src");
console.log(title, cost, src);
alert(`${title}\n${cost}€\n${src}`)