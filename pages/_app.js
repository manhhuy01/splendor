/* eslint-disable react/jsx-props-no-spreading */
import '../styles.css';
import { Provider } from 'jotai';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
