# ⚡ SalesIQ Pro — AI-Powered Sales Intelligence Dashboard

> **Built by Adrin Analytics** · Transforming raw sales data into competitive intelligence

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](LICENSE)
[![Power BI](https://img.shields.io/badge/Power%20BI-Desktop-yellow.svg)]()
[![Status](https://img.shields.io/badge/Status-Live-brightgreen.svg)]()
[![Web Dashboard](https://img.shields.io/badge/Web%20UI-React%20%2B%20Recharts-blueviolet.svg)]()

---

## 🧠 Project Overview

**SalesIQ Pro** is a full-stack, AI-powered business intelligence dashboard that transforms raw transactional sales data into real-time, decision-ready insights. Originally built on **Power BI**, it has been redesigned with a modern **React + Recharts** web layer featuring glassmorphism aesthetics, AI insight feeds, and ML-driven revenue forecasting.

Designed to serve as a **portfolio centrepiece** — showcasing end-to-end data engineering, DAX modelling, and modern UI/UX skills in one project.

---

## ✨ Feature Highlights

| Feature | Description |
|---|---|
| 🤖 **AI Insights Feed** | Contextual alerts, opportunities & milestone detection |
| 📡 **Revenue Forecasting** | 6-month forward projection with confidence bands |
| 📊 **Smart KPI Cards** | Animated, gradient KPI tiles with MoM delta tracking |
| 🌍 **Geo Analytics** | Orders & revenue distribution across continents |
| 🏆 **Product Intelligence** | Top product ranking with trend indicators |
| 🌙 **Dark / Light Mode** | Toggle between sleek dark and clean light themes |
| 📤 **Export Report** | One-click reporting for stakeholder delivery |
| ⚡ **Real-time Feel** | Live-pulse indicator + animated data updates |
| 📱 **Fully Responsive** | Optimised for desktop, tablet & mobile |
| 🎛️ **Interactive Filters** | Year, region & category filtering across all panels |

---

## 🖼️ Dashboard Views

### ⚡ Executive Summary
High-level KPIs: Total Revenue, Profit, Orders, ARPC, Return Rate — with animated gradient cards and month-over-month deltas.

### 💰 Revenue Analytics
Area charts overlaying Revenue, Target & Profit trends with full-year monthly breakdown.

### 🤖 AI Intelligence Feed
Expandable insight cards driven by anomaly detection: spikes, dips, cross-region opportunities & milestones.

### 📡 Forecasting Panel
6-month ML forecast with upper/lower confidence bands rendered as a blended area chart.

### 🌍 Geographic Distribution
Horizontal bar breakdown of Orders by Region (North America, Europe, Pacific, Asia).

### 📦 Product Details
Drill-through panel for individual product performance: orders, revenue vs target, profit trend.

### 👥 Customer Analytics
Unique customer count, ARPC, top customer spotlight, and income-level segmentation.

---

## 🗂️ Project Structure

```
salesiq-dashboard/
├── components/
│   ├── KPICard.jsx          # Animated gradient KPI tiles
│   ├── SectionTitle.jsx     # Accent bar + heading component
│   ├── Card.jsx             # Glassmorphism card wrapper
│   ├── CustomTooltip.jsx    # Recharts tooltip
│   └── Sidebar.jsx          # Collapsible nav sidebar
├── pages/
│   ├── Overview.jsx         # Executive summary view
│   ├── Revenue.jsx          # Revenue & profit analytics
│   ├── AIInsights.jsx       # AI intelligence feed
│   ├── GeoMap.jsx           # Geographic dashboard
│   ├── Products.jsx         # Product detail drill-through
│   └── Customers.jsx        # Customer analytics
├── analytics/
│   ├── forecasting.js       # Revenue projection logic
│   ├── anomalyDetection.js  # Insight generation engine
│   └── kpiCalculations.js   # DAX-equivalent JS measures
├── services/
│   ├── dataLoader.js        # CSV parsing & ETL pipeline
│   └── exportService.js     # Report export handler
├── assets/
│   └── screenshots/         # Dashboard preview images
├── styles/
│   ├── globals.css          # CSS custom properties & resets
│   ├── theme.js             # Colour token system
│   └── animations.css       # Keyframe definitions
├── datasets/                # Raw CSV source files
│   ├── AdventureWorks Sales Data 2020–2022.csv
│   ├── AdventureWorks Customer Lookup.csv
│   ├── AdventureWorks Product Lookup.csv
│   └── AdventureWorks Territory Lookup.csv
├── dashboard/
│   └── AdventureWorks_Dashboard.pbix   # Power BI source file
├── SalesIQ_Dashboard.jsx    # Main React entry (single-file demo)
└── README.md
```

---

## 🛠️ Tech Stack

### Power BI Layer (Core Analytics)
| Tool | Purpose |
|---|---|
| **Power BI Desktop** | Interactive report authoring |
| **Power Query (M)** | ETL — extract, clean, transform CSVs |
| **DAX** | Custom KPI calculations & time intelligence |
| **Snowflake Schema** | Star-schema data model with lookup tables |

### Web Dashboard Layer (Portfolio UI)
| Tool | Purpose |
|---|---|
| **React 18** | Component-based UI framework |
| **Recharts** | SVG-based chart library |
| **Tailwind CSS** | Utility-first styling |
| **DM Sans / Space Grotesk** | Premium typography |

---

## 🔄 Workflow Architecture

```
Raw CSVs (Sales, Customers, Products, Territory, Calendar)
        │
        ▼
  Power Query ETL
  ┌─────────────────────────────────────┐
  │ • Remove nulls & duplicates         │
  │ • Standardise column types          │
  │ • Build Calendar dimension table    │
  │ • Merge & split columns             │
  └─────────────────────────────────────┘
        │
        ▼
  Data Model (Snowflake Schema)
  ┌────────────┐     ┌────────────┐
  │ Sales Fact │────▶│ Customer   │
  │   Table    │     │  Lookup    │
  └─────┬──────┘     └────────────┘
        │            ┌────────────┐
        ├───────────▶│  Product   │
        │            │  Lookup    │
        │            └────────────┘
        │            ┌────────────┐
        └───────────▶│ Territory  │
                     │  Lookup    │
                     └────────────┘
        │
        ▼
  DAX Measures
  • Total Revenue / Profit / Orders
  • Return Rate • ARPC • 90-Day Rolling Profit
  • Revenue Target • Weekend Orders
  • Previous Month Profit (time intelligence)
        │
        ▼
  Dashboard Layers
  ┌──────────────────┬──────────────────┐
  │  Power BI (.pbix)│  React Web UI    │
  │  Executive View  │  SalesIQ Pro     │
  │  Map View        │  AI Insights     │
  │  Product Detail  │  Forecasting     │
  │  Customer View   │  Dark Mode       │
  └──────────────────┴──────────────────┘
```

---

## 🚀 Installation & Setup

### Power BI Dashboard
```bash
# 1. Clone the repo
git clone https://github.com/yourusername/salesiq-pro.git
cd salesiq-pro

# 2. Open Power BI Desktop and load the file
# File → Open → dashboard/AdventureWorks_Dashboard.pbix

# 3. Refresh data source to point to /datasets/ folder
# Home → Transform Data → Data Source Settings
```

### React Web Dashboard
```bash
# Install dependencies
npm install recharts lucide-react

# Run development server
npm run dev

# Build for production
npm run build
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

---

## 📐 Key DAX Measures

```dax
-- 90-Day Rolling Profit
90 Days Rolling Profit =
CALCULATE(
    [Total Profit],
    DATESINPERIOD(
        'Calendar Lookup'[Date],
        MAX('Calendar Lookup'[Date]),
        -90, DAY
    )
)

-- Average Revenue Per Customer
ARPC = DIVIDE([Total Revenue], [Total Customers], 0)

-- Revenue Target (10% above previous month)
Revenue Target =
[Previous Month Revenue] * 1.10

-- Return Rate
Return Rate =
DIVIDE([Total Returns], [Total Orders], 0)
```

---

## 🎨 Design System

```javascript
// Colour Tokens — SalesIQ Pro Theme
const theme = {
  navy:   "#0A0F2C",   // Background
  ink:    "#0D1545",   // Deep surface
  card:   "#111936",   // Card surface
  cyan:   "#00E5FF",   // Primary accent (CTAs, links)
  violet: "#9B5DE5",   // Secondary accent (AI features)
  pink:   "#F72585",   // Alert / negative delta
  lime:   "#06FFA5",   // Positive delta / success
  amber:  "#FFB703",   // Warning / neutral alert
};
```

---

## 🔮 Future Enhancements

- [ ] **Live API Integration** — Connect to Salesforce / HubSpot CRM
- [ ] **GPT-4 Narrative Layer** — Auto-generated executive summaries
- [ ] **Anomaly Detection** — Statistical outlier alerts via Prophet / ARIMA
- [ ] **Role-Based Access** — Executive vs Analyst view permissions
- [ ] **Slack / Teams Alerts** — Threshold-based push notifications
- [ ] **Mobile PWA** — Offline-capable progressive web app
- [ ] **Predictive CLV** — Customer lifetime value scoring with ML
- [ ] **A/B Campaign Tracker** — Marketing ROI comparison module

---

## 📊 Dataset Reference

| File | Records | Description |
|---|---|---|
| Sales Data 2020 | ~1,000 | Order-level transactions |
| Sales Data 2021 | ~9,000 | Order-level transactions |
| Sales Data 2022 | ~11,000 | Order-level transactions |
| Customer Lookup | 18,149 | Customer demographics |
| Product Lookup | 293 | Product catalogue |
| Territory Lookup | 10 | Region & country mapping |
| Returns Data | ~1,800 | Return transactions |

---

## 👤 Author

**Adrin Analytics**
> *"We turn data chaos into strategic clarity."*

- 🌐 Portfolio: [adrinanalytics.io](https://adrinanalytics.io)
- 💼 LinkedIn: [linkedin.com/in/adrinanalytics](https://linkedin.com/in/adrinanalytics)
- 🐙 GitHub: [github.com/adrinanalytics](https://github.com/adrinanalytics)

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

> ⭐ **Star this repo** if SalesIQ Pro helped inspire your next data project!
>
> Built with Power BI + React + a lot of ☕ by Adrin Analytics
