import Generate from "./components/Generate";
import Validate from "./components/Validate";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-row items-center justify-between w-1/2'>
        <Validate />
        <Generate />
      </div>
    </main>
  )
}
