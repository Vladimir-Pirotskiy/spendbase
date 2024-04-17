import './App.css'
import 'antd/dist/reset.css'
import {Lamp} from "@/components/ui/lamp.tsx";
import {cn} from "@/utils/cn.ts";
import {Navbar} from "@/components/ui/demo/navbar-demo.tsx";
import {PlanCard} from "@/components/ui/demo/plan-card.tsx";

type PlanType = {
  img: string;
  title: string;
  description: string;
  price: string;
  status: boolean;
}

function App() {

  const plans: PlanType[] = [{
    img: 'src/assets/img/DALL·E-Close-up-of-glowing-slag.webp',
    title: 'SLAG SORTING',
    description: 'APR 18.25% (0.05%) PERIOD WORK 31 START STBL 5,000.00',
    price: '5,000.00',
    status: true
  },
    {
      img: 'src/assets/img/DALL·E-Close-up-of-glowing-slag.webp',
      title: 'SLAG SORTING',
      description: 'APR\n' +
        '34.07%\n' +
        '(0.09%)\n' +
        'PERIOD WORK\n' +
        '99\n' +
        'START\n' +
        'STBL 25,000.00',
      price: '25,000.00',
      status: true
    },
    {
      img: 'src/assets/img/DALL·E-Close-up-of-glowing-slag.webp',
      title: 'SLAG MELTING',
      description: 'APR\n' +
        '73%\n' +
        '(0.2%)\n' +
        'PERIOD WORK\n' +
        '188\n' +
        'START\n' +
        'STBL 50,000.00',
      price: '50,000.00',
      status: true
    },
    {
      img: 'src/assets/img/DALL·E-Close-up-of-glowing-slag.webp',
      title: 'SLAG TRADING',
      description: 'APR\n' +
        '108.28%\n' +
        '(0.3%)\n' +
        'PERIOD WORK\n' +
        '365\n' +
        'START\n' +
        'STBL 89,000.00',
      price: '89,000.00',
      status: true
    },
    {
      img: 'src/assets/img/DALL·E-Close-up-of-glowing-slag.webp',
      title: 'FERRUM MINING',
      description: 'APR 36.5% (0.1%) PERIOD WORK 119 COOPERATION (I) 4.5% START STBL 1,000.00',
      price: '1,000.00',
      status: true
    },
    {
      img: 'src/assets/img/DALL·E-Close-up-of-glowing-slag.webp',
      title: 'FERRUM DELIVERY',
      description: 'APR 109.5% (0.3%) PERIOD WORK 180 COOPERATION (I) 5% START STBL 2,000.00',
      price: '2,000.00',
      status: true
    },
    {
      img: 'src/assets/img/DALL·E-Close-up-of-glowing-slag.webp',
      title: 'FERRUM MELTING',
      description: 'APR 146% (0.4%) PERIOD WORK 250 COOPERATION (III) 5% START STBL 4,777.00',
      price: '4,777.00',
      status: true
    },
    {
      img: 'src/assets/img/DALL·E-Close-up-of-glowing-slag.webp',
      title: 'FERRUM SALES',
      description: 'APR 219% (0.6%) PERIOD WORK 365 COOPERATION (V) 5.5% START STBL 7,500.00',
      price: '7,500.00',
      status: true
    },
    {
      img: 'src/assets/img/DALL·E-Close-up-of-glowing-slag.webp',
      title: 'FERRUM SALES',
      description: 'APR 219% (0.6%) PERIOD WORK 365 COOPERATION (V) 5.5% START STBL 7,500.00',
      price: '7,500.00',
      status: true
    }

  ]


  return (
    <>
      <div
        className={cn(
          "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        )}
      >
        <Navbar className="top-2"/>
        <Lamp/>
        <div className='px-5  flex flex-row gap-10 flex-wrap justify-center '>
          {plans.map((plan: PlanType, index) => (
            <PlanCard plan={plan} key={index}/>
          ))}

        </div>

        <div className='h-32'></div>
      </div>


    </>
  )
}

export default App
