export function getAstroCode(svg: string): string {
    const cleanedSvg = svg
        .replace(/\s*(width|height)="[^"]*"/gi, '')
        .replace(/\s*(width|height)='[^']*'/gi, '')
        .replace(/\s*(width|height)=\{[^}]*\}/gi, '')
        .replace(/<svg([^>]*)>/i, (match, attrs) => {
            const cleanedAttrs = attrs.replace(/\s*\{?\.\.\.Astro\.props\}?\s*/i, '');

            return `<svg ${cleanedAttrs} {...Astro.props}>`;
        });

    return cleanedSvg.trim();
}
