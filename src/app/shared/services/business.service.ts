import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap, catchError } from 'rxjs';
import { 
  Business, 
  LojaResponse, 
  RestauranteResponse, 
  FarmaciaResponse, 
  ArmazemResponse, 
  BottleStoreResponse, 
  ServicoResponse 
} from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private http = inject(HttpClient);
  private baseUrl = 'assets/mock-data';

  getBusinessesByCategory(category: string): Observable<Business[]> {
    switch (category) {
      case 'lojas':
        return this.http.get<LojaResponse>(`${this.baseUrl}/lojas.json`)
          .pipe(
            map(response => response.lojas),
            catchError(error => {
              console.error('Error loading lojas:', error);
              return of([]);
            })
          );
      
      case 'restaurantes':
        return this.http.get<RestauranteResponse>(`${this.baseUrl}/restaurantes.json`)
          .pipe(
            map(response => response.restaurantes),
            catchError(error => {
              console.error('Error loading restaurantes:', error);
              return of([]);
            })
          );
      
      case 'farmacias':
        return this.http.get<FarmaciaResponse>(`${this.baseUrl}/farmacias.json`)
          .pipe(map(response => response.farmacias));
      
      case 'armazens':
        return this.http.get<ArmazemResponse>(`${this.baseUrl}/armazens.json`)
          .pipe(map(response => response.armazens));
      
      case 'bottle-stores':
        return this.http.get<BottleStoreResponse>(`${this.baseUrl}/bottle-stores.json`)
          .pipe(map(response => response.bottleStores));
      
      case 'prestacao-servicos':
        return this.http.get<ServicoResponse>(`${this.baseUrl}/servicos.json`)
          .pipe(map(response => response.servicos));
      
      default:
        return of([]);
    }
  }

  getBusinessBySlug(category: string, slug: string): Observable<Business | undefined> {
    return this.getBusinessesByCategory(category).pipe(
      map(businesses => businesses.find(b => b.slug === slug))
    );
  }

  getBusinessesBySubcategory(category: string, subcategory: string): Observable<Business[]> {
    return this.getBusinessesByCategory(category).pipe(
      map(businesses => businesses.filter(b => b.subcategory === subcategory))
    );
  }

  getFeaturedBusinesses(): Observable<Business[]> {
    const categories = ['lojas', 'restaurantes', 'farmacias', 'bottle-stores'];
    const requests = categories.map(cat => 
      this.getBusinessesByCategory(cat).pipe(
        map(businesses => businesses.filter(b => b.featured))
      )
    );
    
    return of(requests).pipe(
      switchMap(reqs => Promise.all(reqs.map(req => req.toPromise()))),
      map(results => results.flat().filter(Boolean) as Business[])
    );
  }

  searchBusinesses(query: string): Observable<Business[]> {
    const categories = ['lojas', 'restaurantes', 'farmacias', 'armazens', 'bottle-stores', 'prestacao-servicos'];
    const lowerQuery = query.toLowerCase();
    
    const requests = categories.map(cat => 
      this.getBusinessesByCategory(cat).pipe(
        map(businesses => businesses.filter(b => 
          b.name.toLowerCase().includes(lowerQuery) ||
          b.description.toLowerCase().includes(lowerQuery) ||
          b.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        ))
      )
    );
    
    return of(requests).pipe(
      switchMap(reqs => Promise.all(reqs.map(req => req.toPromise()))),
      map(results => results.flat().filter(Boolean) as Business[])
    );
  }
}