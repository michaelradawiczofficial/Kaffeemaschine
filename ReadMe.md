# ☕ Kaffeemaschine – Interaktive JavaScript-Demo

Dieses Projekt ist eine **interaktive Kaffeemaschinen-Simulation**, die im Browser läuft.  
Es wurde entwickelt, um **logisches Denken**, **Strukturierung von Anwendungen** und **saubere Umsetzung in JavaScript** zu zeigen – ohne Frameworks und mit vollständiger Trennung zwischen **HTML, CSS und JavaScript**.

Die Anwendung simuliert realistische Abläufe einer Kaffeemaschine:
- Verbrauch von Wasser und Bohnen
- Mahlvorgang mit 10% Materialverlust
- Aufbau einer Pulver-Reserve
- Wartungszyklen nach mehreren Tassen
- visuelle Statusanzeige mit Log-Ausgaben

Durch diese Mechanik bildet das Projekt **eine kleine Prozesskette** ab und zeigt, wie **Zustände, Berechnungen, Benutzerinteraktionen und UI-Updates** in einer Anwendung zusammengeführt werden.

---

## 🎯 Ziel des Projekts

Das Projekt entstand im Rahmen meiner **Umschulung zum Fachinformatiker für Anwendungsentwicklung**.  
Ziel war es, eine **überschaubare, aber technisch klare** Anwendung zu entwickeln, in der ich:

- **Zustandsverwaltung** selbst implementiere
- **Benutzeraktionen** in Funktionen verarbeite
- **Algorithmik** zur Berechnung anwende
- **UI-Änderungen** dynamisch aktualisiere
- **Kommentar- und Dokumentationsstil** professionalisiere
- **Code-Strukturierung nach Best Practices** trainiere

Die Lösung ist bewusst **ohne Frameworks** entwickelt, um die **Grundlagen der Webentwicklung** sichtbar zu machen.

---

## 🛠️ Wie die Maschine funktioniert (einfach erklärt)

- Jede Tasse benötigt **30 g Kaffeepulver und 150 ml Wasser**
- Beim Mahlen der Bohnen gehen **10 % verloren**
- Die Maschine mahlt automatisch nach, um **trotz Verlust** ausreichendes Pulver zu haben
- Über einen **Slider** kann der Benutzer eine **Pulver-Reserve** festlegen
- Nach **30 gezogenen Tassen** ist eine **Wartung** erforderlich
- Alle Vorgänge werden **in Echtzeit angezeigt** (Wasser, Bohnen, Pulver, Anzahl Tassen)

Beispiel aus der Logik (vereinfacht):  
Um 30 g Pulver zu erhalten, benötigt die Maschine ca. **33,3 g Bohnen**, um den Verlust auszugleichen.  
Quelle: Algorithmik im JavaScript-Code :contentReference[oaicite:0]{index=0}

---

## 💻 Technischer Aufbau

Die Anwendung besteht aus drei Dateien:

| Ebene | Datei |
|------|--------|
| Oberfläche (UI) | `index.html` |
| Darstellung (Design) | `style.css` |
| Logik (Funktionen & Status) | `script.js` |

- **HTML** baut die Benutzeroberfläche auf  
  Quelle: Grundstruktur :contentReference[oaicite:1]{index=1}

- **CSS** gestaltet das Layout und sorgt für eine moderne Optik  
  Quelle: Design-Stylesheet :contentReference[oaicite:2]{index=2}

- **JavaScript** steuert den gesamten Ablauf der Maschine  
  Quelle: kompletter Funktionsumfang :contentReference[oaicite:3]{index=3}

---

## 👤 Was ich dabei gelernt habe

Dieses Projekt hat meine Fähigkeiten in folgenden Bereichen aktiv weiterentwickelt:

- **praktische JavaScript-Programmierung**
- **Umgang mit Zuständen** (State-Management)
- **Event-Handling** (Buttons, Slider)
- **UI-Updates** ohne Frameworks
- **Arbeitsweise mit getrennten Dateien** (HTML/CSS/JS)
- **Kommentieren und Dokumentieren** von Code
- **verständliche Logikentwicklung**
- **strukturierte Fehler- und Ausnahmebehandlung**

Darüber hinaus habe ich geübt, **komplexere Abläufe in kleine Funktionen zu zerlegen**, die jeweils eine klare Aufgabe erfüllen.

---

## 🚀 Nutzung

Das Projekt kann ohne Installation direkt gestartet werden:

1. Alle Dateien in einen Ordner legen:
index.html
style.css
script.js

2. `index.html` im Browser öffnen

Es ist keine zusätzliche Software erforderlich.

---

## 📚 Warum dieses Projekt für mich wichtig ist

In meiner Umschulung lerne ich, **Softwareprojekte strukturiert zu planen und umzusetzen**.  
Diese Simulation zeigt im Kleinen, wie ich:

- reale Anforderungen als **Datenmodell** verstehe
- **Berechnungen, Regeln und Zustände** in Logik überführe
- den **Benutzerfluss** klar und verständlich gestalte
- bewusst auf **Frameworks verzichte**, um die Grundlagen zu beherrschen

Dadurch wird sichtbar, **wie ich denke und entwickle** – von der Idee bis zur fertigen Funktion.

---

## ✍️ Autor

**Michael Radawicz**  
Umschulung zum Fachinformatiker Anwendungsentwicklung  
JavaScript-Projekt für das persönliche Portfolio