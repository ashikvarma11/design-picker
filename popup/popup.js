var font_fam = document.getElementById("font_fam");
var font_col = document.getElementById("font_col");
var font_size = document.getElementById("font_size");
var bg_col = document.getElementById("bg_col");
var snackbar = document.getElementById("snackbar");

initiateHandshake();
listenToClick();

function applyValuesToView(response) {
  let message = response;
  if (message != undefined) {
    if (message["color"]) font_col.innerHTML = message["color"];
    if (message["backgroundColor"])
      bg_col.innerHTML = message["backgroundColor"];
    if (message["fontSize"]) font_size.innerHTML = message["fontSize"];
    if (message["fontFamily"]) font_fam.innerHTML = message["fontFamily"];
  }
}


function initiateHandshake() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { message: "handshake" },applyValuesToView);
  });
}

function listenToClick() {
  font_fam.addEventListener("click", copyDesign);
  font_col.addEventListener("click", copyDesign);
  font_size.addEventListener("click", copyDesign);
  bg_col.addEventListener("click", copyDesign);
}

function copyDesign(event) {
  var tempInput = document.createElement("input");
  tempInput.value = event.target.innerText;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  toggleSnackBar();
}

function toggleSnackBar() {
  snackbar.style.display = "block";
  setTimeout(() => {
    snackbar.style.display = "none";
  }, 3000);
}
