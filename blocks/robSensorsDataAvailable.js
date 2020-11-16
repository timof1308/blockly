/**
 * @fileoverview Sensor blocks for all systems.
 * @requires Blockly.Blocks
 * @author Beate
 */

'use strict';

goog.provide('Blockly.Blocks.robSensorsDataAvailable');

goog.require('Blockly.Blocks.robSensorDefinitions');
goog.require('Blockly.Blocks');

// define non standard sensor blocks here e.g.**********************************************************

Blockly.Blocks['robSensorsDataAvailable_generic'] = {
    /*- Generic sensor definition. Will create e.g. the following xml:
     *
     * <block type=​"robSensors_lsm9ds1_acceleration_getSample" id=​"~#5Ait_pq#|b=,t-RQwV" intask=​"false">
     *     ​<field name=​"SENSORPORT">​NO PORT​</field>
     *     ​<hide name=​"SENSORPORT" value=​"NO PORT">​</hide>​
     * </block>
     *
     */
    /**
     * @param {Object
     *            sensor}
     * 
     * @memberof Block
     */
    init: function(sensor, sensorNames) {
        var names = sensorNames.split("_");
        sensor.title = names[0].toUpperCase();
        sensor.mode = names[1].toUpperCase();
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.type = 'robSensors_' + sensorNames.toLowerCase() + '_getSample';
        this.setOutput(true, 'Boolean');
        //this.setInputsInline(true); // TODO check later if we want to have a rule for this

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
                        if (config.type === sensor.title.toLowerCase()) {
                            ports.push([config.name, config.name]);
                        }
                    }
                }
            }
        }
        this.hide = {};
        this.hide.name = "SENSORPORT";
        if (ports.length === 0) {
            ports.push([Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT'),
            (Blockly.Msg.CONFIGURATION_NO_PORT || Blockly.checkMsgKey('CONFIGURATION_NO_PORT')).toUpperCase()]);
        }
        this.hide.value = ports[0][1];
        this.dependConfig = {
            'type': sensor.title.toLowerCase(),
            'dropDown': ports
        };
        this.appendValueInput(sensor.params[0].name.toUpperCase()).
            appendField(Blockly.Msg['SENSOR_' + sensor.title + '_' + this.workspace.device.toUpperCase()] || Blockly.Msg['SENSOR_' + sensor.title] || 'SENSOR_' + sensor.title, 'SENSORTITLE').
            appendField(Blockly.Msg['MODE_' + sensor.mode.toUpperCase()] || 'MODE_' + sensor.mode.toUpperCase()).appendField(Blockly.Msg['SENSOR_DATA_READY'] || 'SENSOR_DATA_READY').
            appendField(Blockly.Msg[sensor.params[0].name.toUpperCase()] || sensor.params[0].name.toUpperCase()).setAlign(Blockly.ALIGN_RIGHT).setCheck('Number').
            appendField(Blockly.Msg['SENSOR_UNIT_' + sensor.params[0].unit.toUpperCase()] || sensor.params[0].unit.toUpperCase()).
            appendField(new Blockly.FieldHidden(), "SENSORPORT");

        for (var i = 1; i < sensor.params.length; i++) {
            this.appendValueInput(sensor.params[i].name.toUpperCase()).
                appendField(Blockly.Msg[sensor.params[i].name.toUpperCase()] || sensor.params[i].name.toUpperCase()).
                appendField(Blockly.Msg['SENSOR_UNIT_' + sensor.params[i].unit.toUpperCase()] || sensor.params[i].unit.toUpperCase()).
                setAlign(Blockly.ALIGN_RIGHT).setCheck('Number');

        }

        var thisBlock = this;
        this.setTooltip(function() {
            return Blockly.Msg['SENSOR_' + sensor.title + '_GETSAMPLE_TOOLTIP_' + thisBlock.workspace.device.toUpperCase()]
                || Blockly.Msg['SENSOR_' + sensor.title + '_GETSAMPLE_TOOLTIP']
                || Blockly.checkMsgKey('SENSOR_' + sensor.title + '_GETSAMPLE_TOOLTIP');
        });

        this.onchange = function() {
            if (!this.workspace || Blockly.Block.dragMode_ == 2) {
                return;
            }
            for (var i = 0; i < sensor.params.length; i++) {
                var blockVar = this.getInputTargetBlock(sensor.params[i].name.toUpperCase());
                if (blockVar && blockVar.type !== 'variables_get') {
                    blockVar.unplug();
                    blockVar.bumpNeighbours_();
                }
            }

        }
    }
};



