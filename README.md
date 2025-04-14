# 🏒 iceMetrics

A web app to view and compare NHL player and team stats using live data from the [unofficial NHL API](https://github.com/Zmalski/NHL-API-Reference).

## 🚀 Features
- Search for NHL players and view season stats
- Graphs showing points, goals, assists over time
- Simple and clean UI

## 🛠️ Tech Stack
- **Backend**: Python + Flask
- **Frontend**: HTML/CSS + JavaScript
- **Data**: Unofficial NHL API (hosted at `api.nhle.com`)

## 🧪 Running Locally

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
