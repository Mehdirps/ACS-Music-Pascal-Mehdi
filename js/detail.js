let details = document.querySelector(".details")
let containermusic = document.querySelector("#musique")
// Recuperation id dans l'url
let url = window.location.search;
let urlpara = new URLSearchParams(url)
let urlid = urlpara.get("id");

fetch('http://musics.logikstik.odns.fr/api/albums/' + urlid, {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("jeton")
        }
    })
    .then(response => response.json())
    .then(albums => {
        if (albums.code === 401) {
            document.location.href = "connect.html";
        }
        fetch('http://musics.logikstik.odns.fr' + albums.artist, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("jeton")
                }
            })
            .then(response => response.json())

            .then(artist => {
                artiste.textContent = artist.username;
            })

        let template = document.querySelector("#details")
        let clone = document.importNode(template.content, true);
        let artiste = clone.querySelector(".artiste");
        let nom = clone.querySelector(".nom");
        let image = clone.querySelector("img");
        nom.textContent = albums.name;
        image.src = albums.picture;
        details.appendChild(clone);

        for (let compteur = 0; compteur < albums.tracks.length ; compteur++) {
            let musique = albums.tracks[compteur];
            // console.log(musique)
            fetch('http://musics.logikstik.odns.fr' + musique, {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem("jeton")
                    }
                })
                .then(response => response.json())
                .then(track => {
                    let tracks = document.querySelector("#tracks");
                    let tracksclone = document.importNode(tracks.content, true);
                    let musics = tracksclone.querySelector(".tracks");
                    let lien = tracksclone.querySelector("a");
                    let timer = tracksclone.querySelector(".timer");
                    let timerconvert = track.time;
                    let numero = tracksclone.querySelector(".numero");
                    let div = tracksclone.querySelector(".musique");
                    lien.href = "ecoute.html?id=" + track.id;
                    musics.textContent = track.name;
                        min = Math.floor((timerconvert % (1000 * 60 * 60)) / (1000 * 60)),
                        sec = Math.floor((timerconvert % (1000 * 60) / 1000));
                    // console.log(min + sec);
                    sec = String(sec).padStart(2, "0");
                    timer.textContent = min + ":" + sec;
                    numero.textContent = compteur + 1;
                    div.style.order = compteur;
                    // console.log(compteur)
                    containermusic.appendChild(tracksclone);
                })
        }
    })