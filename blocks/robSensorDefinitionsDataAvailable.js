/**
 * @fileoverview Sensor blocks for the nano 33 ble sense
 * @requires Blockly.Blocks
 * @author Beate + Reinhard
 */

'use strict';

goog.provide('Blockly.Blocks.robSensorDefinitionsDataAvailable');
goog.require('Blockly.Blocks');

var integrated_sensor = {};

integrated_sensor.lsm9ds1_acceleration = {};
integrated_sensor.lsm9ds1_acceleration.arduino = {
    params: [
        { "target": "LIST_XYZ", "unit": "MILLIG", "type": "Array_Number" }
    ]
};

integrated_sensor.lsm9ds1_gyro = {};
integrated_sensor.lsm9ds1_gyro.arduino = {
    params: [
        { "target": "LIST_XYZ", "unit": "DEGREE_PER_SECOND", "type": "Array_Number" }
    ]
};

integrated_sensor.lsm9ds1_magneticfield = {};
integrated_sensor.lsm9ds1_magneticfield.arduino = {
    params: [
        { "target": "LIST_XYZ", "unit": "GAUSS", "type": "Array_Number" }
    ]
};

integrated_sensor.apds9960_distance = {};
integrated_sensor.apds9960_distance.arduino = {
    params: [
        { "target": "VARIABLE_VALUE", "unit": "CM" }
    ]
};

integrated_sensor.apds9960_gesture = {};
integrated_sensor.apds9960_gesture.arduino = {
    params: [
        { "target": "VARIABLE_VALUE", "unit": "INDEX" }
        ]
};

integrated_sensor.apds9960_color = {};
integrated_sensor.apds9960_color.arduino = {
    params: [
        { "target": "LIST_RGB", "unit": "PERCENT", "type": "List_Number" }
        ]
};

integrated_sensor.lps22hb_pressure = {};
integrated_sensor.lps22hb_pressure.arduino = {
    params: [
        { "target": "VARIABLE_VALUE", "unit": "PASCAL" }
        ]
};

integrated_sensor.hts221_temperature = {};
integrated_sensor.hts221_temperature.arduino = {
    params: [
        { "target": "VARIABLE_VALUE", "unit": "DEGREE" }
        ]
};

integrated_sensor.hts221_humidity = {};
integrated_sensor.hts221_humidity.arduino = {
    params: [
        { "target": "VARIABLE_VALUE", "unit": "PERCENT" }
        ]
};

var integrated_sensorAll = [];
integrated_sensorAll.arduino = [];

function init_integrated_sensor() {
    for (var sensor in integrated_sensor) {
        if (integrated_sensor.hasOwnProperty(sensor)) {
            Blockly.Blocks['robSensors_' + sensor + '_getDataAvailableSample'] = {
                sensor: sensor,
                init: function() {
                    Blockly.Blocks['robSensorsDataAvailable_generic'].init.call(this, integrated_sensor[this.sensor][this.workspace.device], this.sensor);
                }
            };
        }
    }
};

init_integrated_sensor();