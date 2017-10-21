# snapkit

Capture screenshots of websites on command line or REST API.

<p>
  <a href="https://www.patreon.com/bePatron?u=880479">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" height="40px" />
  </a>
</p>

```
$ snapkit https://google.com --emulate="iPad" | open -a Preview.app -f
```

Or, from inside your own Node.js program.

```javascript
const snapkit = require('snapkit')

async () => {
  let image = await snapkit('https://google.com')
}
/* snapkit has a child process that starts on import, close it */
async close => snapkit.close()
```

## snapkit(url||content[, options])

Accepts either HTML page content as as string or a URL to a remote site.

- `options` <[Object]>
  - `emulate` <[string]> Device to emulate, list of available devices at `snapkit.devices`
  - `transparency` <[boolean]> Hides default white background and allows capturing screenshots with transparency. Defaults to `false`.
  - `userAgent` <[string]>
  - `type` <[string]> Specify screenshot type, can be either `jpeg` or `png`. Defaults to 'png'.
  - `quality` <[number]> The quality of the image, between 0-100. Not applicable to `png` images.
  - `fullPage` <[boolean]> When true, takes a screenshot of the full scrollable page. Defaults to `false`.
  - `viewport` <[Object]>
    - `width` <[number]> page width in pixels.
    - `height` <[number]> page height in pixels.
    - `deviceScaleFactor` <[number]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
    - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account. Defaults to `false`.
    - `hasTouch`<[boolean]> Specifies if viewport supports touch events. Defaults to `false`
    - `isLandscape` <[boolean]> Specifies if viewport is in landscape mode. Defaults to `false`.
  - `clip` <[Object]> An object which specifies clipping region of the page. Should have the following fields:
    - `x` <[number]> x-coordinate of top-left corner of clip area
    - `y` <[number]> y-coordinate of top-left corner of clip area
    - `width` <[number]> width of clipping area
    - `height` <[number]> height of clipping area

## snapkit.devices

Array of available device emulations.

## snapkit.close()

Close the browser instance and child process.
