import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group h-full overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <!-- Image Section -->
      <div class="relative h-48 overflow-hidden">
        <img 
          [src]="product().image" 
          [alt]="product().name"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        >
        @if (product().discount) {
          <div class="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{{product().discount}}%
          </div>
        }
        @if (!product().inStock) {
          <div class="absolute inset-0 flex items-center justify-center bg-black/50">
            <span class="rounded bg-white px-3 py-1 text-sm font-semibold text-gray-900">
              Fora de Stock
            </span>
          </div>
        }
      </div>

      <!-- Content Section -->
      <div class="p-5">
        <!-- Brand and Name -->
        <div class="mb-2">
          @if (product().brand) {
            <p class="text-sm text-gray-500">{{product().brand}}</p>
          }
          <h3 class="font-bold text-gray-900 line-clamp-2">{{product().name}}</h3>
        </div>

        <!-- Description -->
        <p class="mb-3 line-clamp-2 text-sm text-gray-600">
          {{product().description}}
        </p>

        <!-- Rating and Reviews -->
        @if (product().rating) {
          <div class="mb-3 flex items-center gap-2 text-sm">
            <div class="flex items-center">
              <span class="text-yellow-500">★</span>
              <span class="ml-1 font-medium">{{product().rating}}</span>
            </div>
            @if (product().reviews) {
              <span class="text-gray-500">•</span>
              <span class="text-gray-500">{{product().reviews}} avaliações</span>
            }
          </div>
        }

        <!-- Price -->
        <div class="mb-3 flex items-center gap-2">
          <span class="text-xl font-bold text-[#00B4D8]">
            {{product().price | number:'1.0-0'}} MT
          </span>
          @if (product().originalPrice) {
            <span class="text-sm text-gray-500 line-through">
              {{product().originalPrice | number:'1.0-0'}} MT
            </span>
          }
        </div>

        <!-- Tags -->
        <div class="mb-4 flex flex-wrap gap-1">
          @for (tag of product().tags.slice(0, 3); track tag) {
            <span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
              {{tag}}
            </span>
          }
        </div>

        <!-- Action Button -->
        <button 
          class="w-full rounded-lg bg-[#00B4D8] py-2 font-medium text-white transition-colors hover:bg-[#0096B7] disabled:bg-gray-300"
          [disabled]="!product().inStock"
        >
          @if (product().inStock) {
            Adicionar ao Carrinho
          } @else {
            Indisponível
          }
        </button>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  product = input.required<Product>();
}