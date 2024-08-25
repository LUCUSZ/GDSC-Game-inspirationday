"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlay, FaPause } from 'react-icons/fa';
import { Caveat } from '@next/font/google';
import { Sriracha } from '@next/font/google';

const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const sriracha = Sriracha({ subsets: ['thai'], weight: '400' });

export default function Home() {
  const router = useRouter();
  const [backgroundAudio, setBackgroundAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [isStartPage, setIsStartPage] = useState(true);
  const [isInputPage, setIsInputPage] = useState(false);
  const [isResultPage, setIsResultPage] = useState(false);

  useEffect(() => {
    const audio = new Audio('/musics/Dawn by Sappheiros.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    setBackgroundAudio(audio);

    // Automatically attempt to play the background music
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
      console.error('Autoplay was prevented:', error);
    });

    return () => {
      if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
      }
    };
  }, []);

  const handlePlayMusic = () => {
    if (backgroundAudio) {
      if (isPlaying) {
        backgroundAudio.pause();
      } else {
        backgroundAudio.play().catch((error) => {
          console.error('Autoplay was prevented:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderMonthOptions = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.map((month, index) => (
      <option key={index + 1} value={index + 1}>
        {month}
      </option>
    ));
  };

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 1900; i--) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return years;
  };

  const renderDayOptions = () => {
    return Array.from({ length: 31 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    ));
  };

  return (
    <div>
      <div className="flex justify-center bg-white h-screen">
        {isStartPage && (
          <div className="relative flex justify-center items-center bg-cover bg-center w-full max-w-md h-full"
            style={{ backgroundImage: "url('/images/GDSC_BGSea.jpg')" }}>
            <div className="bg-white bg-opacity-80 shadow-md p-6 rounded-xl w-3/4 max-w-md h-[500px]">
              <div className="justify-center">
                <div className="flex justify-center">
                  <h1 className={`mt-8 font-bold text-4xl ${caveat.className}`}>GDSC Horoscope</h1>
                </div>
                <ul className={`mt-8 font-light text-[16px] ${sriracha.className}`}>
                  <li>อย่าจริงจังเกินไป: ราศีเป็นการทำนายโดยรวม ไม่สามารถบอกถึงรายละเอียดในชีวิตของแต่ละบุคคลได้อย่างแม่นยำ</li>
                  <li>ใช้เป็นแนวทาง ไม่ใช่กฎเกณฑ์: ราศีสามารถให้แนวคิดและมุมมองใหม่ๆ แต่ไม่ควรกำหนดชีวิตของคุณ</li>
                  <li>เชื่อสัญชาตญาณของตัวเอง: สัญชาตญาณและความรู้สึกของคุณเองมักจะเป็นตัวบอกทางที่ดีที่สุด</li>
                </ul>
              </div>
              <button
                onClick={handlePlayMusic}
                className="top-4 right-4 absolute bg-purple-600 p-2 rounded-full text-white"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <div className="flex justify-center py-6">
                <button
                  onClick={() => { setIsStartPage(false); setIsInputPage(true); }} 
                  className={`bg-sky-950 px-6 py-3 rounded-full text-3xl text-white ${caveat.className}`}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        )}
        {isInputPage && (
          <div className="relative flex justify-center items-center bg-cover bg-center w-full max-w-md h-full"
            style={{ backgroundImage: "url('/images/GDSC_BGSea.jpg')" }}>
            <div className="bg-white bg-opacity-80 shadow-md p-6 rounded-xl w-3/4 max-w-md h-[500px]">
              <div className="flex justify-center">
                <h1 className={`mt-4 font-bold text-4xl ${caveat.className}`}>Daily Horoscope</h1>
              </div>
              <h1 className={`flex justify-center mt-6 font-normal text-[30px] ${caveat.className}`}>Enter your Date of Birth</h1>
              <div className="flex justify-center mt-4">
                <select className={`border-2 bg-gray-300 px-2 py-2 border-black rounded-lg text-lg ${caveat.className}`}
                  id="day" value={day} onChange={(e) => setDay(e.target.value)}>
                  <option value="">Day</option>
                  {renderDayOptions()}
                </select>
                <select className={`mx-3 border-2 bg-gray-300 px-4 py-2 border-black rounded-lg text-lg ${caveat.className}`}
                  id="month" value={month} onChange={(e) => setMonth(e.target.value)}>
                  <option value="">Month</option>
                  {renderMonthOptions()}
                </select>
                <select className={`border-2 bg-gray-300 px-4 py-2 border-black rounded-lg text-lg ${caveat.className}`}
                  id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">Year</option>
                  {renderYearOptions()}
                </select>
              </div>
              <h1 className={`flex justify-center mt-6 font-normal text-[30px]`}>Let's try</h1>
              <div className="flex justify-center py-6">
                <button
                  onClick={() => { setIsInputPage(false); setIsResultPage(true); }} 
                  className={`bg-sky-950 px-6 py-3 rounded-full text-3xl text-white ${caveat.className}`}
                >
                  Go
                </button>
              </div>
              <button
                onClick={handlePlayMusic}
                className="top-4 right-4 absolute bg-purple-600 p-2 rounded-full text-white"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          </div>
        )}
        {isResultPage && (
          // Define Result Page Content
          <div className="relative flex justify-center items-center bg-cover bg-center w-full max-w-md h-full"
            style={{ backgroundImage: "url('/images/GDSC_BGSea.jpg')" }}>
            <div className="bg-white bg-opacity-80 shadow-md p-6 rounded-xl w-3/4 max-w-md h-auto">
            <div className="flex justify-center">
                <h1 className={`mt-2 font-bold text-4xl ${caveat.className}`}>Your Fortune</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
