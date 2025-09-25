import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RestaurantMenu, MenuCategory, MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private mockMenus: Map<number, RestaurantMenu> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Sabor & Arte menu
    this.mockMenus.set(1, {
      restaurantId: 1,
      lastUpdated: new Date(),
      categories: [
        {
          id: 1,
          name: 'Entradas',
          description: 'Deliciosas opções para começar sua refeição',
          displayOrder: 1,
          items: [
            {
              id: 1,
              name: 'Bruschetta Clássica',
              description: 'Torradas com tomate fresco, manjericão e azeite',
              price: 450,
              image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80',
              category: 'Entradas',
              available: true,
              featured: true,
              preparationTime: 10,
              calories: 180
            },
            {
              id: 2,
              name: 'Sopa do Dia',
              description: 'Sopa caseira com ingredientes frescos da estação',
              price: 380,
              image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
              category: 'Entradas',
              available: true,
              preparationTime: 5,
              calories: 220
            },
            {
              id: 3,
              name: 'Salada Caesar',
              description: 'Alface romana, croutons, parmesão e molho caesar',
              price: 520,
              image: 'https://images.unsplash.com/photo-1512852939750-1305098529bf?w=400&q=80',
              category: 'Entradas',
              available: true,
              preparationTime: 8,
              calories: 280
            }
          ]
        },
        {
          id: 2,
          name: 'Pratos Principais',
          description: 'Nossos pratos mais especiais',
          displayOrder: 2,
          items: [
            {
              id: 4,
              name: 'Bife à Portuguesa',
              description: 'Bife grelhado com batatas fritas, ovo e molho especial',
              price: 1250,
              image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80',
              category: 'Pratos Principais',
              available: true,
              featured: true,
              preparationTime: 25,
              calories: 680
            },
            {
              id: 5,
              name: 'Salmão Grelhado',
              description: 'Salmão fresco grelhado com legumes e arroz integral',
              price: 1480,
              image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80',
              category: 'Pratos Principais',
              available: true,
              preparationTime: 20,
              calories: 420
            },
            {
              id: 6,
              name: 'Frango ao Curry',
              description: 'Peito de frango em molho curry com arroz basmati',
              price: 980,
              image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
              category: 'Pratos Principais',
              available: true,
              preparationTime: 18,
              calories: 520
            },
            {
              id: 7,
              name: 'Massa Carbonara',
              description: 'Massa fresca com bacon, ovos e parmesão',
              price: 880,
              image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80',
              category: 'Pratos Principais',
              available: true,
              preparationTime: 15,
              calories: 580
            }
          ]
        },
        {
          id: 3,
          name: 'Sobremesas',
          description: 'Para adoçar o seu dia',
          displayOrder: 3,
          items: [
            {
              id: 8,
              name: 'Pudim Caseiro',
              description: 'Pudim de leite condensado com calda de caramelo',
              price: 320,
              image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80',
              category: 'Sobremesas',
              available: true,
              preparationTime: 5,
              calories: 280
            },
            {
              id: 9,
              name: 'Tiramisù',
              description: 'Sobremesa italiana com café, mascarpone e cacau',
              price: 480,
              image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
              category: 'Sobremesas',
              available: true,
              featured: true,
              preparationTime: 5,
              calories: 380
            },
            {
              id: 10,
              name: 'Cheesecake de Morango',
              description: 'Cheesecake cremoso com calda de morango',
              price: 420,
              image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
              category: 'Sobremesas',
              available: true,
              preparationTime: 5,
              calories: 420
            }
          ]
        },
        {
          id: 4,
          name: 'Bebidas',
          description: 'Bebidas refrescantes e quentes',
          displayOrder: 4,
          items: [
            {
              id: 11,
              name: 'Sumo Natural',
              description: 'Laranja, limão ou maracujá',
              price: 250,
              image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
              category: 'Bebidas',
              available: true,
              preparationTime: 5,
              calories: 120
            },
            {
              id: 12,
              name: 'Refrigerante',
              description: 'Coca-Cola, Fanta ou Sprite',
              price: 180,
              image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80',
              category: 'Bebidas',
              available: true,
              preparationTime: 1,
              calories: 140
            },
            {
              id: 13,
              name: 'Café Expresso',
              description: 'Café brasileiro de alta qualidade',
              price: 120,
              image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80',
              category: 'Bebidas',
              available: true,
              preparationTime: 3,
              calories: 5
            }
          ]
        }
      ]
    });

    // Bistrô do Chef menu
    this.mockMenus.set(2, {
      restaurantId: 2,
      lastUpdated: new Date(),
      categories: [
        {
          id: 1,
          name: 'Tapas e Petiscos',
          description: 'Perfeitos para compartilhar',
          displayOrder: 1,
          items: [
            {
              id: 14,
              name: 'Tábua de Queijos',
              description: 'Seleção de queijos artesanais com geleias',
              price: 680,
              image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80',
              category: 'Tapas e Petiscos',
              available: true,
              featured: true,
              preparationTime: 10,
              calories: 320
            },
            {
              id: 15,
              name: 'Camarões Empanados',
              description: 'Camarões crocantes com molho tártaro',
              price: 780,
              image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&q=80',
              category: 'Tapas e Petiscos',
              available: true,
              preparationTime: 12,
              calories: 280
            }
          ]
        },
        {
          id: 2,
          name: 'Pratos do Chef',
          description: 'Criações exclusivas do nosso chef',
          displayOrder: 2,
          items: [
            {
              id: 16,
              name: 'Risotto de Cogumelos',
              description: 'Risotto cremoso com mix de cogumelos frescos',
              price: 1380,
              image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80',
              category: 'Pratos do Chef',
              available: true,
              featured: true,
              preparationTime: 30,
              calories: 480
            },
            {
              id: 17,
              name: 'Polvo Grelhado',
              description: 'Polvo tenro com batatas ao murro e azeite de ervas',
              price: 1680,
              image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80',
              category: 'Pratos do Chef',
              available: true,
              preparationTime: 35,
              calories: 320
            }
          ]
        }
      ]
    });
  }

  getMenuByRestaurantId(restaurantId: number): Observable<RestaurantMenu | null> {
    const menu = this.mockMenus.get(restaurantId);
    return of(menu || null);
  }

  updateMenuItemAvailability(restaurantId: number, itemId: number, available: boolean): Observable<boolean> {
    const menu = this.mockMenus.get(restaurantId);
    if (menu) {
      for (const category of menu.categories) {
        const item = category.items.find(i => i.id === itemId);
        if (item) {
          item.available = available;
          return of(true);
        }
      }
    }
    return of(false);
  }
}