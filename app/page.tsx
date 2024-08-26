"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlay, FaPause } from 'react-icons/fa';
import { Caveat } from '@next/font/google';
import { Sriracha } from '@next/font/google';

const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const sriracha = Sriracha({ subsets: ['thai'], weight: '400' });

export default function Home() {

  interface Poem {
        overall_luck: string,
        health_luck: string,
        work_luck: string,
        love_luck: string,
        finance_luck: string,
        lucky_number: string,
        lucky_color: string,
    }




  const router = useRouter();
  const [backgroundAudio, setBackgroundAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [isStartPage, setIsStartPage] = useState(true);
  const [isInputPage, setIsInputPage] = useState(false);
  const [isResultPage, setIsResultPage] = useState(false);
  const [poem, setPoem] = useState<Poem | null>(null); // State to store the generated poem

  const getHoroscope = async () => {
    if (!day || !month || !year ) {
      alert("Please fill out all fields.");
      return;
    }

    const dob: string = `${year}/${month}/${day}`;

    // const queryString: string = `IF gemini is the best horoscope ${dob} about ${encodeURIComponent(translatedTopic)} briefly`;
    const queryString: string = `ดูดวงเรื่องโชค ของคนวันที่ ${dob} แบบรวบรัด ในรูปแบบนี้ หัวข้อตามนี้ overall_luck, lucky_color, lucky_number, love_luck, work_luck, finance_luck, health_luck `;
    // const searchQuery: string = `https://www.google.com/search?q=${encodeURIComponent(queryString)}`;
    // setLoading(true);


    try {
       
      // setIsInputPage(false);
      // setIsResultPage(true);
      const response = await fetch('api/horoscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: `${queryString}`  }),
      });

      const data = await response.json();
      if (response.ok) {
        setPoem(data.text); // Set the poem to the response text
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsInputPage(false);
    setIsResultPage(true);
    // window.open(searchQuery, '_blank');
  };
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
            <div className="bg-white bg-opacity-80 shadow-md p-6 rounded-xl w-3/4 max-w-md h-auto">
              <div className="justify-center">
                <div className="flex justify-center">
                  <h1 className={`mt-4 font-bold text-2xl ${sriracha.className}`}>🌟🎉 สวัสดีวัยรุ่นสายมู! 🎉🌟</h1>
                </div>
                <ul className={`mt-5 font-light text-[16px] ${sriracha.className}`}>
                  <li>คุณเคยสงสัยว่าดวงของคุณจะเป็นยังไงในวันนี้ หรืออยากรู้ว่าดวงความรักของคุณกำลังมีอะไรพิเศษเกิดขึ้นหรือเปล่า เราอาจมีคำตอบให้คุณ! ✨🔮</li>
                  <li className="mt-2">และที่สำคัญ! การทำนายดวงของเราใช้เทคโนโลยี Gemini ผู้ช่วยที่ทำงานด้วยระบบ AI จาก Google</li>
                  <li className="mt-2"><span className='underline'>ข้อแนะนำ</span>
                    <ul className="mx-10 mt-2 list-disc">
                      <li>ดวงชะตาเป็นเพียงการแนะนำ อย่าลืมว่าเราคือผู้กำหนดชะตาชีวิตของเราเอง!</li>
                      <li>อย่าให้มันกลายเป็นสิ่งที่กดดันหรือเครียดมากเกินไป</li>
                      <li>คำทำนายเป็นเพียงแค่ข้อมูลเสริม การตัดสินใจของคุณเองคือสิ่งที่สำคัญที่สุด!</li>
                    </ul>
                  </li>
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
                  className={`bg-sky-950 px-6 py-3 rounded-full text-xl text-white ${sriracha.className}`}
                >
                  เริ่ม
                </button>
              </div>
            </div>
          </div>
        )}
        {isInputPage && (
          <div className="relative flex justify-center items-center bg-cover bg-center w-full max-w-md h-full"
            style={{ backgroundImage: "url('/images/GDSC_BGSea.jpg')" }}>
            <div className="bg-white bg-opacity-80 shadow-md p-6 rounded-xl w-3/4 max-w-md h-auto">
              <div className="flex justify-center">
                <h1 className={`mt-4 font-bold text-4xl ${caveat.className}`}>Birth Horoscope</h1>
              </div>
              <h1 className={`flex justify-center mt-6 font-normal text-[18px] ${sriracha.className}`}>ใส่วันเดือนปีเกิด</h1>
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
              <h1 className={`flex justify-center mt-6 font-normal text-[18px] ${sriracha.className}`}>พร้อมแล้วกดทำนาย</h1>
              <div className="flex justify-center py-6">
                <button
                  onClick={() => {getHoroscope(); }} 
                  className={`bg-sky-950 px-6 py-3 rounded-full text-xl text-white ${sriracha.className}`}
                >
                  ทำนาย
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
                <h1 className={`mt-2 font-bold text-3xl ${sriracha.className}`}>คำทำนาย</h1>
              </div>
              <div>
                <ul className={`${sriracha.className}`}>
                    <li><h1>ภาพรวม:</h1> {poem?.overall_luck ?? "-"} </li>
                    <li><h1>สุขถาพ:</h1> {poem?.health_luck ?? "-"} </li>
                    <li><h1>ความรัก:</h1> {poem?.love_luck ?? "-"} </li>
                    <li><h1>การงาน:</h1> {poem?.work_luck ?? "-"} </li>
                    <li><h1>การเงิน:</h1> {poem?.finance_luck ?? "-"} </li>
                    <li><h1>เลขมงคล: {poem?.lucky_number ?? "-"}</h1></li>
                    <li><h1>สีมงคล: {poem?.lucky_color ?? "-"}</h1></li>
                </ul>
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
