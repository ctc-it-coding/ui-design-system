import { FeaturedIcon, type FeaturedIconTheme } from '../../src/components/featured-icons';
import { AlertCircle } from '../../src/icons';
import { Section, Row } from '../ui';

const themes: FeaturedIconTheme[] = ['light', 'light-square', 'modern', 'mid-square', 'dark-square', 'dark-outline', 'light-outline', 'glass', 'outline'];
const colors = ['brand', 'gray', 'error', 'warning', 'success'] as const;

export default function FeaturedIconsDemo() {
  return (
    <Section id="featured-icons" title="Featured icons" figma="Misc icons/Featured icon · Featured icon outline">
      {themes.map((t) => (
        <Row key={t} label={t} className="flex flex-wrap items-center gap-6 py-2">
          {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <FeaturedIcon key={s} icon={AlertCircle} theme={t} size={s} />
          ))}
          <span className="w-6" />
          {colors.map((c) => (
            <FeaturedIcon key={c} icon={AlertCircle} theme={t} color={c} size="lg" />
          ))}
        </Row>
      ))}
    </Section>
  );
}
