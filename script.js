// ============================================================================
// KAFFEEMASCHINE MIT EINSTELLBARER PULVER-RESERVE & 10 % VERLUST BEIM MAHLEN
// ----------------------------------------------------------------------------
// Funktionsumfang:
//  - 1L Wasser, 500g Bohnen Startwerte
//  - 30g Pulver + 150ml Wasser pro Tasse
//  - Beim Mahlen gehen 10 % des Pulvers "verloren" (z.B. Hitze, Staub)
//  - Maschine mahlt automatisch MEHR Bohnen, um die gewünschte Pulvermenge
//    trotzdem zu erreichen (Verlust wird kompensiert).
//  - Zusätzlich hält die Maschine eine einstellbare Pulver-Reserve (Slider).
//  - Nach 30 Tassen: Wartung nötig.
//
// Dieses Script enthält:
//  - Zustandsvariablen
//  - Mahl-Logik mit Verlust
//  - Kaffeezubereitung
//  - Wartung & Auffüllen
//  - UI-Logik (Status & Loganzeige, Slider-Steuerung)
// ============================================================================



// ============================================================================
// 1) ZUSTANDSVARIABLEN DER MASCHINE
// ============================================================================

// Aktuelle Wassermenge im Tank (Milliliter)
let waterMl = 1000;

// Aktuelle Menge ganzer Bohnen (Gramm)
let beansGr = 500;

// Aktuelle Menge gemahlenen Kaffeepulvers (Gramm)
let groundCoffeeGr = 0;

// Anzahl Tassen seit letzter Wartung
let cupsSinceMaintenance = 0;

// Gesamtanzahl jemals gebrühter Tassen
let cupsTotal = 0;

// Flag: Ist eine Wartung fällig?
let needsMaintenance = false;

// Einstellbare Pulver-Reserve (Gramm), Startwert entspricht dem Slider-Default
let powderReserve = 10;



// ============================================================================
// 2) KONSTANTEN FÜR VERBRAUCH, WARTUNG UND VERLUST
// ============================================================================

// Verbrauch pro Tasse
const WATER_PER_CUP = 150;      // ml Wasser
const COFFEE_PER_CUP = 30;      // g Pulver

// Wartungsintervall (Tassen)
const MAINTENANCE_AFTER = 30;

// Verlustfaktor beim Mahlen (10 %)
const LOSS_FACTOR = 0.10;



// ============================================================================
// 3) BOHNEN MAHLEN – mit 10 % VERLUST, ABER AUSGLEICHEN
// ============================================================================
// desiredPowderGr = wie viel fertiges Pulver zusätzlich im Behälter landen soll.
//
// Logik:
//  Beim Mahlvorgang gehen 10 % des potenziellen Pulvers verloren.
//  Damit trotz Verlust genau "desiredPowderGr" im Behälter landet,
//  müssen wir mehr Bohnen mahlen.
//
//  Formel:
//    beansNeeded * (1 - LOSS_FACTOR) = desiredPowderGr
//    → beansNeeded = desiredPowderGr / (1 - LOSS_FACTOR)
//
// Die Funktion reduziert beansGr um beansNeeded und erhöht groundCoffeeGr
// um desiredPowderGr (nicht um beansNeeded).
//
// Rückgabe: Objekt mit success-Flag und Erklärungstext.
// ============================================================================
function grindBeans(desiredPowderGr) {
  // Berechnen, wie viele Bohnen wir mahlen müssen, um trotz Verlust desiredPowderGr zu bekommen
  const beansNeeded = desiredPowderGr / (1 - LOSS_FACTOR);

  // Prüfen, ob genug Bohnen vorhanden sind
  if (beansGr < beansNeeded) {
    return {
      success: false,
      message: "Nicht genug Bohnen vorhanden, um die benötigte Pulvermenge (inkl. Verlust) zu erzeugen."
    };
  }

  // Bohnenbestand verringern
  beansGr -= beansNeeded;

  // Pulverbestand um die gewünschte Menge erhöhen
  groundCoffeeGr += desiredPowderGr;

  return {
    success: true,
    message:
      `${beansNeeded.toFixed(1)}g Bohnen gemahlen → ${desiredPowderGr.toFixed(1)}g Kaffeepulver ` +
      `(10% Verlust kompensiert)`
  };
}



// ============================================================================
// 4) STATUSOBJEKT ERSTELLEN – für UI-Ausgabe
// ============================================================================
function getStatus() {
  return {
    waterMl,
    beansGr,
    groundCoffeeGr,
    cupsSinceMaintenance,
    cupsTotal,
    needsMaintenance,
    powderReserve   // Reserve auch mitliefern (falls man sie anzeigen möchte)
  };
}



