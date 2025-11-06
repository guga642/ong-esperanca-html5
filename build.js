import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { join, extname } from 'path';
import { minify } from 'terser';
import CleanCSS from 'clean-css';

const cleanCSS = new CleanCSS();

async function minifyJS(filePath) {
    try {
        const code = await readFile(filePath, 'utf8');
        const result = await minify(code, {
            compress: true,
            mangle: true,
            format: {
                comments: false
            }
        });
        
        if (result.code) {
            const minPath = filePath.replace('.js', '.min.js');
            await writeFile(minPath, result.code);
            console.log(`✓ Minified: ${filePath} → ${minPath}`);
        }
    } catch (error) {
        console.log(`✗ Error minifying ${filePath}:`, error.message);
    }
}

async function minifyCSS(filePath) {
    try {
        const code = await readFile(filePath, 'utf8');
        const result = cleanCSS.minify(code);
        
        if (result.styles) {
            const minPath = filePath.replace('.css', '.min.css');
            await writeFile(minPath, result.styles);
            console.log(`✓ Minified: ${filePath} → ${minPath}`);
        }
    } catch (error) {
        console.log(`✗ Error minifying ${filePath}:`, error.message);
    }
}

async function processDirectory(dirPath) {
    try {
        const files = await readdir(dirPath);
        
        for (const file of files) {
            const filePath = join(dirPath, file);
            const fileStat = await stat(filePath);
            
            if (fileStat.isDirectory()) {
                await processDirectory(filePath);
            } else {
                const ext = extname(file);
                if (ext === '.js' && !file.includes('.min.js')) {
                    await minifyJS(filePath);
                } else if (ext === '.css' && !file.includes('.min.css')) {
                    await minifyCSS(filePath);
                }
            }
        }
    } catch (error) {
        console.log(`✗ Error processing directory ${dirPath}:`, error.message);
    }
}

async function createHTMLWithMinified() {
    try {
        let html = await readFile('index.html', 'utf8');
        
        html = html
            .replace(/css\/main\.css/g, 'css/main.min.css')
            .replace(/css\/accessibility\.css/g, 'css/accessibility.min.css')
            .replace(/js\/main\.js/g, 'js/main.min.js')
            .replace(/js\/accessibility\.js/g, 'js/accessibility.min.js')
            .replace(/js\/app\/router\.js/g, 'js/app/router.min.js')
            .replace(/js\/app\/formValidator\.js/g, 'js/app/formValidator.min.js')
            .replace(/js\/app\/templates\.js/g, 'js/app/templates.min.js')
            .replace(/js\/utils\/storage\.js/g, 'js/utils/storage.min.js')
            .replace(/js\/utils\/helpers\.js/g, 'js/utils/helpers.min.js');
        
        await writeFile('index.min.html', html);
        console.log('✓ Created: index.min.html');
    } catch (error) {
        console.log('✗ Error creating minified HTML:', error.message);
    }
}

async function build() {
    console.log('🚀 Starting build process...\n');
    
    await processDirectory('js');
    await processDirectory('css');
    await createHTMLWithMinified();
    
    console.log('\n🎉 Build completed!');
    console.log('📁 Minified files created:');
    console.log('   - CSS: *.min.css');
    console.log('   - JS: *.min.js');
    console.log('   - HTML: index.min.html');
}

build().catch(console.error);
