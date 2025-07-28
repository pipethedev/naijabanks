interface JsxGeneratorOptions {
    svg: string;
    componentName: string;
    typescript?: boolean;
    native?: boolean;
}

const nativeTagMap: Record<string, string> = {
    svg: 'Svg',
    path: 'Path',
    rect: 'Rect',
    circle: 'Circle',
    ellipse: 'Ellipse',
    line: 'Line',
    polyline: 'Polyline',
    polygon: 'Polygon',
    text: 'Text',
    g: 'G',
    defs: 'Defs',
    clipPath: 'ClipPath',
    linearGradient: 'LinearGradient',
    radialGradient: 'RadialGradient',
    stop: 'Stop',
    symbol: 'Symbol',
    use: 'Use',
    mask: 'Mask',
    image: 'Image'
};

export const getReactCode = ({
    svg,
    componentName,
    typescript = false,
    native = false
}: JsxGeneratorOptions): string => {
    let processedSvg = svg
        .replace(/<\?xml[^>]*\?>/i, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/id="[^"]*"/g, '')
        .trim();

    processedSvg = processedSvg.replace(/(\w+)-(\w)/g, (_, a, b) => a + b.toUpperCase());

    processedSvg = processedSvg.replace(/<svg/, '<svg {...props}');

    //  native specific transformations
    let imports = `import React from 'react';`;
    if (native) {
        const tagsToImport = new Set(['Svg']);
        processedSvg = processedSvg.replace(/<(\/?)(\w+)/g, (match, closingSlash, tag) => {
            const nativeTag = nativeTagMap[tag.toLowerCase()];
            if (nativeTag) {
                tagsToImport.add(nativeTag);

                return `<${closingSlash || ''}${nativeTag}`;
            }

            return match;
        });
        imports = `import { ${Array.from(tagsToImport).join(', ')} } from 'react-native-svg';`;
    } else {
        processedSvg = processedSvg.replace(/ class="/g, ' className="');
    }

    const propsType = typescript
        ? native
            ? `import type { SvgProps } from 'react-native-svg';\n\nconst ${componentName} = (props: SvgProps) => {`
            : `import type { SVGProps } from 'react';\n\nconst ${componentName} = (props: SVGProps<SVGSVGElement>) => {`
        : `const ${componentName} = (props) => {`;

    return `
${native ? '' : imports}
${typescript && native ? `import React from 'react';\n${imports}` : ''}
${!typescript && native ? imports : ''}

${propsType}
  return (
    ${processedSvg}
  );
};

export default ${componentName};
`.trim();
};
