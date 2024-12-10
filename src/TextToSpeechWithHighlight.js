import React, { useState, useEffect } from 'react';
import './TextToSpeech.css'; 

const TextToSpeech = () => {
  const [text, setText] = useState('At Busitron, we are on a mission to transform the way businesses connect and succeed. Our innovative platform is a hub for networking, collaboration, and development. Whether you are a mobile shop owner, a clothing retailer, or a service provider, Busitron is your go-to destination for expanding your business horizons.');
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1); 
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);

      const loadVoices = () => {
        const voicesList = window.speechSynthesis.getVoices();
        setVoices(voicesList);
        if (!selectedVoice && voicesList.length > 0) {
          setSelectedVoice(voicesList[0]); 
        }
      };

      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    } else {
      alert('Your browser does not support text-to-speech!');
    }
  }, [selectedVoice]);

  const handleSpeak = () => {
    if (!text || !speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = voices.find((voice) => voice.name === selectedVoice.name);
    }
    utterance.rate = rate;

    const words = text.split(/\s+/); 

    
    utterance.onboundary = (event) => {
      const charIndex = event.charIndex;
      let cumulativeLength = 0;

      const nextWordIndex = words.findIndex((word, idx) => {
        cumulativeLength += word.length + 1; 
        return charIndex < cumulativeLength;
      });

      setCurrentWordIndex(nextWordIndex);
    };

    utterance.onend = () => {
      setCurrentWordIndex(-1);
      setIsSpeaking(false);
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handlePause = () => {
    if (speechSynthesis) {
      speechSynthesis.pause();
      setIsSpeaking(false);
    }
  };

  const handleResume = () => {
    if (speechSynthesis) {
      speechSynthesis.resume();
      setIsSpeaking(true);
    }
  };

  const handleStop = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setCurrentWordIndex(-1);
      setIsSpeaking(false);
    }
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handleVoiceChange = (event) => {
    const selected = voices.find((voice) => voice.name === event.target.value);
    setSelectedVoice(selected);
  };

  return (
    <div className="text-to-speech-container">
      <h1>Voicify</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
        rows="6"
        className="text-input"
      ></textarea>
      <div className="controls">
        <button onClick={handleSpeak} disabled={isSpeaking} className="control-button">
          Speak
        </button>
        <button onClick={handlePause} disabled={!isSpeaking} className="control-button">
          Pause
        </button>
        <button onClick={handleResume} disabled={isSpeaking} className="control-button">
          Resume
        </button>
        <button onClick={handleStop} className="control-button">
          Stop
        </button>
      </div>
      <div className="settings">
        <label htmlFor="voice-select">Voice:</label>
        <select
          id="voice-select"
          value={selectedVoice?.name || ''}
          onChange={handleVoiceChange}
          className="voice-select"
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>

        <label htmlFor="rate">Speed:</label>
        <input
          type="range"
          id="rate"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
          className="rate-slider"
        />
        <span>{rate}x</span>
      </div>
      <div className="highlighted-text">
        {text.split(/\s+/).map((word, idx) => (
          <span
            key={idx}
            className={idx === currentWordIndex ? 'highlight' : ''}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextToSpeech;
