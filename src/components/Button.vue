<template>
  <view
    class="btn"
    :class="[variant, size]"
    @tap="$emit('click', $event)"
  >
    <slot />
  </view>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' }
})

defineEmits(['click'])
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: $font-size-body;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  user-select: none;
  white-space: nowrap;

  &:active { transform: scale(0.97); }

  &.primary {
    background: $theme-red;
    color: $theme-white;
    font-weight: $font-weight-semibold;
    &:hover { background: $theme-red-hover; }
  }

  &.secondary {
    background: $theme-white;
    color: $theme-ink;
    border: 1px solid $theme-border;
    font-weight: $font-weight-medium;
    &:hover { border-color: $theme-red; color: $theme-red; }
  }

  &.ghost {
    background: transparent;
    color: $theme-gray;
    font-weight: $font-weight-regular;
    &:hover { color: $theme-ink; }
  }

  &.sm {
    height: 32px;
    padding: 0 16px;
    font-size: $font-size-xs;
    border-radius: 6px;
  }

  &.md {
    height: 44px;
    padding: 0 28px;
  }

  &.lg {
    height: 52px;
    padding: 0 40px;
    font-size: $font-size-subtitle;
    border-radius: 10px;
  }
}
</style>
