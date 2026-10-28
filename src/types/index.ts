export interface StandOffering {
  id: string;
  name: string;
  price: string;
  description: string;
  tag?: string;
  icon: string;
}

export interface SquareItem {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  inStock: boolean;
  quantityAvailable: number;
  stockBadge: string;
  category: string;
  icon: string;
  description: string;
  squareLink: string;
}

export interface Supporter {
  id: string;
  name: string;
  amount: number;
  date: string;
  note: string;
}

export interface SquareDonations {
  campaignName: string;
  totalRaised: number;
  goal: number;
  transactionCount: number;
  currency: string;
  recentSupporters: Supporter[];
}

export interface SquareData {
  lastUpdated: string;
  storeUrl: string;
  donateUrl: string;
  inventory: SquareItem[];
  donations: SquareDonations;
}
