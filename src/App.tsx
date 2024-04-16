import './App.css'
import 'antd/dist/reset.css'
import {Lamp} from "@/components/ui/lamp.tsx";
import {cn} from "@/utils/cn.ts";
import {Navbar} from "@/components/ui/demo/navbar-demo.tsx";
import {BackgroundGradientDemo} from "@/components/ui/demo/background-gradient-demo.tsx";


function App() {


  return (
    <>
      <div
        className={cn(
          "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        )}
      >
        <Navbar className="top-2"/>
        <Lamp/>
        <div className='  flex flex-row gap-10'>
          <BackgroundGradientDemo/>
          <BackgroundGradientDemo/>
          <BackgroundGradientDemo/>
        </div>

        <div className='h-32'></div>
      </div>


    </>
  )
}

export default App
