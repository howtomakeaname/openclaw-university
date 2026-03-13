<template>
  <div
    :class="['list-item', { 'is-clickable': clickable }]"
    @click="handleClick"
  >
    <div v-if="$slots.before" class="list-before">
      <slot name="before" />
    </div>
    <div class="list-content">
      <div v-if="$slots.title" class="list-title">
        <slot name="title" />
      </div>
      <div v-if="$slots.text" class="list-text">
        <slot name="text" />
      </div>
    </div>
    <div v-if="$slots.after" class="list-after">
      <slot name="after" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  clickable: false
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
  align-items: flex-start;
  gap: var(--gap-3);
  padding: var(--gap-3) 0;
  min-height: 48px;
}

.list-item.is-clickable {
  cursor: pointer;
  border-radius: var(--corner-md);
  padding: var(--gap-3);
  margin: 0 calc(-1 * var(--gap-3));
  transition: background var(--ease-quick);
}

.list-item.is-clickable:hover {
  background: var(--bg-hover);
}

.list-before,
.list-after {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--text-subtle);
}

.list-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.list-title {
  font-size: var(--font-base);
  color: var(--text-main);
  line-height: 1.4;
}

.list-text {
  font-size: var(--font-sm);
  color: var(--text-subtle);
  line-height: 1.4;
}
</style>
