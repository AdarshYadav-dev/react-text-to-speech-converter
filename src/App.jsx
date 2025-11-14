import { useEffect, useState } from "react";
import play from "./assets/play.png";
import dropdown from "./assets/dropdown.png";

export default function App() {
  const [voices, setVoices] = useState([]);
  const [speech] = useState(new SpeechSynthesisUtterance());
  const [text, setText] = useState("");

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
      if (allVoices.length > 0) {
        speech.voice = allVoices[0];
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [speech]);

  const handleVoiceChange = (e) => {
    speech.voice = voices[e.target.value];
  };

  const speakText = () => {
    speech.text = text;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#010758] to-[#490d61] text-white font-[Cambria]">
      <h1 className="text-[45px] font-medium mb-12 -mt-12">
        Text To Speech <span className="text-[#ff2963]">Converter</span>
      </h1>

      <textarea
        className="w-[600px] h-[250px] bg-[#403d84] text-white text-[16px] rounded-xl p-5 mb-8 resize-none outline-none"
        placeholder="Write anything here..."
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="w-[600px] flex items-center gap-5">
        <select
          className="flex-1 bg-[#403d84] text-white h-[50px] rounded-full px-4 outline-none border-none"
          onChange={handleVoiceChange}
          style={{
            backgroundImage: `url(${dropdown})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "15px",
            backgroundPosition: "calc(100% - 20px) center",
          }}
        >
          {voices.map((voice, index) => (
            <option key={index} value={index}>
              {voice.name}
            </option>
          ))}
        </select>

        <button
          className="bg-[#ff2963] text-white px-7 py-3 rounded-full flex items-center gap-2 cursor-pointer"
          onClick={speakText}
        >
          <img src={play} className="w-4" /> Listen
        </button>
      </div>
    </div>
  );
}
