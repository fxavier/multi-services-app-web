import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceCatalog, CatalogCategory, CatalogItem } from '../models/catalog.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private mockCatalogs: Map<string, ServiceCatalog> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Comidas ao Domicílio Catalog
    this.mockCatalogs.set('comidas-ao-domicilio', {
      categoryId: 6,
      categories: [
        {
          id: 1,
          name: 'Pizza',
          description: 'Pizzas tradicionais e gourmet',
          icon: '🍕',
          displayOrder: 1,
          items: [
            {
              id: 1,
              name: 'Pizza Margherita',
              description: 'Molho de tomate, mozzarella, manjericão fresco',
              price: 850,
              image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&q=80',
              category: 'Pizza',
              available: true,
              featured: true,
              tags: ['vegetariano', 'clássica'],
              rating: 4.8,
              reviews: 124,
              preparationTime: 25,
              deliveryFee: 50,
              calories: 650,
              vegetarian: true
            },
            {
              id: 2,
              name: 'Pizza Pepperoni',
              description: 'Molho de tomate, mozzarella, pepperoni',
              price: 980,
              image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
              category: 'Pizza',
              available: true,
              tags: ['carne', 'popular'],
              rating: 4.6,
              reviews: 89,
              preparationTime: 25,
              deliveryFee: 50,
              calories: 720
            },
            {
              id: 3,
              name: 'Pizza Quatro Queijos',
              description: 'Mozzarella, gorgonzola, parmesão, provolone',
              price: 1120,
              image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
              category: 'Pizza',
              available: true,
              featured: true,
              tags: ['queijo', 'gourmet'],
              rating: 4.9,
              reviews: 156,
              preparationTime: 30,
              deliveryFee: 50,
              calories: 780,
              vegetarian: true
            }
          ]
        },
        {
          id: 2,
          name: 'Hambúrgueres',
          description: 'Hambúrgueres artesanais',
          icon: '🍔',
          displayOrder: 2,
          items: [
            {
              id: 4,
              name: 'Hambúrguer Clássico',
              description: 'Carne bovina, alface, tomate, cebola, molho especial',
              price: 680,
              image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
              category: 'Hambúrgueres',
              available: true,
              tags: ['carne', 'clássico'],
              rating: 4.5,
              reviews: 78,
              preparationTime: 20,
              deliveryFee: 45,
              calories: 580
            },
            {
              id: 5,
              name: 'Hambúrguer Duplo',
              description: 'Duas carnes bovinas, queijo, bacon, molho especial',
              price: 950,
              image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?w=400&q=80',
              category: 'Hambúrgueres',
              available: true,
              featured: true,
              tags: ['carne', 'bacon', 'duplo'],
              rating: 4.7,
              reviews: 102,
              preparationTime: 25,
              deliveryFee: 45,
              calories: 820
            },
            {
              id: 6,
              name: 'Hambúrguer Vegetariano',
              description: 'Hambúrguer de grão-de-bico, alface, tomate, abacate',
              price: 620,
              image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&q=80',
              category: 'Hambúrgueres',
              available: true,
              tags: ['vegetariano', 'saudável'],
              rating: 4.3,
              reviews: 45,
              preparationTime: 18,
              deliveryFee: 45,
              calories: 420,
              vegetarian: true
            }
          ]
        },
        {
          id: 3,
          name: 'Sushi & Asiático',
          description: 'Pratos da culinária asiática',
          icon: '🍣',
          displayOrder: 3,
          items: [
            {
              id: 7,
              name: 'Combo Sushi 20 peças',
              description: 'Seleção variada de sushis e sashimis',
              price: 1580,
              image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80',
              category: 'Sushi & Asiático',
              available: true,
              featured: true,
              tags: ['sushi', 'peixe', 'combo'],
              rating: 4.9,
              reviews: 189,
              preparationTime: 35,
              deliveryFee: 60,
              calories: 480
            },
            {
              id: 8,
              name: 'Yakisoba de Frango',
              description: 'Macarrão oriental salteado com frango e legumes',
              price: 780,
              image: 'https://images.unsplash.com/photo-1552526382-7bdf39d8b68b?w=400&q=80',
              category: 'Sushi & Asiático',
              available: true,
              tags: ['macarrão', 'frango', 'oriental'],
              rating: 4.4,
              reviews: 67,
              preparationTime: 20,
              deliveryFee: 55,
              calories: 620
            },
            {
              id: 9,
              name: 'Pad Thai',
              description: 'Macarrão de arroz com camarão, amendoim e molho tamarindo',
              price: 880,
              image: 'https://images.unsplash.com/photo-1559314809-0f31657239cd?w=400&q=80',
              category: 'Sushi & Asiático',
              available: true,
              tags: ['camarão', 'tailandês', 'picante'],
              rating: 4.6,
              reviews: 93,
              preparationTime: 25,
              deliveryFee: 55,
              calories: 580,
              spicy: true
            }
          ]
        },
        {
          id: 4,
          name: 'Doces & Sobremesas',
          description: 'Doces tradicionais e sobremesas',
          icon: '🍰',
          displayOrder: 4,
          items: [
            {
              id: 10,
              name: 'Brigadeiro Gourmet (12 unidades)',
              description: 'Brigadeiros artesanais com diversos sabores',
              price: 480,
              image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80',
              category: 'Doces & Sobremesas',
              available: true,
              featured: true,
              tags: ['doce', 'chocolate', 'brasileiro'],
              rating: 4.8,
              reviews: 234,
              preparationTime: 15,
              deliveryFee: 35,
              calories: 960
            },
            {
              id: 11,
              name: 'Açaí na Tigela',
              description: 'Açaí com granola, banana, morango e mel',
              price: 650,
              image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&q=80',
              category: 'Doces & Sobremesas',
              available: true,
              tags: ['açaí', 'saudável', 'frutas'],
              rating: 4.5,
              reviews: 145,
              preparationTime: 10,
              deliveryFee: 40,
              calories: 380
            },
            {
              id: 12,
              name: 'Bolo de Chocolate',
              description: 'Fatia de bolo de chocolate com cobertura',
              price: 320,
              image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
              category: 'Doces & Sobremesas',
              available: true,
              tags: ['bolo', 'chocolate'],
              rating: 4.4,
              reviews: 89,
              preparationTime: 5,
              deliveryFee: 35,
              calories: 420
            }
          ]
        }
      ],
      lastUpdated: new Date()
    });

    // Prestação de Serviços Catalog
    this.mockCatalogs.set('prestacao-servicos', {
      categoryId: 7,
      categories: [
        {
          id: 1,
          name: 'Trabalhos Domésticos',
          description: 'Serviços para casa e limpeza',
          icon: '🏠',
          displayOrder: 1,
          items: [
            {
              id: 13,
              name: 'Limpeza Residencial Completa',
              description: 'Limpeza completa de casa ou apartamento',
              price: 1200,
              image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
              category: 'Trabalhos Domésticos',
              available: true,
              featured: true,
              tags: ['limpeza', 'casa', 'completo'],
              rating: 4.8,
              reviews: 156,
              preparationTime: 240
            },
            {
              id: 14,
              name: 'Passadoria de Roupas',
              description: 'Serviço de passar roupas (até 20 peças)',
              price: 350,
              image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80',
              category: 'Trabalhos Domésticos',
              available: true,
              tags: ['passadoria', 'roupas'],
              rating: 4.6,
              reviews: 89,
              preparationTime: 120
            },
            {
              id: 15,
              name: 'Organização de Guarda-roupas',
              description: 'Organização e arrumação de closets e guarda-roupas',
              price: 450,
              image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
              category: 'Trabalhos Domésticos',
              available: true,
              tags: ['organização', 'closet'],
              rating: 4.9,
              reviews: 67,
              preparationTime: 180
            }
          ]
        },
        {
          id: 2,
          name: 'Eletricistas',
          description: 'Serviços elétricos residenciais',
          icon: '⚡',
          displayOrder: 2,
          items: [
            {
              id: 16,
              name: 'Instalação de Tomadas',
              description: 'Instalação de tomadas 110V ou 220V',
              price: 120,
              image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80',
              category: 'Eletricistas',
              available: true,
              tags: ['tomada', 'instalação', 'elétrica'],
              rating: 4.7,
              reviews: 203,
              preparationTime: 60
            },
            {
              id: 17,
              name: 'Troca de Disjuntores',
              description: 'Substituição de disjuntores no quadro elétrico',
              price: 180,
              image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80',
              category: 'Eletricistas',
              available: true,
              featured: true,
              tags: ['disjuntor', 'quadro elétrico'],
              rating: 4.8,
              reviews: 134,
              preparationTime: 90
            },
            {
              id: 18,
              name: 'Instalação de Lustre',
              description: 'Instalação de lustres e luminárias de teto',
              price: 250,
              image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&q=80',
              category: 'Eletricistas',
              available: true,
              tags: ['lustre', 'luminária', 'teto'],
              rating: 4.6,
              reviews: 78,
              preparationTime: 120
            }
          ]
        },
        {
          id: 3,
          name: 'Mecânicos',
          description: 'Serviços automotivos',
          icon: '🔧',
          displayOrder: 3,
          items: [
            {
              id: 19,
              name: 'Troca de Óleo do Motor',
              description: 'Troca de óleo e filtro (óleo mineral)',
              price: 350,
              image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&q=80',
              category: 'Mecânicos',
              available: true,
              featured: true,
              tags: ['óleo', 'motor', 'manutenção'],
              rating: 4.9,
              reviews: 267,
              preparationTime: 45
            },
            {
              id: 20,
              name: 'Alinhamento e Balanceamento',
              description: 'Serviço completo de alinhamento e balanceamento',
              price: 180,
              image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&q=80',
              category: 'Mecânicos',
              available: true,
              tags: ['alinhamento', 'balanceamento', 'pneus'],
              rating: 4.5,
              reviews: 145,
              preparationTime: 90
            },
            {
              id: 21,
              name: 'Diagnóstico Eletrônico',
              description: 'Diagnóstico completo do sistema eletrônico do veículo',
              price: 120,
              image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&q=80',
              category: 'Mecânicos',
              available: true,
              tags: ['diagnóstico', 'eletrônico'],
              rating: 4.7,
              reviews: 189,
              preparationTime: 60
            }
          ]
        },
        {
          id: 4,
          name: 'Jardinagem',
          description: 'Cuidados com jardins e plantas',
          icon: '🌱',
          displayOrder: 4,
          items: [
            {
              id: 22,
              name: 'Poda de Árvores',
              description: 'Poda técnica de árvores de pequeno e médio porte',
              price: 280,
              image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
              category: 'Jardinagem',
              available: true,
              tags: ['poda', 'árvores'],
              rating: 4.6,
              reviews: 78,
              preparationTime: 120
            },
            {
              id: 23,
              name: 'Plantio de Grama',
              description: 'Plantio e preparação de gramado (por m²)',
              price: 45,
              image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
              category: 'Jardinagem',
              available: true,
              featured: true,
              tags: ['grama', 'plantio', 'jardim'],
              rating: 4.8,
              reviews: 134,
              preparationTime: 180
            },
            {
              id: 24,
              name: 'Manutenção de Jardim',
              description: 'Limpeza e manutenção geral do jardim',
              price: 150,
              image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80',
              category: 'Jardinagem',
              available: true,
              tags: ['manutenção', 'limpeza', 'jardim'],
              rating: 4.5,
              reviews: 93,
              preparationTime: 150
            }
          ]
        }
      ],
      lastUpdated: new Date()
    });
  }

  getCatalogByCategory(categorySlug: string): Observable<ServiceCatalog | null> {
    const catalog = this.mockCatalogs.get(categorySlug);
    return of(catalog || null);
  }

  searchItems(categorySlug: string, query: string): Observable<CatalogItem[]> {
    const catalog = this.mockCatalogs.get(categorySlug);
    if (!catalog) return of([]);

    const results: CatalogItem[] = [];
    catalog.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) {
          results.push(item);
        }
      });
    });

    return of(results);
  }

  getFeaturedItems(categorySlug: string): Observable<CatalogItem[]> {
    const catalog = this.mockCatalogs.get(categorySlug);
    if (!catalog) return of([]);

    const results: CatalogItem[] = [];
    catalog.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.featured) {
          results.push(item);
        }
      });
    });

    return of(results);
  }

  getItemsBySubcategory(categorySlug: string, subcategory: string): Observable<CatalogItem[]> {
    const catalog = this.mockCatalogs.get(categorySlug);
    if (!catalog) return of([]);

    const categoryData = catalog.categories.find(cat => 
      cat.name.toLowerCase() === subcategory.toLowerCase()
    );

    return of(categoryData ? categoryData.items : []);
  }
}