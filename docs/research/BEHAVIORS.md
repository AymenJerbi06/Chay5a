# Atalanta NYC — Behavior Bible

## Nav
- Position: fixed, z-index 15, height 103px, padding 25px 40px 10px
- Initial state: background transparent (rgba(221,221,221,0))
- Scrolled state (>60px): background white rgb(255,255,255)
- Transition: background ~0.3s ease
- Center link box: bg rgb(26,26,26) DARK, border 2px solid rgb(26,26,26), padding 12px 20px 7px, flex
- Link text: NimbusSanL Bol (→ Barlow 700), 20px, UPPERCASE, color rgb(244,241,225) CREAM, padding 0px 5px
- Dropdown items: padding 10px 20px, color rgb(34,34,34)
- DONATE/FOLLOW button: outlined box on right, bg transparent initially → outlined dark border

## Hero
- Full viewport height (~828px at 1440px)
- Background: url('/atalanta-assets/hero-bg.jpg') center/cover no-repeat (downloaded blurred gradient photo)
- H1: "Welcome to Atalanta NYC." — NimbusSanL Black (→ Barlow 900), 55px, letter-spacing -1px, line-height 52px, color rgb(26,26,26), SENTENCE CASE (NOT uppercase)
- Handwriting image: 576×372 PNG centered below H1 — text "We educate and inspire female athletes to use running and movement in a healthy and lasting way." (Habanera Extras 3D font rendered as PNG)  
- Down arrow: PNG, 62×103px, centered, sits below handwriting
- Social icons: 40×40 background-image icons (Twitter, Instagram, Strava, LinkedIn), row centered below arrow

## Mission
- Background: url('/atalanta-assets/mission-bg.jpg') center/cover (warm amber/orange textured photo bg)
- Padding: 60px 40px
- H2: 42px, Barlow 900, color cream rgb(244,241,225), sentence case
- Body: 26px, Barlow 400, color cream, centered
- Layout: centered, flex column

## Split screens (3 sections)
- display: flex (or CSS columns), 50/50 width
- Photo side: full-height photograph, object-fit cover
- Text side: uses feel-good bg class (blurred gradient from same hero-bg.jpg) OR solid color
- Text: H2 42px Barlow 900 cream, body 26px Barlow 400, CTA button
- Alternating: photo-left text-right → text-left photo-right → photo-left text-right

## Color stripes (between sections)
- 4 stripes at bottom: blue rgb(52,77,142), red rgb(185,76,57), orange rgb(191,96,64), yellow/amber rgb(211,144,72)
- Height: ~20px each (thin decorative bars)
- Width: 100% viewport

## Scroll animations (Webflow defaults)
- Elements fade + translateY on viewport entry
- No heavy libraries (no Lenis detected)
- Standard IntersectionObserver pattern

## Responsive
- At ≤768px: nav links box hidden, split screens stack, stripes stay
