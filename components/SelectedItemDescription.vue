<template>
  <table class="selected-item__description">
    <tbody>
      <tr
        v-for="(item, key) in selectedProperties"
        :key="key"
        class="text-left"
      >
        <th class="py-4">
          {{ item.label }}
        </th>
        <td class="py-4">
          {{ selectedItem[item.value as keyof CatalogItem] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface ItemProperties {
  label: string;
  value: string;
}

defineProps<{
  selectedProperties: ItemProperties[];
  selectedItem: CatalogItem;
}>();
</script>

<style scoped lang="css">
.selected-item__description {
  @apply w-full border-separate border-spacing-2 py-5 px-3 bg-white mb-5;
}
</style>
