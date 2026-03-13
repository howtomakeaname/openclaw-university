<template>
  <div
    :class="[
      'list-item',
      { 'list-item-clickable': clickable, 'list-item-bordered': bordered }
    ]"
    @click="handleClick"
  >
    <div v-if="$slots.prefix" class="list-item-prefix">
      <slot name="prefix" />
    </div>
    <div class="list-item-content">
      <div class="list-item-title">
        <slot name="title" />
      </div>
      <div v-if="$slots.subtitle" class="list-item-subtitle">
        <slot name="subtitle" />
      </div>
    </div>
    <div v-if="$slots.suffix" class="list-item-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  clickable?: boolean
  bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  clickable: false,
  bordered: true
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (e: MouseEvent) => {
  if (props.clickable) {
    emit('click', e)
  }
}
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-md) 0;
  gap: var(--spacing-md);
  background-color: var(--color-background);
}

.list-item-bordered {
  border-bottom: 1px solid var(--color-border);
}

.list-item-clickable {
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.list-item-clickable:hover {
  background-color: var(--color-background-secondary);
  margin: 0 -8px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: var(--radius-md);
  border-bottom-color: transparent;
}

.list-item-prefix {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.list-item-content {
  flex: 1;
  min-width: 0;
}

.list-item-title {
  font-size: var(--text-base);
  color: var(--color-primary);
  font-weight: 500;
  line-height: 1.4;
}

.list-item-subtitle {
  font-size: var(--text-sm);
  color: var(--color-secondary);
  margin-top: 2px;
  line-height: 1.4;
}

.list-item-suffix {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--color-tertiary);
}
</style>