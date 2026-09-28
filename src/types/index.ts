export type DamageSeverity = 'Good' | 'Attention' | 'Critical';

export type DamageCategory = 
  | 'scratches' 
  | 'dents' 
  | 'broken_lights' 
  | 'bumper_damage' 
  | 'windshield_damage' 
  | 'other';

export interface DamageItem {
  id: string;
  category: DamageCategory;
  label: string;
  status: DamageSeverity;
  description: string;
  severityScore: number; // 0 - 100 (higher = worse damage)
  locationOnCar?: {
    x: number; // percentage (0-100) from left of image
    y: number; // percentage (0-100) from top of image
    width?: number;
    height?: number;
  };
  recommendation: string;
}

export interface VehicleOverview {
  vehicleType: string;       // e.g., Sedan, SUV, Hatchback, Coupe, Truck
  estimatedMakeModel: string; // e.g., Tesla Model 3 / BMW 3 Series / Honda Civic
  confidenceScore: number;   // 0 - 100%
  vehicleColor: string;      // e.g., Midnight Metallic Blue, Alpine White
  vehicleCategory: string;   // e.g., Electric Luxury, Compact SUV, Passenger Car
  estimatedYearRange?: string; // e.g., 2020 - 2024
  bodyStyle?: string;        // e.g., 4-Door Notchback
}

export interface VisibleCondition {
  overallScore: number;      // 0 - 100 (Overall vehicle health score)
  exteriorCondition: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  visibleDamageScore: number; // 0 - 100
  tireVisibility: 'Clear & Healthy' | 'Moderate Tread Wear' | 'Low Visibility' | 'Critical Check Advised';
  lightingCondition: 'Intact & Functional' | 'Minor Scuff' | 'Cracked / Damaged' | 'Not Visible';
  glassIntegrity: 'Pristine' | 'Minor Pitting' | 'Chip / Crack Detected' | 'Obscured';
  cleanlinessRating: 'High' | 'Moderate' | 'Dusty / Soiled';
}

export interface SafetyInsight {
  id: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  title: string;
  advice: string;
  actionRequired: boolean;
  iconType: 'shield' | 'alert' | 'tool' | 'eye' | 'gauge' | 'zap';
}

export interface ScanResult {
  id: string;
  timestamp: string;
  imageUrl: string;
  imageFileName?: string;
  vehicleOverview: VehicleOverview;
  visibleCondition: VisibleCondition;
  damageItems: DamageItem[];
  safetyInsights: SafetyInsight[];
  summaryNotes: string;
  modelUsed: string;
}

export interface UserSettings {
  geminiApiKey: string;
  useSimulatedAI: boolean;
  soundEffects: boolean;
  theme: 'dark';
  saveScansLocally: boolean;
}

export interface PresetDemoVehicle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  thumbnail: string;
  description: string;
  presetResult: Omit<ScanResult, 'id' | 'timestamp' | 'imageUrl'>;
}

export type PageRoute = 'home' | 'scanner' | 'history' | 'safety' | 'about';
