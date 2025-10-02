// Grundwerte
let clicks = parseInt(localStorage.getItem('clicks')) || 0;
let cpc = parseInt(localStorage.getItem('cpc')) || 1; // Klick pro Klick
let cps = parseInt(localStorage.getItem('cps')) || 0; // Klicks pro Sekunde

// Upgrades
const upgrades = [
    {name: "Klick +1", type: "click", cost: 10, value: 1, owned: 0},
    {name: "Klick +5", type: "click", cost: 50, value: 5, owned: 0},
    {name: "Auto Klicker 1/s", type: "auto", cost: 20, value: 1, owned: 0},
    {name: "Auto Klicker 5/s", type: "auto", cost: 100, value: 5, owned: 0},
    {name: "Auto Klicker 10/s", type: "auto", cost: 500, value: 10, owned: 0},
    {name: "Auto Klicker 50/s", type: "auto", cost: 2000, value: 50, owned: 0}
];

// Upgrade Buttons anzeigen
const upgradesDiv = document.getElementById('upgrades');
function renderUpgrades() {
    upgradesDiv.innerHTML = "";
    upgrades.forEach((u, index) => {
        const btn = document.createElement('button');
        btn.innerHTML = `${u.name} - Kosten: ${u.cost} - Besitzt: ${u.owned}`;
        btn.classList.add('upgrade');
        btn.onclick = () => buyUpgrade(index);
        upgradesDiv.appendChild(btn);
    });
}

// Upgrade kaufen
function buyUpgrade(i) {
    let u = upgrades[i];
    if (clicks >= u.cost) {
        clicks -= u.cost;
        u.owned += 1;

        // Effekt anwenden
        if (u.type === "click") cpc += u.value;
        if (u.type === "auto") cps += u.value;

        // Preis nach Kauf verdoppeln
        u.cost = Math.ceil(u.cost * 2);

        updateDisplay();
        saveGame();
    } else {
        alert("Nicht genug Klicks!");
    }
}

// Klick Button
document.getElementById('clickBtn').addEventListener('click', () => {
    clicks += cpc;
    updateDisplay();
    saveGame();
});

// CPS Timer
setInterval(() => {
    clicks += cps;
    updateDisplay();
    saveGame();
}, 1000);

// Temporäre Upgrades zufällig (5 Sekunden)
function tempUpgrade() {
    const index = Math.floor(Math.random() * upgrades.length);
    const u = upgrades[index];
    if (u.type === "click") cpc += u.value;
    if (u.type === "auto") cps += u.value;
    updateDisplay();

    // Nach 5 Sekunden wieder entfernen
    setTimeout(() => {
        if (u.type === "click") cpc -= u.value;
        if (u.type === "auto") cps -= u.value;
        updateDisplay();
    }, 5000);
}

// Alle 20-40 Sekunden kommt ein temporäres Upgrade
setInterval(() => {
    tempUpgrade();
}, Math.floor(Math.random() * 20000) + 20000);

// Anzeige aktualisieren
function updateDisplay() {
    document.getElementById('clicks').innerText = clicks;
    document.getElementById('cpc').innerText = cpc;
    document.getElementById('cps').innerText = cps;
    renderUpgrades();
}

// Speichern
function saveGame() {
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('cpc', cpc);
    localStorage.setItem('cps', cps);
}

// Beim Laden
updateDisplay();
