# Analytics

## Checklist for Analytics site

- [ ] Create the Express server

  - [x] Set up basic server with required middleware (e.g., body-parser, cors)
  - [ ] Create an endpoint for receiving POST requests with user data
  - [ ] Save incoming user data to the database

- [ ] Implement data gathering in the client-side React app

  - [ ] Check for the existence of a cookie on each visit
  - [ ] If the cookie does not exist, create a new cookie with a 1-hour expiration
  - [ ] Gather user data (IP address, screen size, device type)
  - [ ] Send a POST request to the Express server with the collected user data

- [ ] Update the database schema and model to store relevant data

  - [ ] Create tables/collections for websites, daily traffic, and user data
  - [ ] Implement data relationships (e.g., foreign keys) as needed

- [ ] Implement data aggregation and processing on the server-side

  - [ ] Calculate total traffic per website
  - [ ] Calculate traffic breakdown by device type
  - [ ] Calculate other relevant metrics as needed

- [ ] Create API endpoints to fetch aggregated data from the server

  - [ ] Implement an endpoint to retrieve daily traffic data
  - [ ] Implement other endpoints as needed for additional metrics

- [ ] Update the React app to fetch real data from the server

  - [ ] Replace mock data with API calls to the Express server
  - [ ] Update the bar graph to display real traffic data
  - [ ] Implement additional visualizations and components as needed

- [ ] Deploy the React app and Express server
  - [ ] Set up the production environment (e.g., environment variables, database)
  - [ ] Deploy the Express server (e.g., Heroku, DigitalOcean, AWS)
  - [ ] Deploy the React app (e.g., Netlify, Vercel, AWS)
