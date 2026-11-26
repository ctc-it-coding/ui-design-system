# CTC-UI — Untitled UI Design System (Laravel + Inertia + Vue 3 + Tailwind)

โปรเจกต์นี้แปลง **Untitled UI PRO v7.0** จาก Figma เป็น Vue 3 components ใช้กับ Laravel + Inertia

## ⚠️ กฎสำคัญที่สุด — ห้ามละเมิด

**ทุก design token และ component ต้องดึงจาก Figma MCP ของ user เท่านั้น ห้ามเดา ห้ามใช้ค่า "standard Untitled UI" จากความรู้ทั่วไป**

- ถ้า `get_variable_defs` คืนค่าว่าง/ไม่ครบ → **หยุด** และขอให้ user คลิกเลือก frame ที่ถูกต้องใน Figma desktop ก่อน แล้วค่อย fetch ใหม่
- ก่อนทำ token/component ใหม่ทุกครั้ง ต้องให้ user คลิกเลือกใน Figma แล้วตอบ "ok" ก่อน
- User เคยแจ้งเตือนเรื่องนี้แล้วตอน Shadows/Blurs/Spacing ที่เราเดาโดยไม่ดึง — **ห้ามเกิดขึ้นอีก**
- จดไว้ใน `~/.claude/projects/-Users-wannapong-workspace-ccollege-ctc-ui/memory/feedback_figma_no_guessing.md`

## Tech Stack

- **Laravel** (composer create-project) + **Breeze** (vue scaffold)
- **Inertia.js + Vue 3** (TypeScript setup syntax)
- **TailwindCSS** (ขยาย tokens จาก Figma)
- Scaffolded ด้วย `composer create-project laravel/laravel` แล้ว `php artisan breeze:install vue`

### PATH สำหรับเครื่องนี้ (macOS + Herd/Homebrew + nvm)
```bash
export PATH="/opt/homebrew/bin:/Users/wannapong/.nvm/versions/node/v22.22.0/bin:$PATH"
```
- `php`, `composer` อยู่ใน `/opt/homebrew/bin`
- `node v22.22.0` อยู่ใน `~/.nvm/versions/node/v22.22.0/bin`

## Source ใน Figma

1. **PRO VARIABLES v7.0** (`qJ72mVpF9KdW`) — colors, typography, spacing, radius, shadows, blurs, focus rings
2. **PRO STYLES v4.0** (`Xc9cJq1vK2Q5`) — components (Buttons, Badges, ฯลฯ)

## โครงสร้างไฟล์ที่สร้างแล้ว

```
ctc-ui/
├── tailwind.config.js          # Design tokens ทั้งหมด (ดูด้านล่าง)
├── public/logos/
│   ├── *.svg                    # 96 fictional company logos (24 บริษัท × 4 variants)
│   ├── social/                  # 14 social icon SVGs
│   └── store/                   # 26 Google Play + App Store badge fragments
└── resources/js/Components/
    ├── Logomark.vue             # Logo mark (32×32 SVG inline)
    ├── Logo.vue                 # Logo + wordmark "KRUNAM-CTC"
    ├── FictionalCompanyLogo.vue # 24 companies × 4 variants
    ├── Button.vue               # 11 hierarchies × 5 sizes (รวม destructive)
    ├── SocialButton.vue         # google/facebook/apple/twitter/figma/dribbble (brand theme)
    ├── SocialButtonGroup.vue    # wrapper สำหรับ 3 socials (stacked/icons)
    ├── MobileAppStoreBadge.vue  # google-play / app-store × md/lg × 3 styles
    ├── ButtonGroupBase.vue      # atomic button cell
    ├── ButtonGroup.vue          # wrapper สำหรับ ButtonGroupBase หลายอัน
    ├── BadgeCloseX.vue          # ปุ่ม x-close เล็ก (12 สี × 2 types)
    │
    │   # === Badges ===
    ├── Badge.vue                # 12 colors × 3 sizes × 3 types (pill-color/badge-color/badge-modern) + dot/closable
    ├── BadgeGroup.vue           # outer pill + inner badge (leading/trailing) + arrow icon
    │
    │   # === Tags ===
    ├── TagCloseX.vue            # x-close (sm/md/lg) — Gray/400→500 hover
    ├── TagCount.vue             # number count chip (sm/md/lg) bg Gray/100
    ├── TagCheckbox.vue          # mini checkbox 14/16/18 — bg Brand/600 checked
    ├── Tag.vue                  # label + optional checkbox/leading/x-close/count
    │
    │   # === Dropdown ===
    ├── DropdownListItem.vue     # item with label/shortcut/divider + leading slot
    ├── DropdownListHeader.vue   # avatar-group (name+email) หรือ header (title)
    ├── ScrollBar.vue            # visual Gray/200 thumb, p-4 track
    ├── InputDropdownMenuItem.vue# type default/icon/avatar/dot leading + selected check
    ├── DropdownMenu.vue         # white panel, border Gray/200, radius-8, shadow-uui-lg
    ├── InputDropdown.vue        # trigger input — default/icon/avatar/dot/search/tags
    │
    │   # === Input fields ===
    ├── MegaInputFieldBase.vue   # OTP single cell (sm 64 / md 80 / lg 96)
    ├── InputField.vue           # sm/md + leading/trailing slots + destructive/disabled + helpIcon
    ├── TextareaInputField.vue   # default + tags variant (tags slot)
    ├── VerificationCodeInputField.vue # 4/6 digits, sm/md/lg, auto-focus + paste
    │
    │   # === WYSIWYG ===
    ├── WysiwygEditorIcon.vue    # 9 types × light/dark × active — inline SVG currentColor
    ├── WysiwygToolbar.vue       # desktop/mobile breakpoint + font dropdown + icons row
    ├── WysiwygTooltip.vue       # dark Gray/900 popover w/ arrow (top/bottom × left/center/right)
    │
    │   # === Toggle / Checkbox ===
    ├── ToggleBase.vue           # sm 36×20 / md 44×24, brand-600 on, gray-100 off
    ├── Toggle.vue               # ToggleBase + label/supporting text
    ├── CheckboxBase.vue         # checkbox/radio × sm(16)/md(20) + indeterminate
    ├── CheckboxField.vue        # CheckboxBase + label/supporting (หลีกเลี่ยงชนกับ Checkbox.vue เดิม)
    ├── CheckboxGroupItem.vue    # card row w/ title/subtitle/supporting + input leading/trailing
    ├── CheckboxGroup.vue        # wrapper flex-col gap-12 + label/hint
    │
    │   # === Avatar ===
    ├── AvatarImage.vue          # 320×320 / 320×440 with name + source link
    ├── AvatarOnlineIndicator.vue# 6–16px, Success/500 online / Gray/300 offline
    ├── AvatarCompanyIcon.vue    # 10–20px rounded square company logo
    ├── VerifiedTick.vue         # 8-point badge + white check, 10–32px, color prop
    ├── AvatarAddButton.vue      # dashed plus button xs/sm/md
    ├── Avatar.vue               # xs–2xl + image/initials/placeholder + online/company/verified
    ├── AvatarGroup.vue          # overlapping stack + +N badge + add button
    └── Checkbox.vue             # (เดิม Breeze — ยังคงไว้)
```

