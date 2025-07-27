import { logos } from '../src/data/logos';
import fs from 'fs/promises';
import path from 'path';

const organizeLogoAssets = async (): Promise<void> => {
    const sourceDir = path.resolve(process.cwd(), 'public/raw-logos');
    const destDir = path.resolve(process.cwd(), 'public/logos');

    try {
        await fs.mkdir(destDir, { recursive: true });

        const moveOperations = logos.map(async (logo) => {
            const filename = path.basename(logo.route);
            const sourcePath = path.join(sourceDir, filename);
            const destPath = path.join(destDir, filename);

            try {
                await fs.access(destPath);
                // file already exists in the dest dir
                await fs.unlink(sourcePath);
                console.log(
                    `⚠️ Skipped
                    ${filename} as it already exists in ${destDir}.`
                );

                return false;
            } catch {
                // Proceed with the move operation.
                // file doesn't exist
                try {
                    await fs.rename(sourcePath, destPath);
                    console.log(`✅ Moved ${filename}`);

                    return true;
                } catch (moveError: any) {
                    if (moveError.code === 'ENOENT') {
                        // Source file doesn't exist, log a warning.
                        console.warn(`⚠️ Source file not found for ${filename}, skipping.`);

                        return false;
                    }
                    // Re-throw other move errors
                    throw moveError;
                }
            }
        });

        const results = await Promise.allSettled(moveOperations);
        const movedCount = results.filter((result) => result.status === 'fulfilled' && result.value === true).length;

        if (movedCount > 0) {
            console.log(`\n🎉 Successfully moved ${movedCount} logo(s) to ${destDir}.`);
        } else {
            console.log('\n✨ All logo assets are already organized. No files were moved.');
        }
    } catch (error) {
        console.error('❌ An error occurred during logo organization:', error);
        process.exit(1);
    }
};

organizeLogoAssets().catch((error) => {
    console.error('❌ Failed to organize logo assets:', error);
});
