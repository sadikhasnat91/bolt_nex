export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'image' | 'list' | 'icon';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
}

export interface CollectionDef {
  key: string;
  label: string;
  fields: FieldDef[];
}

export interface SettingsDef {
  key: string;
  label: string;
  fields: FieldDef[];
}

export const ICON_NAMES = [
  'Megaphone', 'Search', 'Mail', 'Palette', 'Code2', 'Zap', 'Smartphone', 'Sparkles', 'Workflow',
  'Compass', 'LineChart', 'PenTool', 'FlaskConical', 'TestTube2', 'Rocket', 'ShieldCheck',
  'Target', 'Eye', 'Heart',
] as const;

const headingFields: FieldDef[] = [
  { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
  { key: 'titlePrefix', label: 'Title (before highlight)', type: 'text' },
  { key: 'titleHighlight', label: 'Title (highlighted word)', type: 'text' },
  { key: 'titleSuffix', label: 'Title (after highlight)', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
];

export const COLLECTIONS: CollectionDef[] = [
  {
    key: 'services',
    label: 'Services',
    fields: [
      { key: 'icon', label: 'Icon', type: 'icon' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    key: 'about_values',
    label: 'About — Mission/Vision/Values',
    fields: [
      { key: 'icon', label: 'Icon', type: 'icon' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'text', label: 'Text', type: 'textarea' },
    ],
  },
  {
    key: 'about_stats',
    label: 'About — Stats',
    fields: [
      { key: 'value', label: 'Value', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
    ],
  },
  {
    key: 'hero_stats',
    label: 'Hero — Stats',
    fields: [
      { key: 'value', label: 'Value', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
    ],
  },
  {
    key: 'why_choose_us_rows',
    label: 'Why Choose Us — Comparison Rows',
    fields: [
      { key: 'feature', label: 'Feature', type: 'text' },
      { key: 'us', label: 'We have it', type: 'boolean' },
      { key: 'them', label: 'Typical agency has it', type: 'boolean' },
    ],
  },
  {
    key: 'portfolio',
    label: 'Portfolio Projects',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'featured', label: 'Featured (large card)', type: 'boolean' },
    ],
  },
  {
    key: 'team',
    label: 'Team Members',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'image', label: 'Photo', type: 'image' },
      { key: 'bio', label: 'Bio', type: 'textarea' },
    ],
  },
  {
    key: 'offices',
    label: 'Offices',
    fields: [
      { key: 'country', label: 'Country', type: 'text' },
      { key: 'city', label: 'City', type: 'text' },
      { key: 'tag', label: 'Tag', type: 'text' },
      { key: 'address', label: 'Address', type: 'text' },
      { key: 'hours', label: 'Hours', type: 'text' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    key: 'process',
    label: 'Process Steps',
    fields: [
      { key: 'icon', label: 'Icon', type: 'icon' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'rating', label: 'Rating (1-5)', type: 'number' },
      { key: 'quote', label: 'Quote', type: 'textarea' },
      { key: 'image', label: 'Photo', type: 'image' },
    ],
  },
  {
    key: 'pricing',
    label: 'Pricing Plans',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'price', label: 'Price', type: 'text' },
      { key: 'cadence', label: 'Cadence', type: 'text' },
      { key: 'blurb', label: 'Blurb', type: 'textarea' },
      { key: 'features', label: 'Features', type: 'list' },
      { key: 'cta', label: 'CTA Label', type: 'text' },
      { key: 'popular', label: 'Most Popular', type: 'boolean' },
    ],
  },
  {
    key: 'faq',
    label: 'FAQ',
    fields: [
      { key: 'q', label: 'Question', type: 'text' },
      { key: 'a', label: 'Answer', type: 'textarea' },
    ],
  },
  {
    key: 'trusted_by',
    label: 'Trusted-By Logos',
    fields: [
      { key: 'name', label: 'Brand name', type: 'text' },
    ],
  },
  {
    key: 'footer_columns',
    label: 'Footer Link Columns',
    fields: [
      { key: 'title', label: 'Column title', type: 'text' },
      { key: 'links', label: 'Links', type: 'list' },
    ],
  },
];

export const SETTINGS: SettingsDef[] = [
  {
    key: 'site',
    label: 'Site',
    fields: [{ key: 'brandName', label: 'Brand name', type: 'text' }],
  },
  {
    key: 'hero',
    label: 'Hero Section',
    fields: [
      { key: 'badge', label: 'Badge text', type: 'text' },
      { key: 'headingPrefix', label: 'Heading (before highlight)', type: 'text' },
      { key: 'headingHighlight', label: 'Heading (highlighted)', type: 'text' },
      { key: 'headingSuffix', label: 'Heading (after highlight)', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'ctaPrimaryLabel', label: 'Primary CTA label', type: 'text' },
      { key: 'ctaSecondaryLabel', label: 'Secondary CTA label', type: 'text' },
    ],
  },
  {
    key: 'about',
    label: 'About Section',
    fields: [
      { key: 'badge', label: 'Badge text', type: 'text' },
      { key: 'headingPrefix', label: 'Heading (before highlight)', type: 'text' },
      { key: 'headingHighlight', label: 'Heading (highlighted)', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    key: 'why_panels',
    label: 'Why Choose Us — Panels',
    fields: [
      { key: 'usBadge', label: 'Us: badge', type: 'text' },
      { key: 'usHeading', label: 'Us: heading', type: 'text' },
      { key: 'usText', label: 'Us: text', type: 'textarea' },
      { key: 'themBadge', label: 'Them: badge', type: 'text' },
      { key: 'themHeading', label: 'Them: heading', type: 'text' },
      { key: 'themText', label: 'Them: text', type: 'textarea' },
    ],
  },
  {
    key: 'faq_intro',
    label: 'FAQ — Intro',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'titlePrefix', label: 'Title (before highlight)', type: 'text' },
      { key: 'titleHighlight', label: 'Title (highlighted)', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    key: 'contact',
    label: 'Contact Section',
    fields: [
      { key: 'badge', label: 'Badge text', type: 'text' },
      { key: 'headingPrefix', label: 'Heading (before highlight)', type: 'text' },
      { key: 'headingHighlight', label: 'Heading (highlighted)', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'address', label: 'Address', type: 'text' },
      { key: 'hours', label: 'Hours', type: 'text' },
    ],
  },
  {
    key: 'footer',
    label: 'Footer',
    fields: [
      { key: 'tagline', label: 'Tagline', type: 'textarea' },
      { key: 'newsletterHeading', label: 'Newsletter heading', type: 'text' },
      { key: 'newsletterSubtext', label: 'Newsletter subtext', type: 'text' },
    ],
  },
  { key: 'services_heading', label: 'Services — Heading', fields: headingFields },
  { key: 'why_heading', label: 'Why Choose Us — Heading', fields: headingFields },
  { key: 'portfolio_heading', label: 'Portfolio — Heading', fields: headingFields },
  { key: 'team_heading', label: 'Team — Heading', fields: headingFields },
  { key: 'offices_heading', label: 'Offices — Heading', fields: headingFields },
  { key: 'process_heading', label: 'Process — Heading', fields: headingFields },
  { key: 'testimonials_heading', label: 'Testimonials — Heading', fields: headingFields },
  { key: 'pricing_heading', label: 'Pricing — Heading', fields: headingFields },
];

export function getCollectionDef(key: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.key === key);
}

export function getSettingsDef(key: string): SettingsDef | undefined {
  return SETTINGS.find((s) => s.key === key);
}
