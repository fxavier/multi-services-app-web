export interface Medication {
  id: number;
  name: string;
  genericName?: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  prescriptionRequired: boolean;
  inStock: boolean;
  manufacturer?: string;
  dosage?: string;
  packaging?: string;
  activeIngredients?: string[];
  contraindications?: string[];
  sideEffects?: string[];
}

export interface MedicationCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  medications: Medication[];
  displayOrder: number;
}

export interface PharmacyInventory {
  pharmacyId: number;
  categories: MedicationCategory[];
  lastUpdated: Date;
}