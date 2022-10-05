writeHeaderFooter();

function writeHeaderFooter() {
   fetch("assets/header.html")
      .then( res => res.text())
      .then( text => document.getElementById("myheader").innerHTML = text);

   fetch("assets/footer.html")
      .then( res => res.text())
      .then( text => document.getElementById("myfooter").innerHTML = text);
}