import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <a routerLink="/" class="flex items-center space-x-2">
              <span class="text-2xl font-bold bg-gradient-to-r from-[#00B4D8] to-[#5F6CAF] bg-clip-text text-transparent">
                Multi Services
              </span>
            </a>
            <nav class="flex items-center space-x-6">
              <a routerLink="/" class="text-gray-600 hover:text-[#00B4D8]">Início</a>
              <a routerLink="/categorias" class="text-gray-600 hover:text-[#00B4D8]">Categorias</a>
              <a href="#contact" class="text-gray-600 hover:text-[#00B4D8]">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="bg-[#1B263B] text-white py-8">
        <div class="container mx-auto px-4">
          <div class="text-center">
            <p>&copy; 2024 Multi Services. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'multi-services';
}