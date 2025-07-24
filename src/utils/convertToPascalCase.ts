export const convertToPascalCase = (text: string): string => {
    return text.replace(/(^\w|-\w|\s\w)/g, (c) => c.replace(/[- ]/, '').toUpperCase());
};
