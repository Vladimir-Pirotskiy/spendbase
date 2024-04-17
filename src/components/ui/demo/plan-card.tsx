"use client";
import {BackgroundGradient} from "@/components/ui/background-gradient.tsx";

type PlansProps = {
  plan: {
    img: string;
    title: string;
    description: string;
    price: string;
    status: boolean;
  }
}

export function PlanCard({plan}: PlansProps) {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <img

          src={plan.img}
          alt="jordans"
          height="300"
          width="300"
          className="object-contain"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {plan.title}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {plan.description}

        </p>
        <button
          className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Steak</span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            STBL {plan.price}
          </span>
        </button>
      </BackgroundGradient>
    </div>
  );
}