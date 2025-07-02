import Navbar from "@/components/Navbar";
import FileUploadForm from "@/components/FileUploadForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <Navbar />
      <main className="flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-gray-900 dark:text-white">DOCX Quality Control Checker</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-2xl">
          Upload your .docx file to check it against professional quality control rules. Get instant feedback and a detailed report.
        </p>
        <FileUploadForm />
      </main>
    </div>
  );
}
