let diapo = document.querySelector(".Diaporama");
let template = document.querySelector("#albums")
// let lien = document.querySelector("a")
fetch('http://musics.logikstik.odns.fr/api/albums/?order=desc', {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("jeton")
        }
    })
    .then(response => response.json())
    .then(albums => {
        for (let compteur = 0; compteur < 20; compteur++) {
            let clone = document.importNode(template.content, true);
            let image = clone.querySelector("img");
            let lien = clone.querySelector("a");
            lien.href = "detail.html?id=" + albums[compteur].id;
            image.src = albums[compteur].picture;
            diapo.appendChild(clone);
        }
    })

let colonne = document.querySelector(".colonne");
let template2 = document.querySelector("#music")
fetch('http://musics.logikstik.odns.fr/api/albums/?order[recently_played]=desc', {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("jeton")
        }
    })
    .then(response => response.json())

    .then(recently_played => {
        // console.log(recently_played)
        if (recently_played.code === 401) {
            document.location.href = "connect.html";
        }
        for (let compteur = 0; compteur < 8; compteur++) {
            let clone = document.importNode(template.content, true);
            let image = clone.querySelector("img");
            let lien = clone.querySelector("a");
            lien.href = "detail.html?id=" + recently_played[compteur].id;
            image.src = recently_played[compteur].picture;
            colonne.appendChild(clone);
        }
    })