import { useState } from 'react';

const climateData = {
  'hot-humid': {
    label: 'Hot-Humid',
    priorities: {
      bestFacing: ['South', 'East'],
      avoidFacing: ['West'],
      kitchen: 'East or Southeast side — morning light, heat dissipates before afternoon peak',
      masterBedroom: 'East or South with shade — avoid west-facing windows that trap afternoon heat',
      garage: 'West side — acts as thermal buffer against intense afternoon sun',
      outdoorLiving: 'South or East with covered patio — catches breezes, manageable sun',
      trees: 'West and Southwest sides — live oaks, cedar elms for shade canopy',
      windows: 'Minimize west glazing, maximize south with deep overhangs (2-3 ft)',
      ventilation: 'South-facing openings to catch prevailing breezes, cross-ventilate to north'
    },
    reasoning: {
      bestFacing: 'Southern sun can be controlled with overhangs due to high sun angle in summer. East-facing captures gentle morning light while keeping harsh afternoon sun at the back.',
      avoidFacing: 'West-facing homes receive brutal afternoon sun directly at the entrance, heating up the front during peak temperatures (3-6 PM).',
      kitchen: 'Kitchens generate heat. East placement means morning sunlight for meal prep, but by afternoon the kitchen is not receiving additional solar heat.',
      masterBedroom: 'West-facing bedroom windows absorb late afternoon sun, radiating heat into the room through evening hours when you want to sleep.',
      garage: 'Garages tolerate temperature swings. Placing them on the west absorbs afternoon heat that would otherwise hit living spaces.',
      outdoorLiving: 'In hot-humid climates, outdoor spaces need shade and airflow. South and east-facing patios can be covered to block direct sun.',
      trees: 'Deciduous trees on the west block summer sun when in full leaf, then allow winter sun through. Can reduce cooling costs by 20-30%.',
      windows: 'West-facing glass is the biggest source of solar heat gain. South-facing glass with overhangs stays shaded in summer but admits winter sun.',
      ventilation: 'Hot-humid climates benefit from air movement. Prevailing winds typically come from the south/southeast.'
    }
  },
  'hot-arid': {
    label: 'Hot-Arid',
    priorities: {
      bestFacing: ['North', 'East'],
      avoidFacing: ['West', 'Southwest'],
      kitchen: 'North or East side — minimize additional heat gain',
      masterBedroom: 'North or East — coolest orientations, avoid any west exposure',
      garage: 'West or Southwest — maximum buffer against extreme afternoon heat',
      outdoorLiving: 'North-facing courtyard style — shaded outdoor rooms',
      trees: 'All sides, especially west — desert-adapted species',
      windows: 'Small or no west windows, thermal mass walls, deep recessed openings',
      ventilation: 'Night flush cooling — open up after sunset to release stored heat'
    },
    reasoning: {
      bestFacing: 'North-facing entries stay shaded all day. East-facing gets only morning sun. Both are traditional in desert architecture.',
      avoidFacing: 'Desert afternoons are extreme—often 100°F+. West and southwest exposures receive relentless sun during peak heat.',
      kitchen: 'When outdoor temps exceed 100°F, every internal heat source matters. North-facing kitchens receive no direct sun.',
      masterBedroom: 'Desert nights can be pleasant if your bedroom has not been baking all afternoon.',
      garage: 'In arid climates, garage temps can exceed 130°F if west-facing. Use it as a thermal buffer.',
      outdoorLiving: 'Courtyard designs create shaded microclimates. North-facing outdoor rooms stay comfortable even in summer.',
      trees: 'Every bit of shade helps. Trees also provide evaporative cooling as they transpire.',
      windows: 'Thermal mass absorbs daytime heat slowly and releases it at night. Deep-set windows create self-shading.',
      ventilation: 'Desert nights are often 20-30°F cooler than days. Opening up after sunset flushes out heat.'
    }
  },
  'mixed': {
    label: 'Mixed (Hot Summer/Cold Winter)',
    priorities: {
      bestFacing: ['South', 'Southeast'],
      avoidFacing: ['West', 'North'],
      kitchen: 'Southeast — balanced light, traditional fire-element positioning',
      masterBedroom: 'Southwest or South — winter sun warmth, manageable with summer shading',
      garage: 'North or Northwest — buffers cold winter winds',
      outdoorLiving: 'South-facing — extends usable season into spring and fall',
      trees: 'Deciduous on west and south — summer shade, winter sun penetration',
      windows: 'Maximize south glazing with overhangs, minimize north and west',
      ventilation: 'Operable windows on multiple sides for shoulder-season comfort'
    },
    reasoning: {
      bestFacing: 'South-facing homes capture winter sun (free heating) while blocking summer sun with overhangs.',
      avoidFacing: 'West-facing has summer heat problems. North-facing misses beneficial winter sun.',
      kitchen: 'Southeast provides bright morning light and aligns with Vaastu fire-element principles.',
      masterBedroom: 'South-facing bedrooms receive warming winter sun but can be shaded in summer.',
      garage: 'Cold winter winds come from north and northwest. The garage creates a buffer zone.',
      outdoorLiving: 'South-facing patios warm up on sunny winter days, extending outdoor season by 2-3 months.',
      trees: 'Deciduous trees block summer sun when leafed out, allow winter sun through when bare.',
      windows: 'South windows with overhangs work year-round: shaded in summer, sunny in winter.',
      ventilation: 'Mixed climates have pleasant shoulder seasons where natural ventilation works well.'
    }
  },
  'cold': {
    label: 'Cold',
    priorities: {
      bestFacing: ['South', 'Southeast'],
      avoidFacing: ['North', 'Northwest'],
      kitchen: 'South or East — capture winter light, cooking warmth is welcome',
      masterBedroom: 'South — passive solar warming, winter brightness helps mood',
      garage: 'North — essential buffer against harsh winter winds',
      outdoorLiving: 'South-facing sun porch or three-season room',
      trees: 'Evergreens on north as windbreak, deciduous on south',
      windows: 'Maximize south glazing (triple-pane), minimize north',
      ventilation: 'Controlled ventilation with heat recovery'
    },
    reasoning: {
      bestFacing: 'In cold climates, solar gain is precious. South-facing homes capture significant passive heating.',
      avoidFacing: 'North-facing entries are dark and cold in winter, receiving no direct sun for months.',
      kitchen: 'In cold climates, kitchen heat is a feature. South or east means cooking warmth helps heat the home.',
      masterBedroom: 'Winter depression (SAD) is real. A south-facing bedroom receives maximum winter light.',
      garage: 'Northern garages block cold winter winds, meaningfully reducing heat loss.',
      outdoorLiving: 'A south-facing protected space can be comfortable even on cool sunny days.',
      trees: 'Evergreen windbreaks on the north block bitter winds. Keep south open for winter sun.',
      windows: 'Triple-pane south windows can achieve net energy gain on sunny winter days.',
      ventilation: 'Heat recovery ventilators provide fresh air while capturing heat from exhaust.'
    }
  },
  'marine': {
    label: 'Marine (Mild/Wet)',
    priorities: {
      bestFacing: ['South', 'East'],
      avoidFacing: ['North'],
      kitchen: 'East or South — maximize natural light in overcast climate',
      masterBedroom: 'East or Southeast — morning light crucial in gray climate',
      garage: 'North or West — buffers rain-driven wind',
      outdoorLiving: 'Covered south-facing — usable during light rain',
      trees: 'Strategic placement to allow sun, windbreaks on rain side',
      windows: 'Generous south and east glazing, good rain protection',
      ventilation: 'Dehumidification important, protect openings from rain'
    },
    reasoning: {
      bestFacing: 'Marine climates are often overcast. South and east maximize daylight capture.',
      avoidFacing: 'North-facing homes in gray climates feel dark, requiring artificial lighting most of the day.',
      kitchen: 'Morning light is especially valuable when evenings might be overcast.',
      masterBedroom: 'Waking to natural light regulates circadian rhythm—critical with long dark winters.',
      garage: 'Rain often comes with wind. A garage on the windward side protects from intrusion.',
      outdoorLiving: 'Covered outdoor spaces are essential. South-facing patios remain usable during light rain.',
      trees: 'Marine climates need trees placed to not block precious sun.',
      windows: 'Generous glazing captures daylight but must be detailed to handle rain.',
      ventilation: 'Marine climates are humid. Ventilation addresses moisture as much as temperature.'
    }
  }
};

