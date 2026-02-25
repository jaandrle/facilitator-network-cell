# Facilitator Presentation Screen - Implementation Plan

## 1️⃣ Overview

A **Facilitator Presentation / Training Control Panel** - a presentation runtime interface (not a form screen) featuring:

- Active slide preview (video/image)
- Next slide preview
- Slide navigation controls (prev/next buttons)
- Timer control (start/stop toggle)
- Activities panel (tabs + checkboxes)
- Notes panel (textarea with autosave)
- Music toggle
- Slide progress indicators

---

## 2️⃣ File Structure

```
src/
├── api/types/endpoints.ts              # ✅ Added WebSocket API endpoints
├── hooks/
│   ├── usePresentation.ts              # ✅ Presentation state & navigation
│   └── useTimer.ts                    # ✅ Timer logic (start/stop/reset)
├── types/presentation.ts              # ✅ TypeScript interfaces
├── app/app-$ip/app-$presentationId/
│   ├── app-index.tsx                  # ✅ Main page (route component)
│   ├── index.css.ts                   # ✅ Grid layout styles
│   └── components/
│       ├── ActivitiesPanel.tsx        # ✅ Tabbed panel (Activities | Music)
│       └── NotesPanel.tsx            # ✅ Textarea with debounced autosave
└── translations/
    ├── en.json                        # ✅ Added translation keys
    └── cs.json                       # ✅ Added translation keys
```

---

## 3️⃣ TypeScript Interfaces

```typescript
// src/types/presentation.ts

interface Presentation {
  id: string;
  title: string;
  slides: Slide[];
}

interface Slide {
  id: string;
  index: number;
  total: number;
  type: "video" | "image" | "content";
  mediaUrl?: string;
  activities: Activity[];
  notes: string;
  music: Music[];
}

interface Activity {
  id: string;
  title: string;
  done: boolean;
  isNew: boolean;
}

interface Music {
  id: string;
  title: string;
  active: boolean;
}

interface TimerState {
  isRunning: boolean;
  elapsedSeconds: number;
}
```

---

## 4️⃣ API Endpoints

Added to `src/api/types/endpoints.ts`:

```typescript
getPresentation: {
  request: { presentationId: string };
  response: Presentation;
};

nextSlide: {
  request: { presentationId: string };
  response: Slide;
};

prevSlide: {
  request: { presentationId: string };
  response: Slide;
};

toggleActivity: {
  request: { activityId: string; done: boolean };
  response: { success: boolean };
};

toggleMusic: {
  request: { musicId: string; active: boolean };
  response: { success: boolean };
};

updateNotes: {
  request: { slideId: string; notes: string };
  response: { success: boolean };
};
```

---

## 5️⃣ Custom Hooks

### usePresentation.ts
- Load presentation on mount (from route params: `$ip`, `$presentationId`)
- Manage `currentSlideIndex` state
- `goToNextSlide()` / `goToPrevSlide()` methods
- Activity/music toggle handlers
- Notes update handler
- Return: `{ presentation, currentSlide, currentIndex, isFirst, isLast, nextSlide, goToNextSlide, goToPrevSlide, toggleActivity, toggleMusic, updateNotes, ... }`

### useTimer.ts
- `isRunning`, `elapsedSeconds` state
- `start()`, `stop()`, `reset()`, `toggle()` methods
- `formattedTime` (MM:SS)
- Return: `{ isRunning, elapsedSeconds, formattedTime, start, stop, reset, toggle }`

---

## 6️⃣ Components

### ActivitiesPanel.tsx
- Tabbed interface: "Activities" | "Music"
- Activities tab: list with checkboxes (mark done)
- Music tab: list with play/stop toggles
- Props: `{ activities, music, onToggleActivity, onToggleMusic }`

### NotesPanel.tsx
- Styled textarea
- Debounced autosave (~500ms)
- Save state indicator ("Saving..." / "Saved")
- Props: `{ notes, slideId, onSaveNotes }`

