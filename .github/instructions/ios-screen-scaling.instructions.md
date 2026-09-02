---
description: Prevent non-uniform scaling regressions in uni-app fixed 430x932 screens
applyTo: 'src/composables/useResponsiveCanvas.ts,src/pages/**/*.vue,src/components/**/*.vue'
---

## iOS/App Plus screen scaling

All fixed 430×932 Figma canvas screens must preserve aspect ratio in iOS, App Plus, and WeChat mini-program. For the current mini-program rollout, derive one uniform scale from viewport width with `viewportWidth / 430` (including values above 1 when the viewport is wider than the design), then compensate logical page height with `viewportHeight / scale` so the page fills the native viewport without vertical compression. Keep the logical canvas at 430px wide and never use `scaleX`, `scaleY`, or independent axis transforms. Expose `--mobile-scale` and `--mobile-height`. Fixed screens such as Profile must use a non-scrollable `<view>` with `overflow: hidden`; do not wrap them in `scroll-view`.

After every UI or platform change, regenerate and inspect all three targets rather than validating only the requested preview:

- H5: run `npm run build:h5` and inspect a representative mobile viewport for blank margins, overflow, and navigation failures.
- WeChat mini-program: run `npm run build:mp-weixin` and confirm the embedded page host includes every newly added route/component.
- iOS/App Plus: run `npx uni build -p app-plus` and inspect compilation output for platform-specific template, asset, or CSS failures.

Report which target failed and the concrete cause. A successful H5 build alone is not sufficient validation.
