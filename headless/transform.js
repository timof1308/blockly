// based on https://stackoverflow.com/questions/39385916/blockly-on-node-js

var fs = require('fs');
var path = require('path');
var xmldom = require('xmldom');

global.DOMParser = xmldom.DOMParser;
global.XMLSerializer = xmldom.XMLSerializer;
// Create the document, which is missing due to not running in browser
global.document = xmldom.DOMImplementation.prototype.createDocument();
global.Blockly = require('../blockly_uncompressed.js');

require('../blocks/bob3Actions.js');
require('../blocks/bob3Communication.js');
require('../blocks/colour.js');
require('../blocks/lists.js');
require('../blocks/logic.js');
require('../blocks/loops.js');
require('../blocks/makeblockActions.js');
require('../blocks/math.js');
require('../blocks/mbedActions.js');
require('../blocks/mbedBrick.js');
require('../blocks/mbedColour.js');
require('../blocks/mbedCommunication.js');
require('../blocks/mbedControls.js');
require('../blocks/mbedImage.js');
require('../blocks/mBotImage.js');
require('../blocks/naoActions.js');
require('../blocks/naoBrick.js');
require('../blocks/naoColour.js');
require('../blocks/naoSensors.js');
require('../blocks/procedures.js');
require('../blocks/robBrick.js');
require('../blocks/robColour.js');
require('../blocks/robCommunication.js');
require('../blocks/robConfigDefinitions.js');
require('../blocks/robControls.js');
require('../blocks/robSensorDefinitions.js');
require('../blocks/robSensors.js');
require('../blocks/text.js');
require('../blocks/variables.js');
require('../blocks/vorwerkActions.js');

require('../blocks/robActions.js');
require('../blocks/robConfig.js');

require('../msg/js/en.js');

// Process arguments
var useFile = process.argv[2];
var inputXml;
var outputFileName;
if (useFile === '-f' && process.argv[3]) {
    inputXml = fs.readFileSync(path.join(__dirname, process.argv[3]), {encoding:'utf8'});
    outputFileName = process.argv[4];
} else if (useFile === '-nf' && process.argv[3]) {
    inputXml = process.argv[3];
} else {
    throw 'File mode not specified!'
}

// these are not available if block_svg.js is not used
Blockly.Block.prototype.getErrorText = function(){
    return '';
};
Blockly.Block.prototype.setBlocking = function(){
    return '';
};
Blockly.Block.prototype.render = function(){
    return '';
};

// copied from robActions, not available (e.g. in mbedActions) without building
function getConfigPorts(actorName) {
    var ports = [];
    var container = Blockly.Workspace.getByContainer("bricklyDiv");
    if (container) {
        var blocks = Blockly.Workspace.getByContainer("bricklyDiv").getAllBlocks();
        for (var x = 0; x < blocks.length; x++) {
            var func = blocks[x].getConfigDecl;
            if (func) {
                var configs = func.call(blocks[x]);
                for (var i = 0; i < configs.length; i++) {
                    var config = configs[i];
                    if (config.type === actorName) {
                        ports.push([ config.name, config.name ]);
                    }
                }
            }
        }
    }

    if (ports.length === 0) {
        ports.push([ Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT'),
                (Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase() ]);
    }
    return new Blockly.FieldDropdown(ports);
};
global.getConfigPorts = getConfigPorts;

try {
    // File to DOM
    var inputDom = Blockly.Xml.textToDom(inputXml);

    // Create a headless workspace
    var workspace = new Blockly.Workspace();
    workspace.device = inputDom.getAttribute('robottype');
    workspace.version = inputDom.getAttribute('xmlversion');
    workspace.description = inputDom.getAttribute('description');
    workspace.tags = inputDom.getAttribute('tags');
    Blockly.mainWorkspace = workspace;

    // Import-export action
    Blockly.Xml.domToWorkspace(inputDom, workspace);
    var dom = Blockly.Xml.workspaceToDom(workspace);

    // Add workspace attributes to dom
    dom.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://de.fhg.iais.roberta.blockly");
    dom.setAttribute('robottype', workspace.device);
    dom.setAttribute('xmlversion', workspace.version);
    dom.setAttribute('description', workspace.description);
    dom.setAttribute('tags', workspace.tags);

    // DOM to file
    var outputXml = Blockly.Xml.domToText(dom);
    if (outputFileName) {
        fs.writeFileSync(path.join(__dirname, outputFileName), outputXml, {encoding:'utf8'});
    } else {
        console.log(outputXml);
    }
} catch (e) {
    console.log(e);
}