### Slide Preview (in app-index.tsx)
- Inline implementation (no slots needed)
- Video/image rendering with proper handling
- Navigation buttons (prev/next)
- Timer controls in next slide area

### Accessibility Issues Identified

#### NotesPanel.tsx
- ❌ Missing `aria-label` or `aria-labelledby` for the textarea
- ❌ Missing `aria-live` region for the saving status indicator
- ❌ Tab buttons lack proper ARIA attributes for tab panel navigation
- ❌ No keyboard navigation support for tab switching

#### SlidePreview.tsx
- ✅ Video element has basic `aria-label` (good)
- ❌ Video element missing `controls` attribute (present but should be explicit)
- ❌ Image element missing proper `alt` text fallback for decorative images
- ❌ No ARIA attributes for slide navigation buttons
- ❌ Missing focus management for keyboard users

#### ActivitiesPanel.tsx
- ❌ Tab buttons lack proper ARIA roles (`role="tab"`, `role="tabpanel"`)
- ❌ Missing `aria-selected` for active tab
- ❌ Checkbox labels not properly associated with `htmlFor` (present but could be improved)
- ❌ Music toggle buttons missing ARIA labels
- ❌ No keyboard navigation between tabs
- ❌ Missing focus indicators for interactive elements

---

## 7️⃣ Layout Grid (CSS)

```typescript
// src/app/app-$ip/app-$presentationId/index.css.ts

import { styled } from "styled-components";
import { color } from "@/ui/colors";

export const PresentationLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  background: ${color("secondary")}; /* primaryYellow #F5C400 */
  gap: 8px;
  padding: 8px;
`;

export const SlidesZone = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;  /* Active | Next */
  gap: 8px;
`;

export const PanelsZone = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;  /* Activities+Music | Notes */
  gap: 8px;
`;
```

---

## 8️⃣ Development Phases

### Phase 1 — Data Layer ✅
- [x] Add API endpoints to `endpoints.ts`
- [x] Create `src/types/presentation.ts`
- [x] Create `usePresentation` hook
- [x] Create `useTimer` hook

### Phase 2 — Layout Skeleton ✅
- [x] Create grid layout in `index.css.ts`
- [x] Build empty panels in `app-index.tsx`
- [x] Test responsive structure

### Phase 3 — Slide Engine ✅
- [x] unify Slide preview logic (e. g. „No content“)
- [x] make Slide preview standalone component
- [x] use slots to
	- [x] place buttons
	- [x] place current progress info text

### Phase 4 — Timer ✅
- [x] Implement timer in next slide area
- [x] Connect `useTimer` hook
- [x] Start/stop functionality

### Phase 5 — Activities & Music Panels ✅
- [x] Build `ActivitiesPanel` with tabs
- [x] Implement activity toggles
- [x] Implement music toggles

### Phase 6 — Notes ✅
- [x] Build `NotesPanel` component
- [x] Add debounced autosave
- [x] Connect to API

### Phase 7 — Polish ⏳
- [x] Disable prev on first slide, next on last
- [⚠️] Accessibility (aria-labels) - basic video accessibility added
- [ ] Loading states & error handling
- [ ] Test edge cases (first/last slide, empty states)
- [ ] Fix accessibility issues in NotesPanel (aria-labels, keyboard navigation)
- [ ] Fix accessibility issues in SlidePreview (navigation buttons, focus management)
- [ ] Fix accessibility issues in ActivitiesPanel (tab roles, keyboard navigation)

---

## 9️⃣ Translation Keys

Added to `en.json` and `cs.json`:

```json
{
  "presentationCurrentSlide": "Current Slide",
  "presentationNextSlide": "Next Slide",
  "presentationPrevious": "Previous",
  "presentationNext": "Next",
  "presentationTimerStart": "Start",
  "presentationTimerStop": "Stop",
  "presentationActivities": "Activities",
  "presentationMusic": "Music",
  "presentationNotes": "Notes",
  "presentationNotesPlaceholder": "Write your notes here...",
  "presentationNotesSaving": "Saving...",
  "presentationNotesSaved": "Saved"
}
```

---

## 🦽 Accessibility Best Practices (Missing)

### General Recommendations
- Add `role="tab"`, `role="tabpanel"`, `role="tablist"` for tab interfaces
- Use `aria-selected="true/false"` for active tab indication
- Implement keyboard navigation with `onKeyDown` handlers
- Add proper focus management with `useRef` and `focus()`
- Use `aria-live="polite"` for status messages
- Ensure all interactive elements have visible focus indicators

### Specific Component Fixes Needed

#### NotesPanel.tsx
```typescript
// Add to textarea:
aria-label="Presentation notes" 
aria-describedby="notes-saving-status"

