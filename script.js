const PasswordBtn = document.querySelectorAll(".passwd-btn");
const PasswordInput = document.querySelector("#password-input");
const Delbtn = document.querySelector("#del");
const Loading = document.querySelector("#loading");
const Loader = document.querySelector(".loader");
const LoaderHolder = document.querySelector(".loader-holder");
const Paragraph = document.querySelector(".paragraph");
const Checkuser = document.querySelector(".checkuser");
const Askuser = document.querySelector(".askuser");

let password = "";
let adminPassword = "1255";
let timeoutCheck = 0;
let timeout;

const iteration = () => {
  timeoutCheck += 1;

  timeout = setTimeout(iteration, 1000);
  console.log(timeoutCheck);
  if (timeoutCheck === 6) {
    timeoutCheck = 0;
    clearTimeout(timeout);
    checkAdminAccess();
  }
};

// function to check if the password is correct
const checkAdminAccess = () => {
  if (password === adminPassword) {
    Checkuser.classList.add("hide");
    Askuser.classList.remove("hide");
  } else {
    Loading.classList.remove("loading");
    Loader.classList.add("hide");
    Paragraph.innerHTML = "Incorrect Pin!, Try again";
    setTimeout(() => {
      LoaderHolder.classList.add("hide");
    }, 3000);
    password = "";
    RenderPassword();
    checkIfPasswdIsEmpty();
    checkIfPasswordIsOverFour();
    // console.log("");
  }
};
// ends here

// this code renders the password in the disabled input field
const RenderPassword = () => {
  PasswordInput.value = password;
};
//ends here

// this code checks if the password input is empty so as to disable the delete btn
const checkIfPasswdIsEmpty = () => {
  if (password === "") {
    Delbtn.disabled = true;
  } else {
    Delbtn.disabled = false;
  }
};
// code ends here

const checkIfPasswordIsOverFour = () => {
  if (password.length === 4) {
    Loading.classList.add("loading");
    Loader.classList.remove("hide");

    LoaderHolder.classList.remove("hide");

    Paragraph.innerHTML = "Checking Credentials";
    iteration();
    for (keys of PasswordBtn) {
      keys.disabled = true;
    }
  } else {
    for (keys of PasswordBtn) {
      keys.disabled = false;
    }
  }
};
checkIfPasswdIsEmpty();

for (key of PasswordBtn) {
  key.addEventListener("click", () => {
    password += event.target.id;
    console.log(password);
    RenderPassword();
    checkIfPasswdIsEmpty();
    checkIfPasswordIsOverFour();
  });
}

Delbtn.addEventListener("click", () => {
  let deleted = password.substring(0, password.length - 1);
  password = deleted;
  console.log(password);
  RenderPassword();
  checkIfPasswdIsEmpty();
  checkIfPasswordIsOverFour();
});
