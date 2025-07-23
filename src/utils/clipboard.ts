/**
 * Asynchronously copies text to the user's clipboard.
 * This function uses the modern Clipboard API with a fallback to the
 * deprecated `document.execCommand` for older browser compatibility.
 *
 * @param {string} text - The text to be copied to the clipboard.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the copy
 * operation was successful, and `false` otherwise.
 */

export const copyToClipboard = async (text: string): Promise<boolean> => {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);

            return true;
        } catch (error) {
            console.error('Clipboard API failed:', error);

            return false;
        }
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');

            return true;
        } catch (error) {
            console.error('Fallback copy method failed:', error);

            return false;
        } finally {
            document.body.removeChild(textArea);
        }
    }
};
