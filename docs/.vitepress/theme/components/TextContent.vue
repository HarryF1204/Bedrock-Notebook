<template>
    <div id="container">
        <div v-if="content" class="file-content">
            <div class="line-numbers">
                <span v-for="(line, index) in lines" :key="index">{{ index + 1 }}</span>
            </div>
            <pre class="text-content">{{ content }}</pre>
        </div>
        <div v-else class="loading">Loading content...</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { computed } from 'vue'
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
        const response = await fetch(props.path)
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
#container {
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
}

.file-content {
    position: relative;
    display: flex;
    overflow: auto;
    font-size: small;
    border: 1px solid var(--vp-c-divider-light);
    border-radius: 5px;
    background-color: var(--vp-c-bg);
    background-image:
        linear-gradient(to right,
            var(--vp-c-bg-soft) 0,
            var(--vp-c-bg-soft) 3rem,
            transparent 3rem);
    background-repeat: no-repeat;
}

.line-numbers {
    background: transparent;
    padding: 0.5rem 0.5rem 0.5rem 0;
    text-align: right;
    user-select: none;
    color: var(--vp-c-text-muted);
    flex-shrink: 0;
}

.line-numbers span {
    display: block;
    line-height: 1.5;
}

.text-content {
    overflow: visible;
    white-space: pre-wrap;
    padding: 0.5rem;
    line-height: 1.5;
    margin: 0;
    flex: 1;
}
</style>