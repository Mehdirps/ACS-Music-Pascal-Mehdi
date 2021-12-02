// jeton = JSON.parse(sessionStorage.getItem(json.token));
// sessionStorage.getItem(json.token, JSON.stringify(jeton));
// SE CONNECTER

// let userconnect = {
//     "username": "Mehdirapos89@json.com",
//     "password": "mehdimehdimehdimehdi",
//     };
let bouton = document.querySelector("button")
let mail = document.querySelector("#mail");
let password = document.querySelector("#password")

bouton.addEventListener("click", function () {
    fetch('http://musics.logikstik.odns.fr/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: mail.value,
                password: password.value
            })
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            // let jeton = json.token;
            sessionStorage.setItem("jeton", json.token);
            // console.log(json.token.value);
            // sessionStorage.getItem("jeton", json.token);
            // console.log(json.token)
            if (typeof (json.token) != "undefined") {
                document.location.href = "accueil.html";
                // console.log(json.token)
            }
        })
})