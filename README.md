# HealMap

HealMap is a React-based web application that helps users find nearby hospitals on a map using their current location. It integrates Firebase Authentication for Google Sign-In and uses the Geoapify API to fetch healthcare facility data. The app features an interactive map with hospital markers, a clickable list of hospitals, user avatar, and logout functionality.

---
## Features

- **Google Authentication** using Firebase (Sign in / Sign out)
- Fetches **user’s current location** via browser geolocation API
- Displays **nearby hospitals** within a 3km radius using the Geoapify Places API
- Interactive **hospital list** with clickable items showing detailed info
- Responsive UI with map and hospital list side-by-side on desktop, stacked on mobile/tablets
- User avatar and logout button in the header
- Smooth user experience with loading states and alerts for location permissions
- 
---
## Demo

Visit the live site here:  
[https://heal-azp1a8t1c-mohammad-sharifs-projects.vercel.app/](https://heal-azp1a8t1c-mohammad-sharifs-projects.vercel.app/)

---

## Tech Stack

- React (with Vite)
- Firebase Authentication (Google Sign-In)
- Leaflet & React-Leaflet for maps
- Geoapify Places API for hospital data
- CSS Flexbox & Media Queries for responsive design

---

## Getting Started

### Prerequisites

- Node.js (>=14 recommended)
- A Firebase project with Google Authentication enabled
- A Geoapify API key (free tier available at https://www.geoapify.com)

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/md-sharif-45/HealMap.git
   npm install
   npm run dev
  
