const { readdir, readFile, writeFile } = require('fs').promises;
const { join } = require('path');

const core = require('@actions/core');

// Settings
const dir = './public/logos';

const getViewBox = (content) => {
    const match = /viewBox="([^"]+)"/.exec(content);

    return match ? match[1] : null;
};
const getWidth = (content) => {
    const match = /width="([^"]+)"/.exec(content);

    return match ? match[1] : null;
};
const getHeight = (content) => {
    const match = /height="([^"]+)"/.exec(content);

    return match ? match[1] : null;
};

async function fixViewbox() {
    const fixedFiles = [];
    try {
        const files = await readdir(dir);
        for (const file of files) {
            if (!file.endsWith('.svg')) continue;

            const filePath = join(dir, file);
            const fileContent = await readFile(filePath, 'utf8');

            if (!getViewBox(fileContent)) {
                const width = getWidth(fileContent);
                const height = getHeight(fileContent);

                if (width && height) {
                    const newContent = fileContent.replace('<svg', `<svg viewBox="0 0 ${width} ${height}"`);
                    await writeFile(filePath, newContent);
                    fixedFiles.push(file);
                } else {
                    throw new Error(
                        `❌ SVG file ${file} is missing width and/or height attributes needed to generate a viewBox.`
                    );
                }
            }
        }

        if (fixedFiles.length > 0) {
            core.setOutput('message', `✅ Automatically fixed viewBox for: ${fixedFiles.join(', ')}`);
            console.log(`✅ Automatically fixed viewBox for: ${fixedFiles.join(', ')}`);
        } else {
            core.setOutput('message', '✅ All SVGs have a viewBox.');
            console.log('✅ All SVGs have a viewBox.');
        }
    } catch (err) {
        core.setFailed(err.message);
    }
}

fixViewbox();
