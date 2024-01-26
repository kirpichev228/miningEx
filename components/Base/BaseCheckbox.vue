<template>
  <label class="mcui-checkbox">
    <input
      type="checkbox"
      :name="option.label.toString()"
      :value="option.selected"
      @change="emit('valueChecked', option.label.toString(), props.category)"
    />
    <div>
      <svg class="mcui-check" viewBox="-2 -2 35 35" aria-hidden="true">
        <title>checkmark-circle</title>
        <polyline points="7.57 15.87 12.62 21.07 23.43 9.93" />
      </svg>
    </div>
    <div>{{ option.label }}</div>
  </label>
</template>

<script setup lang="ts">
const emit = defineEmits(["valueChecked"]);

const props = defineProps<{
  option: any;
  category?: string;
}>();
</script>

<style scoped lang="scss"></style>
