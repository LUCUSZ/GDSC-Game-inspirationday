"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlay, FaPause } from "react-icons/fa";
import { Caveat } from "@next/font/google";
import { Sriracha } from "@next/font/google";
import { isNull } from "util";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const sriracha = Sriracha({ subsets: ["thai"], weight: "400" });

const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

export default function Home() {
  interface Poem {
    overall_luck: string;
    health_luck: string;
    work_luck: string;
    love_luck: string;
    finance_luck: string;
    lucky_number: string;
    lucky_color: string;
  }

  const isNullOverAll = [
    "วันนี้เป็นวันที่ดี คุณจะพบโอกาสใหม่ๆ ที่ไม่คาดคิดในชีวิตประจำวัน",
    "วันนี้เป็นวันที่ดีสำหรับการทำสิ่งใหม่ๆ คุณจะพบความสำเร็จ",
    "วันนี้คุณจะรู้สึกมีพลัง และพร้อมเผชิญทุกสิ่ง",
    "วันนี้เป็นวันที่คุณจะพบความสำเร็จเล็กๆ แต่มีความหมาย",
    "วันนี้คุณจะได้รับความช่วยเหลือจากคนรอบข้าง",
    "วันนี้เป็นวันที่คุณจะรู้สึกถึงความสำเร็จในสิ่งที่ทำ",
    "วันนี้คุณจะพบกับความท้าทายใหม่ๆ ที่น่าสนใจ",
    "วันนี้คุณจะได้รับคำชมจากผู้คนรอบข้างในสิ่งที่ทำ",
    "วันนี้คุณจะรู้สึกมีกำลังใจ และพร้อมเริ่มต้นสิ่งใหม่",
    "วันนี้เป็นวันที่คุณจะได้รับข่าวดีจากคนรอบข้าง",
  ];

  const isNullColor = [
    "สีเขียว",
    "สีแดง",
    "สีน้ำเงิน",
    "สีเหลือง",
    "สีม่วง",
    "สีส้ม",
    "สีฟ้า",
    "สีชมพู",
    "สีเทา",
    "สีทอง",
  ];

  const isNullNumber = ["7", "3", "1", "5", "4", "8", "2", "6", "10", "11"];

  const isNullLove = [
    "ความรักราบรื่น คนโสดมีโอกาสได้พบคนใหม่ๆ",
    "คนรักเข้าใจกันดี ความสัมพันธ์แน่นแฟ้น",
    "ความรักสดใส คนโสดมีโอกาสพบรักใหม่",
    "วันนี้ความรักมีความเข้าใจกันดีขึ้น",
    "ความรักสงบสุข ไม่มีปัญหาใหญ่",
    "ความรักของคุณจะมั่นคงและแข็งแรง",
    "ความรักเรียบง่าย แต่มีความสุข",
    "ความรักเป็นไปด้วยดี ความสัมพันธ์แน่นแฟ้น",
    "ความรักมีความเข้าใจและสนับสนุนกัน",
    "ความรักมีความมั่นคง และอบอุ่น",
  ];

  const isNullWork = [
    "การทำงานมีความก้าวหน้า ได้รับคำชมจากหัวหน้า",
    "วันนี้งานหนัก แต่ผลลัพธ์คุ้มค่า",
    "การทำงานราบรื่น ไม่มีอุปสรรคใหญ่",
    "งานที่ทำมาจะเห็นผลสำเร็จ",
    "งานอาจมีปัญหาเล็กน้อย แต่คุณจะผ่านไปได้",
    "การทำงานมีความก้าวหน้า ได้รับการสนับสนุนจากเพื่อนร่วมงาน",
    "งานที่ทำอยู่จะได้รับผลตอบรับที่ดี",
    "การทำงานมีความสำเร็จและได้รับการยอมรับ",
    "งานมีความก้าวหน้าและโอกาสใหม่ๆ เข้ามา",
    "งานที่ทำมีความก้าวหน้าและได้รับการยอมรับ",
  ];

  const isNullFinance = [
    "การเงินอยู่ในเกณฑ์ดี รายรับมากกว่ารายจ่าย",
    "การเงินยังมั่นคง ควรเก็บออมมากขึ้น",
    "การเงินมีการเปลี่ยนแปลงเชิงบวก รายได้พิเศษเข้ามา",
    "การเงินมีความมั่นคง รายจ่ายน้อยกว่ารายรับ",
    "การเงินค่อนข้างดี แต่ควรระวังการใช้จ่ายที่ไม่จำเป็น",
    "การเงินดี ควรลงทุนเพิ่ม",
    "การเงินคงที่ ไม่มีการเปลี่ยนแปลงมาก",
    "การเงินดี มีโอกาสได้รับโชคลาภ",
    "การเงินมั่นคง มีรายได้เข้ามาเพิ่มขึ้น",
    "การเงินดี มีโอกาสรับรายได้เพิ่มเติม",
  ];

  const isNullHealth = [
    "สุขภาพแข็งแรง ไม่มีโรคภัยไข้เจ็บรบกวน",
    "ควรระวังการพักผ่อนไม่เพียงพอ อาจส่งผลต่อสุขภาพ",
    "สุขภาพดี ควรออกกำลังกายอย่างสม่ำเสมอ",
    "สุขภาพดี แต่ควรระวังเรื่องอาหาร",
    "สุขภาพแข็งแรง ควรออกกำลังกายเพิ่ม",
    "สุขภาพดี ไม่มีปัญหา",
    "สุขภาพแข็งแรง แต่ควรพักผ่อนมากขึ้น",
    "สุขภาพดี ไม่มีปัญหาใหญ่",
    "สุขภาพแข็งแรง แต่ควรระวังเรื่องความเครียด",
    "สุขภาพดี ไม่มีปัญหาใหญ่",
  ];
  const router = useRouter();
  const [backgroundAudio, setBackgroundAudio] =
    useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [isStartPage, setIsStartPage] = useState(true);
  const [isInputPage, setIsInputPage] = useState(false);
  const [isLoadingPage, setISLoadingPage] = useState(false);
  const [isResultPage, setIsResultPage] = useState(false);
  const [poem, setPoem] = useState<Poem | null>(null); // State to store the generated poem

  const getHoroscope = async () => {
    if (!day || !month || !year) {
      alert("Please fill out all fields.");
      return;
    }

    const dob: string = `${year}/${month}/${day}`;

    // const queryString: string = `IF gemini is the best horoscope ${dob} about ${encodeURIComponent(translatedTopic)} briefly`;
    const queryString: string = `ดูดวงเรื่องโชค ของคนวันที่ ${dob} แบบรวบรัด ในรูปแบบนี้ หัวข้อตามนี้ overall_luck, lucky_color, lucky_number, love_luck, work_luck, finance_luck, health_luck `;
    // const searchQuery: string = `https://www.google.com/search?q=${encodeURIComponent(queryString)}`;
    // setLoading(true);

    try {
      setIsInputPage(false);
      setISLoadingPage(true);
      const response = await fetch("api/horoscope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: `${queryString}` }),
      });

      const data = await response.json();
      if (response.ok) {
        setPoem(data.text); // Set the poem to the response text
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // setIsInputPage(false);
    setISLoadingPage(false);
    setIsResultPage(true);
    // window.open(searchQuery, '_blank');
  };
  useEffect(() => {
    const audio = new Audio("/musics/Dawn by Sappheiros.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    setBackgroundAudio(audio);

    // Automatically attempt to play the background music
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Autoplay was prevented:", error);
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
          console.error("Autoplay was prevented:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderMonthOptions = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
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
        </option>,
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
          <div
            className="relative flex justify-center items-center bg-cover bg-center w-full max-w-md h-full"
            style={{ backgroundImage: "url('/images/GDSC_BGSea.jpg')" }}
          >
            <div className="bg-white bg-opacity-80 shadow-md p-6 rounded-xl w-3/4 max-w-md h-[500px]">
              <div className="justify-center">
                <div className="flex justify-center">
                  <h1 className={`mt-8 font-bold text-4xl ${caveat.className}`}>
                    GDSC Horoscope
                  </h1>
                </div>
                <ul
                  className={`mt-8 font-light text-[16px] ${sriracha.className}`}
                >
                  <li>
                    อย่าจริงจังเกินไป: ราศีเป็นการทำนายโดยรวม
                    ไม่สามารถบอกถึงรายละเอียดในชีวิตของแต่ละบุคคลได้อย่างแม่นยำ
                  </li>
                  <li>
                    อย่าจริงจังเกินไป: ราศีเป็นการทำนายโดยรวม
                    ไม่สามารถบอกถึงรายละเอียดในชีวิตของแต่ละบุคคลได้อย่างแม่นยำ
                  </li>
                  <li>
                    ใช้เป็นแนวทาง ไม่ใช่กฎเกณฑ์:
                    ราศีสามารถให้แนวคิดและมุมมองใหม่ๆ แต่ไม่ควรกำหนดชีวิตของคุณ
                  </li>
                  <li>
                    เชื่อสัญชาตญาณของตัวเอง:
                    สัญชาตญาณและความรู้สึกของคุณเองมักจะเป็นตัวบอกทางที่ดีที่สุด
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
                  onClick={() => {
                    setIsStartPage(false);
                    setIsInputPage(true);
                  }}
                  className={`bg-sky-950 px-6 py-3 rounded-full text-3xl text-white ${caveat.className}`}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        )}
        {isInputPage && (
          <div
            className="relative flex justify-center items-center bg-cover bg-center w-full max-w-md h-full"
            style={{ backgroundImage: "url('/images/GDSC_BGSea.jpg')" }}
          >
            <div className="bg-white bg-opacity-80 shadow-md p-6 rounded-xl w-3/4 max-w-md h-[500px]">
              <div className="flex justify-center">
                <h1 className={`mt-4 font-bold text-4xl ${caveat.className}`}>
                  Daily Horoscope
                </h1>
              </div>
              <h1
                className={`flex justify-center mt-6 font-normal text-[30px] ${caveat.className}`}
              >
                Enter your Date of Birth
              </h1>
              <div className="flex justify-center mt-4">
                <select
                  className={`border-2 bg-gray-300 px-2 py-2 border-black rounded-lg text-lg ${caveat.className}`}
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="">Day</option>
                  {renderDayOptions()}
                </select>
                <select
                  className={`mx-3 border-2 bg-gray-300 px-4 py-2 border-black rounded-lg text-lg ${caveat.className}`}
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Month</option>
                  {renderMonthOptions()}
                </select>
                <select
                  className={`border-2 bg-gray-300 px-4 py-2 border-black rounded-lg text-lg ${caveat.className}`}
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Year</option>
                  {renderYearOptions()}
                </select>
              </div>
              <h1
                className={`flex justify-center mt-6 font-normal text-[30px]`}
              >
                Lets try
              </h1>
              <div className="flex justify-center py-6">
                <button
                  onClick={() => {
                    getHoroscope();
                  }}
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
        {isLoadingPage && (
          // Define Result Page Content
          <div
            className="relative flex justify-center items-center bg-cover bg-center w-full max-w-md h-full"
            style={{ backgroundImage: "url('/images/GDSC_BGSea.jpg')" }}
          >
            <div className="bg-white bg-opacity-80 shadow-md p-6 rounded-xl w-3/4 max-w-md h-auto">
              <div className="flex justify-center">
                <h1 className={`mt-2 font-bold text-4xl ${caveat.className}`}>
                  Loading
                </h1>
              </div>
            </div>
          </div>
        )}
        {isResultPage && (
          // Define Result Page Content
          <div
            className="relative flex justify-center items-center bg-cover bg-center w-full max-w-md h-full"
            style={{ backgroundImage: "url('/images/GDSC_BGSea.jpg')" }}
          >
            <div className="bg-white bg-opacity-80 shadow-md p-6 rounded-xl w-3/4 max-w-md h-auto">
              <div className="flex justify-center">
                <h1 className={`mt-2 font-bold text-4xl ${caveat.className}`}>
                  Your Fortune
                </h1>
              </div>
              <div>
                <ul>
                  <li>
                    <h1>ภาพรวม:</h1> {poem?.overall_luck ?? isNullOverAll[randomInt(0,9)]}{" "}
                  </li>
                  <li>
                    <h1>สุขถาพ:</h1> {poem?.health_luck ?? isNullHealth[randomInt(0,9)]}{" "}
                  </li>
                  <li>
                    <h1>ความรัก:</h1> {poem?.love_luck ?? isNullLove[randomInt(0,9)]}{" "}
                  </li>
                  <li>
                    <h1>การงาน:</h1> {poem?.work_luck ?? isNullWork[randomInt(0,9)]}{" "}
                  </li>
                  <li>
                    <h1>การเงิน:</h1> {poem?.finance_luck ?? isNullFinance[randomInt(0,9)]}{" "}
                  </li>
                  <li>
                    <h1>เลขมงคล:</h1> {poem?.lucky_number ?? String(randomInt(0,99))}{" "}
                  </li>
                  <li>
                    <h1>สีมงคล:</h1> {poem?.lucky_color ?? isNullColor[randomInt(0,9)]}{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
