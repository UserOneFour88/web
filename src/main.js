const artistsData = [
    {
        id: 1,
        name: "Ghost",
        genre: "Рок",
        description: "Шведская рок-группа из Линчёпинга, основанная в 2006 году, известная своим сочетанием хэви-метала, хард-рока и театральной эстетики.",
        image: "images/ghost.jpg",
        songs: [
            { name: "Mary on a cross", duration: "4:56" },
            { name: "Hunter's Moon", duration: "4:03" },
            { name: "He is", duration: "3:05" }
        ]
    },
    {
        id: 2,
        name: "Katagiri",
        genre: "Электронная музыка",
        description: "",
        image: "",
        songs: [
            { name: "Tachypsychia", duration: "3:36" }
        ]
    },
    {
        id: 3,
        name: "Aether Realm",
        genre: "Метал",
        description: "",
        image: "images/aether-realm.jpg",
        songs: [

            { name: "The sun The moon The star", duration: "17:28" }
        ]
    },
    {
        id: 4,
        name: "Breaking benjamin",
        genre: "Рок",
        description: "",
        image: "images/bb.jpg",
        songs: [
            { name: "Dance With The Devil", duration: "4:45" }
        ]
    }
];

const artistsContainer = document.getElementById('artistsContainer');
const tracksContainer = document.getElementById('tracksContainer');
const sectionTitle = document.getElementById('sectionTitle');
const artistModal = document.getElementById('artistModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';
let allTracks = [];

function getAllTracks() {
    const tracks = [];
    artistsData.forEach(artist => {
        artist.songs.forEach(song => {
            tracks.push({
                name: song.name,
                duration: song.duration,
                artist: artist.name,
                genre: artist.genre
            });
        });
    });
    return tracks;
}

function renderTracks(tracks) {
    tracksContainer.innerHTML = '';
    
    if (tracks.length === 0) {
        tracksContainer.innerHTML = '<p class="no-tracks">Треки не найдены</p>';
        return;
    }
    
    tracks.forEach(track => {
        const trackCard = document.createElement('div');
        trackCard.className = 'track-card';
        trackCard.innerHTML = `
            <div class="track-info">
                <div class="track-name">${track.name}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <div class="track-controls">
                <span class="track-duration">${track.duration}</span>
<button class="play-btn" onclick="playSong('${track.name}', '${track.artist}')">▶</button>
            </div>
        `;
        tracksContainer.appendChild(trackCard);
    });
}

function filterTracksByGenre(genre) {
    if (genre === 'all') {
        sectionTitle.textContent = 'Все треки';
        renderTracks(allTracks);
    } else {
        sectionTitle.textContent = `Треки в жанре: ${genre}`;
        const filteredTracks = allTracks.filter(track => track.genre === genre);
        renderTracks(filteredTracks);
    }
}

function renderArtists() {
    artistsContainer.innerHTML = '';
    
    artistsData.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.className = 'artist-card';
        artistCard.innerHTML = `
            <img src="${artist.image}" alt="${artist.name}" class="artist-image">
            <h3>${artist.name}</h3>
            <p>${artist.genre}</p>
        `;
        
        artistCard.addEventListener('click', () => openArtistModal(artist));
        artistsContainer.appendChild(artistCard);
    });
}

function openArtistModal(artist) {
    modalBody.innerHTML = `
        <div class="artist-detail">
            <img src="${artist.image}" alt="${artist.name}">
            <h2>${artist.name}</h2>
            <p><strong>Жанр:</strong> ${artist.genre}</p>
            <p>${artist.description}</p>
            
            <div class="songs-list">
                <h3>Популярные треки</h3>
                ${artist.songs.map(song => `
                    <div class="song-item">
                        <span>${song.name}</span>
                        <div>
                            <span style="color: #7f8c8d; margin-right: 10px;">${song.duration}</span>
                            <button class="play-btn" onclick="playSong('${song.name}', '${artist.name}')">▶</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    artistModal.style.display = 'block';
}

function playSong(songName, artistName) {
    alert(`Воспроизведение: ${songName} - ${artistName}\n\n(В реальном приложении здесь будет аудиоплеер)`);
}

function initFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.genre;
            filterTracksByGenre(currentFilter);
        });
    });
}

closeModal.addEventListener('click', () => {
    artistModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === artistModal) {
        artistModal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    allTracks = getAllTracks();
    
    initFilters();
    renderArtists();
    filterTracksByGenre('all');
});