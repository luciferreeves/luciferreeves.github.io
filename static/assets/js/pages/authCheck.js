firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.assign("/admin/");
    }
});
document.getElementById("logout").addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
        window.location.assign("/admin/");
    });
});
