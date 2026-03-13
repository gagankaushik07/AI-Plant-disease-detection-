export interface PlantAnalysis {
  diseaseName: string;
  confidence: number;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  isHealthy: boolean;
}

export interface CropRecommendation {
  crop: string;
  reason: string;
  season: string;
  soilType: string;
  waterRequirement: string;
}

export interface FertilizerRecommendation {
  fertilizer: string;
  dosage: string;
  applicationMethod: string;
  frequency: string;
}

export type AppTab = 'disease' | 'crop' | 'fertilizer' | 'chat' | 'video' | 'about';
