import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/product.model';

@Component({
  selector: 'app-menu-item-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group flex gap-4 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <!-- Image -->
      <div class="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img 
          [src]="item().image" 
          [alt]="item().name"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        >
        @if (item().popular) {
          <div class="absolute -top-1 -right-1 rounded-full bg-orange-500 p-1">
            <svg class="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        }
      </div>

      <!-- Content -->
      <div class="flex-1">
        <!-- Header -->
        <div class="mb-2 flex items-start justify-between">
          <div>
            <h3 class="font-semibold text-gray-900 line-clamp-1">{{item().name}}</h3>
            <div class="flex items-center gap-2 mt-1">
              @if (item().spicy) {
                <span class="text-red-500 text-sm">🌶️</span>
              }
              @if (item().vegetarian) {
                <span class="text-green-600 text-sm">🌱</span>
              }
              @if (item().vegan) {
                <span class="text-green-600 text-sm">🌿</span>
              }
            </div>
          </div>
          <span class="text-lg font-bold text-[#00B4D8]">
            {{item().price | number:'1.0-0'}} MT
          </span>
        </div>

        <!-- Description -->
        <p class="mb-2 text-sm text-gray-600 line-clamp-2">
          {{item().description}}
        </p>

        <!-- Details -->
        <div class="flex items-center gap-4 text-xs text-gray-500">
          @if (item().preparationTime) {
            <span class="flex items-center gap-1">
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{item().preparationTime}}
            </span>
          }
          @if (item().calories) {
            <span class="flex items-center gap-1">
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              {{item().calories}} cal
            </span>
          }
        </div>

        <!-- Allergens -->
        @if (item().allergens && item().allergens!.length > 0) {
          <div class="mt-2">
            <span class="text-xs text-orange-600">
              ⚠️ Contém: {{item().allergens!.join(', ')}}
            </span>
          </div>
        }
      </div>

      <!-- Add Button -->
      <div class="flex flex-col justify-center">
        <button class="rounded-lg bg-[#00B4D8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0096B7]">
          Adicionar
        </button>
      </div>
    </div>
  `
})
export class MenuItemCardComponent {
  item = input.required<MenuItem>();
}