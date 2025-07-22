export type IconName = keyof typeof import('./icons.data').iconRegistry;

export interface IconProps {
  size?: number;
  class?: string;
}
