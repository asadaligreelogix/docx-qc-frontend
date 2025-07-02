import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="w-full bg-white dark:bg-zinc-900 shadow flex items-center justify-between px-6 py-4 mb-4">
      <div className="flex items-center gap-2">
        <SparklesIcon className="h-7 w-7 text-blue-600" />
        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">DOCX QC Checker</span>
      </div>
      <div>
        <Link href="/health" className="text-blue-600 hover:underline font-medium">Health</Link>
      </div>
    </nav>
  );
} 