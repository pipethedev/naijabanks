export function getAstroCode(svg: string): string {
    const processedSvg = svg
        .replace(/\s*(width|height)="[^"]*"/gi, '')
        .replace(/\s*(width|height)='[^']*'/gi, '')
        .replace(/\s*(width|height)=\{[^}]*\}/gi, '')
        .replace(/<svg([^>]*)>/i, (match, attrs) => {
            const cleanedAttrs = attrs.replace(/\s*\{?\.\.\.Astro\.props\}?\s*/i, '');

            return `<svg${cleanedAttrs} {...Astro.props}>`;
        });

    return `
---
// Note: This file is auto-generated.
const { ...props } = Astro.props;
---

${processedSvg.trim()}
`.trim();
}
