export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  available: boolean;
  featured?: boolean;
  preparationTime?: number;
  allergens?: string[];
  calories?: number;
}

export interface MenuCategory {
  id: number;
  name: string;
  description?: string;
  items: MenuItem[];
  displayOrder: number;
}

export interface RestaurantMenu {
  restaurantId: number;
  categories: MenuCategory[];
  lastUpdated: Date;
}