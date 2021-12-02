let bouton = document.querySelector("button")
let pseudo = document.querySelector("#pseudo");
let mail = document.querySelector("#mail");
let password = document.querySelector("#password")

//CREER UN COMPTE

// let user = {
// "name": "",
// "email": "",
// "password": "",
// };
bouton.addEventListener("click", function () {
    fetch('http://musics.logikstik.odns.fr/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: pseudo.value,
                email: mail.value,
                password: password.value
            })
        })

        .then(function (response) {
            console.log(response)
            if (response.status === 201) {
                document.location.href = "connect.html";
            }
            if (response.status === 422) {
                let alerteinscrip = document.querySelector(".alerte");
                alerteinscrip.textContent = "Cet e-mail ou se pseudo est déjà utilisé ou manquant !"
                alerteinscrip.style.color = "red";
                alerteinscrip.style.fontSize = ".8rem";
                alerteinscrip.style.margin = "1px";
            }
            // if(response.status === )
            return response.json();
        })
        .then(inscription => {
        })

})
document.querySelector("#password").addEventListener("input", checkPass);

function checkPass() {
    let mdp = this.value;
    let miniscule = document.querySelector("#miniscule");
    let majuscule = document.querySelector("#majuscule");
    let chiffre = document.querySelector("#chiffre");
    let special = document.querySelector("#special");
    let longueur = document.querySelector("#longueur");
    let validation = true;

    if (/[a-z]/.test(mdp)) {
        miniscule.classList.replace("invalide", "valid");
        miniscule = validation;
    } else {
        miniscule.classList.replace("valid", "invalide");
    }
    if (/[A-Z]/.test(mdp)) {
        majuscule.classList.replace("invalide", "valid");
        majuscule = validation;
    } else {
        majuscule.classList.replace("valid", "invalide");
    }
    if (/[1-9]/.test(mdp)) {
        chiffre.classList.replace("invalide", "valid");
        chiffre = validation;
    } else {
        chiffre.classList.replace("valid", "invalide");
    }
    if (/[\W+]/.test(mdp)) {
        special.classList.replace("invalide", "valid");
        special = validation;
    } else {
        special.classList.replace("valid", "invalide");
    }
    if (mdp.length >= 12) {
        longueur.classList.replace("invalide", "valid");
        longueur = validation;
    } else {
        longueur.classList.replace("valid", "invalide");
    }
    if (miniscule === true && majuscule === true && chiffre === true && special === true && longueur === true) {
        let bouton = document.querySelector("button")
        bouton.style.display = "initial";
    }
    else {
        let bouton = document.querySelector("button")
        bouton.style.display = "none";
    }
}