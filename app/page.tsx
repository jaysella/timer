import Timer from "@/components/Timer";

export default function Home() {
  const initialSeconds = 30;

  return (
    <main className="flex flex-col items-center min-h-screen p-8 md:justify-center md:p-24">
      <Timer initialSeconds={initialSeconds} />
    </main>
  );
}
