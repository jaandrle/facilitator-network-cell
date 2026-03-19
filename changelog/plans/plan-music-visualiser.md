# Plan DONE: Add Music visualiser

- it should be used in Music component
- “bar equalizer”
- random bars animation
- standalone react component

## Native HTML/CSS model
### HTML structure
```html
<div class="visualizer">
  <div class="bar"></div>
  <div class="bar"></div>
  <div class="bar"></div>
  <!-- 17× in total -->
</div>
```
### CSS styling
```css
.visualizer {
  display: flex;
  align-items: flex-end;
  height: 100px;
  gap: 2px;
}

.bar {
  width: 8px;
  background-color: #f0f0f0;
  border-radius: 2px 2px 0 0;
  position: relative;
}

/* Red cap at the top of each bar */
.bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #ff0000;
  border-radius: 2px 2px 0 0;
}

/* Animate the bars */
@keyframes equalize {
  0%, 100% {
    height: 10%;
  }
  50% {
    height: 100%;
  }
}

.bar:nth-child(1) {
  animation: equalize 0.5s infinite ease-in-out;
  animation-delay: 0.1s;
}

.bar:nth-child(2) {
  animation: equalize 0.5s infinite ease-in-out;
  animation-delay: 0.2s;
}

/* use new siblings index function */

```
