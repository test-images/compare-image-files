# Compare Image Files

#### Color value-to-value diff

Compares 2 images on strict color matching, NO psychovisual aproximation.
Unique to other projects I can find on npm/GitHub is that this uses the very fast [node-sharp](https://sharp.pixelplumbing.com/).  While sharp is scripted using JavaScript, the bulk of the image procssing is a [C lib libvips](https://github.com/libvips/libvips).

## Instalation

Tested on [NodeJS v15 & v16](https://nodejs.org/)

1. `git clone <<this repo>>`
2. `npn install`
3. Open the `tests.*.config.js` files.
4. Edit the **orig** (source folder), **compare** (folder to compare against orig), **dest** (output folder), & **pairs** (file name pairs to compare) values for your project.
5. `node index <<config>>`, such as `node index avif`

Diff images will be created in the **dest** folder(s), & you will get some stats an pass/fail summeries.
