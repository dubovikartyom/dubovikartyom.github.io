const email_label_first = document.querySelector(".email_label_first");
const email_input_first = document.querySelector(".email_input_first");
const phone_label_first = document.querySelector(".phone_label_first");
const phone_input_first = document.querySelector(".phone_input_first");

const email_label_appSection = document.querySelector(
  ".email_label_appSection"
);
const email_input_appSection = document.querySelector(
  ".email_input_appSection"
);
const phone_label_appSection = document.querySelector(
  ".phone_label_appSection"
);
const phone_input_appSection = document.querySelector(
  ".phone_input_appSection"
);

document.addEventListener("mouseup", function (e) {
  //first block
  if (
    email_input_first.className === e.target.className ||
    email_label_first.className === e.target.className
  ) {
    email_label_first.style.top = 0;
    email_label_first.style.fontSize = "14px";
    email_label_first.style.lineHeight = "22px";

    if (!phone_input_first.value) {
      phone_label_first.style.top = "88px";
      phone_label_first.style.fontSize = "18px";
      phone_label_first.style.lineHeight = "28px";
    }
  } else if (
    phone_input_first.className === e.target.className ||
    phone_label_first.className === e.target.className
  ) {
    phone_label_first.style.top = "76px";
    phone_label_first.style.fontSize = "14px";
    phone_label_first.style.lineHeight = "22px";

    if (!email_input_first.value) {
      email_label_first.style.top = "12px";
      email_label_first.style.fontSize = "18px";
      email_label_first.style.lineHeight = "28px";
    }
  } else if (
    email_input_appSection.className === e.target.className ||
    email_label_appSection.className === e.target.className
  ) {
    email_label_appSection.style.top = 0;
    email_label_appSection.style.fontSize = "14px";
    email_label_appSection.style.lineHeight = "22px";

    if (!phone_input_appSection.value) {
      phone_label_appSection.style.top = "88px";
      phone_label_appSection.style.fontSize = "18px";
      phone_label_appSection.style.lineHeight = "28px";
    }
  } else if (
    phone_input_appSection.className === e.target.className ||
    phone_label_appSection.className === e.target.className
  ) {
    phone_label_appSection.style.top = "76px";
    phone_label_appSection.style.fontSize = "14px";
    phone_label_appSection.style.lineHeight = "22px";

    if (!email_input_appSection.value) {
      email_label_appSection.style.top = "12px";
      email_label_appSection.style.fontSize = "18px";
      email_label_appSection.style.lineHeight = "28px";
    }
  } else {
    if (!phone_input_first.value) {
      phone_label_first.style.top = "88px";
      phone_label_first.style.fontSize = "18px";
      phone_label_first.style.lineHeight = "28px";
    }
    if (!email_input_first.value) {
      email_label_first.style.top = "12px";
      email_label_first.style.fontSize = "18px";
      email_label_first.style.lineHeight = "28px";
    }
    if (!phone_input_appSection.value) {
      phone_label_appSection.style.top = "88px";
      phone_label_appSection.style.fontSize = "18px";
      phone_label_appSection.style.lineHeight = "28px";
    }
    if (!email_input_appSection.value) {
      email_label_appSection.style.top = "12px";
      email_label_appSection.style.fontSize = "18px";
      email_label_appSection.style.lineHeight = "28px";
    }
  }
});
