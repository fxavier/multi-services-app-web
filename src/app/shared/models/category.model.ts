export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image: string;
  count: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image: string;
  description: string;
  color: string;
  count: number;
  featured: boolean;
  subcategories?: Subcategory[];
}

export interface CategoryResponse {
  categories: Category[];
}