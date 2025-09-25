import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  Product, 
  RestaurantMenu, 
  ServiceProvider,
  ProductResponse, 
  MenuResponse, 
  ServiceResponse 
} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'assets/mock-data';

  getProductsByCategory(category: string): Observable<Product[]> {
    let fileName = '';
    
    switch (category) {
      case 'lojas':
        fileName = 'produtos-lojas.json';
        break;
      case 'farmacias':
        fileName = 'produtos-farmacias.json';
        break;
      case 'armazens':
        fileName = 'produtos-armazens.json';
        break;
      case 'bottle-stores':
        fileName = 'produtos-bottle-stores.json';
        break;
      default:
        return of([]);
    }

    return this.http.get<ProductResponse>(`${this.baseUrl}/${fileName}`)
      .pipe(
        map(response => response.products),
        catchError(error => {
          console.error(`Error loading products for ${category}:`, error);
          return of(this.getMockProducts(category));
        })
      );
  }

  getRestaurantMenu(restaurantId: number): Observable<RestaurantMenu | null> {
    return this.http.get<MenuResponse>(`${this.baseUrl}/menu-restaurantes.json`)
      .pipe(
        map(response => response.menu),
        catchError(error => {
          console.error('Error loading restaurant menu:', error);
          return of(this.getMockMenu());
        })
      );
  }

  getServiceProviders(): Observable<ServiceProvider[]> {
    return this.http.get<ServiceResponse>(`${this.baseUrl}/prestadores-servicos.json`)
      .pipe(
        map(response => response.services),
        catchError(error => {
          console.error('Error loading service providers:', error);
          return of(this.getMockServiceProviders());
        })
      );
  }

  getServiceProvidersBySubcategory(subcategory: string): Observable<ServiceProvider[]> {
    return this.getServiceProviders().pipe(
      map(providers => providers.filter(p => p.subcategory === subcategory))
    );
  }

  searchProducts(category: string, query: string): Observable<Product[]> {
    return this.getProductsByCategory(category).pipe(
      map(products => products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ))
    );
  }

  private getMockProducts(category: string): Product[] {
    // Fallback mock data for products
    const mockProducts: Product[] = [
      {
        id: 1,
        name: `Produto ${category} 1`,
        description: `Descrição do produto de ${category}`,
        price: 999,
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
        category: category,
        inStock: true,
        tags: [category, "mock"]
      },
      {
        id: 2,
        name: `Produto ${category} 2`,
        description: `Outro produto de ${category}`,
        price: 1299,
        originalPrice: 1499,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
        category: category,
        inStock: true,
        discount: 13,
        tags: [category, "mock", "oferta"]
      }
    ];

    return mockProducts;
  }

  private getMockMenu(): RestaurantMenu {
    return {
      restaurantId: 201,
      categories: [
        {
          id: 1,
          name: "Pratos Principais",
          items: [
            {
              id: 201,
              name: "Camarão à Zambeziana",
              description: "Camarões grelhados com molho piri-piri",
              price: 1450,
              image: "https://images.unsplash.com/photo-1565299585323-38174c4a6c55?w=800&q=80",
              popular: true,
              spicy: true
            }
          ]
        }
      ]
    };
  }

  private getMockServiceProviders(): ServiceProvider[] {
    return [
      {
        id: 1,
        name: "João Silva - Eletricista",
        description: "Eletricista certificado com experiência",
        category: "prestacao-servicos",
        subcategory: "eletricistas",
        avatar: "https://images.unsplash.com/photo-1582896911227-35e204ad6b3a?w=200&q=80",
        rating: 4.8,
        reviews: 234,
        hourlyRate: 200,
        location: "Maputo",
        phone: "+258 84 123 4567",
        experience: "10 anos",
        services: ["Instalações", "Manutenção", "Emergências"],
        verified: true,
        responseTime: "30 min",
        availability: ["Segunda a Sexta: 7h-18h"]
      }
    ];
  }
}