/**
 * @fileoverview Sensor blocks for all systems.
 * @requires Blockly.Blocks
 * @author Beate
 */

'use strict';

goog.provide('Blockly.Blocks.robSensorDefinitionsDataAvailable');

goog.require('Blockly.Blocks');

// define sensors here as a property of sensors  ********************************************************************************

/*- minimal example:
 *
 * sensors.ultrasonic.ev3 = {
 *     title : 'ULTRASONIC',
 *     modes : [ {
 *         name : 'PRESENCE',
 *         type : 'Boolean',
 *     } ],
 * };
 *
 */

/*- all supported properties:
 *
 * title,
 * ports,
 * modes,
 *     name,
 *     type,
 *     value,
 *     unit,
 *     op,
 * standardPort
 */

var sensors = {};

sensors.lsm9ds1_acceleration = {};
sensors.lsm9ds1_acceleration.arduino = {
    params: [
        { "name": "x", "unit": "MILLIG" },
        { "name": "y", "unit": "MILLIG" },
        { "name": "z", "unit": "MILLIG" }
    ]
};

sensors.lsm9ds1_gyro = {};
sensors.lsm9ds1_gyro.arduino = {
    params: [
        { "name": "x", "unit": "MILLIG" },
        { "name": "y", "unit": "MILLIG" },
        { "name": "z", "unit": "MILLIG" }
    ]
};

sensors.lsm9ds1_magneticField = {};
sensors.lsm9ds1_magneticField.arduino = {
    params: [
        { "name": "x", "unit": "MILLIG" },
        { "name": "y", "unit": "MILLIG" },
        { "name": "z", "unit": "MILLIG" }
    ]
};

var sensorsAll = [];
sensorsAll.arduino = [];

function initSensors() {
    for (var sensor in sensors) {
        if (sensors.hasOwnProperty(sensor)) {
            Blockly.Blocks['robSensors_' + sensor + '_getSample'] = {
                sensor: sensor,
                init: function() {
                    Blockly.Blocks['robSensorsDataAvailable_generic'].init.call(this, sensors[this.sensor][this.workspace.device], this.sensor);
                }
            };
        }
    }
};

initSensors();