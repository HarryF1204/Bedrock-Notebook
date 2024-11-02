<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 20 20" fill="currentColor" style="vertical-align: middle;"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>`
</script>

<template>
    <Layout>
        <template #nav-bar-content-after>
            <a href="https://bedrock.dev">
                bedrock.dev
                <span class="icon" v-html="svgIcon"></span>
            </a>
            <a href="https://wiki.bedrock.dev">
                Bedrock Wiki
                <span class="icon" v-html="svgIcon"></span>
            </a>
            <a href="https://learn.microsoft.com/en-gb/minecraft/creator/">
                MS Learn
                <span class="icon" v-html="svgIcon"></span>
            </a>
            <a href="https://jaylydev.github.io/scriptapi-docs/latest/index.html">
                Jayly API Reference
                <span class="icon" v-html="svgIcon"></span>
            </a>
        </template>
    </Layout>
</template>

<style scoped>
a {
    margin-left: 10px;
    display: flex;
    align-items: center;
}

.icon svg {
    /* Adapts to theme's text color */
    fill: var(--vp-c-text);
    width: 20px;
    height: 20px;
    margin-left: 5px;
}
</style>
