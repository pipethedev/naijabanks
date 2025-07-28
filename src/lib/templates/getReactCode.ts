export interface SVGConverterConfig {
    svg: string;
    componentName: string;
    typescript?: boolean;
    reactNative?: boolean;
    optimize?: boolean;
}

interface OptimizedSVG {
    content: string;
    width?: string;
    height?: string;
    viewBox?: string;
}

// SVG optimization function
function optimizeSVG(svg: string): OptimizedSVG {
    let optimized = svg
        // Remove XML declaration
        .replace(/<\?xml[^>]*\?>/gi, '')
        // Remove comments
        .replace(/<!--[\s\S]*?-->/g, '')
        // Remove unnecessary whitespace
        .replace(/\s+/g, ' ')
        .trim();

    // Extract viewBox
    const viewBoxMatch = optimized.match(/viewBox=["']([^"']+)["']/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : undefined;

    // Extract width and height
    const widthMatch = optimized.match(/width=["']([^"']+)["']/);
    const heightMatch = optimized.match(/height=["']([^"']+)["']/);
    const width = widthMatch ? widthMatch[1] : undefined;
    const height = heightMatch ? heightMatch[1] : undefined;

    // Remove width and height attributes (we'll handle them in the component)
    optimized = optimized
        .replace(/\s*width=["'][^"']*["']/g, '')
        .replace(/\s*height=["'][^"']*["']/g, '');

    // Ensure viewBox is present
    if (!viewBoxMatch && (width || height)) {
        const defaultViewBox = `0 0 ${width || '24'} ${height || '24'}`;
        optimized = optimized.replace(/<svg/, `<svg viewBox="${defaultViewBox}"`);
    }

    return {
        content: optimized,
        width,
        height,
        viewBox
    };
}

// Convert SVG attributes to React props
function convertSVGAttributes(svgContent: string): string {
    return svgContent
        // Convert kebab-case to camelCase
        .replace(/([a-z])-([a-z])/g, (_, a, b) => `${a}${b.toUpperCase()}`)
        // Handle special cases
        .replace(/class=/g, 'className=')
        .replace(/stroke-width=/g, 'strokeWidth=')
        .replace(/stroke-linecap=/g, 'strokeLinecap=')
        .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
        .replace(/fill-rule=/g, 'fillRule=')
        .replace(/clip-rule=/g, 'clipRule=')
        .replace(/clip-path=/g, 'clipPath=')
        .replace(/fill-opacity=/g, 'fillOpacity=')
        .replace(/stroke-opacity=/g, 'strokeOpacity=')
        .replace(/stroke-dasharray=/g, 'strokeDasharray=')
        .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
        .replace(/font-family=/g, 'fontFamily=')
        .replace(/font-size=/g, 'fontSize=')
        .replace(/font-weight=/g, 'fontWeight=')
        .replace(/text-anchor=/g, 'textAnchor=')
        .replace(/dominant-baseline=/g, 'dominantBaseline=')
        // Handle boolean attributes
        .replace(/="true"/g, '={true}')
        .replace(/="false"/g, '={false}');
}

// Generate React component
function generateReactComponent(
    optimizedSVG: OptimizedSVG,
    componentName: string,
    typescript: boolean,
    reactNative: boolean
): string {
    const { content, width, height, viewBox } = optimizedSVG;

    // Convert SVG content to React JSX
    const jsxContent = convertSVGAttributes(content);

    // Remove the outer <svg> tag and extract its attributes
    const svgMatch = jsxContent.match(/<svg([^>]*)>/);
    if (svgMatch) {
        const svgAttributes = svgMatch[1];
        const innerContent = jsxContent.replace(/<svg[^>]*>([\s\S]*)<\/svg>/, '$1');

        // Build the component
        const propsType = typescript ? `React.SVGProps<SVGSVGElement>` : '';
        const defaultProps = width && height ? `width={${width}} height={${height}}` : '';

        const component = `
import React from 'react';

interface ${componentName}Props ${typescript ? `extends React.SVGProps<SVGSVGElement>` : ''} {
  size?: number | string;
  color?: string;
  className?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  size = 24,
  color = 'currentColor',
  className,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="${viewBox || '0 0 24 24'}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      ${innerContent.trim()}
    </svg>
  );
};
`.trim();

        return component;
    }

    return `// Error: Could not parse SVG content`;
}

// Generate React Native component
function generateReactNativeComponent(
    optimizedSVG: OptimizedSVG,
    componentName: string,
    typescript: boolean
): string {
    const { content, viewBox } = optimizedSVG;

    // Convert SVG content to React Native compatible JSX
    const jsxContent = convertSVGAttributes(content);

    // Remove the outer <svg> tag and extract its attributes
    const svgMatch = jsxContent.match(/<svg([^>]*)>/);
    if (svgMatch) {
        const innerContent = jsxContent.replace(/<svg[^>]*>([\s\S]*)<\/svg>/, '$1');

        const component = `
import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polyline, Polygon, Ellipse } from 'react-native-svg';

interface ${componentName}Props {
  size?: number;
  color?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  size = 24,
  color = '#000',
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="${viewBox || '0 0 24 24'}"
      fill="none"
    >
      ${innerContent.trim()}
    </Svg>
  );
};
`.trim();

        return component;
    }

    return `// Error: Could not parse SVG content`;
}

// Main conversion function
export function getSvgReactCode(config: SVGConverterConfig): string {
    const {
        svg,
        componentName,
        typescript = true,
        reactNative = false,
        optimize = true
    } = config;

    try {
        // Optimize SVG if requested
        const optimizedSVG = optimize ? optimizeSVG(svg) : {
            content: svg,
            viewBox: '0 0 24 24'
        };

        // Generate component based on target platform
        let componentCode: string;
        if (reactNative) {
            componentCode = generateReactNativeComponent(optimizedSVG, componentName, typescript);
        } else {
            componentCode = generateReactComponent(optimizedSVG, componentName, typescript, reactNative);
        }

        return componentCode;
    } catch (error) {
        console.error('SVG conversion error:', error);
        throw new Error(`Failed to convert SVG: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
