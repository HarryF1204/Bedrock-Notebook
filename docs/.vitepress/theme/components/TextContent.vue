<template>
    <div v-if="content" class="file-content">
        <div class="line-numbers">
            <span v-for="(line, index) in lines" :key="index">{{ index + 1 }}</span>
        </div>
        <pre class="text-content">{{ content }}</pre>
    </div>
    <div v-else class="loading">Loading content...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { computed } from 'vue'
const basePath = import.meta.env.BASE_URL + 'public';

const props = defineProps({
    path: {
        type: String,
        required: true,
    },
})

const content = ref('')
const lines = computed(() => content.value.split('\n'))

const fetchContent = async () => {
    try {
        const response = await fetch(basePath + props.path)
        const buffer = await response.arrayBuffer()
        const decoder = new TextDecoder('utf-16')
        content.value = decoder.decode(buffer)
    } catch (error) {
        content.value = 'Error loading file.'
    }
}

onMounted(fetchContent)
</script>

<style scoped>
.file-content {
    display: flex;
    max-height: 300px;
    overflow: auto;
    font-size: small;
    border: 1px solid var(--vp-c-divider-light);
    border-radius: 5px;
    background-color: var(--vp-c-bg);
}

.line-numbers {
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    text-align: right;
    user-select: none;
    color: var(--vp-c-text-muted);
    background-color: var(--vp-c-bg-soft);
    height: 100%;
    /* Stretch background to the full height */
    flex-shrink: 0;
    /* Prevent shrinking */
}

.line-numbers span {
    display: block;
    line-height: 1.5;
}

.text-content {
    white-space: pre-wrap;
    padding: 0.5rem;
    line-height: 1.5;
    color: var(--vp-c-text-base);
    background-color: var(--vp-c-bg);
    flex: 1;
    margin: 0;
}
</style>