import React from 'react';
import Root from './Root';


class Layout extends React.Component {
  render() {
    return (
      <html lang="en">
      <head>
          <meta charSet="utf-8" />
          <title>Sports app</title>
      </head>
        <body>
          <Root />
        </body>
      </html>
    )
  }
}

export default Layout;