const cityToClimate = {
  'austin': 'hot-humid', 'houston': 'hot-humid', 'san antonio': 'hot-humid',
  'dallas': 'mixed', 'fort worth': 'mixed', 'killeen': 'hot-humid',
  'temple': 'hot-humid', 'waco': 'hot-humid', 'round rock': 'hot-humid',
  'georgetown': 'hot-humid', 'cedar park': 'hot-humid', 'pflugerville': 'hot-humid',
  'miami': 'hot-humid', 'orlando': 'hot-humid', 'tampa': 'hot-humid',
  'jacksonville': 'hot-humid', 'new orleans': 'hot-humid', 'atlanta': 'mixed',
  'nashville': 'mixed', 'charlotte': 'mixed', 'phoenix': 'hot-arid',
  'tucson': 'hot-arid', 'las vegas': 'hot-arid', 'albuquerque': 'hot-arid',
  'el paso': 'hot-arid', 'denver': 'cold', 'chicago': 'cold',
  'minneapolis': 'cold', 'detroit': 'cold', 'boston': 'cold',
  'new york': 'cold', 'philadelphia': 'mixed', 'seattle': 'marine',
  'portland': 'marine', 'san francisco': 'marine', 'san diego': 'marine',
  'los angeles': 'marine', 'oklahoma city': 'mixed', 'kansas city': 'mixed',
  'st louis': 'mixed', 'indianapolis': 'mixed', 'columbus': 'mixed',
  'pittsburgh': 'cold', 'baltimore': 'mixed', 'washington dc': 'mixed',
  'raleigh': 'mixed', 'richmond': 'mixed', 'salt lake city': 'cold',
  'boise': 'cold', 'sacramento': 'marine'
};

