"use client";

import Image from "next/image";

// Define the Choice interfaces
export interface TextChoice {
  type: "text";
  label: string;
  score: { [key: string]: number };
  sound?: string;
}

export interface ImageChoice {
  type: "image";
  src: string;
  alt: string;
  score: { [key: string]: number };
  sound?: string;
}

export type Choice = TextChoice | ImageChoice;

interface ChoiceBoxProps {
  title: string;
  choices: Choice[];
  onChoiceClick?: (choice: Choice) => void;
}

export default function ChoiceBox({
  title,
  choices,
  onChoiceClick,
}: ChoiceBoxProps) {
  return (
    <div className="bg-white bg-opacity-80 shadow-md p-6 rounded-xl w-3/4 max-w-md">
      <h2 className="mb-6 font-bold text-center text-lg text-purple-700">
        {title}
      </h2>
      <div className="space-y-4">
        {choices.map((choice, index) => {
          if (choice.type === "text") {
            // Render text choice
            return (
              <button
                key={index}
                onClick={() => onChoiceClick && onChoiceClick(choice)}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg w-full font-semibold text-white"
              >
                {choice.label}
              </button>
            );
          } else if (choice.type === "image") {
            // Render image choice using next/image
            return (
              <button
                key={index}
                onClick={() => onChoiceClick && onChoiceClick(choice)}
                className="flex justify-center items-center bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg w-full font-semibold text-white"
                aria-label={choice.alt} // Accessible alternative text
              >
                <Image
                  src={choice.src}
                  alt={choice.alt}
                  width={50} // Specify the width
                  height={50} // Specify the height
                  className="rounded-lg"
                />
              </button>
            );
          }
          return null; // To avoid TypeScript error in case of unexpected value
        })}
      </div>
    </div>
  );
}
