# Motion for React integration

Authored integration guidance, checked against public official documentation on 2026-10-07. Read the sections relevant to the task. This supplements the pinned motion principles; the upstream snapshots remain unchanged.

## Choose the implementation

Inspect the target repository's framework, dependency versions, package manager, and existing animation conventions. CSS handles straightforward hover, focus, and color transitions. Consider Motion when coordinated exits, interruptible state transitions, shared layout, or gestures justify a library. Establish that need before adding a dependency.

For a new integration, the current package is `motion`, with React components and hooks imported from `motion/react`. The documented minimum is React 18.2; verify compatibility with the target's installed versions. Existing `framer-motion` projects can retain their package and imports unless migration is part of the task. Avoid installing both to solve the same interaction. Use the project's package manager and lockfile. [Installation](https://motion.dev/docs/react-installation), [upgrade guidance](https://motion.dev/docs/react-upgrade-guide).

```tsx
import { AnimatePresence, motion, MotionConfig } from "motion/react"
```

Apply framework boundaries only where required. Vite needs no special Motion configuration. In a server-component framework, check the documented client boundary and import options before using hooks. Do not add a client directive to every React project. [Framework setup](https://motion.dev/docs/react-installation).

## State changes and exits

Use declarative targets or variants for meaningful states. Choose transitions from the interaction's purpose and frequency; avoid importing a universal spring preset. A conditional element needs a mounted `AnimatePresence` boundary to finish its `exit` animation. Give its immediate children stable, unique keys representing identity, rather than random values or mutable list positions.

Default `mode="sync"` permits simultaneous entry and exit. Use `mode="wait"` only for a sequential replacement with one child at a time. Use `mode="popLayout"` when an exiting item should release its layout space immediately. A custom direct child must expose the DOM ref required by the installed Motion API; the official recipe uses `forwardRef`.

Keep focus management, Escape handling, semantics, and dialog behavior with the accessible UI primitive. An exiting panel must not leave hidden controls focusable or delay focus restoration. Handle rapid reversals and unmounts without stale callbacks. [AnimatePresence](https://motion.dev/docs/react-animate-presence).

## Layout and shared elements

Use `layout` for meaningful changes to an element's size or position and `layoutId` for shared-element transitions. Scope repeated shared identifiers with `LayoutGroup` where independent widgets could collide. Group components whose layout changes need coordination even when they render separately.

Presence and shared layout can work together; do not apply the older cookbook's placement rule as a universal ban on `layoutId` inside `AnimatePresence`. Check transformed parents, scrolling containers, text distortion, and surrounding reflow in the actual component. [Layout animations](https://motion.dev/docs/react-layout-animations), [LayoutGroup](https://motion.dev/docs/react-layout-group).

## Reduced motion and usable content

Set `reducedMotion="user"` on the relevant `MotionConfig` boundary. Its documented default is `"never"`. The user policy disables transform and layout animations, while opacity and color animations can continue; it does not disable all motion automatically. [MotionConfig](https://motion.dev/docs/react-motion-config).

Use `useReducedMotion` when behavior must also change, such as removing parallax or disabling background video autoplay. Provide immediate or restrained state feedback and keep essential content visible and readable during loading or hydration. Respect the same preference in CSS animations and other libraries. [useReducedMotion](https://motion.dev/docs/react-use-reduced-motion).

## Performance and verification

Use motion values for continuously updated animated values instead of React state on every frame. Clean up manual subscriptions or imperative animation controls when their owner unmounts. Measure costly filters, paint, and layout work on representative devices. [Motion values](https://motion.dev/docs/react-motion-value).

Consider `LazyMotion` when bundle measurements justify it. Use lightweight components from `motion/react-m` with an appropriate feature bundle: `domAnimation` covers basic animations and supported gestures; `domMax` also includes layout and drag. Mixing full `motion` components into that subtree defeats the intended saving; `strict` can catch this. Measure the resulting build rather than promising a fixed byte saving. [LazyMotion](https://motion.dev/docs/react-lazy-motion), [bundle guidance](https://motion.dev/docs/react-reduce-bundle-size).

Verify initial rendering, entry/exit, rapid toggles, interrupted transitions, navigation cleanup, touch, keyboard focus, reduced motion, and relevant responsive states. Run the target's existing validation commands and inspect rendered behavior. Report which checks actually ran and any remaining gaps.
