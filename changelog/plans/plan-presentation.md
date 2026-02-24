# Plan: Refactor Presentation API Data

## Overview
Refactor API response structure to align with server terminology:
- `activities` → `games`
- `id` → `presentation_id`
- Add `lang_name` field (remove need for `Intl` lookup)
- Restructure `getPresentation` with sessions-based organization

---

## Current Endpoints (mock data)
```
bs/dev/.ws-responses/
├── getActivities.json          # → deprecated, use getGames
├── getGamesPresentation.json   # → deprecated, use getGames
├── getMusic.json
├── getPresentation.json        # → change structure
├── getPresentationConfig.json  # → new (from listPresentation)
├── listPresentation.json      # → change structure
├── listSounds.json
├── initSlide.json
├── nextSlide.json
├── prevSlide.json
├── server.getLang.json
├── setConnections.json
├── setScore.json
├── stateSlide.json
├── toggleActivity.json
├── toggleMusic.json
└── updateNotes.json
```

---

## Implementation Steps

### Step 1: Update Type Definitions
**Files to modify:**
- `src/types/` - Add/update types for new response structures

**New/Updated Types:**
```typescript
// PresentationListItem (replaces current)
interface PresentationListItem {
  changelog: string;
  lang: string;
  lang_name: string;
  last_update_at: string;
  name: string;
  presentation_id: string;  // was: id
  version: string;
}

// PresentationConfig (new - combines listPresentation + base_url)
interface PresentationConfig extends PresentationListItem {
  base_url: string;
}

// Session (new structure)
interface Session {
  from: string;
  to: string;
  title: string;
  games: string[];
}

// Presentation (restructured)
interface Presentation {
  day: number;
  sessions: Record<string, Session>;
}

// Activity type (unchanged - frontend keeps activity terminology)
// Only the API call changes: getActivities → getGames
interface Activity {
  id: string;
  title: string;
  done: boolean;
  isNew: boolean;
}

// PresentationListResponse (for listPresentation API)
interface PresentationListResponse extends PresentationListItem {}
```

### Step 2: Update Mock Data Files
**Files to modify:**
- `bs/dev/.ws-responses/listPresentation.json` - Add `lang_name`, rename `id` → `presentation_id`
- `bs/dev/.ws-responses/getPresentation.json` - Restructure with sessions
- `bs/dev/.ws-responses/getGames.json` - New file (merge getActivities + getGamesPresentation)
- Create `bs/dev/.ws-responses/getPresentationConfig.json`

### Step 3: Update API Service Layer
> **Note:** Only WebSocket API calls use "game" endpoint. Internal frontend code keeps "activity" terminology.

**Files to modify:**
- `src/api/` - Update WebSocket message handlers (check for `useEmit` definitions)

**Changes:**
| Handler | Change |
|---------|--------|
| `getActivities` | Keep handler name, change WS message to `getGames` (API endpoint), response maps to `Activity[]` |
| `listPresentation` | Update response mapping: `id` → `presentation_id`, `language` → `lang`, add `lang_name` |
| `getPresentation` | Update response mapping to sessions structure |
| New: `getPresentationConfig` | Add handler for single presentation config with `base_url` |

### Step 4: Update Components & Hooks
> **Note:** Frontend keeps internal "activity/activities" terminology. Only the WebSocket API communication uses "game" endpoint naming.

#### Hooks

| File | Changes |
|------|---------|
| `src/app/app-$ip/app-$presentationId/core/useActivities.ts` | Change API call from `getActivities` → `getGames` (WS message), keep internal name `useActivities` |
| Create `src/app/app-$ip/app-$presentationId/core/usePresentationConfig.ts` | New hook for fetching `getPresentationConfig` with `base_url` |

#### Pages

| File | Changes |
|------|---------|
| `src/app/app-$ip/app-index.tsx` (lines 49-56) | Change destructured fields: `id` → `presentation_id`, `language` → `lang`, remove `langName.of()` Intl lookup, use `lang_name` directly |

```typescript
// Old (line 49)
response.map(({ id, name, version, language }) => (
  <Li key={id}>
    <strong>{name}</strong>
    <span>{langName.of(language)}</span>  // Remove Intl lookup
// New
response.map(({ presentation_id, name, version, lang_name }) => (
  <Li key={presentation_id}>
    <strong>{name}</strong>
    <span>{lang_name}</span>  // Direct from API
```

#### Components

| File | Changes |
|------|---------|
| `src/app/app-$ip/app-$presentationId/components/additional/Activities.tsx` | Keep file/component name "Activities", update API call uses `getGames` internally |
| `src/app/app-$ip/app-$presentationId/components/SlidePreview.tsx` | Use `base_url` from presentation config to construct slide URLs |

#### New Files to Create

```
src/app/app-$ip/app-$presentationId/core/
├── usePresentationConfig.ts  # new - fetches getPresentationConfig
├── useSession.ts        # new - session detection, maps game IDs via useActivities
```

#### Documentation

Add comment in `src/app/app-$ip/app-$presentationId/core/index.ts`:
```typescript
// Note: Frontend uses "activity/activities" terminology internally.
// Only WebSocket API communication uses "game" endpoint (getGames).
export * from "./useActivities";
export * from "./usePresentationConfig";
export * from "./useSession";
```

### Step 5: Update Translation Keys (if needed)
**Files to modify:**
- `src/translations/*.json` - Add any new keys

---

## Detailed API Changes

### `listPresentation`
// Old
```json
[{ "id": "1", "lang": "en", "name": "..." }]
```
// New
```json
[{
  "changelog": "#### Update 1.0.4\r\n* Updated films",
  "lang": "en",
  "lang_name": "English",
  "last_update_at": "2024-10-03T15:48:17+02:00",
  "name": "CIS Foundation - Day 1",
  "presentation_id": "1",
  "base_url": "http://localhost:3029/slide",
  "version": "1.0.4"
}]
```
- Uses `lang_name` instead of `lang` + `Intl`
- Uses `presentation_id` instead of `id`
- Adds `changelog`, `last_update_at`, `version`

#### `getPresentationConfig`
one presentation, same structure as `listPresentation`, but

- Adds `base_url` for slide url

### `getPresentation` (restructured)
```json
{
  "day": 1,
  "sessions": {
    "1": { "from": "0", "to": "18", "title": "Session 1", "games": [] },
    "2": { "from": "19", "to": "58", "title": "Session 2", "games": ["1", "2"] },
    "3": { "from": "59", "to": "85", "title": "Session 3", "games": ["3", "2"] }
  }
}
```
- Sessions organized by ID (numeric strings)
- `games` array contains **game IDs** active in that session (not full objects!)
- Slide-to-session mapping via `from`/`to` ranges
- **FE must call `getGames` (useActivities) to map IDs → full Activity objects**

### `getGames` (replaces `getActivities` + `getGamesPresentation`)
Lists all games for the presentation. API terminology: activities = games.

---

## Testing Checklist

- [x] Verify `listPresentation` shows all presentations with correct fields
- [x] Verify `getPresentationConfig` includes `base_url`
- [x] Verify `getPresentation` loads with session structure
- [x] Verify `getPresentation` `games` IDs are mapped via `getGames` call
- [x] Verify games display correctly based on current slide
- [x] Verify session detection works for current slide number
- [x] Verify `lang_name` displays correctly (no Intl fallback needed)
- [x] Run lint: `bs/dev/lint.js`
- [x] Format code: `bs/dev/biome.js Formatting --fix`

---

## Rollback Plan

If issues occur:
1. Revert mock data files to previous structure
2. Revert type definitions
3. Revert component changes
4. Test thoroughly before deploying
