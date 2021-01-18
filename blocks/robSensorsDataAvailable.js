/**
 * @fileoverview Sensor blocks for all systems.
 * @requires Blockly.Blocks
 * @author Beate + Reinhard
 */

'use strict';

goog.provide('Blockly.Blocks.robSensorsDataAvailable');
goog.require('Blockly.Blocks');

// define non standard sensor blocks here e.g.**********************************************************

Blockly.Blocks['robSensorsDataAvailable_generic'] = {
    /*- Generic sensor definition. Will create e.g. the following xml:
     *
     * <block type=​"robSensors_lsm9ds1_acceleration_getDataAvailableSample" id=​"~#5Ait_pq#|b=,t-RQwV" intask=​"false">
     *     ​...
     * </block>
     *
     */
    /**
     * @param {Object
     *            sensor}
     * 
     * @memberof Block
     */
    init : function(sensor, sensorName) {
        var nameComponents = sensorName.split("_");
        sensor.title = nameComponents[0].toUpperCase();
        sensor.mode = nameComponents[1].toUpperCase();
        this.setColour(Blockly.CAT_SENSOR_RGB);
        this.type = 'robSensors_' + sensorName.toLowerCase() + '_getDataAvailableSample';
        this.setOutput(true, 'Boolean');
        var sensorMode = Blockly.Msg['MODE_' + sensor.mode] || 'MODE_' + sensor.mode || 'MODEMISSING';
        // Head with first param
        var param = sensor.params[0];
        var target = param.target.toUpperCase();
        var valueInput = this.appendValueInput(target).appendField(sensor.title).appendField(sensorMode).appendField(Blockly.Msg['SENSOR_DATA_READY'] || 'SENSOR_DATA_READY');
        valueInput.appendField(Blockly.Msg[target] || target);
        // valueInput.setAlign(Blockly.ALIGN_RIGHT);
        if (param.type) {
            valueInput.setCheck(param.type);
        } else {
            valueInput.setCheck('Number');
        }
        valueInput.appendField(Blockly.Msg['SENSOR_UNIT_' + param.unit.toUpperCase()] || param.unit.toUpperCase());
        // remaining params
        for (var i = 1; i < sensor.params.length; i++) {
            param = sensor.params[i];
            target = param.target.toUpperCase();
            valueInput.appendField(Blockly.Msg[target] || target);
            // valueInput.setAlign(Blockly.ALIGN_RIGHT);
            if (param.type) {
                valueInput.setCheck(param.type);
            } else {
                valueInput.setCheck('Number');
            }
            valueInput.appendField( Blockly.Msg['SENSOR_UNIT_' + param.unit.toUpperCase()] || sensor.params[i].unit.toUpperCase())
        }
        
        var tooltip = 'SENSOR_' + sensorName + '_TOOLTIP';
        this.setTooltip(function() {
            return Blockly.Msg[tooltip + '_' + thisBlock.workspace.device.toUpperCase()]
                    || Blockly.Msg[tooltip]
                    || Blockly.checkMsgKey(tooltip);
        });
        this.onchange = function() {
            if (!this.workspace || Blockly.Block.dragMode_ == 2) {
                return;
            }
            for (var i = 0; i < sensor.params.length; i++) {
                var blockVar = this.getInputTargetBlock(sensor.params[i].target.toUpperCase());
                if (blockVar && blockVar.type !== 'variables_get') {
                    blockVar.unplug();
                    blockVar.bumpNeighbours_();
                }
            }
        }
    }
};
