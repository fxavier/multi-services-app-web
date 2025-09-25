import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Business } from '../../models/business.model';

@Component({
  selector: 'app-business-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="group h-full overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <!-- Image Section -->
      <div class="relative h-48 overflow-hidden">
        <img 
          [src]="business().image" 
          [alt]="business().name"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        >
        @if (business().featured) {
          <div class="absolute left-4 top-4 rounded-full bg-[#00B4D8] px-3 py-1 text-xs font-semibold text-white">
            Destaque
          </div>
        }
        @if (business().verified) {
          <div class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
        }
      </div>

      <!-- Content Section -->
      <div class="p-5">
        <!-- Logo and Name -->
        <div class="mb-3 flex items-start gap-3">
          @if (business().logo || business().avatar) {
            <img 
              [src]="business().logo || business().avatar" 
              [alt]="business().name"
              class="h-12 w-12 rounded-lg object-cover"
            >
          }
          <div class="flex-1">
            <h3 class="font-bold text-gray-900">{{business().name}}</h3>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <div class="flex items-center">
                <span class="text-yellow-500">★</span>
                <span class="ml-1 font-medium">{{business().rating}}</span>
              </div>
              <span>•</span>
              <span>{{business().reviews}} avaliações</span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <p class="mb-3 line-clamp-2 text-sm text-gray-600">
          {{business().description}}
        </p>

        <!-- Info Grid -->
        <div class="mb-3 grid grid-cols-2 gap-2 text-sm">
          @if (business().deliveryTime) {
            <div class="flex items-center gap-1 text-gray-600">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{business().deliveryTime}}</span>
            </div>
          }
          @if (business().deliveryFee !== undefined) {
            <div class="flex items-center gap-1 text-gray-600">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              <span>Taxa: {{business().deliveryFee}} MT</span>
            </div>
          }
          @if (business().minOrder) {
            <div class="flex items-center gap-1 text-gray-600">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span>Mín: {{business().minOrder}} MT</span>
            </div>
          }
          @if (business().responseTime) {
            <div class="flex items-center gap-1 text-gray-600">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <span class="text-xs">{{business().responseTime}}</span>
            </div>
          }
          @if (business().hourlyRate) {
            <div class="flex items-center gap-1 text-gray-600">
              <span class="font-medium">{{business().hourlyRate}} MT/h</span>
            </div>
          }
        </div>

        <!-- Tags -->
        <div class="mb-4 flex flex-wrap gap-1">
          @for (tag of business().tags.slice(0, 3); track tag) {
            <span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
              {{tag}}
            </span>
          }
        </div>

        <!-- Action Button -->
        <a 
          [routerLink]="['/', business().category, business().slug]"
          class="block w-full rounded-lg bg-[#00B4D8] py-2 text-center font-medium text-white transition-colors hover:bg-[#0096B7]"
        >
          Ver Detalhes
        </a>
      </div>
    </div>
  `
})
export class BusinessCardComponent {
  business = input.required<Business>();
}