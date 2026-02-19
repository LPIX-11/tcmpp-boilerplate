# Styling Guide

## Global Styles (`app.wxss`)

The boilerplate includes a Bootstrap-derived utility CSS framework loaded globally. All pages and components (with `apply-shared` or `shared` isolation) can use these classes.

## CSS Variables

Defined on `:root` in `app.wxss`:

### Colors
| Variable | Value | Usage |
|----------|-------|-------|
| `--bs-primary` | `#085EBD` | Primary brand color |
| `--bs-secondary` | `#F16E00` | Secondary/accent color |
| `--bs-success` | `#198754` | Success states |
| `--bs-info` | `#0077EA` | Informational |
| `--bs-warning` | `#ffc107` | Warning states |
| `--bs-danger` | `#dc3545` | Error/danger states |
| `--bs-light` | `#E1E1E1` | Light backgrounds |
| `--bs-dark` | `#000` | Dark text/backgrounds |

### Typography
| Variable | Value |
|----------|-------|
| `--bs-font-sans-serif` | `'Panchang', -apple-system, ...` |
| `--bs-font-monospace` | `Helvetica Neue LT Std, SFMono-Regular, ...` |

Custom font `Panchang` is loaded from `assets/fonts/`.

## Utility Classes

### Display
| Class | CSS |
|-------|-----|
| `d-flex` | `display: flex` |
| `d-block` | `display: block` |
| `d-none` | `display: none` |

### Flexbox
| Class | CSS |
|-------|-----|
| `flex-column` | `flex-direction: column` |
| `flex-row` | `flex-direction: row` |
| `align-items-center` | `align-items: center` |
| `justify-content-between` | `justify-content: space-between` |
| `justify-content-center` | `justify-content: center` |

### Spacing
Scale: 1 = `0.25rem`, 2 = `0.5rem`, 3 = `1rem`, 4 = `1.5rem`, 5 = `3rem`

| Pattern | Example | CSS |
|---------|---------|-----|
| `p-{n}` | `p-3` | `padding: 1rem` |
| `m-{n}` | `m-2` | `margin: 0.5rem` |
| `gap-{n}` | `gap-2` | `gap: 0.5rem` |

### Width
| Class | CSS |
|-------|-----|
| `w-100` | `width: 100%` |
| `w-50` | `width: 50%` |

### Border
| Class | CSS |
|-------|-----|
| `border` | `border: 1px solid #dee2e6` |
| `br-10` | `border-radius: 10px` |

### Text
| Class | CSS |
|-------|-----|
| `text-center` | `text-align: center` |
| `text-start` | `text-align: left` |
| `text-end` | `text-align: right` |

## rpx Units

`rpx` (responsive pixel) scales with screen width. **750rpx = screen width** on any device.

| Device | Screen Width | 1rpx = |
|--------|-------------|--------|
| iPhone SE | 320pt | 0.427px |
| iPhone 6/7/8 | 375pt | 0.5px |
| iPhone 12/13 | 390pt | 0.52px |
| iPhone 14 Pro Max | 430pt | 0.573px |

**When to use what:**
- `rpx` — Layout dimensions, spacing, font sizes
- `px` — Borders, shadows, fine details (1px lines)
- `%` — Fluid widths relative to parent

## Component Styling Patterns

### Accessing Global Utilities in Components

```css
/* In component's index.wxss */
@import '/app.wxss';

/* Now d-flex, p-3, etc. are available */
.osn-button { /* component styles */ }
```

### BEM-like Naming

Components use `osn-` prefix with BEM-inspired naming:

```css
.osn-button { }
.osn-button__text { }
.osn-button--primary { }
.osn-button--disabled { }
```

### Status Classes (from WXS filters)

```css
.status--success { color: #198754; }
.status--warning { color: #ffc107; }
.status--danger  { color: #dc3545; }
.status--muted   { color: #6c757d; }
.status--default { color: #333; }
```

## See Also

- [Components Overview](08-components-overview.md) — Component catalog
- [WXS Filters](10-wxs-filters.md) — Dynamic CSS class generation via `statusClass()`
- [Mini-Program Concepts](01-mini-program-concepts.md) — rpx explanation
