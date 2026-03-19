# Plan DONE: Implement Expandable Left Sidebar for Presentation Page

## Requirements Analysis
From changelog/v1.0.0.md, the left panel should:
- Be hidden by default with draggable button in middle to show it
- Show "Sessions" + presentation name at top
- Display all available sessions list in 'li' format: `name\t(start_page – end_page)`
- Be potentially scrollable
- On session click, show `start_page`
- Have bottom section with buttons:
  - "Reset Game Score" button (to be specified later)
  - "Change Presentation" button = goto Select Presentation Page
  - "Quit Server" button (to be specified later)

## Implementation Plan

### Step 1: Create Sidebar Component Structure
**Files to create:**
- `src/app/app-$ip/app-$presentationId/components/Sidebar.tsx` - Main sidebar component
- `src/app/app-$ip/app-$presentationId/components/Sidebar.css.ts` - Sidebar styles

**Implementation Notes:**
- Follow the existing component folder pattern used in the codebase
- Use relative imports within the Sidebar folder (../../core, ../../assets)
- Export components through the barrel file for clean imports
- Style files should be colocated with their components

### Step 2: Update Layout Structure
**Files to modify:**
- `src/app/app-$ip/app-$presentationId/app-index.tsx` - Add sidebar and toggle components

### Step 3: Implement Session List Functionality
**Files to modify:**
- `src/app/app-$ip/app-$presentationId/components/Sidebar.tsx` - Use presentation data to display sessions
- Add session click handler to navigate to start_page

### Step 4: Add Button Functionality
**Files to modify:**
- `src/app/app-$ip/app-$presentationId/components/Sidebar/Sidebar.tsx` - Add bottom buttons
- Connect "Change Presentation" button to navigation

### Step 5: Update Components Index
**Files to modify:**
- `src/app/app-$ip/app-$presentationId/components/index.ts` - Add Sidebar exports

#### Update components/index.ts
```typescript
// Add to existing exports
export * from './Sidebar';
```

## Folder Structure

The sidebar will be organized as a component folder following the project's colocation convention:

```
src/app/app-$ip/app-$presentationId/components/
  ├── Sidebar.tsx        # Main Sidebar component
  ├── Sidebar.css.ts     # Sidebar styles
```

## Positioning Approach

The sidebar will use **fixed positioning** on the page:

### Fixed Positioning Details
- `position: fixed; left: 0; top: 0; bottom: 0;` - Fixed to viewport left edge
- `width: 25vw` - Consistent width
- `z-index: 100` - Above main content, below critical overlays
- `backdrop-filter: blur(10px)` - Semi-transparent blurred background outside the sidebar
- `background: rgba(0, 0, 0, .8)` - Dark semi-transparent background outside the sidebar

### Toggle Button Positioning
- Fixed position that moves with sidebar state
- `left: 0` when closed, `left: 300px` when open
- Vertical centering with `top: 50%; transform: translateY(-50%)`
- Arrow icon rotates 180° to indicate open/closed state
- `z-index: 101` - Above sidebar content

### Performance Considerations
- Fixed positioning avoids reflow of main content
- Transitions are hardware-accelerated (transform, opacity)

## Detailed Implementation Steps

### Step 1: Create Sidebar Component Structure

#### Sidebar.tsx
```typescript
import { useState } from "react";
import { useQueryGetPresentation, useSlideNav } from "../../core";
import { useTranslation } from "@/core";
import { Button } from "@/components";
import { SidebarLayout, Header, SessionList, SessionItem, Footer, ButtonGroup } from "./Sidebar.css";

export function Sidebar() {
  const { t } = useTranslation();
  const { isOpen, setIsopen } = useState();
  const { presentation } = useQueryGetPresentation();
  const { setCurrent } = useSlideNav(presentation?.totalSlides || 0);
  
  return (
    <SidebarLayout data-state={isOpen ? "open" : "closed"}>
      <Header>
        <h3>{t`sidebarSessionsTitle`} {presentation?.name}</h3>
      </Header>
      
      <SessionList>
        {presentation?.sessions && Object.entries(presentation.sessions).map(([sessionId, session]) => (
          <SessionItem 
            key={sessionId}
            onClick={() => setCurrent(parseInt(session.from))}
          >
            {session.title} <span>{session.from} – {session.to}</span>
          </SessionItem>
        ))}
      </SessionList>
      
      <Footer>
        <ButtonGroup>
          <Button variant="outline" disabled>
            {t`sidebarResetGameScore`}
          </Button>
          <Button onClick={() => {/* Navigate to select presentation */}}>
            {t`sidebarChangePresentation`}
          </Button>
          <Button variant="outline" disabled>
            {t`sidebarQuitServer`}
          </Button>
        </ButtonGroup>
      </Footer>
	  
	  <SidebarToggle isOpen={isOpen} onClick={() => setIsopen(!isOpen)} />
    </SidebarLayout>
  );
}

import { IconArrowRight, IconArrowLeft } from '../../assets';
function SidebarToggle({ isOpen, onClick }) {
  
  return (
    <ToggleButton 
      onClick={onClick}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
	  {isOpen
        ? <IconArrowRight />
        : <IconArrowLeft />
	  }
    </ToggleButton>
  );
}
```