## Design Tokens ที่ sync แล้ว (tailwind.config.js)

ทุกค่าดึงจาก Figma **PRO VARIABLES v7.0** ผ่าน `get_variable_defs`

### Colors (จริงจาก Figma)
- 30 สี × 13 shades (25–950): `brand`, `error`, `warning`, `success`, `gray` (9 variants: default + blue/cool/modern/neutral/iron/true/warm), `blue`, `blue-light`, `blue-dark`, `cyan`, `teal`, `green`, `green-light`, `moss`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`, `orange`, `orange-dark`, `yellow`
- ใช้ Tailwind key มาตรฐาน: `bg-brand-600`, `text-gray-900`, ฯลฯ

### Typography
- `fontFamily.sans = Inter`
- `fontSize`: `xs` (12/18), `sm` (14/20), `md` (16/24), `lg` (18/28), `xl` (20/30)
- Display: `display-xs` (24/32) → `display-2xl` (72/90) พร้อม letter-spacing
- **Utility classes** จาก custom plugin: `text-{size}-{weight}` (11 sizes × 4 weights = 44 utilities)
  - เช่น `text-md-semibold`, `text-display-xl-bold`

### Spacing (prefix `uui-`)
30 ค่า: `uui-0` (0) → `uui-480` (1920px) ตาม Figma scale เดิม (0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120, 160, 180, 192, 256, 320, 360, 400, 480)

### Border Radius (prefix `uui-`)
11 ค่า: `uui-none` (0), `xxs` (2), `xs` (4), `sm` (6), `md` (8), `lg` (10), `xl` (12), `2xl` (16), `3xl` (20), `4xl` (24), `full` (9999)

### Shadows (prefix `uui-`)
**6 ตัว** (xl ไม่มีใน Figma variable แต่การ์ดที่ label "shadow-xl" ใช้ค่าเดียวกับ 2xl — user เลือกให้ map xl=2xl):
- `shadow-uui-xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`

### Focus Rings
9 tokens: `shadow-uui-ring-brand`, `ring-gray`, `ring-gray-secondary`, `ring-error`, `ring-brand-shadow-xs/sm`, `ring-gray-shadow-xs/sm`, `ring-error-shadow-xs`

### Backdrop Blurs
4 ค่า: `backdrop-blur-uui-sm` (8), `md` (16), `lg` (24), `xl` (40) — Figma ไม่มี layer blur

### Grids / Breakpoints / Max-widths
- `screens.uui-mobile` (375), `uui-tablet` (768), `uui-desktop` (1280)
- `maxWidth.uui-container-mobile` (343), `-tablet` (704), `-desktop` (1216)
- `gridTemplateColumns.uui-2/3/5/6/12`

### Gradients
- Brand: 600→500, 700→600, 800→600 (45°/90°), 800→700, 900→600
- Gray: ชุดเดียวกัน
- Gray neutral Linear 01–07, Gray true Linear 01–07
- **หมายเหตุ**: `Gradient/Linear/Color/01–91` (91 ชุด) ยังไม่ได้ทำ — Figma variable API expose gradient value เป็น string ว่าง

## Component Details

### Button.vue
- **11 hierarchies**: primary, secondary-gray, secondary-color, tertiary-gray, tertiary-color, link-gray, link-color, destructive-primary, destructive-secondary, destructive-tertiary, destructive-link
- **5 sizes**: sm, md, lg, xl, 2xl (padding/gap/text ดึงจาก Figma จริง)
- Slots: `leading`, default, `trailing`
- รองรับ `disabled`, `type`

### FictionalCompanyLogo.vue
- **24 บริษัท**: Layers, Sisyphus, Capsule, Catalog, Quotient, Hourglass, Command+R, GlobalBank, Spherule, Lightbox, Luminous, FocalPoint, Alt+Shift, Polymath, Nietzsche, Epicurious, Boltshift, Acme Corp, Segment, CloudWatch, FeatherDev, Biosynthesis, Galileo, Interlock
- **Props**: `company`, `logotype` (bool), `white` (bool)
- ตำแหน่ง mark/type เก็บเป็น % inset data map ตาม Figma เป๊ะๆ
- **96 SVG files** ใน `public/logos/`

### SocialButton.vue + SocialButtonGroup.vue
- Socials: `google`, `facebook`, `apple`, `twitter` (X), `figma`, `dribbble`
- **ทำแค่ Brand theme** — Color/Gray theme สำหรับ non-Google ยังไม่ได้ดึง
- Group: 360px wide, Google+Facebook+Apple, `style=buttons/icons`

### MobileAppStoreBadge.vue
- **2 stores**: `google-play`, `app-store` (ลดจาก 5 ตามคำขอ user)
- **2 sizes**: md (40h), lg (44h)
- **3 styles**: `brand` (พื้นดำ), `black-outline` (พื้นขาว), `white-outline` (โปร่งใส)
- 12 variants รวม — fragments แยก light/dark tone

### ButtonGroup + ButtonGroupBase
- Base: min-h-40, border-r, 4 icon modes (none/leading/only/dot)
- Wrapper: border, rounded-uui-md, overflow-clip (ซ่อน border ขวาของ cell สุดท้าย)
- Dot ใช้ success-500

### BadgeCloseX.vue
- 12 สี × 2 types (square rounded-3 / rounded rounded-8) × 2 states = 48 variants
- ใช้ inline SVG + `currentColor` + Tailwind hover (ไม่ต้อง download SVG หลายไฟล์)

## Workflow ที่ใช้

1. User พูด "ต่อไป [component/token name]" → ผมถามให้เลือก frame ใน Figma desktop
2. User คลิกเลือก frame แล้วตอบ "ok"
3. ผม `get_variable_defs` หรือ `get_design_context` หรือ `get_metadata`
4. ถ้า frame ใหญ่ → ใช้ `get_metadata` หา node IDs ที่ต้องการก่อน แล้วค่อย `get_design_context` รายตัว
5. ถ้ามีหลาย variants → batch parallel 6–10 calls ต่อ turn เพื่อลด round trips
6. Download SVG assets จาก `http://localhost:3845/assets/{hash}.svg` ด้วย `curl`
7. เขียน Vue component → `npm run build` ตรวจ build

