import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';
import { AppFrame } from './App';

export function render(url: string) {
  const helmetContext: Record<string, any> = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppFrame />
      </StaticRouter>
    </HelmetProvider>
  );

  return {
    appHtml,
    helmet: helmetContext.helmet,
  };
}