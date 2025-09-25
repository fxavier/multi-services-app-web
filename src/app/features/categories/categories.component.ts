import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-[#1B263B] via-[#5F6CAF] to-[#00B4D8]">
      <div class="container mx-auto px-4 py-12">
        <!-- Header -->
        <div class="mb-12 text-center">
          <h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">
            Nossas Categorias
          </h1>
          <p class="text-lg text-white/80 md:text-xl">
            Escolha a categoria de serviço que você precisa
          </p>
        </div>

        <!-- Loading State -->
        @if (loading()) {
          <div class="flex items-center justify-center py-20">
            <div class="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          </div>
        }

        <!-- Categories Grid -->
        @if (!loading() && categories().length > 0) {
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            @for (category of categories(); track category.id) {
              <div class="h-64">
                <app-category-card [category]="category" />
              </div>
            }
          </div>
        }

        <!-- Empty State -->
        @if (!loading() && categories().length === 0) {
          <div class="py-20 text-center">
            <p class="text-xl text-white">Nenhuma categoria disponível no momento.</p>
          </div>
        }

        <!-- Stats Section -->
        @if (!loading() && categories().length > 0) {
          <div class="mt-16 grid gap-6 md:grid-cols-4">
            <div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
              <h3 class="text-3xl font-bold text-white">{{totalBusinesses()}}</h3>
              <p class="text-white/80">Parceiros Ativos</p>
            </div>
            <div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
              <h3 class="text-3xl font-bold text-white">{{categories().length}}</h3>
              <p class="text-white/80">Categorias</p>
            </div>
            <div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
              <h3 class="text-3xl font-bold text-white">24/7</h3>
              <p class="text-white/80">Disponibilidade</p>
            </div>
            <div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
              <h3 class="text-3xl font-bold text-white">5⭐</h3>
              <p class="text-white/80">Qualidade Garantida</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class CategoriesComponent implements OnInit {
  categories = signal<Category[]>([]);
  loading = signal(true);

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    console.log('CategoriesComponent: Starting to load categories');
    this.loading.set(true);
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        console.log('CategoriesComponent: Categories received', categories);
        this.categories.set(categories);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('CategoriesComponent: Error loading categories:', error);
        this.loading.set(false);
      }
    });
  }

  totalBusinesses(): number {
    return this.categories().reduce((sum, cat) => sum + cat.count, 0);
  }
}