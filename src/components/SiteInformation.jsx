// components/SiteInformation/index.js
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const SiteInformation = () => {
  const [copiedCode, setCopiedCode] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedCode(text);
        console.log('Code copied to clipboard');
        setTimeout(() => setCopiedCode(''), 1500); // Reset the copied state after a delay
      },
      (err) => {
        console.error('Could not copy the code: ', err);
      },
    );
  };
  const PreBlock = ({ code }) => (
    <div className="code-block">
      <pre>{code}</pre>
      {copiedCode === code ? (
        <Icon
          width="40"
          icon="mdi:clipboard-check-multiple"
          color="green"
          onClick={() => copyToClipboard(code)}
          className="clipboard-icon"
        />
      ) : (
        <Icon
          width="40"
          icon="mdi:clipboard-multiple-outline"
          onClick={() => copyToClipboard(code)}
          className="clipboard-icon"
        />
      )}
    </div>
  );

  const CodeBlock = ({ code }) => (
    <span className="code-block">
      {code}{' '}
      {copiedCode === code ? (
        <Icon
          width="40"
          icon="mdi:clipboard-check-multiple"
          color="green"
          onClick={() => copyToClipboard(code)}
          className="clipboard-icon"
        />
      ) : (
        <Icon
          width="40"
          icon="mdi:clipboard-multiple-outline"
          onClick={() => copyToClipboard(code)}
          className="clipboard-icon"
        />
      )}
    </span>
  );

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
          Install the package: <CodeBlock code="npm install analytics-benson" />
        </li>
        <li>
          Import the <code>analytics</code> function from the package:
          <br />
          <CodeBlock code="import { analytics } from 'analytics-benson';" />
        </li>
        <li>
          Call the analytics function, passing in your siteName and clientId:
          <br />
          <CodeBlock code="analytics('Your Site Name', 'your-client-id');" />
        </li>
        <li>
          Place the function call in a suitable location in your app, such as in
          the root component or a layout component. For example you can use the
          useEffect hook to call the function when the component first loads:
          <br />
          <PreBlock
            code={`import React, {useEffect} from 'react';
import './App.css';
import { analytics } from 'analytics-benson';

function App() {
  const CLIENT_ID = 'this-is-an-example-client-id'

    useEffect(() => {
    analytics('Hello World App', CLIENT_ID);
  }, []);

  return (
    <div className="App">
      {/* Your main app content goes here */}
    </div>
  );
}

export default App;`}
          />
          <p>
            Note: The function will run once per hour unless the user is not
            keeping localStorage. A timestamp is placed in localStorage to check
            if the user has used the app in the past hour.{' '}
          </p>
        </li>
      </ol>
      <br />
      <br />
      <h3>How to use Analytics Benson with a CDN</h3>
      <p>
        If you prefer to use a CDN instead of installing the package, add the
        following script tags to your HTML file, replacing 'yourSiteName' and
        'yourClientId' with the appropriate values:
      </p>
      <PreBlock
        code={`
<script src="https://cdn.jsdelivr.net/npm/analytics-benson@1.0.8/analytics.min.js"></script>
<script>
  analytics('yourSiteName', 'yourClientId');
</script>
        `}
      />
      <p>
        Note: The function will run once per hour unless the user is not keeping
        localStorage. A timestamp is placed in localStorage to check if the user
        has used the app in the past hour.{' '}
      </p>
    </div>
  );
};

export default SiteInformation;
