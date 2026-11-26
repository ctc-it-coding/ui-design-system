import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { colors } from '../../tokens';

export interface RenderEmailOptions {
  /** <title> of the document (shown by some clients). */
  title?: string;
  /** Outer background colour (default white). */
  background?: string;
  /** Return only the rendered element markup, without the HTML document wrapper. */
  fragment?: boolean;
}

/**
 * Render an email component (e.g. `<EmailTemplate type="simple-welcome-01" />`) to a complete,
 * client-safe HTML document string. Kept in its own module so browser bundles don't pull in
 * `react-dom/server`: `import { renderEmailHtml } from 'tinicorn-ui/templates/email/render'`.
 */
export function renderEmailHtml(element: ReactElement, { title = '', background = colors.white, fragment = false }: RenderEmailOptions = {}): string {
  const body = renderToStaticMarkup(element);
  if (fragment) return body;
  return (
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
    '<html xmlns="http://www.w3.org/1999/xhtml" lang="en"><head>' +
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
    '<meta name="x-apple-disable-message-reformatting" />' +
    '<meta name="color-scheme" content="light" /><meta name="supported-color-schemes" content="light" />' +
    `<title>${title.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c] as string)}</title>` +
    '<style>body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{border-collapse:collapse}img{border:0;line-height:100%;outline:none;text-decoration:none}a{color:inherit}</style>' +
    `</head><body style="margin:0;padding:0;background-color:${background};">${body}</body></html>`
  );
}
