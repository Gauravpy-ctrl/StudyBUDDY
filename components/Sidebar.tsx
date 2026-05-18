import {
  LayoutDashboard,
  Brain,
  BookOpen,
  FileText,
  BarChart3,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 p-6">

      <h1 className="text-3xl font-bold text-white mb-10">
        StudyBUDDY
      </h1>

      <ul className="space-y-6 text-gray-300">

        <li className="flex items-center gap-3 hover:text-white cursor-pointer">
          <LayoutDashboard size={20} />
          Dashboard
        </li>

        <li className="flex items-center gap-3 hover:text-white cursor-pointer">
          <Brain size={20} />
          AI Chat
        </li>

        <li className="flex items-center gap-3 hover:text-white cursor-pointer">
          <BookOpen size={20} />
          Flashcards
        </li>

        <li className="flex items-center gap-3 hover:text-white cursor-pointer">
          <FileText size={20} />
          Quiz Generator
        </li>

        <li className="flex items-center gap-3 hover:text-white cursor-pointer">
          <BarChart3 size={20} />
          Progress
        </li>

      </ul>

    </div>
  );
}