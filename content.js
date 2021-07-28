var currElement = null;
var payLoad = {};
initEventHandlers();

function initEventHandlers() {
  trackMouseOver();
  listenToClick();
  listenToPopUp();
}

function trackMouseOver() {
  document.addEventListener("mouseover", function (event) {
    currElement = event.target;
  });
}

function listenToClick() {
  document.addEventListener("click", function (event) {
    payLoad = {
      ...payLoad,
      fontFamily: window
        .getComputedStyle(currElement, null)
        .getPropertyValue("font-family"),
      fontSize: window
        .getComputedStyle(currElement, null)
        .getPropertyValue("font-size"),
      color: window
        .getComputedStyle(currElement, null)
        .getPropertyValue("color"),
      backgroundColor: window
        .getComputedStyle(currElement, null)
        .getPropertyValue("background-color"),
    };
  });
}

function listenToPopUp() {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.message === "handshake") sendResponse(payLoad);
  });
}
