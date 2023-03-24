import React from 'react';

const SiteInformation = () => {
  return (
    <div className="site-information">
      <h2>Welcome to My Site!</h2>
      <p>
        This site is all about analytics and tracking data for your website.
        With our tools, you can easily see how your site is performing, and make
        data-driven decisions to improve your online presence.
      </p>
      <p>
        To get started, sign up for an account or log in to your existing
        account.
      </p>
      <h3>How to use Analytics Benson in your React app</h3>
      <ol>
        <li>
          Install the package: <code>npm install analytics-benson</code>
        </li>
        <li>
          Import the <code>analytics</code> function from the package:
          <br />
          <code>import analytics from 'analytics-benson';</code>
        </li>
        <li>
          Call the analytics function, passing in your siteName and clientId:
          <br />
          <code>analytics('Your Site Name', 'your-client-id');</code>
        </li>
        <li>
          Place the function call in a suitable location in your app, such as in
          the root component or a layout component.
        </li>
      </ol>
    </div>
  );
};

export default SiteInformation;
