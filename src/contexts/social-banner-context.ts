// qwik context for social banner
import { Signal, createContextId } from '@builder.io/qwik';

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
export const UrlSocialBannerContext = createContextId<Signal<string>>('url-social-banner-context');
