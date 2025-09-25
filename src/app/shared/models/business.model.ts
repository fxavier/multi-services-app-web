export interface OpenHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Business {
  id: number;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  image: string;
  logo?: string;
  avatar?: string;
  rating: number;
  reviews: number;
  deliveryTime?: string;
  deliveryFee?: number;
  minOrder?: number;
  description: string;
  address?: string;
  location?: string;
  phone: string;
  emergency?: string;
  openHours?: OpenHours;
  services?: string[];
  experience?: string;
  featured: boolean;
  verified: boolean;
  tags: string[];
  specialties?: string[];
  certificates?: string[];
  responseTime?: string;
  hourlyRate?: number;
  dailyRate?: number;
  priceRange?: string;
}

export interface LojaResponse {
  lojas: Business[];
}

export interface RestauranteResponse {
  restaurantes: Business[];
}

export interface FarmaciaResponse {
  farmacias: Business[];
}

export interface ArmazemResponse {
  armazens: Business[];
}

export interface BottleStoreResponse {
  bottleStores: Business[];
}

export interface ComidaDomicilioResponse {
  comidasDomicilio: Business[];
}

export interface ServicoResponse {
  servicos: Business[];
}