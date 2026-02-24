# Plan to align slide (preview) using iframe

required changes:
1. Slides will be iframes
1. API returns URL page instead of current format
1. Need to adjust SlidePreview component and mock API in bs/dev/.ws-responses/ (slides/presentation responses)

## Current state:
1. Slide type (src/types/presentation.ts):
   - Has type: "video" | "image" | "content"
   - Has mediaUrl?: string for image/video URLs
1. SlidePreview component (src/app/app-$ip/app-$presentationId/components/SlidePreview.tsx):
   - Displays image or video based on slide.type
   - Uses slide.mediaUrl for rendering
1. Mock API (bs/dev/.ws-responses/getPresentation.json):
   - Contains slides with type and mediaUrl

## Required changes:
1. Add a new slide type (e.g., "iframe") to the Slide type
1. Add url field to Slide type for the iframe URL
1. Update SlidePreview component to render iframe when type is "iframe"
1. Update mock API to include slides with type "iframe" and url field

## Final Plan
1. Type Definition (src/types/presentation.ts)
	- Change type: "video" | "image" | "content" → type: "iframe"
	- Replace mediaUrl?: string → url: string
1. SlidePreview Component (src/app/app-$ip/app-$presentationId/components/SlidePreview.tsx)
	- Remove video/image conditional rendering
	- Render `<iframe src={slide.url}>` for all slides (replace lines 25-32)
	- Keep fallback "No slide content" if no url
1. CSS (src/app/app-$ip/app-$presentationId/components/SlidePreview.css.ts)
	- Remove img, video styling block
	- Add iframe styling: `width: 100%, height: 100%, border: none`
1. Mock API (bs/dev/.ws-responses/getPresentation.json)
	- Update all slides:
		- "type": "iframe"
		- Replace mediaUrl with "url": "http://localhost:3029/slide?num=1" (slide index + 1)
1. HTTP Server (bs/dev/ws.js)
	- Add HTTP request handler in `mockWebSocketPing()`
	- Serve HTML: `<h1>Hello slide X</h1>` where `X` from `?num=` query parameter
