"use client";

import Sidebar from "@/components/Sidebar";

import { askAI } from "@/services/openrouter";

import { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "@/firebase/config";

import { useRouter } from "next/navigation";

export default function Dashboard() {

  const router = useRouter();

  // TIMER
  const [time, setTime] = useState(25 * 60);

  const [isRunning, setIsRunning] = useState(false);

  // AI CHAT
  const [question, setQuestion] = useState("");

  const [response, setResponse] = useState("");

  // QUIZ
  const [quizTopic, setQuizTopic] = useState("");

  const [quiz, setQuiz] = useState("");

  // FLASHCARDS
  const [flashcardTopic, setFlashcardTopic] = useState("");

  const [flashcards, setFlashcards] = useState("");

  // NOTES
  const [notesInput, setNotesInput] = useState("");

  const [simplifiedNotes, setSimplifiedNotes] = useState("");

  // ANALYTICS
  const [quizCount, setQuizCount] = useState(0);

  const [flashcardCount, setFlashcardCount] = useState(0);

  const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (!user) {

        router.push("/auth");

      }

    });

    let timer: NodeJS.Timeout;

    if (isRunning && time > 0) {

      timer = setInterval(() => {

        setTime((prev) => prev - 1);

      }, 1000);

    }

    return () => {

      clearInterval(timer);

      unsubscribe();

    };

  }, [isRunning, time, router]);

  const minutes = Math.floor(time / 60);

  const seconds = time % 60;

  // AI CHAT
  const handleAskAI = async () => {

    if (!question) return;

    const answer = await askAI(question);

    setResponse(answer);

  };

  // QUIZ
  const handleGenerateQuiz = async () => {

    if (!quizTopic) return;

    const prompt = `
Generate 5 multiple choice questions on ${quizTopic}.

Format:

Question
A)
B)
C)
D)

Correct Answer:
`;

    const answer = await askAI(prompt);

    setQuiz(answer);

    setQuizCount((prev) => prev + 1);

  };

  // FLASHCARDS
  const handleGenerateFlashcards = async () => {

    if (!flashcardTopic) return;

    const prompt = `
Create 5 flashcards on ${flashcardTopic}.

Format:
Q: question
A: answer
`;

    const answer = await askAI(prompt);

    setFlashcards(answer);

    setFlashcardCount((prev) => prev + 1);

  };

  // NOTES
  const handleSimplifyNotes = async () => {

    if (!notesInput) return;

    const prompt = `
Simplify these notes in easy student-friendly language:

${notesInput}
`;

    const answer = await askAI(prompt);

    setSimplifiedNotes(answer);

    setNotesCount((prev) => prev + 1);

  };

  // CHART DATA

  const chartData = [
    {
      name: "Quizzes",
      value: quizCount,
    },
    {
      name: "Flashcards",
      value: flashcardCount,
    },
    {
      name: "Notes",
      value: notesCount,
    },
  ];

  return (

    <div className="flex min-h-screen bg-black text-white">

      <Sidebar />

      <main className="flex-1 p-8">

        {/* HEADER */}

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="text-gray-400 mt-2">
              Your AI-powered learning assistant
            </p>

          </div>

          <button
            onClick={() => {
              signOut(auth);
              router.push("/auth");
            }}
            className="bg-white text-black px-5 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

        {/* TOP CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* DAILY GOAL */}

          <div className="bg-zinc-900 p-6 rounded-2xl">

            <h2 className="text-xl font-semibold">
              Daily Goal
            </h2>

            <p className="mt-4 text-3xl font-bold">
              75%
            </p>

            <p className="text-gray-400 mt-2">
              Complete DBMS Notes
            </p>

          </div>

          {/* STUDY STREAK */}

          <div className="bg-zinc-900 p-6 rounded-2xl">

            <h2 className="text-xl font-semibold">
              Study Streak
            </h2>

            <p className="mt-4 text-3xl font-bold">
              7 Days 🔥
            </p>

            <p className="text-gray-400 mt-2">
              Keep learning daily
            </p>

          </div>

          {/* TIMER */}

          <div className="bg-zinc-900 p-6 rounded-2xl">

            <h2 className="text-xl font-semibold">
              Pomodoro Timer
            </h2>

            <p className="mt-4 text-3xl font-bold">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </p>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className="mt-4 bg-white text-black px-4 py-2 rounded-xl"
            >
              {isRunning ? "Pause" : "Start"}
            </button>

          </div>

        </div>

        {/* PROGRESS DASHBOARD */}

        <div className="mt-10 bg-zinc-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Progress Tracking Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-black p-6 rounded-xl">

              <h3 className="text-gray-400">
                Quizzes Generated
              </h3>

              <p className="text-4xl font-bold mt-2">
                {quizCount}
              </p>

            </div>

            <div className="bg-black p-6 rounded-xl">

              <h3 className="text-gray-400">
                Flashcards Generated
              </h3>

              <p className="text-4xl font-bold mt-2">
                {flashcardCount}
              </p>

            </div>

            <div className="bg-black p-6 rounded-xl">

              <h3 className="text-gray-400">
                Notes Simplified
              </h3>

              <p className="text-4xl font-bold mt-2">
                {notesCount}
              </p>

            </div>

          </div>

          <div className="bg-black rounded-xl p-4 h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={chartData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#ffffff"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* AI CHAT */}

        <div className="mt-10 bg-zinc-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            AI Study Assistant
          </h2>

          <div className="bg-black rounded-xl h-64 p-4 mb-4 overflow-y-auto">

            <div className="mb-4">

              <p className="text-gray-400">
                AI:
              </p>

              <div className="bg-zinc-800 inline-block px-4 py-2 rounded-xl mt-2 max-w-3xl whitespace-pre-wrap">

                {response || "Hello 👋 Ask me any study-related question."}

              </div>

            </div>

          </div>

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Ask AI anything..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none"
            />

            <button
              onClick={handleAskAI}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
            >
              Send
            </button>

          </div>

        </div>

        {/* QUIZ GENERATOR */}

        <div className="mt-10 bg-zinc-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Quiz Generator
          </h2>

          <div className="flex gap-4 mb-6">

            <input
              type="text"
              placeholder="Enter topic..."
              value={quizTopic}
              onChange={(e) => setQuizTopic(e.target.value)}
              className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none"
            />

            <button
              onClick={handleGenerateQuiz}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
            >
              Generate
            </button>

          </div>

          <div className="bg-black rounded-xl p-4 whitespace-pre-wrap">

            {quiz || "Quiz will appear here..."}

          </div>

        </div>

        {/* FLASHCARD GENERATOR */}

        <div className="mt-10 bg-zinc-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Flashcard Generator
          </h2>

          <div className="flex gap-4 mb-6">

            <input
              type="text"
              placeholder="Enter topic..."
              value={flashcardTopic}
              onChange={(e) => setFlashcardTopic(e.target.value)}
              className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none"
            />

            <button
              onClick={handleGenerateFlashcards}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
            >
              Generate
            </button>

          </div>

          <div className="bg-black rounded-xl p-4 whitespace-pre-wrap">

            {flashcards || "Flashcards will appear here..."}

          </div>

        </div>

        {/* NOTES SIMPLIFIER */}

        <div className="mt-10 bg-zinc-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Notes Simplifier
          </h2>

          <textarea
            placeholder="Paste your notes here..."
            value={notesInput}
            onChange={(e) => setNotesInput(e.target.value)}
            className="w-full h-40 bg-black border border-zinc-700 rounded-xl p-4 outline-none mb-4"
          />

          <button
            onClick={handleSimplifyNotes}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold mb-6"
          >
            Simplify Notes
          </button>

          <div className="bg-black rounded-xl p-4 whitespace-pre-wrap">

            {simplifiedNotes || "Simplified notes will appear here..."}

          </div>

        </div>

      </main>

    </div>
  );
}