const getClimateFromCoords = (lat, lon) => {
  if (lon < -115 && lat > 32 && lat < 49) return 'marine';
  if (lon > -118 && lon < -103 && lat < 37 && lat > 31) return 'hot-arid';
  if (lat > 43) return 'cold';
  if (lat < 33 && lon > -100) return 'hot-humid';
  if (lat > 29 && lat < 34 && lon > -100 && lon < -95) return 'hot-humid';
  if (lon > -88 && lat < 31) return 'hot-humid';
  return 'mixed';
};

export default function App() {
  const [input, setInput] = useState('');
  const [climate, setClimate] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [error, setError] = useState('');
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState('');

  const analyze = () => {
    const trimmed = input.trim();
    const trimmedLower = trimmed.toLowerCase();
    const coordPattern = /^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/;
    const match = trimmedLower.match(coordPattern);
    
    if (match) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[2]);
      if (lat < 24 || lat > 50 || lon < -125 || lon > -66) {
        setError('Coordinates appear to be outside the US');
        return;
      }
      setCoords({ lat, lon });
      const detectedClimate = getClimateFromCoords(lat, lon);
      setClimate(climateData[detectedClimate]);
      setLocationName(`${lat.toFixed(2)}°N, ${Math.abs(lon).toFixed(2)}°W`);
      setError('');
      setExpandedItems({});
    } else {
      const detected = cityToClimate[trimmedLower];
      if (detected) {
        setClimate(climateData[detected]);
        setLocationName(trimmed.charAt(0).toUpperCase() + trimmed.slice(1));
        setCoords(null);
        setError('');
        setExpandedItems({});
      } else {
        setError('City not found. Try a major US city or enter coordinates (e.g., 31.12, -97.73)');
        setClimate(null);
      }
    }
  };

  const toggleExpand = (key) => {
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const PriorityRow = ({ label, value, reasonKey }) => (
    <div className="border-b border-gray-100 last:border-b-0">
      <div 
        className="flex justify-between items-start py-3 cursor-pointer hover:bg-gray-50 px-2 rounded"
        onClick={() => toggleExpand(reasonKey)}
      >
        <span className="font-medium text-gray-700 w-1/3">{label}</span>
        <span className="text-gray-600 w-1/2">{Array.isArray(value) ? value.join(', ') : value}</span>
        <span className="text-blue-500 text-sm w-12 text-right">
          {expandedItems[reasonKey] ? '▼' : 'Why?'}
        </span>
      </div>
      {expandedItems[reasonKey] && climate.reasoning[reasonKey] && (
        <div className="bg-blue-50 p-3 mx-2 mb-2 rounded text-sm text-gray-700 leading-relaxed">
          {climate.reasoning[reasonKey]}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-amber-800 mb-2">☀️ SolarVastu</h1>
          <p className="text-gray-600">Climate-Adapted Home Harmony Guide</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter city name or coordinates
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyze()}
              placeholder="e.g., Austin or 31.12, -97.73"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <button
              onClick={analyze}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
              Analyze
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            For coordinates: latitude, longitude (e.g., 31.12, -97.73 for Killeen)
          </p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {!climate && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <p className="text-sm text-gray-600 mb-3">Or select your climate zone:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(climateData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => {
                    setClimate(climateData[key]);
                    setLocationName(data.label + ' Zone');
                    setError('');
                    setExpandedItems({});
                  }}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-amber-100 transition"
                >
                  {data.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {climate && (
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-amber-800">
                {locationName} Home Harmony
              </h2>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                {climate.label}
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-4 italic">
              Tap "Why?" on any row to see the reasoning
            </p>

            <div className="space-y-1">
              <PriorityRow label="Best Facing" value={climate.priorities.bestFacing} reasonKey="bestFacing" />
              <PriorityRow label="Avoid Facing" value={climate.priorities.avoidFacing} reasonKey="avoidFacing" />
              <PriorityRow label="Kitchen" value={climate.priorities.kitchen} reasonKey="kitchen" />
              <PriorityRow label="Master Bedroom" value={climate.priorities.masterBedroom} reasonKey="masterBedroom" />
              <PriorityRow label="Garage" value={climate.priorities.garage} reasonKey="garage" />
              <PriorityRow label="Outdoor Living" value={climate.priorities.outdoorLiving} reasonKey="outdoorLiving" />
              <PriorityRow label="Trees" value={climate.priorities.trees} reasonKey="trees" />
              <PriorityRow label="Windows" value={climate.priorities.windows} reasonKey="windows" />
              <PriorityRow label="Ventilation" value={climate.priorities.ventilation} reasonKey="ventilation" />
            </div>

            {coords && (
              <div className="mt-3 text-xs text-gray-500 text-center">
                Coordinates: {coords.lat.toFixed(4)}°N, {Math.abs(coords.lon).toFixed(4)}°W
              </div>
            )}

            <button
              onClick={() => {
                setClimate(null);
                setInput('');
                setLocationName('');
                setCoords(null);
                setExpandedItems({});
              }}
              className="mt-4 w-full py-2 text-gray-500 text-sm hover:text-gray-700"
            >
              ← Try another location
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>SolarVastu — Vaastu Shastra adapted for your climate zone</p>
          <p className="mt-1">Ancient wisdom meets modern building science</p>
        </div>
      </div>
    </div>
  );
}
