# Extension Scripts

This package contains scripts that aim to make the development of extensions easier.

## Installation
Install the package as a "development dependency" using `npm`

```shell
npm i -D @pedily/extension-scripts
```

## Usage

You can automate the generation of the "extension file" `.tar.gz` file by calling `extension-scripts bundle` in your npm scripts like this:
```package.json
{
    "scripts": {
        "bundle": "extension-scripts bundle"
    }
}
```

This will create a file called `{{PACKAGE_NAME}}.tar.gz` in your project folder, where `{{PACKAGE_NAME}}` is equal to the `name` field in your `package.json`.
Contents of the extension file (todo-list for implementation):
- [ ] your extension source code
  - [ ] auto-detects TypeScript outputs by checking `outDir` in `tsconfig.json`
  - [ ] falls back to the `main` file's directory in `package.json`
- [ ] your `package.json`
  - [ ] it will nag about missing properties and add sane defaults if some are missing
- [x] an `icon.png`
  - [x] will add your `icon.png` from the project folder
  - [x] will fall back to adding a dummy `icon.png` in case you don't provide one
  - [ ] will fall back to adding a dummy `icon.png` in case the one you provided is invalid
- [x] a `README.md`
  - [x] will add your `README.md` from the project folder
  - [x] will fall back to adding a dummy `README.md` in case you don't provide one