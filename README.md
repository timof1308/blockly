# Blockly

Google's Blockly is a web-based, visual programming editor.  Users can drag
blocks together to build programs.  All code is free and open source.

**The project page is https://developers.google.com/blockly/**

![](https://developers.google.com/blockly/sample.png)

To build messages and the blockly-compressed.js file make sure 
* you have the closure-library next to this project, version 20200719.0.0
* you have installed the closure compiler via npm: 
 * e.g. `npm install --save google-closure-compiler`
 * check the version: `npx google-closure-compiler --version` => `v20200719`
 
* run the `build.py` script