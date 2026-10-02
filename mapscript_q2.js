const map = L.map('map', { 
    center: [40.0007, -83.0095], // -- NEW
    zoom: 17                  // -- NEW
});

const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
}).addTo(map);   // on by default

const topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

const traditions_eats = [
    { name: "Traditions at Scott",  coords: [40.004108732845744, -83.01323597127163] },
    { name: "Traditions at Kennedy",           coords: [39.99647284093436, -83.01264195044854] }
]

const entertainment = [
    {name: "Newport", coords: [39.99745267273622, -83.00741143715854] },
    {name: "Out-R-Inn", coords: [40.002154225855534, -83.00779834513376] }
]

// These may or may not be "landmarks", but a square and a garage are hard to miss 
const landmarks = [
    { name: "Thompson Library",   coords: [39.99937633863577, -83.01445923296028] },
    { name: "Mirror Lake",  coords: [39.9980164112547, -83.01435302290851] }
];

function svgIcon(color) {
    return L.divIcon({
        className: 'poi-icon',
        html: `
            <svg width="25" height="32" viewBox="0 0 25 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.5 12.5 32 12.5 32S25 21.5 25 12.5C25 5.6 19.4 0 12.5 0z"
                    fill="${color}" stroke="#1c2b24" stroke-width="1"/>
                <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
            </svg>`,
        iconSize:    [25, 32],  // match SVG's width/height
        iconAnchor:  [12, 32],  // the pinpoint — where the actual coordinate is at
        popupAnchor: [0, -28]   // where a popup opens relative to iconAnchor
    });
}

const QEATS_COLOR    = '#a6531c';
const LANDMARK_COLOR = '#1fbf78';
const STORE_COLOR    = '#1f78bf'

const johnglen = [
    [40.001350291320385, -83.01060663427347],
    [40.00106395258054, -83.01300051238107],
    [40.00078540265571, -83.01539278881002]
];

const twelfth = [
    [39.99684243505361, -83.0076238573775],
    [39.99695867121982, -83.01011220716225],
    [39.99673201051243, -83.01207709312037],
    [39.99691798858416, -83.01372334892311],
    [39.99686568230267, -83.01483096803462]
]
// polygon with holes
// make sure the exterior is counterclockwise and all interiors are clockwise
const Derby = [
    // outer ring
    [
        [40.0009489379062, -83.01283223246266],
        [40.0005584633658, -83.01279163418609],
        [40.00066212939072, -83.01202026693161],
        [40.001038781289736, -83.01211950716318]
    ],
    // first hole
    [
        [40.00089710513114, -83.01269690487415],
        [40.00095239342314, -83.01222776923397],
        [40.00074160656988, -83.01218717095743],
        [40.00068286257682, -83.01265630659759]
    ]
]

// multipolygon
const oval = 
[
    // polygon 1
    [
        // first ring -- only has one ring
        [
            [39.99920468982349, -83.01551439161717],
            [39.99872799423255, -83.01516034004875],
            [39.99857183460844, -83.014033812331],
            [39.99894984156945, -83.01083661013917],
            [39.99972234294446, -83.00973153304354],
            [40.00025656275747, -83.01003194043493],
            [40.000412718528786, -83.0120704191623],
            [40.000133281633154, -83.01462388198922],
            [39.999475768425214, -83.01550366759379]
        ]
    ],
    // polygon 2
    [
        [
            [39.998226495085206, -83.00989248645665],
            [39.99808677230696, -83.01321842543288],
            [39.99861278519202, -83.01502084743889],
            [39.997626492545436, -83.0150315319259],
            [39.99772512108338, -83.01413030975168],
            [39.99702649920391, -83.013980106056],
            [39.99681280167216, -83.01187725431618],
            [39.99705937568791, -83.00962419888067]
        ]
    ]
]

// 1. Make 3 layer groups for the points

const traditionsLayer = L.layerGroup(
    traditions_eats.map(f => L.marker(f.coords, { icon: svgIcon(QEATS_COLOR) })
        .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`)))
        .addTo(map);

const entertainmentLayer = L.layerGroup(
  entertainment.map(f => L.marker(f.coords, { icon: svgIcon(STORE_COLOR) })) // construct a new array
).addTo(map);

const landmarksLayer = L.layerGroup(
  landmarks.map(f => L.marker(f.coords, { icon: svgIcon(LANDMARK_COLOR) })) // construct a new array
).addTo(map);

// 2. Create one layer group for all streets
const linesLayer = L.layerGroup([
    L.polyline(johnglen, { color: '#a6531c', weight: 4 }),
    L.polyline(twelfth, { color: '#a6531c', weight: 4 }),
]);

// 3. Create one layer group for all buildings
const polygon_style = {color: '#1f6f78', fillColor: '#1f6f78', fillOpacity: 0.25};

const buildingLayer = L.layerGroup([
    L.polygon(oval, polygon_style),
    L.polygon(Derby, polygon_style)
])

const radar = L.tileLayer.wms('https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi', {
    layers: 'nexrad-n0r',
    format: 'image/png',
    transparent: true,
    attribution: 'Weather data &copy; Iowa Environmental Mesonet'
}).addTo(map);

L.control.layers(
    { "Streets": streets, "Topographic": topo, "Satellite": satellite, "OpenStreetMap": osm },
    { "Quick eats": traditionsLayer, "Enterntainment": entertainmentLayer, "Landmarks": landmarksLayer, 
        "Streets": linesLayer, "Campus Icons": buildingLayer, "Radar": radar }
).addTo(map);
