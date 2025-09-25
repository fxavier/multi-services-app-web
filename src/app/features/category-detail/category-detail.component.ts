import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { Category } from '../../shared/models/category.model';
import { Product, RestaurantMenu, ServiceProvider } from '../../shared/models/product.model';
import { RestaurantMenu as RestaurantMenuModel } from '../../shared/models/menu.model';
import { PharmacyInventory } from '../../shared/models/medication.model';
import { ServiceCatalog } from '../../shared/models/catalog.model';
import { MenuService } from '../../shared/services/menu.service';
import { MedicationService } from '../../shared/services/medication.service';
import { CatalogService } from '../../shared/services/catalog.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { MenuItemCardComponent } from '../../shared/components/menu-item-card/menu-item-card.component';
import { ServiceProviderCardComponent } from '../../shared/components/service-provider-card/service-provider-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MenuItemCardComponent, ServiceProviderCardComponent, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header with Category Info -->
      @if (category()) {
        <div class="relative h-64 overflow-hidden">
          <img 
            [src]="category()!.image" 
            [alt]="category()!.name"
            class="h-full w-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <div class="container mx-auto">
              <div class="flex items-center gap-4 text-white">
                <a routerLink="/categorias" class="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </a>
                <div>
                  <div class="text-5xl">{{category()!.icon}}</div>
                </div>
                <div>
                  <h1 class="text-3xl font-bold">{{category()!.name}}</h1>
                  <p class="text-lg opacity-90">{{category()!.description}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <div class="container mx-auto px-4 py-8">
        <!-- Search Bar -->
        <div class="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <div class="flex gap-4">
            <div class="flex-1">
              <input 
                type="text"
                [(ngModel)]="searchTerm"
                placeholder="Pesquisar..."
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#00B4D8] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/20"
              >
            </div>
            <button class="rounded-lg bg-[#00B4D8] px-6 py-2 text-white hover:bg-[#0096B7]">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>

          <!-- Subcategories for services -->
          @if (categorySlug === 'prestacao-servicos' && category()?.subcategories) {
            <div class="mt-4">
              <div class="flex flex-wrap gap-2">
                <button 
                  (click)="selectedSubcategory.set('')"
                  [class.bg-[#00B4D8]]="!selectedSubcategory()"
                  [class.text-white]="!selectedSubcategory()"
                  [class.bg-gray-100]="selectedSubcategory()"
                  class="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-[#00B4D8] hover:text-white"
                >
                  Todos
                </button>
                @for (sub of category()!.subcategories!; track sub.id) {
                  <button 
                    (click)="selectedSubcategory.set(sub.slug)"
                    [class.bg-[#00B4D8]]="selectedSubcategory() === sub.slug"
                    [class.text-white]="selectedSubcategory() === sub.slug"
                    [class.bg-gray-100]="selectedSubcategory() !== sub.slug"
                    class="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-[#00B4D8] hover:text-white"
                  >
                    {{sub.icon}} {{sub.name}}
                  </button>
                }
              </div>
            </div>
          }
        </div>

        <!-- Loading State -->
        @if (loading()) {
          <div class="flex items-center justify-center py-20">
            <div class="h-12 w-12 animate-spin rounded-full border-4 border-[#00B4D8] border-t-transparent"></div>
          </div>
        }

        <!-- Restaurant Menu -->
        @if (categorySlug === 'restaurantes' && newRestaurantMenu() && !loading()) {
          <div class="space-y-8">
            @for (menuCategory of newRestaurantMenu()!.categories; track menuCategory.id) {
              <div class="rounded-xl bg-white p-6 shadow-sm">
                <h2 class="mb-4 text-2xl font-bold text-gray-900">{{menuCategory.name}}</h2>
                @if (menuCategory.description) {
                  <p class="mb-6 text-gray-600">{{menuCategory.description}}</p>
                }
                <div class="grid gap-4 md:grid-cols-2">
                  @for (item of menuCategory.items; track item.id) {
                    <div class="rounded-lg border border-gray-200 overflow-hidden hover:border-[#00B4D8] hover:shadow-lg transition-all">
                      @if (item.image) {
                        <img [src]="item.image" [alt]="item.name" class="w-full h-32 object-cover">
                      }
                      <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                          <h3 class="font-semibold text-lg">{{item.name}}</h3>
                          <span class="text-[#00B4D8] font-bold">{{(item.price / 100) | currency:'MZN ':'symbol':'1.2-2'}}</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-3">{{item.description}}</p>
                        <div class="flex items-center gap-4 text-xs text-gray-500">
                          @if (item.preparationTime) {
                            <span class="flex items-center gap-1">⏱️ {{item.preparationTime}} min</span>
                          }
                          @if (item.calories) {
                            <span class="flex items-center gap-1">🔥 {{item.calories}} cal</span>
                          }
                          @if (!item.available) {
                            <span class="text-red-500 font-semibold">Indisponível</span>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        }

        <!-- Pharmacy Inventory -->
        @if (categorySlug === 'farmacias' && pharmacyInventory() && !loading()) {
          <div class="space-y-8">
            @for (category of pharmacyInventory()!.categories; track category.id) {
              <div class="rounded-xl bg-white p-6 shadow-sm">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-3xl">{{category.icon}}</span>
                  <div>
                    <h2 class="text-2xl font-bold text-gray-900">{{category.name}}</h2>
                    @if (category.description) {
                      <p class="text-gray-600">{{category.description}}</p>
                    }
                  </div>
                </div>
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  @for (med of category.medications; track med.id) {
                    <div class="rounded-lg border border-gray-200 p-4 hover:border-[#00B4D8] hover:shadow-sm transition-all">
                      <div class="flex justify-between items-start mb-2">
                        <h3 class="font-semibold">{{med.name}}</h3>
                        @if (med.prescriptionRequired) {
                          <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Receita</span>
                        }
                      </div>
                      @if (med.genericName) {
                        <p class="text-sm text-gray-500 mb-1">Genérico: {{med.genericName}}</p>
                      }
                      <p class="text-sm text-gray-600 mb-3">{{med.description}}</p>
                      <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-[#00B4D8]">{{med.price | currency:'MZN ':'symbol':'1.2-2'}}</span>
                        @if (med.inStock) {
                          <span class="text-green-600 text-sm font-semibold">Em estoque</span>
                        } @else {
                          <span class="text-red-600 text-sm font-semibold">Fora de estoque</span>
                        }
                      </div>
                      @if (med.manufacturer || med.dosage || med.packaging) {
                        <div class="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                          @if (med.manufacturer) {
                            <div>Fabricante: {{med.manufacturer}}</div>
                          }
                          @if (med.dosage) {
                            <div>Dosagem: {{med.dosage}}</div>
                          }
                          @if (med.packaging) {
                            <div>{{med.packaging}}</div>
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        }

        <!-- Food Delivery Catalog -->
        @if (categorySlug === 'comidas-ao-domicilio' && serviceCatalog() && !loading()) {
          <div class="space-y-8">
            @for (category of serviceCatalog()!.categories; track category.id) {
              <div class="rounded-xl bg-white p-6 shadow-sm">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-3xl">{{category.icon}}</span>
                  <div>
                    <h2 class="text-2xl font-bold text-gray-900">{{category.name}}</h2>
                    @if (category.description) {
                      <p class="text-gray-600">{{category.description}}</p>
                    }
                  </div>
                </div>
                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  @for (item of category.items; track item.id) {
                    <div class="rounded-lg border border-gray-200 overflow-hidden hover:border-[#00B4D8] hover:shadow-lg transition-all">
                      <img [src]="item.image" [alt]="item.name" class="w-full h-40 object-cover">
                      <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                          <h3 class="font-semibold text-lg">{{item.name}}</h3>
                          @if (item.featured) {
                            <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Destaque</span>
                          }
                        </div>
                        <p class="text-gray-600 text-sm mb-3">{{item.description}}</p>
                        <div class="flex justify-between items-center mb-3">
                          <span class="text-lg font-bold text-[#00B4D8]">{{(item.price / 100) | currency:'MZN ':'symbol':'1.2-2'}}</span>
                          @if (item.rating) {
                            <div class="flex items-center gap-1">
                              <span class="text-yellow-500">★</span>
                              <span class="text-sm text-gray-600">{{item.rating}} ({{item.reviews}})</span>
                            </div>
                          }
                        </div>
                        <div class="flex flex-wrap gap-2 text-xs">
                          @if (item.preparationTime) {
                            <span class="bg-gray-100 px-2 py-1 rounded">⏱️ {{item.preparationTime}} min</span>
                          }
                          @if (item.deliveryFee) {
                            <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded">🚚 {{(item.deliveryFee / 100) | currency:'MZN ':'symbol':'1.0-0'}}</span>
                          }
                          @if (item.vegetarian) {
                            <span class="bg-green-100 text-green-700 px-2 py-1 rounded">🌱 Vegetariano</span>
                          }
                          @if (item.spicy) {
                            <span class="bg-red-100 text-red-700 px-2 py-1 rounded">🌶️ Picante</span>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        }

        <!-- Service Providers Catalog -->
        @if (categorySlug === 'prestacao-servicos' && serviceCatalog() && !loading()) {
          <div class="space-y-8">
            @for (category of serviceCatalog()!.categories; track category.id) {
              <div class="rounded-xl bg-white p-6 shadow-sm">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-3xl">{{category.icon}}</span>
                  <div>
                    <h2 class="text-2xl font-bold text-gray-900">{{category.name}}</h2>
                    @if (category.description) {
                      <p class="text-gray-600">{{category.description}}</p>
                    }
                  </div>
                </div>
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  @for (item of category.items; track item.id) {
                    <div class="rounded-lg border border-gray-200 overflow-hidden hover:border-[#00B4D8] hover:shadow-lg transition-all">
                      <img [src]="item.image" [alt]="item.name" class="w-full h-32 object-cover">
                      <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                          <h3 class="font-semibold">{{item.name}}</h3>
                          @if (item.featured) {
                            <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Destaque</span>
                          }
                        </div>
                        <p class="text-gray-600 text-sm mb-3">{{item.description}}</p>
                        <div class="flex justify-between items-center mb-3">
                          <span class="text-lg font-bold text-[#00B4D8]">{{(item.price / 100) | currency:'MZN ':'symbol':'1.2-2'}}</span>
                          @if (item.rating) {
                            <div class="flex items-center gap-1">
                              <span class="text-yellow-500">★</span>
                              <span class="text-sm text-gray-600">{{item.rating}} ({{item.reviews}})</span>
                            </div>
                          }
                        </div>
                        @if (item.preparationTime) {
                          <div class="text-xs text-gray-500">
                            <span class="bg-gray-100 px-2 py-1 rounded">⏱️ {{item.preparationTime}} min</span>
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        }

        <!-- Products Grid (for lojas, armazens, bottle-stores) -->
        @if ((categorySlug === 'lojas' || categorySlug === 'armazens' || categorySlug === 'bottle-stores') && filteredProducts().length > 0 && !loading()) {
          <div>
            <div class="mb-4 text-gray-600">
              Mostrando {{filteredProducts().length}} produto(s)
            </div>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              @for (product of filteredProducts(); track product.id) {
                <app-product-card [product]="product" />
              }
            </div>
          </div>
        }


        <!-- Empty State -->
        @if (!loading() && isEmpty()) {
          <div class="rounded-xl bg-white p-12 text-center shadow-sm">
            <div class="mx-auto mb-4 h-24 w-24 rounded-full bg-gray-100 p-6">
              <svg class="h-full w-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M12 12h.01M12 4h.01M12 16h.01"/>
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900">Nenhum resultado encontrado</h3>
            <p class="text-gray-600">Tente ajustar sua pesquisa ou filtros.</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class CategoryDetailComponent implements OnInit {
  categorySlug = '';
  category = signal<Category | undefined>(undefined);
  products = signal<Product[]>([]);
  restaurantMenu = signal<RestaurantMenu | null>(null);
  newRestaurantMenu = signal<RestaurantMenuModel | null>(null);
  pharmacyInventory = signal<PharmacyInventory | null>(null);
  serviceCatalog = signal<ServiceCatalog | null>(null);
  serviceProviders = signal<ServiceProvider[]>([]);
  loading = signal(true);
  searchTerm = '';
  selectedSubcategory = signal('');

  filteredProducts = computed(() => {
    let result = this.products();
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    return result;
  });

  filteredServiceProviders = computed(() => {
    let result = this.serviceProviders();
    
    if (this.selectedSubcategory()) {
      result = result.filter(p => p.subcategory === this.selectedSubcategory());
    }
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.services.some(service => service.toLowerCase().includes(term))
      );
    }
    
    return result;
  });

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private menuService: MenuService,
    private medicationService: MedicationService,
    private catalogService: CatalogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categorySlug = params['slug'];
      this.loadCategoryData();
    });
  }

  private loadCategoryData() {
    this.loading.set(true);
    
    // Load category info
    this.categoryService.getCategoryBySlug(this.categorySlug).subscribe(category => {
      this.category.set(category);
    });
    
    // Load category-specific content
    switch (this.categorySlug) {
      case 'restaurantes':
        // Using the new menu service with restaurant ID 1 (Sabor & Arte)
        this.menuService.getMenuByRestaurantId(1).subscribe(menu => {
          this.newRestaurantMenu.set(menu);
          this.loading.set(false);
        });
        break;
        
      case 'lojas':
      case 'armazens':
      case 'bottle-stores':
        this.productService.getProductsByCategory(this.categorySlug).subscribe(products => {
          this.products.set(products);
          this.loading.set(false);
        });
        break;
      
      case 'comidas-ao-domicilio':
        this.catalogService.getCatalogByCategory(this.categorySlug).subscribe(catalog => {
          this.serviceCatalog.set(catalog);
          this.loading.set(false);
        });
        break;
      
      case 'farmacias':
        // Using the new medication service with pharmacy ID 1 (Farmácia Vida & Saúde)
        this.medicationService.getInventoryByPharmacyId(1).subscribe(inventory => {
          this.pharmacyInventory.set(inventory);
          this.loading.set(false);
        });
        break;
        
      case 'prestacao-servicos':
        this.catalogService.getCatalogByCategory(this.categorySlug).subscribe(catalog => {
          this.serviceCatalog.set(catalog);
          this.loading.set(false);
        });
        break;
        
      default:
        this.loading.set(false);
        break;
    }
  }

  isEmpty(): boolean {
    if (this.categorySlug === 'restaurantes') {
      return !this.newRestaurantMenu();
    } else if (this.categorySlug === 'farmacias') {
      return !this.pharmacyInventory();
    } else if (['lojas', 'armazens', 'bottle-stores'].includes(this.categorySlug)) {
      return this.filteredProducts().length === 0;
    } else if (['comidas-ao-domicilio', 'prestacao-servicos'].includes(this.categorySlug)) {
      return !this.serviceCatalog();
    }
    return true;
  }
}