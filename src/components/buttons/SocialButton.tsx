import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { socialLogos, type SocialButtonPlatform } from './socialLogos';

export type { SocialButtonPlatform };
export type SocialButtonTheme = 'brand' | 'color' | 'gray';

const names: Record<SocialButtonPlatform, string> = {
  google: 'Google',
  facebook: 'Facebook',
  apple: 'Apple',
  figma: 'Figma',
  dribbble: 'Dribbble',
  x: 'X',
};

/** Which logo style each platform uses on its Theme=Brand button. */
const brandSolid: Partial<Record<SocialButtonPlatform, string>> = {
  facebook: 'bg-[#1877f2] hover:bg-[#0c63d4] text-white',
  apple: 'bg-black text-white',
  figma: 'bg-black text-white',
  dribbble: 'bg-[#ea4c89] hover:bg-[#e62872] text-white',
  x: 'bg-black text-white',
};

export interface SocialLogoProps {
  platform: SocialButtonPlatform;
  /** `brand` = full-colour logo, `mono` = single colour (currentColor). */
  variant?: 'brand' | 'mono';
  className?: string;
}

/** Internal brand logo (24×24 viewBox). */
export function SocialLogo({ platform, variant = 'brand', className }: SocialLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cx('size-6 shrink-0', className)}
      dangerouslySetInnerHTML={{ __html: socialLogos[platform][variant] }}
    />
  );
}

export interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Social */
  platform: SocialButtonPlatform;
  /** Figma: Theme (Brand = platform colours, Color = white with colour logo, Gray = white with gray logo). */
  theme?: SocialButtonTheme;
  /** Figma: Supporting text — false renders the icon-only square button. */
  supportingText?: boolean;
  /** Custom label; defaults to "Sign in with {Platform}". */
  children?: ReactNode;
}

/** SocialButton — Figma "Buttons/Social button". */
export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(function SocialButton(
  { platform, theme = 'brand', supportingText = true, className, children, type, ...props },
  ref,
) {
  const solid = theme === 'brand' ? brandSolid[platform] : undefined;
  const logoVariant: 'brand' | 'mono' =
    theme === 'gray' ? 'mono' : theme === 'brand' && solid && platform !== 'figma' ? 'mono' : 'brand';
  const label = children ?? `Sign in with ${names[platform]}`;

  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      aria-label={!supportingText ? (typeof label === 'string' ? label : names[platform]) : undefined}
      className={cx(
        'group/social inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-3 rounded-lg text-md font-medium whitespace-nowrap shadow-xs outline-0 transition-colors duration-100',
        'focus-visible:outline-4 focus-visible:outline-solid focus-visible:outline-gray-400/14 disabled:cursor-not-allowed disabled:opacity-50',
        supportingText ? 'px-4' : 'w-11 px-2.5',
        solid ?? 'bg-white text-gray-700 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 hover:text-gray-800',
        className,
      )}
      {...props}
    >
      <SocialLogo
        platform={platform}
        variant={logoVariant}
        className={theme === 'gray' ? 'text-gray-400 group-hover/social:text-gray-500' : undefined}
      />
      {supportingText && <span>{label}</span>}
    </button>
  );
});

export interface SocialButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Figma: Style (Buttons = stacked full-width, Icons = one row of icon buttons). */
  variant?: 'buttons' | 'icons';
  /** Figma: Theme */
  theme?: SocialButtonTheme;
  /** Platforms to show (default Google, Facebook, Apple). */
  platforms?: SocialButtonPlatform[];
  /** Called with the platform that was clicked. */
  onSelect?: (platform: SocialButtonPlatform) => void;
}

/** SocialButtonGroup — Figma "Buttons/Social button groups". */
export const SocialButtonGroup = forwardRef<HTMLDivElement, SocialButtonGroupProps>(function SocialButtonGroup(
  { variant = 'buttons', theme = 'color', platforms = ['google', 'facebook', 'apple'], onSelect, className, ...props },
  ref,
) {
  const icons = variant === 'icons';
  return (
    <div ref={ref} className={cx('flex w-full gap-3', icons ? 'flex-row' : 'flex-col', className)} {...props}>
      {platforms.map((p) => (
        <SocialButton
          key={p}
          platform={p}
          theme={theme}
          supportingText={!icons}
          onClick={() => onSelect?.(p)}
          className={icons ? 'w-auto flex-1' : 'w-full'}
        />
      ))}
    </div>
  );
});
