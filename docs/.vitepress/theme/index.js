// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
// import Layout from './Layout.vue'
import 'katex/dist/katex.min.css';
import TextContent from './components/TextContent.vue';
import './style.css';

export default {
    // extends: DefaultTheme,
    // Layout: Layout
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('TextContent', TextContent)
    }
}