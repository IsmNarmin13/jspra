let currentMusic = 0;
const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const title = document.querySelector('.title');
const artist = document.querySelector('.author');
const disk = document.getElementById('disk');
const current = document.querySelector('.current');
const duration = document.querySelector('.duration');
const playBtn = document.querySelector('.play-btn');
const backwardBtn = document.querySelector('.backward-btn');
const forwardBtn = document.querySelector('.forward-btn');

playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        music.play();
    } else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;
    title.innerHTML = song.name;
    artist.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    current.innerHTML = '00.00';
    setTimeout(() => {
        seekBar.max = music.duration;
        duration.innerHTML = formatTime(music.duration);
    }, 300);
}

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}



setInterval(() => {
    seekBar.value = music.currentTime; 
    current.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        forwardBtn.click();
    }
}, 500);

seekBar.addEventListener('input', () => { 
    music.currentTime = seekBar.value; 
});


const playMusic = () =>{
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.remove('play');
}

forwardBtn.addEventListener('click', () =>{
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

backwardBtn.addEventListener('click', ()=>{
    if(currentMusic<=0){
        currentMusic = songs.length-1;
    }else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})