/**
 * @fileoverview Sensor blocks for the nano 33 ble sense
 * @requires Blockly.Blocks
 * @author Beate + Reinhard
 */

'use strict';

goog.provide('Blockly.Blocks.robSensorDefinitionsDataAvailable');

goog.require('Blockly.Blocks');

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

sensors.lsm9ds1_magneticfield = {};
sensors.lsm9ds1_magneticfield.arduino = {
    params: [
        { "name": "x", "unit": "MILLIG" },
        { "name": "y", "unit": "MILLIG" },
        { "name": "z", "unit": "MILLIG" }
    ]
};

sensors.apds9960_distance = {};
sensors.apds9960_distance.arduino = {
	params: [
		{ "name": "", "unit": "CM" }
	]
};

sensors.apds9960_gesture = {};
sensors.apds9960_gesture.arduino = {
		params: [
			{ "name": "", "unit": "DEGREE" }
			]
};

sensors.apds9960_color = {};
sensors.apds9960_color.arduino = {
		params: [
			{ "name": "r", "unit": "PERCENT" },
			{ "name": "g", "unit": "PERCENT" },
			{ "name": "b", "unit": "PERCENT" }
			]
};

sensors.lps22hb_pressure = {};
sensors.lps22hb_pressure.arduino = {
		params: [
			{ "name": "", "unit": "PASCAL" }
			]
};

sensors.hts221_temperature = {};
sensors.hts221_temperature.arduino = {
		params: [
			{ "name": "", "unit": "DEGREE" }
			]
};

sensors.hts221_humidity = {};
sensors.hts221_humidity.arduino = {
		params: [
			{ "name": "", "unit": "PERCENT" }
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