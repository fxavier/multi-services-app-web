export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
  brand?: string;
  inStock: boolean;
  discount?: number;
  rating?: number;
  reviews?: number;
  tags: string[];
  specifications?: { [key: string]: string };
}

export interface MenuCategory {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
  allergens?: string[];
  calories?: number;
  preparationTime?: string;
}

export interface RestaurantMenu {
  restaurantId: number;
  categories: MenuCategory[];
}

export interface ServiceProvider {
  id: number;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  avatar: string;
  rating: number;
  reviews: number;
  hourlyRate?: number;
  fixedPrice?: number;
  location: string;
  phone: string;
  experience: string;
  services: string[];
  verified: boolean;
  responseTime: string;
  availability: string[];
  portfolio?: string[];
  certificates?: string[];
}

export interface ProductResponse {
  products: Product[];
}

export interface MenuResponse {
  menu: RestaurantMenu;
}

export interface ServiceResponse {
  services: ServiceProvider[];
}