# Christmas Tree (HTML/CSS/JS)

A single-page, animated Christmas tree scene with neon stars, falling snow, and optional background music.

## Features
- Animated 3D tree built from rotating, glowing star sprites
- Multicolor lights with hue cycling and soft bloom
- Falling snow rendered on canvas
- Play/Pause music toggle (loops `assets/audio/christmas-jazz-christmas-holiday-347485.mp3`)
- Mobile tweaks for smaller viewport scaling

## Quick start
1) Serve the folder (avoids audio autoplay restrictions):
```sh
npx serve .
```
2) Open the printed local URL (e.g., http://localhost:3000).

## Controls
- Play music: top-right button; first tap anywhere will also start playback (browser requirement).

## Customization
- Number of stars/arms/loops: edit `--n-stars`, `--n-arms`, `--n-loops` on `.a3d` in `index.html`.
- Scene size/offset (mobile): tweak `--scene-scale` and `--scene-translate-y` in `style.css` media queries.
- Light palette: adjust the `--h-*` hue tokens in `style.css`.
- Snow density: change `maxFlakes` in `script.js`.

## Credits
- Music: "christmas-jazz-christmas-holiday-347485.mp3" (see `assets/audio` for source attribution context).
