import { Button } from "@/shared/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-synth-base flex items-center justify-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-synth-accent text-3xl font-bold">Game Tracker</h1>
        <Button className="text-synth-base cursor-pointer" variant="secondary">
          Click Me
        </Button>
      </div>
    </div>
  );
}

export default App;
