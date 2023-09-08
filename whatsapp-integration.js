<script>
function handleCTAClick(event, link) {
  event.preventDefault();
  openPopUpFirst(link);
}
function openPopUpFirst(link) {
  if (localStorage.getItem("customDialogBoxLocalStringVar") == "true") {
    window.open(link, "_blank");
    return;
  } else {
    redirectLink = link;
    appear();
  }
}
function handleCTAConversion(ctaElement, link) {
  ctaElement.addEventListener("click", function (event) {
    handleCTAClick(event, link);
  });
}
function callHubspotApi(mob) {
  var schoolBoard = document
    .getElementById("data-attribute-board")
    .getAttribute("data-attribute");
  var schoolClass = document
    .getElementById("data-attribute-class")
    .getAttribute("data-attribute");
  var latestSubject = document
    .getElementById("data-attribute-subject")
    .getAttribute("data-attribute");
  var typeOfContent = document
    .getElementById("data-attribute-type-of-content")
    .getAttribute("data-attribute");
  var subscribed = document.getElementById("subscribeCheckbox").checked;
 
  const hubspot = {
    properties: {
      mobilephone: Number("91" + mob),
      school_board: schoolBoard,
      new_class_form: schoolClass,
      new_submitted_subject__latest___cloned_: latestSubject,
      offline_or_online_teacher: "Whatsapp OTP - Students",
      subscribed_for_premium_pdfs: subscribed ? "True" : "False",
      type_of_content: typeOfContent,
    },
  };
  fetch("https://preprod-api.tbplabs.tech/services/contactHubspotAPICall", {
    method: "POST",
    headers: {
      Authorization: "Bearer pat-na1-b140e0a8-b7f2-4516-a535-518dc42de49b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hubspot),
  }).then((res) => {
    console.log(res);
  });
}
function appear() {
  let pop_up_on = getElement("main-modal");
  pop_up_on.style.display = "block";
}
function closePopUp() {
  whatsAppNumber.value = "";
  getElement("number").disabled = false;
  for (let i = 0; i < otpArray.length; i++) {
    otpArray[i].value = "";
    otpArray[i].style.borderStyle = "none";
    otpArray[i].disabled = true;
  }
  downloadBtn.disabled = true;
  downloadBtn.style.opacity = ".3";
  if (otp_sent_status == true) {
    getElement("otp-message").style.display = "none";
    getElement("input-area").style.opacity = "1";
    sendOtpDiv.style.opacity = "1";
  }
  let pop_up_on = getElement("main-modal");
  pop_up_on.style.display = "none";
}
function check() {
  otp_sent_status = true;
  getElement("input-area").addEventListener("click", function () {
    otp = ranNum();
    getElement("incorrect_message").style.display = "none";
    getElement("number").disabled = false;
    for (let i = 0; i < otpArray.length; i++) {
      otpArray[i].value = "";
      otpArray[i].style.borderStyle = "none";
      otpArray[i].disabled = true;
    }
    downloadBtn.disabled = true;
    downloadBtn.style.opacity = ".3";
    if (otp_sent_status == true) {
      getElement("otp-message").style.display = "none";
      getElement("input-area").style.opacity = "1";
      sendOtpDiv.style.opacity = "1";
    }
  });
  let num = getElement("number").value;
  if (num.length == 10) {
    otpMessage.style.display = "block";
    inputArea.style.opacity = ".3";
    for (let i = 0; i < otpArray.length; i++) {
      otpArray[i].style.border = "solid";
      otpArray[i].disabled = false;
    }
    downloadBtn.style.opacity = 1;
    sendOtpDiv.style.opacity = ".3";
    whatsAppNumber.disabled = true;
    document.getElementsByClassName("send-btn").disabled = true;
    whatsAppNumber.disabled = true;
    num = "91" + num;
  } else {
    alert("enter valid number");
  }
}
const ranNum = () => Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
function refreshPage() {
  location.reload();
}
function changeField(first, last) {
  if (last == "download-btn") {
    getElement("download-btn").style.opacity = 1;
    getElement("download-btn").disabled = false;
  }
  if (first.value.length) {
    getElement(last).focus();
  }
}
function phoneNumberCheck() {
  let num = getElement("number").value;
  for (let i = 0; i < num.length; i++) {
    console.log(num[i]);
  }
}
function sendWhatsappOtp(mob, otp) {
  fetch(
    "https://preprod-api.tbplabs.tech/chatapp/webhook/SendMessageToCustomer",
    {
      method: "POST",
      headers: {
        Authorization: "Token 6b1b478df28acd2850e363d733d5931217aa7841",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "SendMessageToCustomer",
        data: {
          userId: 275,
          appAccountId: 13,
          phoneNumber: mob,
          templateId: "doEsImSFMZDYf7SYAn6AWT",
          variables: [otp],
          headerMediaType: "TEXT",
          headerMediaURL: "",
          headerText: "",
          isPortal: true,
        },
      }),
      redirect: "follow",
    }
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
function validateMobileNumber(mob) {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(mob);
}
function handleMobileSubmit(e) {
  e.preventDefault();
  var mob = getElement("number").value;
  if (!validateMobileNumber(mob)) {
    alert("Please Enter Correct Details ");
    return;
  }
  sendWhatsappOtp(mob, otp);
  check();
}
const getElement = (id) => document.getElementById(id);
var otp = ranNum().toString();
var otp_sent_status = false;
var redirectLink;
const otpMessage = getElement("otp-message");
const inputArea = getElement("input-area");
const otpArray = document.getElementsByClassName("otp");
const downloadBtn = getElement("download-btn");
const whatsAppNumber = getElement("number");
const sendOtpDiv = getElement("send-otp-div");
const inputs = document.querySelectorAll(".otp");
const DownloadBtn = getElement("download-btn");
const PhoneSubmitButton = getElement("customSubmitFormSubmitBtn");
const disableele = document.querySelectorAll("table");

let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes.length > 0) {
      let ctaElements = document.querySelectorAll("span.cta, span.cta2");
      ctaElements.forEach(function (ctaElement) {
        let parentAnchor = ctaElement.parentElement;
        if (parentAnchor && parentAnchor.tagName === "A") {
          let link = parentAnchor.getAttribute("href");
          redirectLink = link;
          handleCTAConversion(ctaElement, link);
        }
      });
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });
inputs.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {
    const currentInput = input,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling;
    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }
    if (
      nextInput &&
      nextInput.hasAttribute("disabled") &&
      currentInput.value !== ""
    ) {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }
    if (e.key === "Backspace") {
      inputs.forEach((input, index2) => {
        if (index1 <= index2 && prevInput) {
          input.setAttribute("disabled", true);
          input.value = "";
          prevInput.focus();
        }
      });
    }
  });
});
window.addEventListener("load", () => inputs[0].focus());
disableele.forEach((table) => {
  table.addEventListener("click", function (event) {
  	redirectLink = null;
    if (localStorage.getItem("customDialogBoxLocalStringVar") == "true") {
      //var link = redirectLink;
      table.style.pointerEvents = "auto";
    } else {
      appear();
    }
  });
});
PhoneSubmitButton.addEventListener("click", handleMobileSubmit);
DownloadBtn.onclick = function () {
  let otp1 = getElement("otp1").value;
  let otp2 = getElement("otp2").value;
  let otp3 = getElement("otp3").value;
  let otp4 = getElement("otp4").value;
  let final =
    otp1.toString() + otp2.toString() + otp3.toString() + otp4.toString();
  var inputOtp = final;
  if (inputOtp == otp) {
    callHubspotApi(whatsAppNumber.value);
    var link = redirectLink;
    if (link != null) {
      redirectLink = null;
      window.open(link, "_blank");
    }
    localStorage.setItem("customDialogBoxLocalStringVar", "true");
    closePopUp();
    disableele.forEach((table) => {
      table.style.pointerEvents = "auto";
    });
  } else {
    getElement("otp-message").style.display = "none";
    getElement("incorrect_message").style.display = "block";
  }
};
</script>
