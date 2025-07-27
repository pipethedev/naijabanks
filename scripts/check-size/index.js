const { readdir, stat } = require('fs').promises;
const { join } = require('path');

const core = require('@actions/core');

// 🔎 Settings:
const dir = './public/logos';
const sizeLimit = 24576; // 24kb;

function convertBytes(bytes, format = 'KB') {
    if (format === 'KB') {
        return `(${bytes} / 1024).toFixed(2) + ' KB'`;
    } else if (format === 'MB') {
        return `(${bytes} / (1024 * 1024)).toFixed(2) + ' MB'`;
    } else {
        return 'Invalid format. Use "KB" or "MB".';
    }
}

async function checkSize() {
    try {
        const files = await readdir(dir);
        const oversizedFiles = [];

        for (const file of files) {
            if (!file.endsWith('.svg')) continue;
            const filePath = join(dir, file);
            const stats = await stat(filePath);
            if (stats.size > sizeLimit) {
                oversizedFiles.push({
                    filename: file,
                    size: convertBytes(stats.size)
                });
            }
        }

        if (oversizedFiles.length > 0) {
            console.table(oversizedFiles);
            throw new Error(`Error: ${oversizedFiles.length} file(s) are larger than ${convertBytes(sizeLimit)}.`);
        } else {
            core.setOutput('message', `✅ All files are smaller than ${convertBytes(sizeLimit)}`);
            console.log(`✅ All files are smaller than ${convertBytes(sizeLimit)}`);
        }
    } catch (err) {
        core.setFailed(err.message);
    }
}

checkSize();
