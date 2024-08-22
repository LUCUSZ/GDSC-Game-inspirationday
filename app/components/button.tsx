"use client";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white"
    >
      {text}
    </button>
  );
}
