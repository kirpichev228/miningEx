import { filename } from "pathe/utils";

export const useSvgIcons = () => {
  const images = computed(() => {
    const glob: Record<string, { default: string }> = import.meta.glob(
      "~/assets/icons/*.svg",
      { eager: true }
    );
    const entries = Object.fromEntries(
      Object.entries(glob).map(([key, value]) => [filename(key), value.default])
    );
    return entries;
  });
  return { images };
};