## Build Commands

```bash
export PATH="/opt/homebrew/bin:/Users/wannapong/.nvm/versions/node/v22.22.0/bin:$PATH"
cd /Users/wannapong/workspace/ccollege/ctc-ui

# Build assets
npm run build

# Dev
npm run dev
php artisan serve
```

## Components ที่ยังไม่ได้ทำ (รายการค้าง)

- **Gradient/Linear/Color/01–91** (91 สี) — Figma variable API ยัง expose ว่าง
- Components อื่นๆ ใน PRO STYLES (Modal, Table, Navigation, Slider, Date picker, File upload, ฯลฯ)
- แปลง 5 หน้า docs ของไฟล์แรก (Getting started page) เป็น Vue pages

## หมายเหตุความชน & ข้อตกลง naming

- `Checkbox.vue` ตัวเดิมจาก Breeze ถูกเก็บไว้ — ของ Untitled UI ใช้ชื่อ `CheckboxBase.vue` + `CheckboxField.vue` แทน
- หลาย component ใช้ `role="switch"` / `<label>` + hidden `<input>` ซ่อน เพื่อ a11y + keyboard
- Icon ส่วนใหญ่ฝัง inline SVG ใช้ `currentColor` ไม่โหลดจาก `localhost:3845` เพื่อให้ portable

## Memory File

User feedback persistent ที่:
`~/.claude/projects/-Users-wannapong-workspace-ccollege-ctc-ui/memory/feedback_figma_no_guessing.md`

เนื้อหา: ย้ำให้ดึง token จาก Figma MCP ทุกครั้ง ห้ามเดา
