import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vitepress';
import texmath from 'markdown-it-texmath';
import katex from 'katex';

const docsPath = path.join(process.cwd(), 'docs');

function generateSidebarItems(dir) {
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /** @type {import('vitepress').DefaultTheme.SidebarItem[]} */
    const items = [];
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        if (file.startsWith('.') || file === 'public') return;

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            items.push({
                text: capitalize(file),
                items: generateSidebarItems(fullPath),
                collapsible: true,
                collapsed: true
            });
        } else if (file.endsWith('.md') && file !== 'index.md') {
            const name = file.replace('.md', '');
            const relativePath = path.relative(docsPath, fullPath).replace(/\\/g, '/');
            items.push({
                text: capitalize(name),
                link: `/${relativePath.replace('.md', '')}`, // Link to the markdown file
            });
        }
    });

    return items;
}

export default defineConfig({
    title: 'The Bedrock Notebook',
    description: 'An Un-Official Minecraft Bedrock addon development documentation site',
    base: '/',
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/icons/app_icon.png' }]
    ],
    themeConfig: {
        socialLinks: [
            { icon: 'github', link: 'https://github.com/HarryF1204/Bedrock-Notebook' }
        ],
        sidebar: [
            {
                text: 'Topics',
                items: [{ text: 'Home', link: '/index' }, ...generateSidebarItems(docsPath)],
            }
        ],
        docFooter: {
            next: false,
            prev: false
        },
        search: {
            provider: 'local',
            options: {
                miniSearch: {
                    options: {},
                    searchOptions: {}
                }
            }
        }
    },
    markdown: {
        config: (md) => {
            md.renderer.rules.text = (tokens, idx) => {
                let content = tokens[idx].content;
                if (content.includes('- [ ]') || content.includes('- [x]')) {
                    content = content
                        .replace(/- \[ \]/g, '<input type="checkbox" disabled>')
                        .replace(/- \[x\]/g, '<input type="checkbox" checked disabled>');
                }
                return content;
            };
            md.use(texmath, {
                engine: katex,
                delimiters: 'dollars', // Use '$' for inline and '$$' for block math
                katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
            });
        }
    }
});
