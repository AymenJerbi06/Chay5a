# Hero Specification

## Overview
- Target: inline in page.tsx Hero component
- Interaction: static (elements load in, no scroll-driven changes within hero)

## Exact values

### Section container (.page-header.home)
- min-height: 100vh (~828px at 1440)
- background-image: url('/atalanta-assets/hero-bg.jpg') center/cover no-repeat
- display: flex, flex-direction: column, align-items: center, justify-content: center
- padding-top: var(--nav-h) [103px]
- text-align: center

### H1 (.h1.home)
- font-family: "Urw type foundry nimbussanl bla" → Barlow 900
- font-size: 55px
- font-weight: 700 (Barlow 900 maps to this visually)
- letter-spacing: -1px  ← TIGHT, not wide
- line-height: 52px  ← SLIGHTLY SMALLER than font-size
- color: rgb(26, 26, 26)  ← dark on light blurred gradient bg
- text-transform: NONE  ← sentence case "Welcome to Atalanta NYC."
- margin-bottom: 20px

### Handwriting image (.image-20)
- src: '/atalanta-assets/hero-handwriting.png'
- natural size: 576×372
- display: block, margin: 0 auto
- max-width: 576px, width: 80vw
- NOTE: for chi5a, render Caveat font text instead — the PNG text is Atalanta-specific

### Down arrow (.arrow-hero-image)
- src: '/atalanta-assets/down-arrow.png'
- natural size: 62×103
- display: block, margin: 32px auto
- animation: bounce up-down

### Social icons (.social-media-block)
- 4 icons, 40×40 each
- displayed as background-image PNGs
- For chi5a: use text labels (FB IG YT MSG) in 40×40 dark-bordered boxes

## Chi5a adaptation
H1: "Welcome to Ustadha Afef Djmal."
Handwriting text (Caveat, 60px): "We spread the light of the Qurʼan through mercy, love, and an unbroken chain."
Arrow: use down-arrow.png downloaded asset
Social row: FB IG YT MSG text boxes (40×40, border 2px solid #1a1a1a)
