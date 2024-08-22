"use client";
import { useEffect } from 'react';
import Image from 'next/image';


export default function ResultPage() {
  const query = new URLSearchParams(window.location.search);
  const personalityType = query.get('type') || 'unknown';
  const soundFile = query.get('sound') || '';

  useEffect(() => {
    if (soundFile) {
      const audio = new Audio(`/musics/${soundFile}.mp3`);
      audio.play().catch((error) => {
        console.error('Autoplay was prevented:', error);
      });
    }
  }, [soundFile]);

  return (
    <div className="flex justify-center bg-white h-screen">
    <div
      className="flex flex-col justify-center items-center bg-white bg-cover bg-center w-full max-w-md h-full"
      style={{ backgroundImage: "url('/images/Magical_Record_Shop.png')" }}
    >
      <div className="flex flex-col items-center bg-white opacity-90 shadow-md p-6 rounded-xl w-3/4 max-w-md">
        <h1 className="mb-4 font-bold text-2xl text-center">Recommend: {personalityType}</h1>
        <div className="flex flex-col items-center">
          <Image
            src="/images/Poster design (1).png"
            width={200}
            height={200}
            alt="pic"
          />
          <button
            className="bg-purple-600 hover:bg-purple-700 mt-6 px-4 py-2 rounded-lg font-semibold text-white"
            onClick={() => window.location.href = '/'}
          >
            Take the Quiz Again
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
