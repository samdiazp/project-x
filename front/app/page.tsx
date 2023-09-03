import Generate from "./components/Generate";
import Validate from "./components/Validate";
import Registers from "./components/Registers";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-col items-center justify-between'>
        <div className="flex items-center gap-4">
          <Validate />
          <Generate />
        </div>
        <Registers />
      </div>
    </main>
  )
}