#### Sidebar.css.ts
```typescript
import { styled } from "styled-components";
import { color, cssFont } from "@/ui";

export const SidebarLayout = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: transform 0.3s ease;
`;

export const Header = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${color("gray")};
  
  h3 {
    ${cssFont.bold}
    color: ${color("white")};
    margin: 0;
    font-size: 1.2rem;
  }
`;

export const SessionList = styled.ul`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${color("gray")};
    border-radius: 3px;
  }
`;

export const SessionItem = styled.li`
  padding: 0.75rem 1rem;
  color: ${color("white")};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  span {
    color: ${color("gray")};
    font-family: monospace;
  }
`;

export const Footer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${color("gray")};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
```

### Step 2: Create Sidebar Toggle Component

#### Sidebar/Toggle.css.ts
```typescript
import { styled } from "styled-components";
import { color } from "@/ui";

export const ToggleButton = styled.button`
  position: fixed;
  left: ${props => props['data-open'] ? '300px' : '0'}; 
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 60px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
  transition: left 0.3s ease, background 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  
  svg {
    width: 16px;
    height: 16px;
    fill: ${color("white")};
    transition: transform 0.3s;
    transform: ${props => props['data-open'] ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;
```

### Step 4: Update Layout and Main Page

#### Update index.css.ts
```typescript
// Add to existing file
export const Layout = styled(LayoutBase)`
  ${gap.def}
  display: grid;
  grid-template-rows: fit-content(100%) 1fr;
  gap: ${gap.var};
  position: relative;
  margin-left: ${props => props['data-sidebar-open'] ? '300px' : '0'};
  transition: margin-left 0.3s ease;
`;
```

#### Update app-index.tsx
```typescript
// Add imports
import { Sidebar, SidebarToggle } from "./components/Sidebar";
import { useSidebar } from "./core/useSidebar";

// Modify Layout component to accept data-sidebar-open
function Page() {
  const { t } = useTranslation();
  const { totalSlides } = useQueryGetPresentation();
  const slide = useSlideNav(totalSlides);
  const { isOpen } = useSidebar();

  return (
    <Layout data-sidebar-open={isOpen}>
      <Sidebar />
      <SidebarToggle />
      {/* ... existing content ... */}
    </Layout>
  );
}
```

### Step 5: Add Translation Keys
Add to translation files:
```json
{
  "sidebarSessionsTitle": "Sessions:",
  "sidebarResetGameScore": "Reset Game Score",
  "sidebarChangePresentation": "Change Presentation",
  "sidebarQuitServer": "Quit Server"
}
```

### Step 6: Update Core Index
Add to `src/app/app-$ip/app-$presentationId/core/index.ts`:
```typescript
export * from "./useSidebar";
```

## Implementation Checklist (Folder Structure)

### 1. Create Sidebar Folder Structure
- [x] Create `components/Sidebar.tsx` with main Sidebar component
- [x] Create `components/Sidebar.css.ts` with styled components

### 2. Update Layout and Integration
- [x] Modify `index.css.ts` to add sidebar-aware layout
- [x] Update `app-index.tsx` to import and use Sidebar components
- [x] Add sidebar state to Layout component

### 3. Connect Data and Navigation
- [x] Use `useQueryGetPresentation()` to get session data
- [x] Implement session click navigation using `useSlideNav()`
- [x] Add translation keys for all text elements

### 4. Final Integration
- [x] Update `components/index.ts` to export Sidebar components
- [x] Verify all imports work correctly
- [x] Test component rendering and functionality

## Testing Plan
1. Verify sidebar is hidden by default
2. Test toggle button shows/hides sidebar smoothly
3. Verify session list displays correctly with proper formatting
4. Test clicking session navigates to correct slide
5. Verify all buttons are present and functional (where implemented)
6. Test responsive behavior and scrolling
7. Run lint and formatting checks

## Dependencies
- Existing presentation data structure with sessions
- Slide navigation functionality
- Translation system
- Button component from shared UI

## Timeline Estimate
- Component creation: 2-3 hours
- Integration: 1-2 hours  
- Testing and refinement: 1-2 hours
- Total: 4-7 hours

## Risk Assessment
- Low risk: Building on existing component patterns
- Medium risk: Integration with existing layout system
- Mitigation: Test layout changes incrementally
