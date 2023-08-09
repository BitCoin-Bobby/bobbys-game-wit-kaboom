const backgroundAudio = document.getElementById('backgroundAudio');
let isSoundPlaying = false; 
const soundIcon = document.getElementById('sound-icon');

backgroundAudio.load(); 

soundIcon.src = 'landingPageImages/audio-off.png'; 

const toggleSoundButton = document.querySelector('.toggle-sound-button');

toggleSoundButton.addEventListener('click', () => {
    if (!isSoundPlaying) {
        backgroundAudio.play()
            .catch(error => {
                console.error("Autoplay error:", error);
            });
        isSoundPlaying = true;
        soundIcon.src = 'landingPageImages/audio-on.png'; 
    } else {
        backgroundAudio.pause();
        isSoundPlaying = false;
        soundIcon.src = 'landingPageImages/audio-off.png'; 
    }
});