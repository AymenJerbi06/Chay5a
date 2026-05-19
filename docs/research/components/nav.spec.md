# Nav Specification

## Overview
- Target: `src/components/Nav.tsx`
- Interaction: scroll-driven (transparent → white bg at 60px scroll)

## Exact computed values (from getComputedStyle on atalantanyc.org)

### Outer navbar container (.navbar.w-nav)
- position: fixed
- top: 0, left: 0, right: 0
- height: 103px
- padding: 25px 40px 10px
- background: transparent initially, rgb(255,255,255) when scrolled
- z-index: 15
- display: flex, align-items: center, justify-content: space-between

### Center link box (nav[role=navigation].nav-link.box.outline)
- background: rgb(26, 26, 26)  ← DARK, not white
- border: 2px solid rgb(26, 26, 26)
- padding: 12px 20px 7px
- display: flex
- align-items: center

### Nav link items (div.nav-link / a inside the box)
- font-family: "Nimbussanl bol" → Barlow weight 700
- font-size: 20px
- text-transform: uppercase
- color: rgb(244, 241, 225)  ← CREAM
- padding: 0px 5px (outer), 10px 20px (dropdown items)
- letter-spacing: normal

### FOLLOW/DONATE button (right side)
- font-family: Barlow 700
- font-size: 20px
- text-transform: uppercase
- color: rgb(34, 34, 34)
- background: transparent OR cream outlined box
- border: 2px solid rgb(26,26,26)
- padding: 12px 20px 7px

## Scroll behavior
- Trigger: window.scrollY > 60
- State A (scrolled=false): nav background transparent
- State B (scrolled=true): nav background rgb(255,255,255)
- Transition: background 0.3s ease

## Chi5a adaptation
- Logo: Arabic line "الأستاذة المقرئة" (Caveat font, cream/gold) + "AFEF DJMAL" (Barlow 900 uppercase)
- Links: About · Teachings · Videos · Contact
- CTA: "Follow" button
- Link box bg stays dark (rgb(26,26,26)) — this is THE signature element
- Logo color: cream on transparent nav, dark on scrolled white nav
