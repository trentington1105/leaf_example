const map = L.map('map', { 
    center: [40.0007, -83.008], // -- NEW
    zoom: 17                    // -- NEW
});

//
// KEEP all the base map layers
//

// Add the following
const quick_eats = [
    { name: "Qdoba Mexican Eats",  coords: [40.002265770114704, -83.00831544391653] },
    { name: "Red Chili",           coords: [40.0020812252386, -83.00827194929629] },
    { name: "Smashburger",         coords: [39.999824185055225, -83.007835944253] },
    { name: "Dave's Hot Chicken",  coords: [39.99964518131456, -83.00783907331429] }
]

const convenience_stores = [
    {name: "Target",               coords: [40.00094825710499, -83.00802044889093]}
]

// These may or may not be "landmarks", but a square and a garage are hard to miss 
const landmarks = [
    { name: "University Square",   coords: [40.00018911567196, -83.00766099251994] },
    { name: "Union Garage North",  coords: [39.99895193757101, -83.00846543279417] }
];

quick_eats.forEach(f => L.marker(f.coords).addTo(map));
convenience_stores.forEach(f => L.marker(f.coords).addTo(map));
landmarks.forEach(f => L.marker(f.coords).addTo(map));
