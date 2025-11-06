import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function optimizeImage(filePath) {
    const ext = extname(filePath).toLowerCase();
    
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        try {
            const optimizedPath = filePath.replace(ext, `.optimized${ext}`);
            
            if (ext === '.png') {
                await execAsync(`optipng -o2 "${filePath}" -out "${optimizedPath}"`);
            } else if (ext === '.jpg' || ext === '.jpeg') {
                await execAsync(`jpegoptim --max=80 "${filePath}" --dest="${optimizedPath}"`);
            }
            
            console.log(`✓ Optimized: ${filePath}`);
        } catch (error) {
            console.log(`✗ Error optimizing ${filePath}:`, error.message);
        }
    }
}

async function processImages(dirPath) {
    try {
        const files = await readdir(dirPath);
        
        for (const file of files) {
            const filePath = join(dirPath, file);
            const fileStat = await stat(filePath);
            
            if (fileStat.isDirectory()) {
                await processImages(filePath);
            } else {
                await optimizeImage(filePath);
            }
        }
    } catch (error) {
        console.log(`✗ Error processing images in ${dirPath}:`, error.message);
    }
}

async function optimizeAllImages() {
    console.log('🖼️ Starting image optimization...\n');
    
    if (await stat('assets/images').catch(() => null)) {
        await processImages('assets/images');
    }
    if (await stat('imagens').catch(() => null)) {
        await processImages('imagens');
    }
    
    console.log('\n🎉 Image optimization completed!');
}

optimizeAllImages().catch(console.error);
