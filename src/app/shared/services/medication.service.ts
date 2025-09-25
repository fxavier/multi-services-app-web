import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PharmacyInventory, MedicationCategory, Medication } from '../models/medication.model';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private mockInventories: Map<number, PharmacyInventory> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Farmácia Vida & Saúde inventory
    this.mockInventories.set(1, {
      pharmacyId: 1,
      lastUpdated: new Date(),
      categories: [
        {
          id: 1,
          name: 'Analgésicos e Anti-inflamatórios',
          description: 'Medicamentos para dor e inflamação',
          icon: '💊',
          displayOrder: 1,
          medications: [
            {
              id: 1,
              name: 'Paracetamol 500mg',
              genericName: 'Paracetamol',
              description: 'Analgésico e antitérmico para dor e febre',
              price: 250,
              category: 'Analgésicos',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'GenFarma',
              dosage: '500mg',
              packaging: 'Caixa com 20 comprimidos',
              activeIngredients: ['Paracetamol'],
              contraindications: ['Hipersensibilidade ao paracetamol', 'Insuficiência hepática grave'],
              sideEffects: ['Reações alérgicas raras', 'Náuseas em doses elevadas']
            },
            {
              id: 2,
              name: 'Ibuprofeno 400mg',
              genericName: 'Ibuprofeno',
              description: 'Anti-inflamatório não esteroidal',
              price: 380,
              category: 'Anti-inflamatórios',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'MedLab',
              dosage: '400mg',
              packaging: 'Caixa com 30 comprimidos',
              activeIngredients: ['Ibuprofeno'],
              contraindications: ['Úlcera péptica ativa', 'Insuficiência renal grave'],
              sideEffects: ['Dor abdominal', 'Náuseas', 'Azia']
            },
            {
              id: 3,
              name: 'Aspirina 100mg',
              genericName: 'Ácido Acetilsalicílico',
              description: 'Analgésico, antipirético e anti-inflamatório',
              price: 320,
              category: 'Analgésicos',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'FarmaCorp',
              dosage: '100mg',
              packaging: 'Caixa com 30 comprimidos',
              activeIngredients: ['Ácido Acetilsalicílico'],
              contraindications: ['Alergia a salicilatos', 'Úlcera péptica'],
              sideEffects: ['Irritação gástrica', 'Zumbidos']
            }
          ]
        },
        {
          id: 2,
          name: 'Antibióticos',
          description: 'Medicamentos para infecções bacterianas',
          icon: '🦠',
          displayOrder: 2,
          medications: [
            {
              id: 4,
              name: 'Amoxicilina 500mg',
              genericName: 'Amoxicilina',
              description: 'Antibiótico de amplo espectro',
              price: 680,
              category: 'Antibióticos',
              prescriptionRequired: true,
              inStock: true,
              manufacturer: 'BioFarma',
              dosage: '500mg',
              packaging: 'Caixa com 21 cápsulas',
              activeIngredients: ['Amoxicilina tri-hidratada'],
              contraindications: ['Alergia a penicilinas', 'Mononucleose infecciosa'],
              sideEffects: ['Diarreia', 'Náuseas', 'Erupções cutâneas']
            },
            {
              id: 5,
              name: 'Azitromicina 500mg',
              genericName: 'Azitromicina',
              description: 'Antibiótico macrolídeo',
              price: 850,
              category: 'Antibióticos',
              prescriptionRequired: true,
              inStock: true,
              manufacturer: 'MedPharma',
              dosage: '500mg',
              packaging: 'Caixa com 5 comprimidos',
              activeIngredients: ['Azitromicina di-hidratada'],
              contraindications: ['Hipersensibilidade a macrolídeos'],
              sideEffects: ['Dor abdominal', 'Diarreia', 'Náuseas']
            }
          ]
        },
        {
          id: 3,
          name: 'Vitaminas e Suplementos',
          description: 'Suplementos nutricionais',
          icon: '💪',
          displayOrder: 3,
          medications: [
            {
              id: 6,
              name: 'Vitamina C 1000mg',
              description: 'Suplemento de vitamina C efervescente',
              price: 420,
              category: 'Vitaminas',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'VitaLife',
              dosage: '1000mg',
              packaging: 'Tubo com 10 comprimidos efervescentes',
              activeIngredients: ['Ácido ascórbico'],
              contraindications: ['Cálculos renais de oxalato'],
              sideEffects: ['Diarreia em doses elevadas']
            },
            {
              id: 7,
              name: 'Complexo B',
              description: 'Complexo vitamínico do grupo B',
              price: 380,
              category: 'Vitaminas',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'NutriPharm',
              packaging: 'Frasco com 60 cápsulas',
              activeIngredients: ['B1', 'B2', 'B3', 'B5', 'B6', 'B7', 'B9', 'B12'],
              contraindications: ['Hipersensibilidade aos componentes'],
              sideEffects: ['Urina amarelada']
            },
            {
              id: 8,
              name: 'Ômega 3',
              description: 'Ácidos graxos essenciais',
              price: 580,
              category: 'Suplementos',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'OceanHealth',
              dosage: '1000mg',
              packaging: 'Frasco com 60 cápsulas',
              activeIngredients: ['EPA', 'DHA'],
              contraindications: ['Alergia a peixe'],
              sideEffects: ['Sabor residual de peixe']
            }
          ]
        },
        {
          id: 4,
          name: 'Cuidados com a Pele',
          description: 'Produtos dermatológicos',
          icon: '🧴',
          displayOrder: 4,
          medications: [
            {
              id: 9,
              name: 'Protetor Solar FPS 50',
              description: 'Proteção solar de amplo espectro',
              price: 820,
              category: 'Dermatologia',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'DermaCare',
              packaging: 'Frasco com 120ml',
              activeIngredients: ['Octinoxato', 'Avobenzona', 'Dióxido de titânio']
            },
            {
              id: 10,
              name: 'Hidratante Corporal',
              description: 'Loção hidratante para pele seca',
              price: 450,
              category: 'Dermatologia',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'SkinLab',
              packaging: 'Frasco com 200ml',
              activeIngredients: ['Ureia', 'Glicerina', 'Vitamina E']
            }
          ]
        },
        {
          id: 5,
          name: 'Primeiros Socorros',
          description: 'Itens essenciais para emergências',
          icon: '🏥',
          displayOrder: 5,
          medications: [
            {
              id: 11,
              name: 'Água Oxigenada',
              description: 'Antisséptico para limpeza de feridas',
              price: 180,
              category: 'Primeiros Socorros',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'FarmaBásica',
              packaging: 'Frasco com 100ml',
              activeIngredients: ['Peróxido de hidrogênio 3%']
            },
            {
              id: 12,
              name: 'Curativos Adesivos',
              description: 'Bandagens adesivas variadas',
              price: 220,
              category: 'Primeiros Socorros',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'MedSupply',
              packaging: 'Caixa com 30 unidades variadas'
            }
          ]
        }
      ]
    });

    // Farmácia Central inventory
    this.mockInventories.set(2, {
      pharmacyId: 2,
      lastUpdated: new Date(),
      categories: [
        {
          id: 1,
          name: 'Medicamentos Genéricos',
          description: 'Opções econômicas de qualidade',
          icon: '💊',
          displayOrder: 1,
          medications: [
            {
              id: 13,
              name: 'Dipirona 500mg Genérico',
              genericName: 'Dipirona Sódica',
              description: 'Analgésico e antitérmico',
              price: 180,
              category: 'Genéricos',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'GenLab',
              dosage: '500mg',
              packaging: 'Caixa com 30 comprimidos',
              activeIngredients: ['Dipirona sódica'],
              contraindications: ['Alergia a pirazolonas', 'Porfiria'],
              sideEffects: ['Reações alérgicas', 'Hipotensão']
            },
            {
              id: 14,
              name: 'Omeprazol 20mg Genérico',
              genericName: 'Omeprazol',
              description: 'Inibidor da bomba de prótons',
              price: 280,
              category: 'Genéricos',
              prescriptionRequired: false,
              inStock: true,
              manufacturer: 'GenLab',
              dosage: '20mg',
              packaging: 'Caixa com 28 cápsulas',
              activeIngredients: ['Omeprazol'],
              contraindications: ['Hipersensibilidade ao omeprazol'],
              sideEffects: ['Dor de cabeça', 'Diarreia']
            }
          ]
        }
      ]
    });
  }

  getInventoryByPharmacyId(pharmacyId: number): Observable<PharmacyInventory | null> {
    const inventory = this.mockInventories.get(pharmacyId);
    return of(inventory || null);
  }

  updateMedicationStock(pharmacyId: number, medicationId: number, inStock: boolean): Observable<boolean> {
    const inventory = this.mockInventories.get(pharmacyId);
    if (inventory) {
      for (const category of inventory.categories) {
        const medication = category.medications.find(m => m.id === medicationId);
        if (medication) {
          medication.inStock = inStock;
          return of(true);
        }
      }
    }
    return of(false);
  }

  searchMedications(query: string): Observable<Medication[]> {
    const results: Medication[] = [];
    
    this.mockInventories.forEach(inventory => {
      inventory.categories.forEach(category => {
        category.medications.forEach(medication => {
          if (medication.name.toLowerCase().includes(query.toLowerCase()) ||
              (medication.genericName && medication.genericName.toLowerCase().includes(query.toLowerCase()))) {
            results.push(medication);
          }
        });
      });
    });
    
    return of(results);
  }
}