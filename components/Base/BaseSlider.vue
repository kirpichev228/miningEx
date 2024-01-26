<template>
  <div class="custom-slider">
    <input
      ref="slider"
      :value="sliderValue"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      class="slider cursor-pointer"
      @input="setValue($event)"
    />
    <div class="flex w-full justify-between">
      <span>{{ sliderValue }}</span>
      <span>{{ max }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  min: number;
  max: number;
  step: number;
  modelValue: number;
}>();

const emit = defineEmits(["update:modelValue"]);

const sliderValue = ref(props.modelValue);
const slider: Ref<HTMLInputElement | null> = ref(null);

const setValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  sliderValue.value = parseFloat(target.value);
};

const getProgress = (value: number, min: number, max: number): number => {
  return ((value - min) / (max - min)) * 100;
};

const setCSSProgress = (progress: number) => {
  if (slider.value) {
    slider.value.style.setProperty("--ProgressPercent", `${progress}%`);
  }
};

watchEffect(() => {
  if (slider.value) {
    emit("update:modelValue", sliderValue.value);
    const progress = getProgress(
      sliderValue.value,
      Number(slider.value.min),
      Number(slider.value.max)
    );
    setCSSProgress(progress);
  }
});
</script>

<style scoped>
.custom-slider {
  --trackHeight: 0.5rem;
  --thumbRadius: 1rem;
}

.custom-slider input[type="range"] {
  position: relative;
  appearance: none;
  border-radius: 999px;
  z-index: 0;
  width: 100%;
}

.custom-slider input[type="range"]::before {
  content: "";
  position: absolute;
  width: var(--ProgressPercent, 100%);
  height: 100%;
  background: #bae6fd;
  pointer-events: none;
  border-radius: 999px;
}

.custom-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background: #38bdf8;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-moz-range-track {
  appearance: none;
  background: #38bdf8;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
  background: #0ea5e9;
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
}
</style>