// ============================================================================
// 5) KAFFEE ZUBEREITEN
// ============================================================================
// Schritte:
//   1. Prüfen, ob Wartung nötig ist.
//   2. Prüfen, ob genug Wasser vorhanden ist.
//   3. Prüfen, ob genug Pulver für:
//        - 1 Tasse (30 g)
//        - + aktuelle Reserve (powderReserve)
//      vorhanden ist.
//      Falls nicht, Bohnen nachmahlen (mit Verlustkompensation).
//      Falls Bohnen nicht für Reserve reichen, aber für 1 Tasse, wird nur
//      der Kaffee ohne Reserve nachgefüllt.
//   4. Wenn genug Pulver da ist: Wasser & Pulver abziehen, Zähler erhöhen,
//      Wartungsstatus ggf. setzen.
// ============================================================================
function brewCoffee() {
  // 1) Wartung prüfen
  if (needsMaintenance) {
    return "Wartung erforderlich! Bitte zuerst eine Wartung durchführen.";
  }

  // 2) Wasser prüfen
  if (waterMl < WATER_PER_CUP) {
    return "Nicht genug Wasser im Tank. Bitte Wasser auffüllen.";
  }

  // Text über Mahlvorgänge (falls welche stattfinden)
  let grindInfo = "";

  // Ziel-Pulvermengenlogik:
  // Wir möchten nach dem Mahlen mindestens Pulver für
  //   - eine Tasse (COFFEE_PER_CUP)
  //   - plus eingestellte Reserve (powderReserve)
  const targetPowderAfterGrinding = COFFEE_PER_CUP + powderReserve;

  // Prüfen, ob aktueller Pulverbestand kleiner ist als das Ziel
  if (groundCoffeeGr < targetPowderAfterGrinding) {
    // Fehlende Pulvermenge bis zum Ziel berechnen
    const missingPowder = targetPowderAfterGrinding - groundCoffeeGr;

    // Versuch, diese Menge nachzumahlen
    const grindResult = grindBeans(missingPowder);

    if (!grindResult.success) {
      // Wenn das Mahlen nicht für Reserve reicht, prüfen, ob noch mindestens
      // Pulver für 1 Tasse vorhanden ist
      if (groundCoffeeGr < COFFEE_PER_CUP) {
        // Nicht genug Pulver → Kaffee nicht möglich
        return grindResult.message;
      }

      // Es reicht nur noch für Kaffee ohne Reserve-Nachschub
      grindInfo =
        "Hinweis: Bohnen reichen nur noch für Kaffee ohne zusätzlichen Pulvervorrat.\n";
    } else {
      // Mahlen war erfolgreich → Mahlinfo ins Log aufnehmen
      grindInfo = grindResult.message + "\n";
    }
  }

  // Ab hier: Es ist mindestens genug Pulver für eine Tasse vorhanden.
  // Wasser und Pulver abziehen:
  groundCoffeeGr -= COFFEE_PER_CUP;
  waterMl -= WATER_PER_CUP;

  // Zähler aktualisieren
  cupsSinceMaintenance++;
  cupsTotal++;

  // Wartungsstatus prüfen
  if (cupsSinceMaintenance >= MAINTENANCE_AFTER) {
    needsMaintenance = true;
  }

  // Info über den Kaffee-Bezug
  const brewInfo =
    `Kaffee zubereitet. Tassen seit Wartung: ${cupsSinceMaintenance}/${MAINTENANCE_AFTER}.`;

  // Mahl-Info (falls vorhanden) + Kaffee-Info kombinieren
  return grindInfo + brewInfo;
}



// ============================================================================
// 6) WARTUNG
// ============================================================================
function performMaintenance() {
  if (!needsMaintenance) {
    return "Es ist noch keine Wartung nötig.";
  }

  // Zähler zurücksetzen und Wartungsflag löschen
  cupsSinceMaintenance = 0;
  needsMaintenance = false;

  return "Wartung durchgeführt. Die Maschine ist wieder einsatzbereit.";
}



// ============================================================================
// 7) AUFFÜLLEN VON WASSER UND BOHNEN
// ============================================================================
function refillWater() {
  waterMl = 1000;
  return "Wassertank wurde auf 1000 ml aufgefüllt.";
}

function refillBeans() {
  beansGr = 500;
  return "Bohnenbehälter wurde auf 500 g aufgefüllt.";
}



