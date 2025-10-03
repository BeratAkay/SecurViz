# Power BI-Style Analytics Dashboard Design Guidelines

## Design Approach: Power BI-Inspired System

**Selected Approach**: Reference-based design inspired by Microsoft Power BI with modern dashboard best practices

**Key Design Principles**:
- Data-first hierarchy: Visualizations take center stage
- Professional restraint: Minimal decoration, maximum clarity
- Efficient information density: Strategic use of space for readability
- Consistent visual language across all three sections (SIEM, SOAR, Bizzy)

## Core Design Elements

### A. Color Palette

**Dark Mode Primary** (Default):
- Background: 220 20% 12% (Deep charcoal)
- Surface/Cards: 220 18% 16% (Elevated charcoal)
- Border/Dividers: 220 15% 22% (Subtle separators)
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 65%

**Light Mode** (Alternative):
- Background: 0 0% 98%
- Surface/Cards: 0 0% 100%
- Border/Dividers: 220 10% 90%
- Text Primary: 220 20% 15%
- Text Secondary: 220 10% 45%

**Data Visualization Colors** (Works in both themes):
- Primary Chart: 220 90% 56% (Professional blue)
- Success/Safe: 142 76% 36% (Green for safe metrics)
- Warning: 38 92% 50% (Amber for medium severity)
- Critical: 0 72% 51% (Red for high severity)
- Info/Secondary: 199 89% 48% (Cyan for indicators)
- Accent: 271 76% 53% (Purple for special metrics)

**Severity-Specific Colors** (for SOAR incidents):
- Low: 142 50% 45%
- Medium: 38 90% 50%
- High: 25 85% 55%
- Critical: 0 70% 50%

### B. Typography

**Font Stack**: 
- Primary: 'Inter', system-ui, -apple-system, sans-serif
- Monospace (for metrics): 'JetBrains Mono', 'Courier New', monospace

**Type Scale**:
- Dashboard Title: text-2xl md:text-3xl font-semibold (section headers)
- Card Headers: text-base md:text-lg font-medium
- Metric Values: text-3xl md:text-4xl font-bold (large numbers)
- Chart Labels: text-xs md:text-sm font-medium
- Body Text: text-sm
- Captions: text-xs text-muted

### C. Layout System

**Container Strategy**:
- Main Dashboard: max-w-[1920px] mx-auto (wide dashboards)
- Section Padding: px-4 md:px-6 lg:px-8
- Vertical Rhythm: py-4 md:py-6 between major sections

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8
- Card Padding: p-4 md:p-6
- Gap Between Cards: gap-4 md:gap-6
- Section Margins: mb-6 md:mb-8
- Chart Container: p-4 with explicit heights

**Grid Layouts**:
- SIEM Section: 2x2 or 2x3 grid (grid-cols-1 lg:grid-cols-2)
- SOAR Section: 2x2 fixed grid for 4 charts (grid-cols-1 md:grid-cols-2)
- Bizzy Section: Flexible grid based on data count
- Responsive: Single column mobile, 2-column tablet, 2-4 column desktop

### D. Component Library

**Navigation**:
- Top Bar: Fixed header with app branding, section tabs, theme toggle, user profile
- Section Tabs: Horizontal tabs (SIEM | SOAR | Bizzy) with active state indicator
- Tab Style: Minimal underline on active, hover state with subtle background

**Card Components**:
- Chart Cards: Rounded corners (rounded-lg), subtle shadow, header with title and optional filters
- Card Header: Flex layout with title on left, action icons (refresh, expand, export) on right
- Card Body: Minimum height h-64 md:h-80 for consistency
- Loading State: Skeleton with shimmer effect for data loading

**Chart Types for Each Section**:

SIEM Charts:
- Event Timeline: Line/Area chart showing security events over time
- Threat Distribution: Donut/Pie chart for threat categories
- Alert Severity: Stacked bar chart for severity levels
- Top Sources: Horizontal bar chart for IP/source rankings

SOAR Charts (4 specific charts from API):
1. Active Incidents by Severity: Vertical bar chart (grouped by severity)
2. Closed Incidents by Type: Horizontal bar chart
3. Incident Types by Severity: Stacked/grouped bar chart (2-level grouping)
4. Active Indicators by Verdict: Donut/Pie chart with legend

Bizzy Charts:
- Performance Metrics: KPI cards with trend indicators
- Activity Feed: Timeline or list view with timestamps
- Distribution Charts: Mix of bar/pie based on data type

**Data Display Elements**:
- KPI Cards: Large number with label, small trend indicator (+/- with arrow)
- Data Tables: Sticky header, zebra striping, sortable columns
- Tooltips: Dark background with white text, positioned smartly near cursor
- Legends: Horizontal below charts, interactive (click to toggle series)

**Interactive Elements**:
- Filter Dropdowns: Subtle border, rounded corners, positioned in card headers
- Date Range Picker: Compact design in top bar or card header
- Refresh Button: Icon-only, subtle hover state
- Export/Download: Icon button with dropdown (CSV, PNG, PDF options)

### E. Chart Specifications

**Chart Configuration**:
- Grid Lines: Subtle (opacity-20), horizontal only for bar/line charts
- Axes: Clean labels, no heavy borders
- Colors: Use defined palette, ensure contrast in both themes
- Responsive: Maintain aspect ratio, adjust font sizes
- Padding: Chart padding of 16-24px within card

**Bar Charts**:
- Border Radius: 4px on top corners
- Bar Width: 60-80% of available space
- Spacing: 8-12px between bars

**Pie/Donut Charts**:
- Inner Radius (Donut): 60% for readability
- Label Position: Outside with connecting lines
- Hover Effect: Slight enlargement (5%) of segment

**Line Charts**:
- Line Thickness: 2-3px
- Point Markers: 4-6px radius, visible on hover
- Fill: Subtle gradient (10-20% opacity) below line

### F. Animations

**Minimal, Purposeful Animations**:
- Chart Data Load: Smooth fade-in (300ms) when data appears
- Tab Switch: Quick slide transition (200ms) between sections
- Card Hover: Subtle lift (shadow increase) on interactive cards
- Number Counters: Animated count-up for KPI values (1000ms)
- NO auto-rotating carousels or distracting effects

## Dashboard-Specific Patterns

**Top Bar Structure**:
- Left: Logo + Dashboard title "Security Operations Dashboard"
- Center: Section navigation tabs (SIEM | SOAR | Bizzy)
- Right: Date range selector, refresh all, theme toggle, user menu

**Section Layout**:
- Section Header: Title + brief description + global filters for that section
- Main Grid: Responsive chart cards in defined grid pattern
- Each section maintains visual consistency while allowing unique chart types

**Responsive Behavior**:
- Desktop (lg): Full multi-column layout, all charts visible
- Tablet (md): 2-column layout, comfortable chart sizes
- Mobile: Single column, charts stack vertically, maintain readability

**Data Loading States**:
- Initial Load: Skeleton screens matching chart card structure
- Refresh: Subtle spinner in card header, chart dims slightly
- Error State: Red border on card, error icon + retry button

**Key Differentiators from Generic Dashboards**:
- Professional color restraint (no rainbow charts)
- Consistent card elevation and spacing
- Clear visual hierarchy: sections → cards → charts → data
- Data-focused: minimal chrome, maximum information density
- Power BI aesthetic: clean, modern, business-professional