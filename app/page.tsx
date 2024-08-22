"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChoiceBox from './components/choiceBox'; 
import { Choice } from './components/choiceBox';
import { FaPlay, FaPause } from 'react-icons/fa'; // Import play and pause icons

// Define the type for personality roles
type PersonalityType = 'Parrot' | 'Captain' | 'Doctor' | 'Chef' | 'TikToker' | 'SleepyCat' | 'Cannon' | 'Internship' | 'Traveler' | 'Map' | 'Mermaid';

// Define the type for the score object
type Score = {
  [key in PersonalityType]?: number;
};

interface TextChoice {
  type: "text";
  label: string;
  score: Score;
  sound?: string;
}

interface ImageChoice {
  type: "image";
  src: string;
  alt: string;
  score: Score;
  sound?: string;
}

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [personalityScores, setPersonalityScores] = useState<Score>({
    Parrot: 0,
    Captain: 0,
    Doctor: 0,
    Chef: 0,
    TikToker: 0,
    SleepyCat: 0,
    Cannon: 0,
    Internship: 0,
    Traveler: 0,
    Map: 0,
    Mermaid: 0,
  });

  const router = useRouter();
  const [backgroundAudio, setBackgroundAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [specialSelection, setSpecialSelection] = useState(false);

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
      audio.pause();
      audio.currentTime = 0;
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

  const [transitionActive, setTransitionActive] = useState(false);

  const handleChoiceClick = (choice: Choice) => {
    if (choice.type === "text" && choice.label === "เซ็กซี่แม่เสือสาว") {
      setSpecialSelection(true);
    }

    setPersonalityScores((prevScores) => {
      const newScores = { ...prevScores };
      for (const [dimension, points] of Object.entries(choice.score)) {
        // Type assertion to ensure that dimension is a valid key
        const key = dimension as PersonalityType;
        if (newScores.hasOwnProperty(key)) {
          newScores[key] = (newScores[key] || 0) + (points || 0);
        }
      }
      return newScores;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setTransitionActive(true);

      setTimeout(() => {
        if (specialSelection) {
          router.push(`/result?type=fixed&sound=secretSong`);
        } else {
          const maxScore = Math.max(...Object.values(personalityScores));
          const result = Object.keys(personalityScores).find((key): key is PersonalityType => personalityScores[key as PersonalityType] === maxScore) as PersonalityType;
          router.push(`/result?type=${result}&sound=${choice.sound}`);
        }
      }, 2000); // Wait for the transition to complete before navigating
    }
  };

  const questions: { title: string; choices: Choice[] }[] = [
    {
      title: "How do you usually approach challenges?",
      choices: [
        { type: "text", label: "I face them head-on with confidence.", score: { Captain: 1 } },
        { type: "text", label: "I look for creative solutions.", score: { TikToker: 1, Parrot: 1 } },
        { type: "text", label: "I try to help others through the challenge.", score: { Doctor: 1 } },
        { type: "text", label: "I prefer to avoid conflict when I can.", score: { SleepyCat: 1 } },
        { type: "text", label: "I take a moment to reflect before acting.", score: { Traveler: 1, Map: 1 } },
      ],
    },
    {
      title: "What’s your role in a group project?",
      choices: [
        { type: "text", label: "I lead and make decisions.", score: { Captain: 1 } },
        { type: "text", label: "I come up with the most creative ideas.", score: { TikToker: 1, Parrot: 1 } },
        { type: "text", label: "I support and ensure everyone feels heard.", score: { Doctor: 1 } },
        { type: "text", label: "I handle my part diligently.", score: { Internship: 1 } },
        { type: "text", label: "I observe and contribute when necessary.", score: { Internship: 1 } },
      ],
    },
    {
      title: "What do you enjoy most about traveling?",
      choices: [
        { type: "text", label: "Discovering new places and people.", score: { Traveler: 1 } },
        { type: "text", label: "Documenting and sharing my experiences.", score: { TikToker: 1, Parrot: 1 } },
        { type: "text", label: "Helping others along the way.", score: { Doctor: 1 } },
        { type: "text", label: "Finding time to relax and enjoy the moment.", score: { SleepyCat: 1 } },
        { type: "text", label: "Gathering souvenirs and memories for reflection.", score: { Internship: 1 } },
      ],
    },
    {
      title: "What’s your favorite place on a ship?",
      choices: [
        { type: "text", label: "The captain's quarters.", score: { Captain: 1 } },
        { type: "text", label: "The kitchen, where food is always available.", score: { Chef: 1 } },
        { type: "text", label: "The infirmary where I can help others.", score: { Doctor: 1 } },
        { type: "text", label: "The deck with a beautiful view.", score: { Traveler: 1 } },
        { type: "text", label: "The hammock for a good nap.", score: { SleepyCat: 1, Mermaid: 1 } },
      ],
    },
    {
      title: "Which of these best describes your dream adventure?",
      choices: [
        { type: "text", label: "Sailing the seas as a leader.", score: { Captain: 1 } },
        { type: "text", label: "Creating a travel vlog or content.", score: { TikToker: 1, Parrot: 1 } },
        { type: "text", label: "Helping those in need on the journey.", score: { Doctor: 1 } },
        { type: "text", label: "A relaxing vacation with great food.", score: { Chef: 1 } },
        { type: "text", label: "A journey of self-discovery.", score: { Traveler: 1 } },
        { type: "text", label: "Exploring unknown territories with a map.", score: { Map: 1 } },
      ],
    },
    {
      title: "What would you do if your friend was feeling down?",
      choices: [
        { type: "text", label: "Motivate them to keep going.", score: { Captain: 1 } },
        { type: "text", label: "Cheer them up with a funny story.", score: { Parrot: 1, Mermaid: 1 } },
        { type: "text", label: "Take care of them and listen to their problems.", score: { Doctor: 1 } },
        { type: "text", label: "Offer them food or a treat to feel better.", score: { Chef: 1 } },
        { type: "text", label: "Encourage them to take a break and rest.", score: { SleepyCat: 1, Map: 1 } },
      ],
    },
    {
      title: "How do you spend your free time?",
      choices: [
        { type: "text", label: "Organizing or planning something.", score: { Captain: 1, Map: 1 } },
        { type: "text", label: "Making videos or taking pictures.", score: { TikToker: 1, Parrot: 1 } },
        { type: "text", label: "Helping someone with their tasks.", score: { Doctor: 1 } },
        { type: "text", label: "Napping or taking it easy.", score: { SleepyCat: 1 } },
        { type: "text", label: "Reading or journaling.", score: { Traveler: 1 } },
      ],
    },
    {
      title: "How do you react to a crisis?",
      choices: [
        { type: "text", label: "I take charge and give orders.", score: { Captain: 1 } },
        { type: "text", label: "I document what's happening.", score: { TikToker: 1 } },
        { type: "text", label: "I help people stay calm and offer support.", score: { Doctor: 1 } },
        { type: "text", label: "I focus on staying safe and comfortable.", score: { SleepyCat: 1 } },
        { type: "text", label: "I make notes and figure out a plan.", score: { Map: 1 } },
      ],
    },
    {
      title: "What’s your favorite ship activity?",
      choices: [
        { type: "text", label: "Directing the crew and navigating.", score: { Captain: 1 } },
        { type: "text", label: "Creating engaging content for the voyage.", score: { TikToker: 1 } },
        { type: "text", label: "Helping others with health and wellness.", score: { Doctor: 1 } },
        { type: "text", label: "Cooking and serving delicious meals.", score: { Chef: 1 } },
        { type: "text", label: "Relaxing and enjoying the view.", score: { SleepyCat: 1 } },
      ],
    },
  ];

  return (
    <div>
      <div className="flex justify-center bg-white h-screen">
      <div
        className="relative flex justify-center items-center bg-cover bg-center w-full max-w-md h-full"
        style={{ backgroundImage: "url('/images/Magical_Record_Shop.png')" }}
      >
          <ChoiceBox
              key={currentQuestion}
              title={questions[currentQuestion].title} // Add the question title here
              choices={questions[currentQuestion].choices} // Pass the entire array of choices
              onChoiceClick={(choice) => handleChoiceClick(choice)}
          />              
        <button 
          onClick={handlePlayMusic}
          className="top-4 right-4 absolute bg-purple-600 p-2 rounded-full text-white"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className={`fade-to-black ${transitionActive ? 'active' : ''}`}></div>
        
      </div>
      </div>
    </div>
  );
}
