import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, catchError } from 'rxjs';
import { of } from 'rxjs';
import { Category, CategoryResponse } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = 'assets/mock-data';
  
  private mockCategories: Category[] = [
    {
      id: 1,
      name: "Lojas",
      slug: "lojas",
      icon: "🛍️",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
      description: "Compre produtos de diversas lojas locais",
      color: "#00B4D8",
      count: 45,
      featured: true
    },
    {
      id: 2,
      name: "Restaurantes",
      slug: "restaurantes",
      icon: "🍽️",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      description: "Descubra os melhores restaurantes da cidade",
      color: "#5F6CAF",
      count: 78,
      featured: true
    },
    {
      id: 3,
      name: "Farmácias",
      slug: "farmacias",
      icon: "💊",
      image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
      description: "Medicamentos e produtos de saúde",
      color: "#1B263B",
      count: 23,
      featured: true
    },
    {
      id: 4,
      name: "Armazéns",
      slug: "armazens",
      icon: "🏢",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      description: "Produtos por atacado e varejo",
      color: "#00B4D8",
      count: 15,
      featured: false
    },
    {
      id: 5,
      name: "Bottle Stores",
      slug: "bottle-stores",
      icon: "🍷",
      image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80",
      description: "Bebidas alcoólicas e não alcoólicas",
      color: "#5F6CAF",
      count: 32,
      featured: false
    },
    {
      id: 6,
      name: "Comidas ao Domicílio",
      slug: "comidas-ao-domicilio",
      icon: "🍱",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
      description: "Entrega de comida rápida e deliciosa",
      color: "#FF6B6B",
      count: 89,
      featured: true
    },
    {
      id: 7,
      name: "Prestação de Serviços",
      slug: "prestacao-servicos",
      icon: "🔧",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
      description: "Profissionais qualificados para todos os serviços",
      color: "#1B263B",
      count: 156,
      featured: false,
      subcategories: [
        {
          id: 61,
          name: "Trabalhos Domésticos",
          slug: "trabalhos-domesticos",
          icon: "🏠",
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
          count: 28
        },
        {
          id: 62,
          name: "Eletricistas",
          slug: "eletricistas",
          icon: "⚡",
          image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80",
          count: 34
        },
        {
          id: 63,
          name: "Mecânicos",
          slug: "mecanicos",
          icon: "🔧",
          image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80",
          count: 22
        }
      ]
    }
  ];

  getCategories(): Observable<Category[]> {
    console.log('CategoryService: Loading categories from', `${this.baseUrl}/categories.json`);
    return this.http.get<CategoryResponse>(`${this.baseUrl}/categories.json`)
      .pipe(
        tap(response => console.log('CategoryService: HTTP response received', response)),
        map(response => {
          console.log('CategoryService: Mapping categories', response.categories);
          return response.categories;
        }),
        catchError(error => {
          console.error('CategoryService: Error loading categories, using mock data', error);
          return of(this.mockCategories);
        })
      );
  }

  getCategoryBySlug(slug: string): Observable<Category | undefined> {
    return this.getCategories().pipe(
      map(categories => categories.find(cat => cat.slug === slug))
    );
  }

  getFeaturedCategories(): Observable<Category[]> {
    return this.getCategories().pipe(
      map(categories => categories.filter(cat => cat.featured))
    );
  }
}