import { convertToPascalCase } from '@/utils';

interface WebComponentParams {
    title: string;
    svg: string;
}

export const getWebComponentCode = (params: WebComponentParams): string => {
    const className = convertToPascalCase(params.title);
    const tagName = `${params.title.toLowerCase().replace(/\s+/g, '-')}-icon`;

    return `
class ${className} extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /* html */ \`
      <style>
        :host {
          display: inline-block;
          line-height: 1;
        }
        svg {
          width: var(--size, 1em);
          height: var(--size, 1em);
          color: var(--color, currentColor);
        }
      </style>
      ${params.svg.replace(/`/g, '\\`')}
    \`;
  }
}

customElements.define('${tagName}', ${className});
`.trim();
};
