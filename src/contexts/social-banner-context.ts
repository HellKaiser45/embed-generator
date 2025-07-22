// qwik context for social banner
import { createContextId, useContext } from '@builder.io/qwik';

export interface SocialType {
  'name': string;
  'link': string;
}

export interface SocialBannerContextType {
  'icons-color': string;
  'icons-size': number;
  'socials': SocialType[];
}
export const SocialBannerContext = createContextId<SocialBannerContextType>('social-banner-context');

export const useSocialBannerContext = () =>
  useContext(SocialBannerContext);
