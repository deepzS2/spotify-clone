"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const Slider = ({ onChange, value = 1 }: SliderProps) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="flex relative items-center w-full h-10 select-none touch-none"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track className="relative rounded-full bg-neutral-600 grow h-[3px]">
        <RadixSlider.Range className="absolute h-full bg-white rounded-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};
