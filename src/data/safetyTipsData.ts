export interface SafetyCategory {
  id: string;
  title: string;
  icon: string;
  badge: string;
  summary: string;
  tips: {
    title: string;
    description: string;
    critical: boolean;
    frequency: string;
    checkSteps?: string[];
  }[];
}

export const SAFETY_CATEGORIES: SafetyCategory[] = [
  {
    id: 'before-driving',
    title: 'Before Driving',
    icon: 'Navigation',
    badge: 'Daily Pre-Trip',
    summary: 'A quick 60-second perimeter walkaround prevents 80% of unexpected roadside hazards and prevents costly wheel/body damage.',
    tips: [
      {
        title: '360° Perimeter Walkaround',
        description: 'Walk completely around the car before entering. Check for low tires, broken glass, leaking fluids beneath the engine, or obstructions like toys or curbs behind wheels.',
        critical: true,
        frequency: 'Before every trip',
        checkSteps: [
          'Scan ground underneath vehicle for fresh oil, coolant (bright green/pink), or brake fluid puddles',
          'Ensure license plates are clean and securely fastened',
          'Verify no foreign debris or nails stuck in tire treads'
        ]
      },
      {
        title: 'Dashboard Warning Light Check',
        description: 'Turn ignition to accessory (ON) mode. Verify all warning lights illuminate during bulb-check and extinguish after starting the engine.',
        critical: true,
        frequency: 'Every start',
        checkSteps: [
          'Check Engine, ABS, Battery, and Airbag symbols should turn off within 3 seconds',
          'Verify electronic parking brake releases smoothly'
        ]
      },
      {
        title: 'Fluid Levels Verification',
        description: 'Check engine oil, brake fluid, coolant reservoir level, and windshield washer fluid when the car is parked on level ground.',
        critical: false,
        frequency: 'Bi-weekly or before long trips'
      }
    ]
  },
  {
    id: 'tires',
    title: 'Tires & Pressure',
    icon: 'Disc',
    badge: 'Critical Contact Point',
    summary: 'Tires are the only four points of contact between your vehicle and the road. Proper pressure and tread depth save lives and fuel.',
    tips: [
      {
        title: 'Cold Inflation Pressure Check',
        description: 'Inspect tire pressure when tires have been resting for at least 3 hours. Refer to the sticker on the driver-side door jamb (not the maximum PSI printed on the tire sidewall).',
        critical: true,
        frequency: 'Every 2 weeks & before long trips',
        checkSteps: [
          'Maintain within ±2 PSI of manufacturer spec (typically 32-36 PSI)',
          'Check spare tire pressure (often 60 PSI for compact donuts)',
          'Tire pressure drops ~1 PSI for every 10°F (5.5°C) temperature drop'
        ]
      },
      {
        title: 'Tread Depth (The 2/32" Rule)',
        description: 'Tread depth below 3/32" drastically increases hydroplaning risk on wet asphalt. Use the penny test or built-in tread wear indicator bars.',
        critical: true,
        frequency: 'Monthly',
        checkSteps: [
          'Insert penny into tread with Lincolns head upside down; if top of head is visible, replace tires immediately',
          'Look for built-in horizontal wear bars flush with tread'
        ]
      },
      {
        title: 'Sidewall Bulges, Gouges & Cracking',
        description: 'Pothole impacts can tear internal tire plies, creating bubbles or bulges on the sidewall. A bulging tire can undergo sudden catastrophic blowout at highway speeds.',
        critical: true,
        frequency: 'Monthly & after hard pothole hits'
      },
      {
        title: 'Tire Rotation & Alignment',
        description: 'Rotate tires every 5,000 to 7,500 miles (8,000 - 12,000 km) to balance uneven front/rear drive wheel wear.',
        critical: false,
        frequency: 'Every 6 months'
      }
    ]
  },
  {
    id: 'brakes',
    title: 'Brake System',
    icon: 'Gauge',
    badge: 'Primary Stopping Safety',
    summary: 'Braking performance depends on pad thickness, rotor smoothness, brake line integrity, and moisture-free hydraulic fluid.',
    tips: [
      {
        title: 'Listen for Wear Indicators',
        description: 'A high-pitched metallic squeal when gently braking is the wear indicator warning you that brake pads have reached 3mm thickness.',
        critical: true,
        frequency: 'Continuous awareness',
        checkSteps: [
          'Squealing = 20-25% pad life remaining',
          'Grinding sound = Pads fully worn away, metal rotor damage in progress',
          'Pulsating brake pedal = Warped rotors or uneven pad deposit'
        ]
      },
      {
        title: 'Brake Pedal Firmness & Travel',
        description: 'If the brake pedal feels spongy, sinks to the floor, or requires double-pumping to stop, air or moisture has contaminated the hydraulic line.',
        critical: true,
        frequency: 'Daily check',
        checkSteps: [
          'Pedal should provide immediate resistance within 1-2 inches of travel',
          'If sinking occurs at red lights, master cylinder may have internal seal bypass'
        ]
      },
      {
        title: 'Brake Fluid Moisture Flush',
        description: 'Brake fluid absorbs ambient humidity over time (hygroscopic), lowering its boiling point and causing sudden brake fade under mountain or heavy traffic braking.',
        critical: false,
        frequency: 'Every 2-3 years'
      }
    ]
  },
  {
    id: 'lights',
    title: 'Lights & Illumination',
    icon: 'Sun',
    badge: 'See & Be Seen',
    summary: 'Clear, correctly aimed lights allow you to identify road obstacles 3-4 seconds earlier and prevent rear-end collisions in rain or dusk.',
    tips: [
      {
        title: 'Full Exterior Lighting Audit',
        description: 'Test all lighting circuits: low beams, high beams, fog lights, front/rear turn signals, hazard flashers, and reverse lights.',
        critical: true,
        frequency: 'Weekly',
        checkSteps: [
          'Park facing a garage door or light wall to quickly observe both headlight beams',
          'Back up towards a reflective surface to check high-mount third brake light',
          'Replace dimmed halogen bulbs in pairs to maintain even beam balance'
        ]
      },
      {
        title: 'Headlight Lens Oxidation & Hazing',
        description: 'Sun UV exposure yellows polycarbonate headlight lenses, reducing nighttime lumens output by up to 80%.',
        critical: true,
        frequency: 'Every 6 months',
        checkSteps: [
          'Use headlight restoration polish and UV clear ceramic seal to restore optical clarity'
        ]
      },
      {
        title: 'Brake Light & Turn Signal Rapid Flash',
        description: 'If your turn signal clicks twice as fast as usual, one of your exterior signal bulbs has burned out.',
        critical: false,
        frequency: 'Instant indicator'
      }
    ]
  },
  {
    id: 'mirrors',
    title: 'Mirrors & Blind Spots',
    icon: 'Eye',
    badge: 'Spatial Awareness',
    summary: 'Proper mirror geometry eliminates 90% of traditional blind spots and avoids dangerous lane-change surprises.',
    tips: [
      {
        title: 'The SAE Blind-Spot Mirror Angle',
        description: 'Lean your head left against the driver window and adjust the left mirror until your own cars side barely vanishes. Lean right towards center console and do the same for the right mirror.',
        critical: true,
        frequency: 'When adjusting seating position',
        checkSteps: [
          'You should not see your own vehicle flank when sitting upright',
          'Passing vehicles will transition seamlessly from rearview mirror to side mirror to peripheral vision'
        ]
      },
      {
        title: 'Clean Mirror Glass & Heating Elements',
        description: 'Keep side mirrors free of road grime, water spots, and ice. Turn on rear defroster switch to activate heated side mirror de-fogging.',
        critical: false,
        frequency: 'Before driving in foul weather'
      },
      {
        title: 'Physical Shoulder Check Habit',
        description: 'Never rely 100% on electronic Blind Spot Monitors (BSM); always perform a quick 0.5-second chin-to-shoulder check before initiating lane changes.',
        critical: true,
        frequency: 'Every lane change'
      }
    ]
  },
  {
    id: 'windshield',
    title: 'Windshield & Wipers',
    icon: 'Shield',
    badge: 'Structural Glass',
    summary: 'Your windshield provides up to 30% of structural cabin integrity in a rollover and supports passenger airbag deployment.',
    tips: [
      {
        title: 'Immediate Rock Chip Repair',
        description: 'A small bullseye or star chip under a quarter-dollar coin can be quickly resin-repaired. If left exposed, cabin heating/AC thermal shocks will cause it to spread into a full-width crack.',
        critical: true,
        frequency: 'Immediate upon impact',
        checkSteps: [
          'Place clear tape over fresh chip to prevent dirt/water entering until repaired',
          'Cracks directly across the drivers sweep zone fail annual safety inspections'
        ]
      },
      {
        title: 'Wiper Blade Replacement Schedule',
        description: 'Rubber wiper squeegees oxidize and tear from sun and ice. Streaking or chattering leaves dangerous glare films during nighttime storms.',
        critical: true,
        frequency: 'Replace every 6-12 months',
        checkSteps: [
          'Clean rubber blades with rubbing alcohol / washer fluid monthly',
          'Never use wipers to scrape ice off frozen windshields'
        ]
      },
      {
        title: 'Interior Glass Degreasing',
        description: 'Dashboard vinyl releases plasticizer off-gas vapors that create a hazy film inside the glass, causing blinding oncoming headlight glare.',
        critical: false,
        frequency: 'Monthly interior clean'
      }
    ]
  },
  {
    id: 'seat-belts',
    title: 'Seat Belts & Restraints',
    icon: 'CheckCircle',
    badge: 'Primary Restraint System',
    summary: 'Seat belts reduce the risk of fatal front-seat passenger injury by 45% and moderate-to-critical injury by 50%.',
    tips: [
      {
        title: 'Correct Lap & Shoulder Belt Geometry',
        description: 'Lap belt must rest snugly across the pelvic hip bones (never the soft abdomen). Shoulder belt crosses the center of the clavicle without rubbing the neck or slipping off shoulder.',
        critical: true,
        frequency: 'Every occupant, every trip',
        checkSteps: [
          'Adjust B-pillar height slider so belt crosses mid-collarbone',
          'Never route shoulder belt behind back or under arm'
        ]
      },
      {
        title: 'Inertia Reel & Webbing Condition Check',
        description: 'Tug firmly on the seat belt with a sharp pull. The inertia mechanism must lock instantaneously. Inspect webbing for frays or cuts.',
        critical: true,
        frequency: 'Monthly check'
      },
      {
        title: 'Child Safety Seat Anchor (LATCH/ISOFIX)',
        description: 'Verify child safety seats do not move more than 1 inch side-to-side at the belt path. Top tether strap must be secured for all forward-facing seats.',
        critical: true,
        frequency: 'Every installation'
      }
    ]
  },
  {
    id: 'emergency-kit',
    title: 'Emergency Roadside Kit',
    icon: 'AlertTriangle',
    badge: 'Preparedness',
    summary: 'Having the right emergency essentials transforms a dangerous highway breakdown into a safe, controlled situation.',
    tips: [
      {
        title: 'Active Warning & Visibility Gear',
        description: 'Make yourself visible to oncoming 70mph highway traffic before stepping out of the vehicle.',
        critical: true,
        frequency: 'Inspect seasonally',
        checkSteps: [
          'High-visibility reflective vest (keep in glovebox/door pocket, not trunk)',
          '3 DOT reflective warning triangles or LED hazard flares',
          'High-lumen waterproof LED flashlight with fresh lithium batteries'
        ]
      },
      {
        title: 'Tire & Battery Recovery Tools',
        description: 'Ensure you can self-recover from a flat tire or dead battery without waiting hours for a tow truck in isolated areas.',
        critical: true,
        frequency: 'Verify every 3 months',
        checkSteps: [
          'Portable Lithium-Ion jump starter power bank (charge every 4 months)',
          '12V Portable digital tire inflator with preset PSI auto-shutoff',
          'Tire plug puncture repair kit & working scissor jack + lug wrench'
        ]
      },
      {
        title: 'First Aid & Survival Essentials',
        description: 'Sterile gauze, antiseptic wipes, thermal foil space blankets, bottled drinking water, work gloves, and multi-tool.',
        critical: false,
        frequency: 'Annual kit refresh'
      }
    ]
  }
];

export const PRE_TRIP_CHECKLIST = [
  { id: 'c1', label: 'Tire pressure visually inspected & no flat stance', category: 'Tires' },
  { id: 'c2', label: 'Headlights, brake lights & turn signals working', category: 'Lights' },
  { id: 'c3', label: 'Windshield clean & washer fluid sprayed test ok', category: 'Vision' },
  { id: 'c4', label: 'Side mirrors adjusted to minimize blind spots', category: 'Mirrors' },
  { id: 'c5', label: 'No warning lights on dashboard after engine start', category: 'Engine' },
  { id: 'c6', label: 'Brake pedal feels firm and engages smoothly', category: 'Brakes' },
  { id: 'c7', label: 'All passengers wearing seatbelts correctly', category: 'Cabin' },
  { id: 'c8', label: 'Emergency warning triangles & flashlight in trunk', category: 'Safety' },
];
