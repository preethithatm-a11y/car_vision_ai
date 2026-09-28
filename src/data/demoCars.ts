import { PresetDemoVehicle } from '../types';

export const DEMO_VEHICLES: PresetDemoVehicle[] = [
  {
    id: 'demo-clean-tesla',
    title: 'Tesla Model 3 Performance',
    subtitle: 'Deep Metallic Blue · Electric Sedan',
    category: 'Sedan',
    thumbnail: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
    description: 'Clean electric sedan with pristine bodywork, immaculate glass integrity, and optimal tire profile.',
    presetResult: {
      vehicleOverview: {
        vehicleType: 'Sedan',
        estimatedMakeModel: 'Tesla Model 3 Performance',
        confidenceScore: 98,
        vehicleColor: 'Deep Metallic Blue',
        vehicleCategory: 'Electric Luxury Sedan',
        estimatedYearRange: '2022 – 2024',
        bodyStyle: '4-Door Fastback Sedan'
      },
      visibleCondition: {
        overallScore: 96,
        exteriorCondition: 'Excellent',
        visibleDamageScore: 4,
        tireVisibility: 'Clear & Healthy',
        lightingCondition: 'Intact & Functional',
        glassIntegrity: 'Pristine',
        cleanlinessRating: 'High'
      },
      damageItems: [
        {
          id: 'dmg-1',
          category: 'scratches',
          label: 'Micro Clear-Coat Swirls',
          status: 'Good',
          description: 'Minor superficial clear-coat swirls near rear quarter panel, purely cosmetic.',
          severityScore: 8,
          locationOnCar: { x: 78, y: 52, width: 8, height: 6 },
          recommendation: 'Periodic ceramic spray wax or standard dual-action buffing is sufficient.'
        },
        {
          id: 'dmg-2',
          category: 'bumper_damage',
          label: 'Front Lower Lip Air Dam',
          status: 'Good',
          description: 'Front aerodynamic undertray and bumper lip intact with no curb abrasions detected.',
          severityScore: 2,
          locationOnCar: { x: 26, y: 72, width: 14, height: 8 },
          recommendation: 'No action required. Aerodynamic seals are intact.'
        }
      ],
      safetyInsights: [
        {
          id: 'safe-1',
          category: 'Visibility & Lighting',
          priority: 'Low',
          title: 'Matrix LED Projector Units Pristine',
          advice: 'All front projector lenses and daytime running LEDs are clear and free of cloudiness or moisture ingress.',
          actionRequired: false,
          iconType: 'eye'
        },
        {
          id: 'safe-2',
          category: 'Tire & Braking',
          priority: 'Low',
          title: 'Tire Sidewall Profile Nominal',
          advice: 'Visible tire sidewalls indicate adequate inflation stance and no observable sidewall bulges.',
          actionRequired: false,
          iconType: 'gauge'
        },
        {
          id: 'safe-3',
          category: 'General Safety',
          priority: 'Low',
          title: 'Ready for Highway Driving',
          advice: 'Vehicle exhibits high overall structural and exterior integrity suitable for long distance travel.',
          actionRequired: false,
          iconType: 'shield'
        }
      ],
      summaryNotes: 'Vehicle is in excellent aesthetic and visible condition. Paint reflectivity is high, body lines are true, and all critical safety lighting clusters appear factory intact.',
      modelUsed: 'CarVision AI Neural Core v3.4'
    }
  },
  {
    id: 'demo-damaged-honda',
    title: 'Honda Civic Sport',
    subtitle: 'Rallye Red · Front Bumper Abrasion & Scratches',
    category: 'Hatchback',
    thumbnail: 'https://images.unsplash.com/photo-1590362891988-f77617338148?auto=format&fit=crop&w=1200&q=80',
    description: 'Front corner scuff and bumper misalignment detected following low-speed curb or parking contact.',
    presetResult: {
      vehicleOverview: {
        vehicleType: 'Hatchback / Compact',
        estimatedMakeModel: 'Honda Civic Sport',
        confidenceScore: 94,
        vehicleColor: 'Rallye Red Gloss',
        vehicleCategory: 'Compact Passenger Sport',
        estimatedYearRange: '2019 – 2022',
        bodyStyle: '5-Door Hatchback'
      },
      visibleCondition: {
        overallScore: 74,
        exteriorCondition: 'Fair',
        visibleDamageScore: 32,
        tireVisibility: 'Clear & Healthy',
        lightingCondition: 'Minor Scuff',
        glassIntegrity: 'Pristine',
        cleanlinessRating: 'Moderate'
      },
      damageItems: [
        {
          id: 'dmg-h1',
          category: 'bumper_damage',
          label: 'Front Right Bumper Scuff & Clip Gap',
          status: 'Attention',
          description: 'Visible abrasion along front lower bumper edge with a slight 3mm panel gap at the fender joint.',
          severityScore: 42,
          locationOnCar: { x: 32, y: 64, width: 16, height: 12 },
          recommendation: 'Inspect bumper mounting clips to prevent highway vibration detachment.'
        },
        {
          id: 'dmg-h2',
          category: 'scratches',
          label: 'Deep Clear-Coat Paint Scratch',
          status: 'Attention',
          description: 'Approximately 12cm linear scratch across the passenger-side wheel arch.',
          severityScore: 35,
          locationOnCar: { x: 42, y: 56, width: 12, height: 8 },
          recommendation: 'Apply automotive touch-up clear coat to prevent road salt exposure and undercoat oxidation.'
        },
        {
          id: 'dmg-h3',
          category: 'broken_lights',
          label: 'Fog Light Bezel Minor Scuff',
          status: 'Good',
          description: 'Lower fog lamp housing shows light contact marks but lens seal remains watertight.',
          severityScore: 15,
          locationOnCar: { x: 28, y: 68, width: 8, height: 8 },
          recommendation: 'Verify bulb alignment during next scheduled vehicle service.'
        }
      ],
      safetyInsights: [
        {
          id: 'safe-h1',
          category: 'Aerodynamics & Fasteners',
          priority: 'Medium',
          title: 'Check Lower Bumper Splash Shield',
          advice: 'Ensure underbody plastic splash guard is firmly secured so it does not drag at higher speeds.',
          actionRequired: true,
          iconType: 'tool'
        },
        {
          id: 'safe-h2',
          category: 'Lighting Check',
          priority: 'Low',
          title: 'Fog Lamp Housing Inspection',
          advice: 'Test fog light operation to confirm illumination alignment remains compliant with road standards.',
          actionRequired: false,
          iconType: 'eye'
        },
        {
          id: 'safe-h3',
          category: 'Corrosion Prevention',
          priority: 'Low',
          title: 'Seal Exposed Primer',
          advice: 'Seal deep scratch abrasions before wet weather to preserve sheet metal zinc coating.',
          actionRequired: false,
          iconType: 'shield'
        }
      ],
      summaryNotes: 'Moderate cosmetic damage confined to the front right fascia. Structural frame appears unaffected, but bumper retention tabs should be inspected for highway stability.',
      modelUsed: 'CarVision AI Neural Core v3.4'
    }
  },
  {
    id: 'demo-suv-cracked',
    title: 'Ford Explorer XLT 4WD',
    subtitle: 'Shadow Black · Windshield Chip & Headlamp Fracture',
    category: 'SUV',
    thumbnail: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Significant rock chip in driver windshield zone and fractured headlight lens requiring immediate safety review.',
    presetResult: {
      vehicleOverview: {
        vehicleType: 'Midsize SUV',
        estimatedMakeModel: 'Ford Explorer XLT',
        confidenceScore: 92,
        vehicleColor: 'Shadow Black',
        vehicleCategory: 'Mid-Size Family SUV',
        estimatedYearRange: '2020 – 2023',
        bodyStyle: '5-Door SUV'
      },
      visibleCondition: {
        overallScore: 58,
        exteriorCondition: 'Poor',
        visibleDamageScore: 55,
        tireVisibility: 'Moderate Tread Wear',
        lightingCondition: 'Cracked / Damaged',
        glassIntegrity: 'Chip / Crack Detected',
        cleanlinessRating: 'Moderate'
      },
      damageItems: [
        {
          id: 'dmg-s1',
          category: 'windshield_damage',
          label: 'Driver-Side Star Bullseye Glass Chip',
          status: 'Critical',
          description: 'A ~20mm star-burst rock chip in the upper line-of-sight windshield area with branching micro-fractures.',
          severityScore: 78,
          locationOnCar: { x: 48, y: 38, width: 10, height: 10 },
          recommendation: 'Immediate resin injection or windshield replacement is required before thermal stress spreads the crack.'
        },
        {
          id: 'dmg-s2',
          category: 'broken_lights',
          label: 'Front Left Headlamp Lens Fracture',
          status: 'Critical',
          description: 'Crack through polycarbonate headlight cover causing risk of moisture ingress and beam distortion.',
          severityScore: 72,
          locationOnCar: { x: 22, y: 54, width: 12, height: 10 },
          recommendation: 'Replace headlight assembly to prevent internal electrical shorting and beam glare for oncoming drivers.'
        },
        {
          id: 'dmg-s3',
          category: 'dents',
          label: 'Fender Crease Dent',
          status: 'Attention',
          description: 'Shallow pressure dent along the front wheel arch flare (~6cm length).',
          severityScore: 38,
          locationOnCar: { x: 36, y: 52, width: 10, height: 8 },
          recommendation: 'Paintless Dent Repair (PDR) candidate.'
        }
      ],
      safetyInsights: [
        {
          id: 'safe-s1',
          category: 'Nighttime Driving Safety',
          priority: 'High',
          title: 'CRITICAL: Headlamp Moisture / Beam Failure Risk',
          advice: 'Damaged headlight lens can cause water condensation, blinding oncoming traffic or complete night failure. Repair immediately.',
          actionRequired: true,
          iconType: 'alert'
        },
        {
          id: 'safe-s2',
          category: 'Windshield Integrity',
          priority: 'High',
          title: 'CRITICAL: Structural Glass Weakness',
          advice: 'Windshield provides up to 30% of roof structural support in rollover situations. Cracked glass must be evaluated by a certified specialist.',
          actionRequired: true,
          iconType: 'shield'
        },
        {
          id: 'safe-s3',
          category: 'Tire Inspection',
          priority: 'Medium',
          title: 'Tire Tread Depth Verification',
          advice: 'Slight shoulder wear visible on front left tire. Recommend measuring tread depth with a gauge before wet weather travel.',
          actionRequired: true,
          iconType: 'gauge'
        }
      ],
      summaryNotes: 'Vehicle has safety-critical exterior deficiencies including a cracked headlamp assembly and star fracture on the driver-side windshield. Professional servicing recommended prior to night or highway operation.',
      modelUsed: 'CarVision AI Neural Core v3.4'
    }
  },
  {
    id: 'demo-bmw-m4',
    title: 'BMW M4 Competition Coupe',
    subtitle: 'Isle of Man Green · High Performance Coupe',
    category: 'Coupe',
    thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    description: 'High performance sports coupe with carbon fiber roof, high-spec ceramic brakes, and pristine aerodynamic trim.',
    presetResult: {
      vehicleOverview: {
        vehicleType: 'Coupe / Sports',
        estimatedMakeModel: 'BMW M4 Competition (G82)',
        confidenceScore: 97,
        vehicleColor: 'Isle of Man Green Metallic',
        vehicleCategory: 'High Performance Sport Coupe',
        estimatedYearRange: '2021 – 2025',
        bodyStyle: '2-Door Performance Coupe'
      },
      visibleCondition: {
        overallScore: 98,
        exteriorCondition: 'Excellent',
        visibleDamageScore: 2,
        tireVisibility: 'Clear & Healthy',
        lightingCondition: 'Intact & Functional',
        glassIntegrity: 'Pristine',
        cleanlinessRating: 'High'
      },
      damageItems: [
        {
          id: 'dmg-b1',
          category: 'scratches',
          label: 'Minor Brake Dust Deposit',
          status: 'Good',
          description: 'Slight brake dust accumulation on front alloy spokes; no metal pitting or rim curb rash.',
          severityScore: 4,
          locationOnCar: { x: 34, y: 70, width: 8, height: 8 },
          recommendation: 'Use pH-neutral wheel cleaner to preserve wheel rim clear coat.'
        }
      ],
      safetyInsights: [
        {
          id: 'safe-b1',
          category: 'Performance Tires',
          priority: 'Low',
          title: 'Low Profile High-Grip Compound',
          advice: 'Performance compound requires temperature monitoring in cold or sub-freezing ambient climates.',
          actionRequired: false,
          iconType: 'gauge'
        },
        {
          id: 'safe-b2',
          category: 'Laserlight Optics',
          priority: 'Low',
          title: 'Adaptive Laser Optics Functional',
          advice: 'Camera-based high beam assist and lens enclosures are clear of dust and debris.',
          actionRequired: false,
          iconType: 'zap'
        }
      ],
      summaryNotes: 'Pristine condition. Carbon aerodynamic components, grille sensors, laser headlights, and side mirrors show no physical distortion or road rash.',
      modelUsed: 'CarVision AI Neural Core v3.4'
    }
  }
];
