import fs from 'node:fs';
import path from 'node:path';

// Generate a gentle Italian acoustic guitar / mandolin arpeggio piece (44.1 kHz, 16-bit stereo)
const sampleRate = 44100;
const bpm = 84;
const beatSec = 60 / bpm;
const measures = 8;
const beatsPerMeasure = 3; // 3/4 Italian waltz / barcarolle
const totalDuration = measures * beatsPerMeasure * beatSec; // ~17.1 seconds loop
const totalSamples = Math.floor(sampleRate * totalDuration);

const left = new Float32Array(totalSamples);
const right = new Float32Array(totalSamples);

// Chords progression: Am9 -> Dm7 -> G7 -> Cmaj7 -> Fmaj7 -> Dm6 -> E7sus4 -> E7
const chords = [
  // Am9: A2, E3, A3, C4, E4, B4
  [110.00, 164.81, 220.00, 261.63, 329.63, 493.88],
  // Dm7: D3, A3, F4, C5, E5
  [146.83, 220.00, 349.23, 523.25, 659.25],
  // G7: G2, D3, B3, F4, G4, D5
  [98.00, 146.83, 246.94, 349.23, 392.00, 587.33],
  // Cmaj7: C3, G3, E4, B4, E5
  [130.81, 196.00, 329.63, 493.88, 659.25],
  // Fmaj7: F2, C3, A3, E4, G4, C5
  [87.31, 130.81, 220.00, 329.63, 392.00, 523.25],
  // Dm6: D3, A3, F4, B4, D5
  [146.83, 220.00, 349.23, 493.88, 587.33],
  // E7sus4: E2, B2, A3, D4, E4
  [82.41, 123.47, 220.00, 293.66, 329.63],
  // E7: E2, B2, G#3, D4, E4, B4
  [82.41, 123.47, 207.65, 293.66, 329.63, 493.88],
];

// Pluck sound generator with rich harmonics and gentle damping
function pluck(startSample, freq, pan = 0, gain = 0.25, duration = 2.5) {
  const noteSamples = Math.floor(sampleRate * duration);
  for (let i = 0; i < noteSamples; i++) {
    const idx = (startSample + i) % totalSamples;
    const t = i / sampleRate;
    
    // Physical-like string decay with multiple harmonics
    const env = Math.exp(-t * 3.2) * (1 - Math.exp(-t * 200));
    
    // Harmonics: fundamental, 2nd, 3rd, 4th, 5th
    const s1 = Math.sin(2 * Math.PI * freq * t);
    const s2 = 0.5 * Math.sin(2 * Math.PI * freq * 2 * t);
    const s3 = 0.25 * Math.sin(2 * Math.PI * freq * 3 * t);
    const s4 = 0.12 * Math.sin(2 * Math.PI * freq * 4 * t);
    const s5 = 0.06 * Math.sin(2 * Math.PI * freq * 5 * t);
    
    const sampleVal = (s1 + s2 + s3 + s4 + s5) * env * gain;
    
    // Stereo panning (-1 left, +1 right)
    const leftGain = Math.cos((pan + 1) * Math.PI / 4);
    const rightGain = Math.sin((pan + 1) * Math.PI / 4);
    
    left[idx] += sampleVal * leftGain;
    right[idx] += sampleVal * rightGain;
  }
}

// Sequence the gentle waltz arpeggios
chords.forEach((chord, measureIdx) => {
  const measureStart = measureIdx * beatsPerMeasure * beatSec;
  
  // Beat 1: Bass note + root
  const bassTime = measureStart;
  pluck(Math.floor(bassTime * sampleRate), chord[0], -0.2, 0.35, 3.0);
  
  // Beat 1.5: 2nd string
  pluck(Math.floor((measureStart + beatSec * 0.5) * sampleRate), chord[1], 0.1, 0.22, 2.0);
  
  // Beat 2: 3rd & 4th string
  pluck(Math.floor((measureStart + beatSec * 1.0) * sampleRate), chord[2], -0.15, 0.24, 2.0);
  if (chord[3]) {
    pluck(Math.floor((measureStart + beatSec * 1.5) * sampleRate), chord[3], 0.25, 0.24, 1.8);
  }
  
  // Beat 3: Top melody note / arpeggio return
  if (chord[4]) {
    pluck(Math.floor((measureStart + beatSec * 2.0) * sampleRate), chord[4], 0.1, 0.26, 2.2);
  }
  if (chord[5]) {
    pluck(Math.floor((measureStart + beatSec * 2.5) * sampleRate), chord[5], -0.1, 0.2, 1.6);
  }
});

// Simple reverb / delay line simulation
const delaySamples = Math.floor(sampleRate * 0.28);
const decay = 0.32;
for (let i = delaySamples; i < totalSamples; i++) {
  left[i] += right[i - delaySamples] * decay;
  right[i] += left[i - delaySamples] * decay;
}

// Normalize
let maxVal = 0.001;
for (let i = 0; i < totalSamples; i++) {
  maxVal = Math.max(maxVal, Math.abs(left[i]), Math.abs(right[i]));
}
const norm = 0.85 / maxVal;

// Write WAV buffer
const bytesPerSample = 2;
const numChannels = 2;
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = totalSamples * blockAlign;
const buffer = Buffer.alloc(44 + dataSize);

// RIFF header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // subchunk1 size
buffer.writeUInt16LE(1, 20); // PCM
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // bits per sample
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  // Fade in & fade out loop smoothing
  let loopFade = 1.0;
  if (i < 2000) loopFade = i / 2000;
  if (i > totalSamples - 2000) loopFade = (totalSamples - i) / 2000;

  const sL = Math.max(-1, Math.min(1, left[i] * norm * loopFade));
  const sR = Math.max(-1, Math.min(1, right[i] * norm * loopFade));
  buffer.writeInt16LE(Math.floor(sL * 32767), offset);
  offset += 2;
  buffer.writeInt16LE(Math.floor(sR * 32767), offset);
  offset += 2;
}

const outPath = path.resolve('public/audio/toscan-ambient.mp3');
fs.writeFileSync(outPath, buffer);
console.log('Generated audio successfully to:', outPath, 'Bytes:', buffer.length);
