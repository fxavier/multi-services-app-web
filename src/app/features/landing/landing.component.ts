import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryCardComponent],
  template: `
    <div class="bg-gradient-to-br from-[#1B263B] via-[#5F6CAF] to-[#00B4D8]">
      <!-- Hero Section -->
      <section class="relative min-h-screen flex items-center justify-center text-white">
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="relative z-10 text-center px-4">
          <h1 class="text-5xl md:text-7xl font-bold mb-6">
            Multi Services
          </h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90">
            Tudo que você precisa, em um só lugar
          </p>
          <div class="space-y-4">
            <a
              routerLink="/categorias"
              class="inline-block bg-[#00B4D8] hover:bg-[#0096B7] px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300"
            >
              Explorar Categorias
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- Categories Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Nossas Categorias
          </h2>
          <p class="text-xl text-gray-600">
            Descubra os melhores serviços da cidade
          </p>
        </div>

        <!-- Featured Categories -->
        @if (featuredCategories().length > 0) {
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            @for (category of featuredCategories(); track category.id) {
              <div class="h-64">
                <app-category-card [category]="category" />
              </div>
            }
          </div>
        }

        <div class="text-center">
          <a
            routerLink="/categorias"
            class="inline-block bg-[#00B4D8] hover:bg-[#0096B7] text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Ver Todas as Categorias
          </a>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid gap-8 md:grid-cols-4">
          <div class="text-center">
            <div class="text-4xl font-bold text-[#00B4D8] mb-2">{{totalBusinesses()}}</div>
            <div class="text-gray-600">Parceiros Ativos</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-[#00B4D8] mb-2">{{categories().length}}</div>
            <div class="text-gray-600">Categorias</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-[#00B4D8] mb-2">24/7</div>
            <div class="text-gray-600">Disponibilidade</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-[#00B4D8] mb-2">5⭐</div>
            <div class="text-gray-600">Qualidade Garantida</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class LandingComponent implements OnInit {
  categories = signal<Category[]>([]);
  featuredCategories = signal<Category[]>([]);

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories.set(categories);
      this.featuredCategories.set(categories.filter(cat => cat.featured));
    });
  }

  totalBusinesses(): number {
    return this.categories().reduce((sum, cat) => sum + cat.count, 0);
  }
}