# Minimalistic Faircado Extension for Amazon

This repository presents a streamlined adaptation of the original Faircado extension. Its primary functionality is to integrate the Faircado embedded view seamlessly into Amazon, focusing exclusively on book pages associated with the FreeTree branding.

## Getting Started

### Pre-requisite:
Ensure `pnpm` is installed on your system. If not, you can install it using:
```bash
npm install -g pnpm
```

### Steps to Set Up:

1. **Install Required Dependencies**
   Execute the following command to install all necessary packages:
   ```bash
   pnpm i
   ```

2. **Start the Development Server**
   Launch the development environment by running:
   ```bash
   pnpm dev
   ```

3. **Configure Browser Extension Settings**
   - Open your browser's extension settings interface.
   - Enable developer mode.
   - Load the unpacked extension from the following directory:
     ```
     YOUR_PATH_WHERE_REPO_IS/faircado-x-freetree/build/chrome-mv3-dev
     ```

4. **Verify Functionality**
   - Navigate to any book page on `amazon.de`.
   - Confirm that the embedded Faircado view, branded with FreeTree, is displayed as expected.
