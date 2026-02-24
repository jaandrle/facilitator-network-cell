# Plan: Add Volume Slider to MusicPlayer Component

## Goal
Add a volume slider component between the equalizer and button in the MusicPlayer component, with API integration and proper styling using gray colors (l=31 and l=85).

## Analysis
- Current MusicPlayer structure: Visualizer (equalizer) + ButtonPlayStop
- Need to add VolumeSlider component between them
- Requires new API endpoint for volume control
- Need to add mock response for development
- Use gray colors with lightness 31 and 85

## Implementation Plan

### 1. Add new API endpoints
**File**: `src/api/types/endpoints.ts`
- Add `getVolume` endpoint to retrieve current volume
- Add `setVolume` endpoint to set volume level
- Both endpoints need request/response types

### 2. Create VolumeSlider component
**File**: `src/app/app-$ip/app-$presentationId/components/MusicPlayer/VolumeSlider.tsx`
- Create slider component using input[type="range"]
- Use gray colors: l=31 for background, l=85 for thumb
- Use TanStack Query for data fetching and mutations
- Fetch current volume on mount using useQuery with getVolume endpoint
- Handle volume change events with debouncing (300ms)
- Use useMutation with optimistic updates for setVolume
- Implement onMutate for immediate UI feedback

### 3. Add VolumeSlider to MusicPlayer
**File**: `src/app/app-$ip/app-$presentationId/components/MusicPlayer/index.tsx`
- Import VolumeSlider component
- Add it between Visualizer and ButtonPlayStop
- Pass necessary props including presentation info

### 4. Create mock responses
**File**: `bs/dev/.ws-responses/getVolume.js`
- Create mock handler for getting current volume
- Return volume level (0-100)

**File**: `bs/dev/.ws-responses/setVolume.js`
- Create mock handler for volume setting
- Store volume state and return success response

### 5. Update types if needed
**File**: `src/app/app-$ip/app-$presentationId/components/MusicPlayer/types.ts`
- Add volume property to MusicType if needed

## Verification
- Run linting: `bs/dev/lint.js`
- Format code: `bs/dev/biome.js Formatting --fix`
- Test component rendering and functionality

## Files to modify/create:
1. `src/api/types/endpoints.ts` - Add endpoint
2. `src/app/app-$ip/app-$presentationId/components/MusicPlayer/VolumeSlider.tsx` - New component
3. `src/app/app-$ip/app-$presentationId/components/MusicPlayer/index.tsx` - Integrate slider
4. `bs/dev/.ws-responses/setVolume.js` - Mock response
5. `src/app/app-$ip/app-$presentationId/components/MusicPlayer/types.ts` - Update types (if needed)