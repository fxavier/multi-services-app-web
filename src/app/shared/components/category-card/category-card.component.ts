import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a 
      [routerLink]="['/categoria', category().slug]"
      class="group relative block h-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      [style.background-color]="category().color + '15'"
    >
      <div class="absolute inset-0">
        <img 
          [src]="category().image" 
          [alt]="category().name"
          class="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
      
      <div class="relative flex h-full flex-col justify-end p-6 text-white">
        <div class="mb-2 text-4xl">{{category().icon}}</div>
        <h3 class="mb-1 text-2xl font-bold">{{category().name}}</h3>
        <p class="mb-2 text-sm opacity-90">{{category().description}}</p>
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">
            {{category().count}} 
            {{category().count === 1 ? 'opção' : 'opções'}}
          </span>
          @if (category().featured) {
            <span class="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              Destaque
            </span>
          }
        </div>
      </div>
    </a>
  `
})
export class CategoryCardComponent {
  category = input.required<Category>();
}