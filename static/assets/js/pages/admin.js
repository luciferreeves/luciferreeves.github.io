const loginInfo = document.getElementById("login-info");
const loginForm = document.getElementById("login-page");

window.addEventListener("DOMContentLoaded", () => {
  const signInButton = document.getElementById("signInButton");
  signInButton.addEventListener("click", () => {
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        window.location.assign("/admin/dashboard");
      });
  });
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location.assign("/admin/dashboard");
    } else {
      loginForm.classList.remove("hidden");
      loginInfo.classList.add("hidden");
    }
  });
});
