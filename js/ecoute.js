let url = window.location.search;
let urlpara = new URLSearchParams(url);
let urlid = urlpara.get("id");
fetch('http://musics.logikstik.odns.fr/api/tracks/' + urlid, {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("jeton")
        }
    })
    .then(response => response.json())
    .then(track => {
        if (track.code === 401) {
            document.location.href = "connect.html";
        }
        let titre = document.querySelector(".titre");
        titre.textContent = track.name;


        fetch('http://musics.logikstik.odns.fr' + track.album, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("jeton")
                }
            })
            .then(response => response.json())
            .then(albums => {
                let jaquette = document.querySelector(".jaquette");
                jaquette.src = albums.picture;
                // Bouton Suivant/Precedent
                let precedent = document.querySelector("#precedent");
                let suivant = document.querySelector("#suivant");
                let tableauid = albums.tracks;
                let index = tableauid.indexOf("/api/tracks/" + track.id);
                if (index > 0) {
                    let indexprec = index - 1;
                    let idprec = tableauid[indexprec];
                    let newid = idprec.substr(12);
                    precedent.href = "ecoute.html?id=" + newid;
                }
                console.log(track.time)
                if (index < tableauid.length - 1) {
                    let indexsuiv = index + 1;
                    let idsuiv = tableauid[indexsuiv];
                    let newidsuiv = idsuiv.substr(12);
                    suivant.href = "ecoute.html?id=" + newidsuiv;
                }
                // Bontout random
                let random = document.querySelector("#random");
                let musicrandom = Math.floor(Math.random() * tableauid.length);
                let idmusic = tableauid[musicrandom].substr(12);
                random.href = "ecoute.html?id=" + idmusic;
                // timer musique
                let timer = document.querySelector(".timer");
                let musictimer = track.time;
                min = Math.floor((musictimer % (1000 * 60 * 60)) / (1000 * 60)),
                sec = Math.floor((musictimer % (1000 * 60) / 1000));
                sec = String(sec).padStart(2, "0");
                timer.textContent = min + ":" + sec;
                fetch('http://musics.logikstik.odns.fr' + albums.artist, {
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("jeton")
                        }
                    })
                    .then(response => response.json())
                    .then(artist => {
                        let artiste = document.querySelector(".artiste");
                        artiste.textContent = artist.username
                    })
            })
    })