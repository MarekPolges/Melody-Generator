
//button animation: 
$('button').click(function() {
  $(this).toggleClass('bigger');
});


//this will load, when the document is fully loaded: 
$( document ).ready(function() {
  alert("let's play music"); 
});

$( '#selectedKeys' ).on( "click", function(){
  $( '#selectionKeys' ).fadeIn( "slow", function(){
    //animation complete
  }); 
})


$("p").hide(400); 
$("p").show(1000);   


// selecting key and signature and displaying it below: 

  document.getElementById('keySelect').addEventListener('change', updateSelectedOptions);
  document.getElementById('signatureSelect').addEventListener('change', updateSelectedOptions);
  document.getElementById('chordSelect').addEventListener('change', updateSelectedOptions);

  function updateSelectedOptions() {
    const selectedKey = document.getElementById('keySelect').value;
    const selectedSignature = document.getElementById('signatureSelect').value;
    const selectedChordProgression = document.getElementById('chordSelect').value;

    document.getElementById('selectedKey').textContent = selectedKey;
    document.getElementById('selectedSignature').textContent = selectedSignature;
    document.getElementById('selectedChordProgression').textContent = selectedChordProgression;
  }


document.getElementById('generateBtn').addEventListener('click', generateMelody);


// creating a function that gets the notes of the selected key 

function getNotesInKey(key) {
  const noteMap = {
    C: [
      { note: 'C', frequency: 261.63 },
      { note: 'D', frequency: 293.66 },
      { note: 'E', frequency: 329.63 },
      { note: 'F', frequency: 349.23 },
      { note: 'G', frequency: 392.00 },
      { note: 'A', frequency: 440.00 },
      { note: 'B', frequency: 493.88 }
    ],
    D: [
      { note: 'D', frequency: 293.66 },
      { note: 'E', frequency: 329.63 },
      { note: 'F#', frequency: 369.99 },
      { note: 'G', frequency: 392.00 },
      { note: 'A', frequency: 440.00 },
      { note: 'B', frequency: 493.88 },
      { note: 'C#', frequency: 554.37 }
    ],
    E: [
      { note: 'E', frequency: 329.63 },
      { note: 'F#', frequency: 369.99 },
      { note: 'G#', frequency: 415.30 },
      { note: 'A', frequency: 440.00 },
      { note: 'B', frequency: 493.88 },
      { note: 'C#', frequency: 554.37 },
      { note: 'D#', frequency: 622.25 }
    ],
    F: [
      { note: 'F', frequency: 349.23 },
      { note: 'G', frequency: 392.00 },
      { note: 'A', frequency: 440.00 },
      { note: 'A#', frequency: 466.16 },
      { note: 'C', frequency: 523.25 },
      { note: 'D', frequency: 587.33 },
      { note: 'E', frequency: 659.25 }
    ],
    G: [
      { note: 'G', frequency: 392.00 },
      { note: 'A', frequency: 440.00 },
      { note: 'B', frequency: 493.88 },
      { note: 'C', frequency: 523.25 },
      { note: 'D', frequency: 587.33 },
      { note: 'E', frequency: 659.25 },
      { note: 'F#', frequency: 739.99 }
    ],
    A: [
      { note: 'A', frequency: 440.00 },
      { note: 'B', frequency: 493.88 },
      { note: 'C#', frequency: 554.37 },
      { note: 'D', frequency: 587.33 },
      { note: 'E', frequency: 659.25 },
      { note: 'F#', frequency: 739.99 },
      { note: 'G#', frequency: 830.61 }
    ],
    B: [
      { note: 'B', frequency: 493.88 },
      { note: 'C#', frequency: 554.37 },
      { note: 'D#', frequency: 622.25 },
      { note: 'E', frequency: 659.25 },
      { note: 'F#', frequency: 739.99 },
      { note: 'G#', frequency: 830.61 },
      { note: 'A#', frequency: 932.33 }
    ]
  };

  return noteMap[key];
}


// generate melody as an array ... 

function generateMelody() {
  const availableDurations = ['eighth', 'quarter'];
  const notesPerBar = 8;
  const melody = [];

  function getRandomNote() {
    const selectedKey = document.getElementById('keySelect').value;
    const notesInKey = getNotesInKey(selectedKey);

    if (melody.length === 0) {
      const firstNote = Math.random() < 0.5 ? notesInKey[0] : notesInKey[2];
      return firstNote;
    } else {
      const randomIndex = Math.floor(Math.random() * notesInKey.length);
      return notesInKey[randomIndex];
    }
  }

  function getRandomDuration() {
    const randomIndex = Math.floor(Math.random() * availableDurations.length);
    return availableDurations[randomIndex];
  }


  for (let i = 0; i < notesPerBar; i++) {
    const note = getRandomNote();
    const duration = getRandomDuration();
    melody.push({ note: note.note, duration: duration });
  }

  console.log(melody);
 
  playMelody(melody);
  
  var displayElement = document.getElementById('melodyContainer');


// displaying the melody as a string ... 

var melodyString = melody.join(', ');

melodyContainer.textContent = melodyString;

document.getElementById('melodyContainer').textContent = melody.map(obj => obj.note).join(', ');

}


//making the array from generateMelody sound ...  

function playMelody(melody) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let currentTime = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  oscillator.connect(audioContext.destination);

  melody.forEach(({ note, duration }) => {
    const selectedKey = document.getElementById('keySelect').value;
    const frequency = noteToFrequency(note, selectedKey);
    oscillator.frequency.setValueAtTime(frequency, currentTime);

    const durationInSeconds = getDurationInSeconds(duration);
    currentTime += durationInSeconds;
  });

  oscillator.start();
  oscillator.stop(currentTime + 0.5);

  function noteToFrequency(note, key) {
    const notesInKey = getNotesInKey(key);
    const matchingNote = notesInKey.find(n => n.note === note);

    if (matchingNote) {
      return matchingNote.frequency;
    } else {
      return null;
    }
  }

  function getDurationInSeconds(duration) {
    const durationMap = {
      quarter: 1,
      eighth: 0.5
    };

    return durationMap[duration];
  }
}


