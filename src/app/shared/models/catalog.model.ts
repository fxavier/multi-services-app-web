export interface CatalogItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  available: boolean;
  featured?: boolean;
  tags: string[];
  rating?: number;
  reviews?: number;
  preparationTime?: number;
  deliveryFee?: number;
  minOrder?: number;
  allergens?: string[];
  calories?: number;
  spicy?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
}

export interface CatalogCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  items: CatalogItem[];
  displayOrder: number;
}

export interface ServiceCatalog {
  categoryId: number;
  businessId?: number;
  categories: CatalogCategory[];
  lastUpdated: Date;
}