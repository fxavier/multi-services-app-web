import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProvider } from '../../models/product.model';

@Component({
  selector: 'app-service-provider-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <!-- Header -->
      <div class="relative bg-gradient-to-r from-[#1B263B] to-[#5F6CAF] p-6 text-white">
        <div class="flex items-start gap-4">
          <img 
            [src]="provider().avatar" 
            [alt]="provider().name"
            class="h-16 w-16 rounded-full border-4 border-white object-cover"
          >
          <div class="flex-1">
            <h3 class="font-bold text-lg line-clamp-1">{{provider().name}}</h3>
            <p class="text-sm opacity-90 capitalize">{{provider().subcategory.replace('-', ' ')}}</p>
            <div class="mt-2 flex items-center gap-2">
              <div class="flex items-center">
                <span class="text-yellow-400">★</span>
                <span class="ml-1 font-medium">{{provider().rating}}</span>
              </div>
              <span class="opacity-75">•</span>
              <span class="text-sm opacity-75">{{provider().reviews}} avaliações</span>
              @if (provider().verified) {
                <span class="ml-2 text-green-400">✓</span>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Description -->
        <p class="mb-4 text-sm text-gray-600 line-clamp-3">
          {{provider().description}}
        </p>

        <!-- Key Info -->
        <div class="mb-4 grid grid-cols-2 gap-3 text-sm">
          <div class="flex items-center gap-2 text-gray-600">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
            @if (provider().hourlyRate) {
              <span>{{provider().hourlyRate}} MT/h</span>
            } @else {
              <span>Consultar preço</span>
            }
          </div>
          
          <div class="flex items-center gap-2 text-gray-600">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span class="text-xs">{{provider().location}}</span>
          </div>
          
          <div class="flex items-center gap-2 text-gray-600">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-xs">{{provider().responseTime}}</span>
          </div>
          
          <div class="flex items-center gap-2 text-gray-600">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6"/>
            </svg>
            <span class="text-xs">{{provider().experience}}</span>
          </div>
        </div>

        <!-- Services -->
        <div class="mb-4">
          <h4 class="mb-2 text-sm font-semibold text-gray-900">Serviços:</h4>
          <div class="flex flex-wrap gap-1">
            @for (service of provider().services.slice(0, 4); track service) {
              <span class="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                {{service}}
              </span>
            }
            @if (provider().services.length > 4) {
              <span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                +{{provider().services.length - 4}} mais
              </span>
            }
          </div>
        </div>

        <!-- Portfolio Preview -->
        @if (provider().portfolio && provider().portfolio!.length > 0) {
          <div class="mb-4">
            <h4 class="mb-2 text-sm font-semibold text-gray-900">Trabalhos:</h4>
            <div class="flex gap-2">
              @for (image of provider().portfolio!.slice(0, 3); track image) {
                <img 
                  [src]="image" 
                  class="h-12 w-12 rounded object-cover"
                  [alt]="provider().name + ' trabalho'"
                >
              }
            </div>
          </div>
        }

        <!-- Action Buttons -->
        <div class="grid grid-cols-2 gap-3">
          <button class="rounded-lg border border-[#00B4D8] px-4 py-2 text-sm font-medium text-[#00B4D8] transition-colors hover:bg-[#00B4D8] hover:text-white">
            Ver Perfil
          </button>
          <button class="rounded-lg bg-[#00B4D8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0096B7]">
            Contactar
          </button>
        </div>
      </div>
    </div>
  `
})
export class ServiceProviderCardComponent {
  provider = input.required<ServiceProvider>();
}