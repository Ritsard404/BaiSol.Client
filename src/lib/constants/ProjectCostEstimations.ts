
export interface Option {
  kWCapacity: string;
  cost: string; 
  value: number;
}

export interface SystemType {
  type: string;
  options: Option[];
}

export const ProjectDescriptionSystemType: SystemType[] = [
  {
    type: "OFF-GRID SYSTEM",
    options: [
      { kWCapacity: "1 kW", cost: "120,000.00", value: 1 }, 
      { kWCapacity: "3 kW", cost: "210,000.00", value: 3 }, 
      { kWCapacity: "5 kW", cost: "350,000.00", value: 5 },
    ],
  },
  {
    type: "GRID-TIE SYSTEM",
    options: [
      { kWCapacity: "3 kW", cost: "180,000.00", value: 3 },
      { kWCapacity: "5 kW", cost: "250,000.00", value: 5 },
      { kWCapacity: "8 kW", cost: "450,000.00", value: 8 },
      { kWCapacity: "10 kW", cost: "550,000.00", value: 10 },
      { kWCapacity: "15 kW", cost: "680,000.00", value: 15 },
      { kWCapacity: "20 kW", cost: "800,000.00", value: 20 },
    ],
  },
  {
    type: "HYBRID SYSTEM",
    options: [
      { kWCapacity: "3 kW", cost: "350,000.00", value: 3 },
      { kWCapacity: "5 kW", cost: "480,000.00", value: 5 },
      { kWCapacity: "8 kW", cost: "650,000.00", value: 8 },
      { kWCapacity: "10 kW", cost: "850,000.00", value: 10 },
      { kWCapacity: "12 kW", cost: "1,050,000.00", value: 12 },
      { kWCapacity: "15 kW", cost: "1,200,000.00", value: 15 },
    ],
  },
];
