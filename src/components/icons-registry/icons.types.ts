import type { IconName } from './icons.data';
import type { QwikIntrinsicElements } from '@builder.io/qwik';

export type IconProps = QwikIntrinsicElements['svg'] & {
  size?: number;
  class?: string;
};

export interface IconDefinition {
  name: string;
  path: string;
  markup?: never;
}

export interface IconPathsDefinition {
  name: string;
  paths: string[];
  markup?: never;
}

export interface IconMarkupDefinition {
  name: string;
  markup: any; // Use 'any' for Qwik JSX compatibility
  path?: never;
  paths?: never;
}

export type IconEntry = IconDefinition | IconPathsDefinition | IconMarkupDefinition;

export type SocialPlatform =
  | "github"
  | "x"
  | "instagram"
  | "facebook"
  | "youtube"
  | "twitch"
  | "tiktok"
  | "reddit"
  | "spotify"
  | "telegram"
  | "linktree"
  | "huggingface"
  | "buymeacoffee";

export interface PlatformIconMap {
  getIconForPlatform(platform: SocialPlatform): IconName;
}
