# Graph Report - Aphone  (2026-11-06)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 104 nodes · 133 edges · 11 communities (10 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- package.json
- expo
- ThemeContext.tsx
- _layout.tsx
- adaptiveIcon
- expo
- tsconfig.json
- index.tsx
- devDependencies
- scripts

## God Nodes (most connected - your core abstractions)
1. `expo` - 13 edges
2. `ThemeConfig` - 5 edges
3. `adaptiveIcon` - 5 edges
4. `scripts` - 5 edges
5. `react` - 4 edges
6. `android` - 4 edges
7. `expo` - 4 edges
8. `react-native` - 4 edges
9. `ThemeProvider()` - 3 edges
10. `useTheme()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `ThemeContextValue` --references--> `ThemeConfig`  [EXTRACTED]
  src/theme/ThemeContext.tsx → src/theme/types.ts
- `RootLayout()` --calls--> `ThemeProvider()`  [EXTRACTED]
  src/app/_layout.tsx → src/theme/ThemeContext.tsx
- `HomeScreen()` --calls--> `useTheme()`  [EXTRACTED]
  src/app/index.tsx → src/theme/ThemeContext.tsx

## Import Cycles
- None detected.

## Communities (11 total, 1 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.12
Nodes (23): dependencies, expo-build-properties@~58.0.12, expo-constants@~58.0.14, expo-dev-client@~58.0.18, expo-linking@~58.0.15, expo-status-bar@~58.0.4, react-dom@19.3.0, @react-native-async-storage/async-storage@2.2.0 (+15 more)

### Community 1 - "expo"
Cohesion: 0.12
Nodes (16): typedRoutes, expo, experiments, icon, ios, name, orientation, plugins (+8 more)

### Community 2 - "ThemeContext.tsx"
Cohesion: 0.21
Nodes (10): defaultTheme, ProfileId, profiles, ThemeContext, ThemeContextValue, AnimationLevel, ColorScheme, FontSize (+2 more)

### Community 3 - "_layout.tsx"
Cohesion: 0.25
Nodes (8): expo-router@~58.0.29, react@19.3.0, react-native-safe-area-context@~5.10.1, expo-router, react, react-native-safe-area-context, RootLayout(), ThemeProvider()

### Community 4 - "adaptiveIcon"
Cohesion: 0.25
Nodes (8): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, android

### Community 5 - "expo"
Cohesion: 0.25
Nodes (4): expo@~58.0.22, { withAndroidManifest }, { withProjectBuildGradle }, expo

### Community 6 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, paths, strict, extends, include

### Community 7 - "index.tsx"
Cohesion: 0.40
Nodes (5): react-native@0.88.1, react-native, HomeScreen(), styles, useTheme()

### Community 8 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, @types/react@~19.3.0, typescript@~6.0.3, @types/react, typescript

### Community 9 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, android, ios, start, web

## Knowledge Gaps
- **1 isolated node(s):** `expo/tsconfig.base`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 45 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `package.json` to `_layout.tsx`, `expo`, `index.tsx`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base` to the rest of the system?**
  _1 weakly-connected nodes found - possible missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11594202898550725 - nodes in this community are weakly interconnected._
- **Why does `expo` connect `expo` to `package.json`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Should `expo` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `react` connect `_layout.tsx` to `package.json`, `ThemeContext.tsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._