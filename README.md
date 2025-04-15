# 🏒 iceMetrics

**iceMetrics** is a full-stack web application that lets you search for NHL players and view their performance through both **basic stats** and **advanced analytics**. It pulls live data from public sources like the NHL API and Natural Stat Trick.

---

## 🚀 Features

### 📊 Basic Stats
- Goals, assists, points, games played
- Team and player metadata
- Season filtering (current season default)

### 📈 Advanced Stats (5v5)
- **Corsi (CF%, CA)** – possession indicator
- **Fenwick (FF%, FA)** – unblocked shot attempts
- **Expected Goals (xGF, xGA, xGF%)**
- **Scoring chances (SCF, HDCF, HDGF, etc.)**
- **Zone deployment and faceoff metrics**
- **PDO, On-Ice Save %, On-Ice Shooting %**

---

## 🛠️ Tech Stack

- **Backend**: Python + Flask
- **Frontend**: HTML + CSS + JavaScript
- **APIs / Data Sources**:
  - NHL API (via [Zmalski's NHL API Reference](https://github.com/Zmalski/NHL-API-Reference))
  - Advanced stats scraped from [Natural Stat Trick](https://naturalstattrick.com)

---

## 🧪 Running Locally

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
