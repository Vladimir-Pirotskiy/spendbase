export type TFiles = {
  name: string;
  children?: TFiles[]
}

export type PlanType = {
  img: string;
  title: string;
  description: string;
  price: string;
  status: boolean;
}