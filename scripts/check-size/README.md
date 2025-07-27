# Check SVG Sizes

This script checks the sizes of SVG files in the `public/logos` directory and ensures they do not exceed a specified limit.

## Usage

To use this script, run the following command:

```bash
pnpm script:check-svg-size
```

## Configuration

You can configure the size limit by modifying the `sizeLimit` variable in the script. The default limit is set to 24 KB.

```javascript
const sizeLimit = 24576; // 24 KB
```

## License

This project is licensed under the ISC License.
