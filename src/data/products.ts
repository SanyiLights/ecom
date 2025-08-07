export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  video: string;
  manual: string;
}

export const categories = [
  "Todos",
  "Automatic Lights",
  "Static Lights", 
  "Tv & Studio",
  "Controller",
  "Effect Light",
  "Effect Machine",
];

export const featuredIds = ["1", "6", "11", "15", "22", "27"];