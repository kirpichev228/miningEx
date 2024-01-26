<template>
  <div class="toggle">
    <label class="switch">
      <input
        type="checkbox"
        :checked="state"
        :value="state"
        :name="'toggle' + id"
      />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  state: boolean;
  id: string;
}>();
</script>

<style scoped>
.toggle {
  display: flex;
  align-items: flex-end;
}

.switch-text {
  font-size: 16px;
  font-weight: 800;
  line-height: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #19202c;
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 28px;
  margin-left: 11px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f9f9f9;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 2px;
  bottom: 2px;
  background-color: #cccccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider:before {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(24px);
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
}

.slider.round {
  border-radius: 28px;
}

.slider.round:before {
  border-radius: 50%;
}

@media only screen and (max-width: 480px) {
  .switch {
    width: 30px;
    height: 18px;
    margin-left: 11px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 1px;
    bottom: 1px;
    background-color: #cccccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
}

input:checked + .slider:before {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

.slider.round {
  border-radius: 18px;
}
.toggle .switch-text {
  font-size: 10px;
  line-height: 13px;
}
</style>
