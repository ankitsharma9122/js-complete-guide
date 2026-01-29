| Event          | When it fires               | Typical use         | Useful for your app?             |
| -------------- | --------------------------- | ------------------- | -------------------------------- |
| `onMouseDown`  | Mouse button pressed        | Start drag / draw   | ✅ Start painting                 |
| `onMouseUp`    | Mouse button released       | End drag / draw     | ✅ Stop painting                  |
| `onMouseEnter` | Cursor enters element       | Paint on hover      | ✅ Draw while dragging            |
| `onMouseLeave` | Cursor leaves element       | Cleanup state       | ✅ Prevent stuck draw             |
| `onMouseMove`  | Cursor moves inside element | Continuous tracking | ⚠️ Alternative to `onMouseEnter` |
| `onClick`      | Press + release             | Single action       | ❌ Not ideal for drawing          |
| `onKeyDown`    | Key is pressed              | Keyboard shortcuts  | ✅ Hold `E` to erase              |
| `onKeyUp`      | Key is released             | End shortcut        | ✅ Release erase                  |
| `onWheel`      | Mouse wheel scrolls         | Scroll / zoom       | ⚠️ Zoom grid                     |
