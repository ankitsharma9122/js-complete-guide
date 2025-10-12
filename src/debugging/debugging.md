# USB Debugging

USB debugging allows you to inspect and debug React web apps running on physical mobile devices using desktop Chrome DevTools.

## Android Setup

### Enable Developer Options
1. Go to **Settings → About Phone**
2. Tap **Build Number** 7 times
3. Navigate to **Developer Options**
4. Enable **USB Debugging**

### Connect & Debug
1. Connect device via USB
2. On desktop Chrome, navigate to `chrome://inspect`
3. Check "Discover USB devices"
4. Allow USB debugging prompt on phone
5. Access your app at `<your-local-ip>:3000` (e.g., `192.168.1.5:3000`) or any links which hosted.
6. Click **Inspect** under your device in Chrome

---