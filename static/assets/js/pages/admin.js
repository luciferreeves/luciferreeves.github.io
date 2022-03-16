const loginInfo = document.getElementById("login-info");
const loginForm = document.getElementById("login-page");

window.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBCmKUnEmm8hLR9ZcFWPYbYiplbP6yUzfU",
    authDomain: "thatcomputerscientist-e9cf2.firebaseapp.com",
    projectId: "thatcomputerscientist-e9cf2",
    storageBucket: "thatcomputerscientist-e9cf2.appspot.com",
    messagingSenderId: "178402875544",
    appId: "1:178402875544:web:8c9d8880d3ef495a5658ed",
    measurementId: "G-JECWWZG5J6",
  };
  firebase.initializeApp(firebaseConfig);
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
