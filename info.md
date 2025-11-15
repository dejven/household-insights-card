# Family Dashboard Card

En vacker och funktionell Lovelace card för Home Assistant som visar familjemedlemmar med deras status, plats, enheter och aktivitet.

## ✨ Funktioner

- 📍 Realtidsposition för alla familjemedlemmar
- 🔋 Batteristatus för alla enheter
- 👟 Aktivitetsdata (steg, puls, etc.)
- 📱 Enhetsöversikt per person
- 🎨 Vacker glassmorphism design
- 📱 Helt responsiv för mobil, tablet och desktop
- 🌙 Stöd för ljust och mörkt tema

## 📸 Screenshots

![Family Dashboard Card](https://raw.githubusercontent.com/YOUR_USERNAME/family-dashboard-card/main/assets/screenshot.png)

## 🚀 Installation

### Via HACS (Rekommenderat)

1. Öppna HACS i Home Assistant
2. Gå till "Frontend"
3. Klicka på de tre prickarna i övre högra hörnet
4. Välj "Custom repositories"
5. Lägg till `https://github.com/YOUR_USERNAME/family-dashboard-card` som repository
6. Välj "Lovelace" som kategori
7. Klicka på "ADD"
8. Sök efter "Family Dashboard Card"
9. Klicka på "INSTALL"
10. Starta om Home Assistant

### Manuell Installation

1. Ladda ner `family-dashboard-card.js` från senaste [release](https://github.com/YOUR_USERNAME/family-dashboard-card/releases)
2. Kopiera filen till `config/www/family-dashboard-card.js`
3. Lägg till resursen i Home Assistant:
   - Gå till Settings → Dashboards → Resources
   - Klicka på "ADD RESOURCE"
   - URL: `/local/family-dashboard-card.js`
   - Resource type: JavaScript Module
4. Starta om Home Assistant

## ⚙️ Konfiguration

### Grundläggande exempel

```yaml
type: custom:family-dashboard-card
title: Family Dashboard
description: Håll koll på var alla är och hur de mår
entities:
  - person: person.anna
    device_trackers:
      - device_tracker.anna_iphone
      - device_tracker.anna_watch
    step_sensor: sensor.anna_steps
    battery_sensor: sensor.anna_iphone_battery
    heart_rate_sensor: sensor.anna_heart_rate
  - person: person.erik
    device_trackers:
      - device_tracker.erik_iphone
    step_sensor: sensor.erik_steps
    battery_sensor: sensor.erik_iphone_battery
```

### Konfigurationsalternativ

| Alternativ | Typ | Obligatorisk | Beskrivning |
|------------|-----|--------------|-------------|
| `type` | string | Ja | Måste vara `custom:family-dashboard-card` |
| `title` | string | Nej | Rubrik för kortet (standard: "Family Dashboard") |
| `description` | string | Nej | Beskrivning under rubriken |
| `entities` | lista | Ja | Lista med familjemedlemmar |

### Person-konfiguration

| Alternativ | Typ | Obligatorisk | Beskrivning |
|------------|-----|--------------|-------------|
| `person` | string | Ja | Person entity ID (ex: `person.anna`) |
| `device_trackers` | lista | Nej | Lista med device_tracker entity IDs |
| `step_sensor` | string | Nej | Sensor för steg (ex: `sensor.anna_steps`) |
| `battery_sensor` | string | Nej | Sensor för batteri |
| `heart_rate_sensor` | string | Nej | Sensor för puls |
| `distance_sensor` | string | Nej | Sensor för distans |

## 📱 Datakällor

Kortet hämtar automatiskt data från:

- **Person entities** (`person.*`): Status (home/away), namn, bild, GPS-position
- **Device Tracker entities** (`device_tracker.*`): Enhetsstatus, batterinivå, plats
- **Sensor entities** (`sensor.*`): Steg, puls, batteri, distans, etc.

### Rekommenderade integrationer

- **Home Assistant Companion App**: För GPS-tracking och sensordata från mobiler
- **Life360**: För familjepositionering
- **Apple Health / Google Fit**: För hälsodata (steg, puls, etc.)
- **Battery State**: För batterinivåer

## 🎨 Anpassning

Kortet följer automatiskt Home Assistants tema. Du kan anpassa det ytterligare genom att använda `card-mod`.

## 🐛 Felsökning

### Kortet visas inte
- Kontrollera att resursen är tillagd korrekt
- Rensa webbläsarens cache (Ctrl+Shift+R)
- Kontrollera Developer Console för felmeddelanden

### Data visas inte
- Kontrollera att entity IDs är korrekta
- Verifiera att entiteterna har data i Developer Tools → States

## 🤝 Bidra

Bidrag är välkomna! Öppna gärna issues eller pull requests på [GitHub](https://github.com/YOUR_USERNAME/family-dashboard-card).

## 📄 Licens

MIT License - se [LICENSE](LICENSE) fil för detaljer.

## ⭐ Support

Om du gillar detta kort, ge det en stjärna på [GitHub](https://github.com/YOUR_USERNAME/family-dashboard-card)!
