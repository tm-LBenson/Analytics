# Analytics

This project is an analytics dashboard that visualizes website traffic data for multiple sites. It provides insights into daily visitors, device types, screen sizes, and IP addresses. The dashboard displays traffic data over different time periods, such as 30 days, 180 days, and 365 days.

The project is built using Vite and React, and it retrieves data from an Express server that processes visitor information from various websites.

## Getting Started

### Prerequisites

- Node.js v14.x or higher
- npm v6.x or higher

### Installation

1. Clone the repository:

   git clone https://github.com/yourusername/analytics-dashboard.git

2. Change to the project directory:  
   `cd analytics`

3. Install dependencies:  
   `npm install`

### Development

To start the development server, run:  
`npm run dev`

The development server will start at http://localhost:5173

### Building for Production

To build the project for production, run:  
`npm run build`

The production-ready files will be generated in the dist folder.

### Deployment

Follow the deployment instructions specific to your hosting provider to deploy the production-ready files.

### Features

- Multiple sites analytics support
- Daily visitor count
- Device type distribution (desktop, mobile, tablet)
- Screen size distribution
- IP address tracking
- Customizable time periods (30 days, 180 days, 365 days)

## Checklist for Analytics site

- [x] Create the Express server

  - [x] Set up basic server with required middleware (e.g., body-parser, cors)
  - [x] Create an endpoint for receiving POST requests with user data
  - [x] Save incoming user data to the database

- [x] Implement data gathering in the client-side React app

  - [x] Check for the existence of a cookie on each visit
  - [x] If the cookie does not exist, create a new cookie with a 1-hour expiration
  - [x] Gather user data (IP address, screen size, device type)
  - [x] Send a POST request to the Express server with the collected user data

- [x] Update the database schema and model to store relevant data

  - [x] Create tables/collections for websites, daily traffic, and user data
  - [x] Implement data relationships (e.g., foreign keys) as needed

- [x] Implement data aggregation and processing on the server-side

  - [x] Calculate total traffic per website
  - [x] Calculate traffic breakdown by device type
  - [x] Calculate other relevant metrics as needed

- [x] Create API endpoints to fetch aggregated data from the server

  - [x] Implement an endpoint to retrieve daily traffic data
  - [x] Implement other endpoints as needed for additional metrics

- [x] Update the React app to fetch real data from the server

  - [x] Replace mock data with API calls to the Express server
  - [x] Update the bar graph to display real traffic data
  - [x] Implement additional visualizations and components as needed

- [x] Deploy the React app and Express server
  - [ ] Set up the production environment (e.g., environment variables, database)
  - [x] Deploy the Express server (e.g., Heroku, DigitalOcean, AWS)
  - [x] Deploy the React app (e.g., Netlify, Vercel, AWS)



### License

This project is licensed under the MIT License - see the LICENSE file for details.

