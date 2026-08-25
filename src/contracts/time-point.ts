import type { RandomSource } from "../core/random.js";

export type TimePointId =
  | "dawn"
  | "morning"
  | "midday"
  | "afternoon"
  | "golden-hour"
  | "blue-hour"
  | "night";

export type TimePointSelection = "auto" | TimePointId;

export interface TimePointProfile {
  id: TimePointId;
  label: string;
  labelEn: string;
  clock: string;
  clockEn: string;
  light: string;
  lightEn: string;
}

export const TIME_POINTS: readonly TimePointProfile[] = [
  {
    id: "dawn",
    label: "黎明前后",
    labelEn: "around dawn",
    clock: "05:30–06:30",
    clockEn: "05:30–06:30",
    light: "天色从深处慢慢亮起，冷暖交界柔和",
    lightEn: "the sky slowly opens from darkness with a soft cool-warm transition"
  },
  {
    id: "morning",
    label: "清晨",
    labelEn: "early morning",
    clock: "07:00–09:00",
    clockEn: "07:00–09:00",
    light: "第一束清亮日光落到屋檐、树叶或石径上",
    lightEn: "the first clear sunlight touches the eaves, leaves or stone path"
  },
  {
    id: "midday",
    label: "正午前后",
    labelEn: "around midday",
    clock: "11:30–13:00",
    clockEn: "11:30–13:00",
    light: "明亮高位天光压低阴影，色彩清澈而安静",
    lightEn: "high bright daylight shortens shadows while keeping colors clear and calm"
  },
  {
    id: "afternoon",
    label: "午后",
    labelEn: "afternoon",
    clock: "14:00–16:00",
    clockEn: "14:00–16:00",
    light: "光线变得柔和，树影向一条进入画面的路移动",
    lightEn: "the light softens as tree shadows move toward a path entering the image"
  },
  {
    id: "golden-hour",
    label: "日落前的金色时分",
    labelEn: "the golden hour before sunset",
    clock: "17:00–18:30",
    clockEn: "17:00–18:30",
    light: "低角度金光拉长路径，温暖但不煽情",
    lightEn: "low golden light lengthens the path with warmth without sentimentality"
  },
  {
    id: "blue-hour",
    label: "日落后的蓝调时分",
    labelEn: "the blue hour after sunset",
    clock: "18:30–19:30",
    clockEn: "18:30–19:30",
    light: "蓝色天光仍在，屋内一点暖光成为安静的方向",
    lightEn: "blue ambient light remains while one warm interior glow becomes a quiet direction"
  },
  {
    id: "night",
    label: "入夜后的安静时分",
    labelEn: "the quiet hours after nightfall",
    clock: "20:00–22:00",
    clockEn: "20:00–22:00",
    light: "大面积深色留白包住一处克制而可靠的微光",
    lightEn: "broad dark breathing space surrounds one restrained and dependable glow"
  }
] as const;

export function resolveTimePoint(selection: TimePointSelection | undefined, rng: RandomSource): TimePointProfile {
  if (selection && selection !== "auto") {
    return TIME_POINTS.find((timePoint) => timePoint.id === selection) || TIME_POINTS[0];
  }
  return rng.pick(TIME_POINTS);
}
