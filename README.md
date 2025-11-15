# Family Dashboard Card för Home Assistant

![Version](https://img.shields.io/github/v/release/YOUR_USERNAME/family-dashboard-card)
![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)
![License](https://img.shields.io/github/license/YOUR_USERNAME/family-dashboard-card)

En vacker och funktionell Lovelace custom card för Home Assistant som visar familjemedlemmar med deras realtidsstatus, plats, enheter och aktivitetsdata.

## ✨ Funktioner

- 📍 **Realtidsposition** - Se var alla familjemedlemmar befinner sig
- 🔋 **Batteristatus** - Håll koll på batterinivå för alla enheter
- 👟 **Aktivitetsdata** - Visa steg, puls och annan hälsodata
- 📱 **Enhetsöversikt** - Se alla enheter per person och deras status
- 🎨 **Vacker design** - Modern glassmorphism design med animationer
- 📱 **Responsiv** - Fungerar perfekt på mobil, tablet och desktop
- 🌙 **Tema-stöd** - Följer automatiskt Home Assistants ljusa/mörka tema

## 🚀 Installation

### HACS (Rekommenderat)

1. Öppna HACS i Home Assistant
2. Gå till "Frontend"
3. Klicka på de tre prickarna (⋮) i övre högra hörnet
4. Välj "Custom repositories"
5. Lägg till URL: `https://github.com/YOUR_USERNAME/family-dashboard-card`
6. Välj kategori: "Lovelace"
7. Klicka på "INSTALL"
8. Starta om Home Assistant

### Manuell Installation

1. Ladda ner `family-dashboard-card.js` från [senaste release](https://github.com/YOUR_USERNAME/family-dashboard-card/releases)
2. Kopiera filen till `config/www/family-dashboard-card.js`
3. Lägg till resurs i Home Assistant (Settings → Dashboards → Resources)
4. Starta om Home Assistant

## ⚙️ Konfiguration

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
```

### Konfigurationsalternativ

| Alternativ | Typ | Obligatorisk | Beskrivning |
|------------|-----|--------------|-------------|
| `type` | string | **Ja** | Måste vara `custom:family-dashboard-card` |
| `title` | string | Nej | Kortets rubrik (standard: "Family Dashboard") |
| `description` | string | Nej | Beskrivning under rubriken |
| `entities` | array | **Ja** | Lista med familjemedlemmar |

### Person-konfiguration

| Alternativ | Typ | Beskrivning |
|------------|-----|-------------|
| `person` | string | **Obligatorisk** - Person entity ID |
| `device_trackers` | array | Lista med device tracker entity IDs |
| `step_sensor` | string | Sensor för stegräknare |
| `battery_sensor` | string | Sensor för batterinivå |
| `heart_rate_sensor` | string | Sensor för hjärtfrekvens |

## 🔧 Utveckling

### Setup
```bash
git clone https://github.com/YOUR_USERNAME/family-dashboard-card.git
cd family-dashboard-card
npm install
npm run build
```

För mer information, se [info.md](info.md).

## 📄 Licens

MIT License

---

**Gjord med ❤️ för Home Assistant-communityt**
