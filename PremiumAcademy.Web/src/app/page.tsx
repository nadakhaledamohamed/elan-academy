import { routing, LOCALE_STORAGE_KEY } from '@/i18n/routing';

// Static hosts have no server redirect, so the root page forwards to the
// saved language, then the browser language, then the default.
const script = `(function(){try{var s=localStorage.getItem('${LOCALE_STORAGE_KEY}');var l=${JSON.stringify(
  routing.locales,
)};var n=(navigator.language||'').slice(0,2);var t=l.indexOf(s)>-1?s:(l.indexOf(n)>-1?n:'${
  routing.defaultLocale
}');location.replace('/'+t+'/');}catch(e){location.replace('/${routing.defaultLocale}/');}})();`;

export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <title>Élan Academy</title>
        <noscript>
          <meta httpEquiv="refresh" content={`0; url=/${routing.defaultLocale}/`} />
        </noscript>
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </body>
    </html>
  );
}
