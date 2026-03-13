<template>
  <div :class="['list-item', { 'is-clickable': clickable }]" @click="handleClick">
    <div v-if="$slots.lead" class="item-lead">
      <slot name="lead" />
    </div>
    <div class="item-body">
      <div v-if="$slots.title" class="item-title">
        <slot name="title" />
      </div>
      <div v-if="$slots.desc" class="item-desc">
        <slot name="desc" />
      </div>
    </div>
    <div v-if="$slots.trail" class="item-trail">
      <slot name="trail" />
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
  align-items: center;
  gap: var(--gap-3);
  padding: var(--gap-3) 0;
  min-height: 52px;
}

.list-item.is-clickable {
  cursor: pointer;
  margin: 0 calc(-1 * var(--gap-3));
  padding: var(--gap-3);
  border-radius: var(--corner-md);
  transition: all var(--ease-quick);
}

.list-item.is-clickable:hover {
  background: var(--cinnabar-ghost);
}

.item-lead,
.item-trail {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--ink-tertiary);
}

.item-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-title {
  font-size: var(--font-base);
  color: var(--ink-primary);
  line-height: 1.4;
}

.item-desc {
  font-size: var(--font-sm);
  color: var(--ink-tertiary);
  line-height: 1.4;
}
</style>
