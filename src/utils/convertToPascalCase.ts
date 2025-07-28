export const convertToPascalCase = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/gi, '')
        .replace(/(?:^|[\s-])(\w)/g, (_, c: string) => c.toUpperCase());
};
