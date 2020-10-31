const API_URL = "https://api.lyrics.ovh";

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

async function getMoreSongs(URL) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${URL}`);
  const data = await res.json();
  showSongs(data);
}

function showSongs(data) {
  var output = "";
  data.data.forEach((song) => {
    output += `
    <div>
      <li><span><img style="border-radius:50%;" class="song_image" alt="image.jpg" src="${song.artist.picture_small}"/></span><span style="max-width:200px;"><strong>${song.artist.name}</strong> - ${song.title}</span>
      <audio controls width="200" height="30"><source src="${song.preview}"></audio>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button></li>
    </div>
    `;
  });
  result.innerHTML = `
  <ul class="songs">
    ${output}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onClick="getMoreSongs('${data.prev}')"><i class="fa fa-arrow-left"></i></button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn"  onClick="getMoreSongs('${data.next}')"><i class="fa fa-arrow-right"></i></button>`
          : ""
      }
    `;
  } else {
    more.innerHTML = "";
  }
}

async function fetchSearchedSongs(song) {
  // fetch(`${API_URL}/suggest/${song}`)
  // .then(res => res.json())
  // .then(data=>console.log(data));

  const res = await fetch(`${API_URL}/suggest/${song}`);
  const data = await res.json();
  console.log(data);
  showSongs(data);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const songSearch = search.value.trim();
  if (!songSearch) alert("Please enter search element.");
  else {
    fetchSearchedSongs(songSearch);
  }
});

async function getTheLyrics(artist, songtitle) {
  const res = await fetch(`${API_URL}/v1/${artist}/${songtitle}`);
  const data = await res.json();

  if (data.error) {
    result.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    result.innerHTML = `
            <h2><strong>${artist}</strong> - ${songtitle}</h2>
            <span>${lyrics}</span>
        `;
  }

  more.innerHTML = "";
}

result.addEventListener("click", (e) => {
  const clicked = e.target;
  if (clicked.tagName === "BUTTON") {
    const artist = clicked.getAttribute("data-artist");
    const songtitle = clicked.getAttribute("data-songtitle");
    getTheLyrics(artist, songtitle);
  }
});
