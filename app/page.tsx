import Timer from "@/components/Timer";

export default function Home() {
  const initialSeconds = 25;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Timer initialSeconds={initialSeconds} />
    </main>
  );
}
