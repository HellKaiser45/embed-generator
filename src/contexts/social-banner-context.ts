// qwik context for social banner
import { createContextId, useContext } from '@builder.io/qwik';

export interface SocialType {
  'name': string;
  'link': string;
}

export interface SocialBannerContextType {
  'iconsColor': string;
  'BgColor': string;
  'iconsSize': string;
  'socials': SocialType[];
}
export const SocialBannerContext = createContextId<SocialBannerContextType>('social-banner-context');

export const useSocialBannerContext = () =>
  useContext(SocialBannerContext);
