import type { SVGProps } from 'react';

export interface SVGIconProps extends SVGProps<SVGSVGElement> {
    title?: string;
    titleId?: string;
    description?: string;
    descriptionId?: string;
    size?: number;
    className?: string;
    children?: React.ReactNode;
}