// Add to saving indicator:
<div id="notes-saving-status" aria-live="polite">
  {isSaving ? t`presentationNotesSaving` : t`presentationNotesSaved`}
</div>

// Add keyboard support for tabs:
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      // Switch tabs based on arrow keys
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

#### SlidePreview.tsx
```typescript
// Add to navigation buttons:
<button 
  aria-label={`Go to ${isNext ? 'next' : 'previous'} slide`}
  disabled={isNext ? isLast : isFirst}
>
  {isNext ? 'Next' : 'Previous'}
</button>

// Add to video element:
<video 
  src={slide.mediaUrl} 
  controls 
  aria-label={`${label} video player`}
  aria-describedby={`slide-${slide.id}-description`}
>
  <track kind="captions" />
</video>

// Add focus management:
const videoRef = useRef<HTMLVideoElement>(null);
useEffect(() => {
  if (isActive) {
    videoRef.current?.focus();
  }
}, [isActive]);
```

#### ActivitiesPanel.tsx
```typescript
// Add proper tab roles:
<PanelHeader role="tablist">
  <PanelTab 
    role="tab" 
    aria-selected={activeTab === "activities"} 
    aria-controls="activities-panel" 
    id="activities-tab" 
    tabIndex={activeTab === "activities" ? 0 : -1}
  >
    {t`presentationActivities`}
  </PanelTab>
</PanelHeader>

<PanelContent>
  <div 
    role="tabpanel" 
    aria-labelledby="activities-tab" 
    id="activities-panel"
    hidden={activeTab !== "activities"}
  >
    {/* Activities content */}
  </div>
</PanelContent>

// Add keyboard navigation:
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'ArrowRight' && activeTab === 'activities') {
    setActiveTab('music');
    document.getElementById('music-tab')?.focus();
  } else if (e.key === 'ArrowLeft' && activeTab === 'music') {
    setActiveTab('activities');
    document.getElementById('activities-tab')?.focus();
  }
};
```

---

## 🔟 Styling Notes

- **Colors**: Reuse from `@/ui/colors.ts` - primary (red), secondary (yellow)
- **Primary Yellow**: `${color("secondary")}` = `#F5C400`
- **Background**: Yellow with decorative circles (see `@src/app/app-$ip/app-index.tsx`)
- **Border radius**: 12px
- **Spacing**: 8px base unit

---

## 📋 Implementation Checklist

- [x] Add API endpoints
- [x] Create TypeScript interfaces
- [x] Create usePresentation hook
- [x] Create useTimer hook
- [x] Build grid layout CSS
- [x] Implement slide preview (simplified, no slots)
- [x] Refactor slide preview into standalone component with slots
- [x] Add prev/next navigation
- [x] Implement timer in next slide
- [x] Build ActivitiesPanel with tabs
- [x] Add activity toggle functionality
- [x] Add music toggle functionality
- [x] Build NotesPanel with autosave
- [x] Add translation keys
- [ ] Test edge cases (first/last slide, empty states)
- [ ] Fix accessibility issues in NotesPanel
- [ ] Fix accessibility issues in SlidePreview
- [ ] Fix accessibility issues in ActivitiesPanel
- [x] Run lint and typecheck
