# Analytics Dashboard

This project is an analytics dashboard that visualizes website traffic data for multiple sites. It provides insights into daily visitors, device types, screen sizes, and IP addresses.

The project is built using Vite and React, and it retrieves data from an Express server that processes visitor information from various websites.

## Deployed Live

[Netlify](https://portfolio-analytics.netlify.app/)

## Getting Started

### Prerequisites

- Node.js v14.x or higher
- npm v6.x or higher
- Analytics Benson package installed (instructions below)

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/yourusername/analytics-dashboard.git
```

2. Change to the project directory:

   ```bash
   cd analytics
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Integrating Analytics Benson Package

1. Sign up for an Analytics Benson account [here](https://analytics-benson.netlify.app/).

2. Log in to your Analytics Benson account and navigate to your user profile. Click on the "Show Client ID" button to reveal your `client_id`. This unique identifier is used to associate your site's traffic data with your account.
   ![image](https://user-images.githubusercontent.com/105423307/231192154-6bd60d9b-5be7-405e-ae7d-4fe61566c52b.png)
3. Install the [Analytics Benson package](https://www.npmjs.com/package/analytics-benson):

   ```bash
   npm install analytics-benson
   ```

4. Import the `analytics` function from the package:

```js
import analytics from 'analytics-benson';
```

5. Call the analytics function, passing in your siteName and clientId:

```js
analytics('Your Site Name', 'your-client-id');
```

Replace `'your-client-id'` with the actual `client_id` you obtained from your Analytics Benson account, and replace `'Your Site Name'`with the name of your site as you would like it to appear in the analytics dashboard.

6. Place the function call in a suitable location in your app, such as in the root component or a layout component.

### Development

To start the development server, run:

```bash
npm run dev
```

The development server will start at `http://localhost:5173`

### Building for Production

To build the project for production, run:
`npm run build`

The production-ready files will be generated in the dist folder.

### Deployment

Follow the deployment instructions specific to your hosting provider to deploy the production-ready files.

### Features

- Multiple sites analytics support using Analytics Benson package
- Daily visitor count
- Device type distribution (desktop, mobile, tablet)
- Screen size distribution
- IP address tracking/location tracking

### License

This project is licensed under the MIT License - see the LICENSE file for details.