// ============================================================================
// 8) UI-AKTUALISIERUNG – STATUS IN DIE HTML-ELEMENTE SCHREIBEN
// ============================================================================
function updateStatusView() {
  const status = getStatus();

  // Wasserstand
  document.getElementById("status-water").textContent =
    status.waterMl.toFixed(1) + " ml";

  // Bohnenbestand
  document.getElementById("status-beans").textContent =
    status.beansGr.toFixed(1) + " g";

  // Pulverbestand
  document.getElementById("status-ground").textContent =
    status.groundCoffeeGr.toFixed(1) + " g";

  // Tassenzähler
  document.getElementById("status-cups-total").textContent =
    status.cupsTotal;

  document.getElementById("status-cups-maint").textContent =
    status.cupsSinceMaintenance + " / " + MAINTENANCE_AFTER;

  // Wartungsstatus
  const maintEl = document.getElementById("status-maint");
  if (status.needsMaintenance) {
    maintEl.textContent = "JA";
    maintEl.classList.add("status-maintenance-yes");
    maintEl.classList.remove("status-maintenance-no");
  } else {
    maintEl.textContent = "NEIN";
    maintEl.classList.add("status-maintenance-no");
    maintEl.classList.remove("status-maintenance-yes");
  }

  // Reserve-Anzeige (Text neben dem Slider) aktualisieren
  const reserveValueEl = document.getElementById("reserveValue");
  if (reserveValueEl) {
    reserveValueEl.textContent = powderReserve.toFixed(0) + " g";
  }
}



// ============================================================================
// 9) LOG-NACHRICHTEN IM UI ANZEIGEN
// ============================================================================
function setLogMessage(message) {
  // \n im Text durch <br> ersetzen, damit mehrzeilige Meldungen gut lesbar sind
  document.getElementById("log").innerHTML =
    message.replace(/\n/g, "<br>");
}



// ============================================================================
// 10) BUTTON-HANDLER – werden direkt aus dem HTML (onclick) aufgerufen
// ============================================================================
function handleBrew() {
  const msg = brewCoffee();
  setLogMessage(msg);
  updateStatusView();
}

function handleRefillWater() {
  const msg = refillWater();
  setLogMessage(msg);
  updateStatusView();
}

function handleRefillBeans() {
  const msg = refillBeans();
  setLogMessage(msg);
  updateStatusView();
}

function handleMaintenance() {
  const msg = performMaintenance();
  setLogMessage(msg);
  updateStatusView();
}



// ============================================================================
// 11) RESERVE-SLIDER INITIALISIEREN
// ============================================================================
// Liest den Slider-Wert aus, schreibt ihn in powderReserve
// und aktualisiert die Textanzeige.
// ============================================================================
function initReserveControl() {
  // Slider-Element aus dem DOM holen
  const reserveInputEl = document.getElementById("reserveInput");

  if (!reserveInputEl) {
    // Falls kein Slider im HTML vorhanden ist, abbrechen
    return;
  }

  // Startwert aus dem Slider auslesen und in die Variable übernehmen
  powderReserve = parseFloat(reserveInputEl.value);

  // Anzeige neben dem Slider aktualisieren
  const reserveValueEl = document.getElementById("reserveValue");
  if (reserveValueEl) {
    reserveValueEl.textContent = powderReserve.toFixed(0) + " g";
  }

  // Event-Listener: bei jeder Veränderung des Sliders
  // wird der neue Wert übernommen und die Anzeige aktualisiert.
  reserveInputEl.addEventListener("input", () => {
    const newValue = parseFloat(reserveInputEl.value);

    // Sicherheitshalber prüfen, ob der Wert eine Zahl ist
    if (!isNaN(newValue)) {
      powderReserve = newValue;

      // Textanzeige aktualisieren
      if (reserveValueEl) {
        reserveValueEl.textContent = powderReserve.toFixed(0) + " g";
      }
    }
  });
}



// ============================================================================
// 12) INITIALISIERUNG BEIM LADEN DER SEITE
// ============================================================================
// Wird ausgeführt, sobald "script.js" geladen wurde.
// Das ist sicher, weil der <script>-Tag am Ende des <body> steht.
// ============================================================================
initReserveControl();  // Slider & Reserve initialisieren
updateStatusView();    // Startstatus anzeigen
setLogMessage("Kaffeemaschine ist bereit. Stelle die Pulver-Reserve ein und drücke ☕, um eine Tasse Kaffee zu brühen.");
