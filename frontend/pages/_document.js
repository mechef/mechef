import Document, { Head, Main, NextScript } from 'next/document';
// eslint-disable-next-line import/no-extraneous-dependencies
import flush from 'styled-jsx/server';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    // eslint-disable-next-line jsx-a11y/html-has-lang
    return (
      // eslint-disable-next-line jsx-a11y/html-has-lang
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="//fonts.googleapis.com/css?family=Ubuntu:400,500|Playball" rel="stylesheet" />
          <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="/static/css/normalize.css" />
          <link rel="stylesheet" href="/static/css/global.css" />
          <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCrgd8aRUu0AczX8jVy5jpYzZOnjhgUpXw&libraries=places" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
