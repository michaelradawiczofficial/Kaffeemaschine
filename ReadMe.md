# ☕ JS Kaffeemaschine Simulation

![Status](https://img.shields.io/badge/Status-Finished-success) ![Tech](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20VanillaJS-yellow)

Eine interaktive Simulation eines Kaffeevollautomaten, entwickelt mit Vanilla JavaScript. Das Projekt demonstriert State-Management, DOM-Manipulation und algorithmische Logik zur Ressourcenberechnung (z.B. Kompensation von Mahlverlusten).

## 🌟 Features

* **Detailliertes Ressourcen-Management:** Die Maschine verwaltet Wasser (ml), Kaffeebohnen (g) und gemahlenes Pulver (g) in Echtzeit.
* **Intelligente Mahl-Logik:**
    * Simuliert **10% Materialverlust** beim Mahlen (Staub/Hitze).
    * **Automatische Kompensation:** Der Algorithmus berechnet dynamisch, wie viele Bohnen *zusätzlich* gemahlen werden müssen, um trotz Verlust die exakte Zielmenge an Pulver zu erhalten.
* **Einstellbare Pulver-Reserve:** Über einen Slider kann definiert werden, wie viel gemahlenes Pulver die Maschine *zusätzlich* zur aktuellen Tasse auf Vorrat halten soll (Buffer-Logik).
* **Wartungs-Zyklus:** Nach 30 Tassen blockiert die Maschine und erzwingt einen Wartungsvorgang.
* **Modernes UI:** Dunkles Design ("Dark Mode") mit schwebender Karten-Optik und responsivem Layout.

## 🧠 Wie es funktioniert (Logik)

### 1. Der Verlust-Algorithmus
Eine Besonderheit des Codes ist die Funktion `grindBeans`. Da beim Mahlen 10% (`LOSS_FACTOR = 0.10`) verloren gehen, reicht es nicht, einfach die benötigte Menge vom Bohnenvorrat abzuziehen.

Die Formel zur Berechnung der benötigten Bohnen lautet:

$$Bohnen = \frac{\text{Gewünschtes Pulver}}{1 - \text{Verlustfaktor}}$$

Dies stellt sicher, dass exakt die angeforderte Menge im Pulverbehälter landet.

### 2. Die "Brewing"-Pipeline
Beim Klick auf "Kaffee zubereiten" (`brewCoffee`) passiert folgendes:
1.  **Check:** Ist Wartung nötig? Ist genug Wasser da?
2.  **Reserve-Check:** Ist genug Pulver für **1 Tasse + eingestellte Reserve** vorhanden?
3.  **Action:** Falls nein, wird die Differenz (inkl. Verlustausgleich) frisch nachgemahlen.
4.  **Result:** Kaffee wird gebrüht, Zähler erhöht, Status-UI aktualisiert.

## 🛠 Technologien

* **HTML5:** Semantische Struktur und Input-Range Slider.
* **CSS3:** Flexbox-Layout, CSS-Variablen-ähnliche Strukturierung und Hover-Effekte für Buttons.
* **JavaScript (ES6):**
    * Keine externen Frameworks (Vanilla JS).
    * Event-Handling für Buttons und Slider (`addEventListener`, `onclick`).
    * Status-Objekt Rückgabe (`getStatus()`) zur sauberen Trennung von Logik und View.

## 🚀 Installation & Nutzung

Da das Projekt keine Build-Tools benötigt, kann es direkt im Browser ausgeführt werden.

1.  **Repository klonen:**
    ```bash
    git clone [https://github.com/michaelradawiczofficial/Kaffeemaschine.git]
    ```

2.  **Starten:**
    Öffne die Datei `index.html` in einem beliebigen modernen Webbrowser.

## 📂 Projektstruktur

```plaintext
/
├── index.html      # UI-Gerüst, Slider und Button-Events
├── style.css       # Dark Mode Styling und Layout
└── script.js       # Komplette Anwendungslogik (Mahlwerk, Wartung, State)