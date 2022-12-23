# IoT Flow Asset Tracker driver in Javascript

Abeeway IoT Flow Asset Tracker driver implements the encoding / decoding of Abeeway Asset Tracker II firmware payloads.
This driver is for use as a library in a Node.js environment

## Example app
The IoT Flow Asset Tracker driver runs in a nodejs HTTP server. 
- Make sure that you have [NodeJS](https://nodejs.org/en/) installed. Latest version is recommanded.
- Install the driver using ```npm```

``` bash
npm install
```

- Launch the server
  
``` bash
node app.js
```

The server listens to port 4000 on `localhost`. You can change the port by modifying the line in `app.js`

``` javascript
app.listen(your_port, () => {
    console.log("Server listening on http://localhost:<your_port>")
})
```

## Decode an uplink
Make a HTTP request to ```http://{your_driver_url}/decodeuplink``` with the request body containing the uplink following the format:

``` json
{
    "bytes":{uplink_to_decode}
    "fPort":{port_of_uplink}
}
```

Request Example

``` http
POST /decodeuplink HTTP/1.1
Host: 127.0.0.1:4000
Content-Type: application/json
Content-Length: 82

{
    "bytes":"0b68647f100053b9d8000002d6000003d5000004d3000005",
    "fPort":17
}
```

Following table describes the fields in the decoded message:

<table> <tr> <td><strong>Parameter </strong> </td><td><strong>Type</strong> </td><td><strong>Description</strong> </td><td><strong>Supported since FW version</strong> </td><td><strong>Supported HW version</strong> </td></tr><tr> <td>gpsLatitude </td><td>Number </td><td>Latitude of the position (expressed in degrees). </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>gpsLongitude </td><td>Number </td><td>Longitude of the position (expressed in degrees). </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>horizontalAccuracy </td><td>Number </td><td>Estimated Horizontal Position Error, a measure of the error in a GPS position in the horizontal plane It is expressed in meters </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>messageType </td><td>String </td><td>Indicates the uplink type:<ul><li>POSITION_MESSAGE<li>HEARTBEAT<li>ENERGY_STATUS<li>SHUTDOWN<li>FRAME_PENDING<li>DEBUG<li>ACTIVITY_STATUS<li>CONFIGURATION<li>SHOCK_DETECTION<li>EVENT<li>DATA_SCAN_COLLECTION<li>PROXIMITY_DETECTION</li></ul> </td><td>1.7<p>Shock detection feature supported only since 1.8<p>Data scan collection feature supported since 2.0<p>Proximity detection feature supported since 2.1 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>age </td><td>Number </td><td>Age in seconds of message position given by the GPS technology only. The age of the WIFI or BLE scan </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>trackingMode </td><td>String </td><td>Tracker operating mode. Values can be: <ul> <li>STAND_BY <li>OFF <li>MOTION_TRACKING <li>PERMANENT_TRACKING <li>MOTION_START_END_TRACKING <li>ACTIVITY_TRACKING</li></ul> </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>batteryVoltage </td><td>Number </td><td> <ul> <li>The battery voltage. Expressed in Volts. If the value is equal to 0, it means that the battery is charging </li></ul> </td><td>1.7, &lt;2.0 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>batteryLevel </td><td>Number </td><td>The battery level. Expressed in %. If the value is equal to 0, it means that the battery is charging </td><td>2.0 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>batteryStatus </td><td>String </td><td>Tracker battery status. Values can be: <ul> <li>CHARGING <li>OPERATING <li>UNKNOWN</li></ul> </td><td>2.0 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>ackToken </td><td>Number </td><td>Acknowledgement token is used to inform the server of the reception of LoRa downlink messages. </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>firmwareVersion </td><td>String </td><td>Firmware Version </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>bleFirmwareVersion </td><td>String </td><td>BLE Firmware Version </td><td>1.8 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>resetCause </td><td>String </td><td>Reset cause </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>rawPositionType </td><td>String </td><td>Fix type describes what kind of data is in the uplink.<p>Values can be: <ul> <li>GPS <li>GPS_TIMEOUT <li>ENCRYPTED_WIFI_BSSIDS <li>WIFI_TIMEOUT <li>WIFI_FAILURE <li>XGPS_DATA <li>XGPS_DATA_WITH_GPS_SW_TIME <li>BLE_BEACON_SCAN <li>BLE_BEACON_FAILURE <li>WIFI_BSSIDS_WITH_NO_CYPHER <li>BLE_BEACON_SCAN_SHORT_ID <li>BLE_BEACON_SCAN_LONG_ID</li></ul> </td><td>1.7,<p>BLE Beacon ID (short and long) supported since 2.1 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>periodicPosition </td><td>Boolean </td><td>True if this is a periodic position message. </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>gpsOnRuntime </td><td>Number </td><td>The total time in seconds spent by the GPS in state ON since boot. It is transmitted in energy status message </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>gpsStandbyRuntime </td><td>Number </td><td>The total time in seconds spent by the GPS in state STANDBY since boot. It is transmitted in energy status message </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>wifiScanCount </td><td>Number </td><td>The total counter of WIFI scans since boot. No unit (counter). It is transmitted in energy status message </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>timeoutCause </td><td>String </td><td>The GPS timeout cause. Values can be <p>USER-TIMEOUT: the GPS was not able to compute a fix before the position message period, </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>bestSatellitesCOverN </td><td>Array </td><td><ul><li>when a "GPS Timeout" occurs, the rest of the LoRa message consists of the type of timeout that preempted the scan and the 4 best satellites C/N indicators, The bestSatellitesIndicator is an array.</li></ul> </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>temperatureMeasure </td><td>Number </td><td>Board temperature in °C </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>miscDataTag </td><td>String </td><td>Values can be:<ul><li>ACTIVITY_COUNTER<li>DEVICE_CONFIGURATION<li>SHOCK_DETECTION<li>PERIODIC_ACTIVITY</li></ul> </td><td>1.7<p>SHOCK_DETECTION and PERIODIC_ACTIVITY only since 1.8 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>sosFlag </td><td>Number </td><td><ul><li>Set if the user alert/SOS has been entered.</li></ul> </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>appState </td><td>Number </td><td>Tracking state. 1: tracking. 0: idle </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>dynamicMotionState </td><td>String </td><td>MOVING or STATIC </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>onDemand </td><td>Boolean </td><td>True if this is an on-demand message. </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>batteryVoltageMeasures </td><td>Array </td><td>Voltage measures reported under WIFI scan failures. </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>errorCode </td><td>Number </td><td>Error code. </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>debugErrorCode </td><td>Number </td><td>Unique error code corresponding to the crash </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>shutdownCause </td><td>String </td><td>Shutdown cause.<p>Values can be <ul><li> USER-ACTION <li> LOW-BATTERY <li> DOWNLINK-REQUEST<li> BLE_REQUEST<li> BLE_CONNECTED</li></ul> </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>currentAckTokenValue </td><td>Number </td><td><ul><li>Current Ack Token value</li></ul> </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>payload </td><td>string </td><td>The uplink payload </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr><tr> <td>debugCrashInfo </td><td>String </td><td>Crash information in ASCII </td><td>1.7 </td><td>Micro, Industrial, Compact, Badge </td></tr>


## Encode a downlink

Make a HTTP request to ```http://{your_driver_url}/encodedownlink``` with the request body containing the downlink in json following the format:

Request Example

``` http
POST /encodedownlink HTTP/1.1
Host: 127.0.0.1:4000
Content-Type: application/json
Content-Length: 249

{
    "downMessageType": "SET_PARAM",
    "ackToken": 2,
    "setParameters": {
        "proximityReminderDistance": 10,
        "proximityWarningDisableDistance": 130,
        "proximityMaxSpeedFilter": 20,
        "proximityMaxUpdate": 300
    }
}
```
The returned message is the encoded downlink

Each downlink message should contain the following fields:
* _DownMessageType_: Type of downlink messages (string format). Acceptable values are:
    *   _POS_ON_DEMAND_: Request a position
    *   _SET_MODE_: Change the operation mode of a tracker.
    *   _START_SOS_: Start the SOS mode.
    *   _STOP_SOS_: Stop the SOS mode.
    *   _DEBUG_COMMAND_: Send debug commands
    *   _SET_PARAM_: Modify tracker’s parameter(s).
    *   _REQUEST_CONFIG_: Read the tracker configuration.
    *   _REQUEST_TEMPERATURE_STATUS_: request a temperature status
    *   _PROXIMITY_: Send a proximity request message
*   _AckToken_: Random integer ranging from 0 to 15 and used by the tracker to acknowledge the downlink message. Refer to the abeeway-reference-guide-fw1.8.pdf document for more details on setting/processing this field.

Notes:



*   Each field name should be coded as a string.
*   Extra fields should be provided according to the downlink message type.
*   **All types of messages are supported since AssetTracker V1.7 except REQUEST_TEMPERATURE_STATUS. However, some parameters are new since v1.8 or v1.9 or v2.1 in SET_PARAM, REQUEST_CONFIG and DEBUG_COMMAND messages**

The following sections detail each downlink message types in an example and their required fields.

### Request a position

This message requests a position to the tracker. The request does not require extra fields.

``` json
{
    "downMessageType": "POS_ON_DEMAND",
    "ackToken": 10
}

```

The response is: `010a`

### Operational mode change

This message change the tracker operational mode. The request requires an extra field called


    _ModeValue_, which can take the following string  values:

*   _STAND_BY_: Set the tracker in standby.
*   _MOTION_TRACKING_: Set the tracker in motion tracking.
*   _PERMANENT_TRACKING_: Set the tracker in permanent tracking.
*   _MOTION_START_END_TRACKING_: Set the tracker in start/end mode
*   _ACTIVITY_TRACKING_: Set the tracker in activity tracking mode.
*   _OFF_: Set the tracker in off mode. Note that the master tracker will interpret this mode as _STANDBY_ (since it cannot be woke up using the button).

``` json
{
   "downMessageType":"SET_MODE",
   "modeValue":"MOTION_TRACKING",
   "ackToken":3
}
```
The response is: `020301`


### SOS start

This message turns on the SOS mode of the tracker. The request does not require extra fields.

``` json
{
   "downMessageType":"START_SOS",
   "ackToken":2
}
```
The response is: `0402`

### SOS stop

This message turns off the SOS mode of the tracker. The request does not require extra fields.

``` json
{
   "downMessageType":"STOT_SOS",
   "ackToken":3
}
```

The response is: `0503`

### Request temperature status

This message requests the temperature alert status of the device. The request does not require extra fields.

``` json
{
   "downMessageType":"REQUEST_TEMPERATURE_STATUS",
   "ackToken":3
}
```

The response is: `0603`

### Proximity messages

The proximity requests require an extra object called _proximityMessage_.

#### Request proximity record status

This message requests the status of the record matching the Rolling Proximity Identifier (RPI).
The _ProximityMessage_ object requires two fields:

- _type_: “GET_RECORD_STATUS”
- _rollingProximityIdentifier_: Rolling proximity identifier hexadecimal string.

``` json
{
   "downMessageType":"PROXIMITY",
   "proximityMessage":{
      "type":"GET_RECORD_STATUS",
      "rollingProximityIdentifier":"000000000000000020635f017100000d"
   },
   "ackToken":3
}
```

The response is: `070300000000000000000020635f017100000d`

#### Set proximity record white list status

This message sets the status of the record matching the Rolling Proximity Identifier (RPI).
The _ProximityMessage_ object requires three fields:

- _type_: SET_WHITE_LIST_STATUS
- _rollingProximityIdentifier_: Rolling proximity identifier hexadecimal string.
- _recordStatus_: _RESET_WHITE_LISTING_ or _SET_WHITE_LISTING_

``` json
{
   "downMessageType":"PROXIMITY",
   "proximityMessage":{
      "type":"SET_WHITE_LIST_STATUS",
      "rollingProximityIdentifier":"000000000000000020635f017100000d",
      "recordStatus":"SET_WHITE_LISTING"
   },
   "ackToken":3
}
```

The response is:  `070301000000000000000020635f017100000d01`.


#### Get proximity daily information

This message requests the proximity daily information of the tracker.
The _ProximityMessage_ object requires three fields:

-   _type_: GET_DAILY_INFORMATION
-   _dayIdentifier_: Day for which we are requesting the information.

``` json
{
   "downMessageType":"PROXIMITY",
   "proximityMessage":{
      "type":"GET_DAILY_INFORMATION",
      "dayIdentifier":2
   },
   "ackToken":3
}
```

The response is:  `07030202`.

#### Clear proximity daily information

This message clears the proximity daily information of the tracker.
The _ProximityMessage_ object requires three fields:

- _type_: CLEAR_DAILY_INFORMATION
- _dayIdentifier_: Day for which we are requesting the information.

``` json
{
   "downMessageType":"PROXIMITY",
   "proximityMessage":{
      "type":"CLEAR_DAILY_INFORMATION",
      "dayIdentifier":2
   },
   "ackToken":3
}
```

The response is:  `07030302`.

### Debug command

This message performs debug actions on the tracker. The request requires an extra field called _DebugCommandType_, which can take the following string  values:

- _RESET_: Reset the tracker. Optional values can be given to specify the reset action.
- _READ_CURRENT_ERROR_AND_SEND_IT_: Read the last registered error and send it via LoRa.
- _MAKE_TRACKER_RING_: make the device ring
- _TRIGGER_AN_ERROR_: Generate an error. Internal use only.
- _RESET_BLE_PAIRING_: Delete the BLE bonding.
- _TRIGGER_HEARTBEAT_MESSAGE_: Trigger a heartbeat message
- _READ_TX_POWER_INDEX_: Read TX Power Index and send a TX power debug uplink
- _WRITE_TX_POWER_INDEX_: Write New TX Power Index ( For this type of debug command, a TxPowerIndex value is needed)
- _TRIGGER_BLE_BOOTLOADER_: Trigger BLE bootloader



#### Reset Device

``` json
{
   "downMessageType":"DEBUG_COMMAND",
   "debugCommandType":"RESET",
   "ackToken":2
}
```

The response is:  `ff0201`.

**Reset Device with reset action value specified**

This message resets the device with a reset action specified. Possible values are: *RESET_DEVICE*, *DELETE_CONFIG_RESET*, *DELETE_CONFIG_BLE_BOND_RESET*. This value is optional. If it is missing, the command is equivalent to the one with the value set to *RESET_DEVICE*. **ResetAction is new from AT v1.8.**

``` json
{
   "downMessageType":"DEBUG_COMMAND",
   "debugCommandType":"RESET",
   "ackToken":2,
   "resetAction": "DELETE_CONFIG_BLE_BOND_RESET"
}
```

The response is:  `ff020103`.


#### Write New TX Power Index

This message performs write new TX Power Index. The request requires an extra field called_DebugCommandType_ containing *WRITE_TX_POWER_INDEX*  and a second the field called  *TxPowerIndex* containing the new value of TX Power Index.

``` json
{
   "downMessageType":"DEBUG_COMMAND",
   "debugCommandType":"WRITE_TX_POWER_INDEX",
   "ackToken":2,
   "txPowerIndex":2
}
```

The response is:  `ff020702`.

#### Set buzzer melody and duration

This message rings the tracker with a specific melody and duration . The request requires an extra field called _DebugCommandType_ containing  _MAKE_TRACKER_RING_. Second field _melodyId_ and third field _buzzerDuration_ are both optional.

``` json
{
   "downMessageType":"DEBUG_COMMAND",
   "ackToken":2,
   "debugCommandType":"MAKE_TRACKER_RING",
   "melodyId":"BLE_ADVERTISING",
   "buzzerDuration":100
}
```

The response is:  `ff02030764`.

#### Parameter read

The driver provides a smart way to retrieve the tracker configuration. With a single command (downlink), you can either read the value of one or more parameters or retrieve the whole configuration.

The request (downlink message) is built as usual with the _downMessageType_ field set to the string value _REQUEST_CONFIG_.

An optional field called _ListParameterID_ can be also provided:

*   When provided: its value contains the list of parameter identifiers that is expected.
*   When omitted: the full configuration will be requested.

Note that, the tracker will answer this downlink message with one or more uplinks. Each related uplinks will have the _messageType_ set to _CONFIGURATION _and the _miscDataTag_ set to _DEVICE_CONFIGURATION_. The field _deviceConfiguration_ will be filled with the parameters list and their values.

The tracker is able to send up to 5 parameters value in one uplink. This means that if more than 5 parameters (or the full configuration) is requested, the tracker will send the required number of uplinks to fulfill the request.

The following table provide the mapping between the parameter names used by the decoder, the names used by the tracker and the identifiers.

<table> <tr> <td><strong>Parameter identifier</strong> </td><td><strong>Decoder name</strong> </td><td><strong>Config name</strong> </td><td><strong>Range</strong> </td><td><strong>Unit</strong> </td><td><strong>Supported since FW version</strong> </td></tr><tr> <td>0 </td><td>TRACKING_UL_PERIOD </td><td>ul_period </td><td>60-86400 </td><td>Seconds </td><td>1.7 </td></tr><tr> <td>1 </td><td>LORALIVE_PERIOD </td><td>lora_period </td><td>300-86400 </td><td>Seconds </td><td>1.7 </td></tr><tr> <td>2 </td><td>ENERGY_STATUS_PERIOD </td><td>pw_stat_period </td><td>0,300-604800 </td><td>Seconds </td><td>1.7 </td></tr><tr> <td>3 </td><td>PERIODIC_POSITION_PERIOD </td><td>periodic_pos_period </td><td>0,900-604800 </td><td>Seconds </td><td>1.7 </td></tr><tr> <td>4 </td><td>GPS_SCAN_MODE </td><td>NA </td><td>0 </td><td>NA </td><td>1.7 </td></tr><tr> <td>5 </td><td>GEOLOC_SENSOR_PROFILE </td><td>geoloc_sensor </td><td>NA </td><td>NA </td><td>1.7 </td></tr><tr> <td>6 </td><td>ONESHOT_GEOLOC_METHOD </td><td>geoloc_method </td><td>NA </td><td>NA </td><td>1.7 </td></tr><tr> <td>7 </td><td>EXT_ANTENNA_PROFILE </td><td>antenna </td><td>NA </td><td>NA </td><td>1.7 </td></tr><tr> <td>8 </td><td>MOTION_START_END_NB_TX </td><td>motion_nb_ps </td><td>1-60 </td><td>NA </td><td>1.7 </td></tr><tr> <td>9 </td><td>GPS_TIMEOUT </td><td>gps_timeout </td><td>30-300 </td><td>Seconds </td><td>1.7 </td></tr><tr> <td>10 </td><td>XGPS_TIMEOUT </td><td>agps_timeout </td><td>30-250 </td><td>Seconds </td><td>1.7 </td></tr><tr> <td>11 </td><td>GPS_EHPE </td><td>gps_ehpe </td><td>0-100 </td><td>Meters </td><td>1.7 </td></tr><tr> <td>12 </td><td>GPS_CONVERGENCE </td><td>gps_convergence </td><td>0-300 </td><td>Seconds </td><td>1.7 </td></tr><tr> <td>13 </td><td>CONFIG_FLAGS </td><td>config_flags </td><td>NA </td><td>NA </td><td>1.7 </td></tr><tr> <td>14 </td><td>TRANSMIT_STRAT </td><td>transmit_strat </td><td>NA </td><td>NA </td><td>1.7 </td></tr><tr> <td>15 </td><td>BLE_BEACON_COUNT </td><td>BLE_beacon_count </td><td>4 </td><td>NA </td><td>1.7 </td></tr><tr> <td>16 </td><td>BLE_BEACON_TIMEOUT </td><td>BLE_beacon_timeout </td><td>1-5 </td><td>Seconds </td><td>1.7 </td></tr><tr> <td>17 </td><td>GPS_STANDBY_TIMEOUT </td><td>gps_standby_timeout </td><td>0-28800 </td><td>Seconds </td><td>1.7 </td></tr><tr> <td>18 </td><td>CONFIRMED_UL_BITMAP </td><td>confirmed_ul_bitmap </td><td>NA </td><td>NA </td><td>1.7 </td></tr><tr> <td>19 </td><td>CONFIRMED_UL_RETRY </td><td>confirmed_ul_retry </td><td>0-8 </td><td>NA </td><td>1.7 </td></tr><tr> <td>20 </td><td>MOTION_SENSITIVITY </td><td>motion_sensitivity </td><td>0-300 </td><td>NA </td><td>1.8 </td></tr><tr> <td>21 </td><td>SHOCK_DETECTION </td><td>shock_detection </td><td>0-100 </td><td>Percent </td><td>1.8 </td></tr><tr> <td>22 </td><td>PERIODIC_ACTIVITY_PERIOD </td><td>periodic_activity_period </td><td>0,1800-86400 </td><td>Seconds </td><td>1.8 </td></tr><tr> <td>23 </td><td>MOTION_DURATION </td><td>motion_duration </td><td>60-3600 </td><td>Seconds </td><td>1.8 </td></tr><tr> <td>24 </td><td>GEOFENCING_SCAN_PERIOD </td><td>NA </td><td>0-300 </td><td>Seconds </td><td>1.8 </td></tr><tr> <td>25 </td><td>GEOFENCING_UL_PERIOD </td><td>NA </td><td>60-86400 </td><td>Seconds </td><td>1.8 </td></tr><tr> <td>26 </td><td>BLE_RSSI_FILTER </td><td>ble_rssi_filter </td><td>-100- -40 </td><td>dBm </td><td>1.8 </td></tr><tr> <td>27 </td><td>TEMPERATURE_HIGH </td><td>temperature_high </td><td>-44- 85,255 </td><td>°C </td><td>1.9 </td></tr><tr> <td>28 </td><td>TEMPERATURE_LOW </td><td>temperature_low </td><td>-44- 85,255 </td><td>°C </td><td>1.9 </td></tr><tr> <td>29 </td><td>TEMPERATURE_ACTION </td><td>temperature_action </td><td>NA </td><td>NA </td><td>1.9 </td></tr><tr> <td>30 </td><td>TRANSMIT_STRAT_CUSTOM </td><td>transmit_strat_custom </td><td>NA </td><td>NA </td><td>1.9 </td></tr><tr> <td>31 </td><td>NETWORK_TIMEOUT_CHECK </td><td>network_timeout_check </td><td>0,86400-5184000 </td><td>Seconds </td><td>2.0 </td></tr><tr> <td>32 </td><td>NETWORK_TIMEOUT_RESET </td><td>network_timeout_reset </td><td>0,21600-2592000 </td><td>Seconds </td><td>2.0 </td></tr><tr> <td>33 </td><td>COLLECTION_SCAN_TYPE </td><td>collection_scan_type </td><td>NA </td><td>NA </td><td>2.0 </td></tr><tr> <td>34 </td><td>COLLECTION_NB_ENTRY </td><td>collection_nb_entry </td><td>1-20 </td><td>NA </td><td>2.0 </td></tr><tr> <td>35 </td><td>COLLECTION_BLE_FILTER_TYPE </td><td>collection_ble_filter_type </td><td>NA </td><td>NA </td><td>2.0 </td></tr><tr> <td>36 </td><td>COLLECTION_BLE_FILTER_MAIN_1 </td><td>collection_ble_filter_main_1 </td><td>NA </td><td>NA </td><td>2.0 </td></tr><tr> <td>37 </td><td>COLLECTION_BLE_FILTER_MAIN_2 </td><td>collection_ble_filter_main_2 </td><td>NA </td><td>NA </td><td>2.0 </td></tr><tr> <td>38 </td><td>COLLECTION_BLE_FILTER_SEC_VALUE </td><td>collection_ble_filter_sec_value </td><td>NA </td><td>NA </td><td>2.0 </td></tr><tr> <td>39 </td><td>COLLECTION_BLE_FILTER_SEC_MASK </td><td>collection_ble_filter_sec_mask </td><td>NA </td><td>NA </td><td>2.0 </td></tr><tr> <td>40 </td><td>BATTERY_CAPACITY </td><td>battery_capacity </td><td>-1,0-65535 </td><td>mAh </td><td>2.0 </td></tr><tr> <td>41 </td><td>REED_SWITCH_CONFIGURATION </td><td>reed_switch_ configuration </td><td>NA </td><td>NA </td><td>2.0 </td></tr><tr> <td>42 </td><td>GNSS_CONSTELLATION </td><td>gnss_constellation </td><td>NA </td><td>NA </td><td>2.0 </td></tr><tr> <td>43  </td><td>PROXIMITY_MINIMUM_SCAN_POWER </td><td>prox_scan_pwr_min </td><td>-90 ... 10 </td><td>dBm </td><td>2.1 </td></tr><tr> <td>44  </td><td>PROXIMITY_DISTANCE_COEFFICIENT </td><td>prox_distance_coef </td><td>1 – 256 </td><td>NA </td><td>2.1 </td></tr><tr> <td>45  </td><td>PROXIMITY_SCAN_FREQUENCY </td><td>prox_scan_frequency </td><td>2 – 3600 </td><td>NA </td><td>2.1 </td></tr><tr> <td>46  </td><td>PROXIMITY_BACKTRACE_MAXIMUM_AGE </td><td>prox_backtrace_max_age </td><td>1 – 256 </td><td>Seconds </td><td>2.1 </td></tr><tr> <td>47  </td><td>PROXIMITY_DISTANCE_SLIDING_WINDOW </td><td>prox_dist_sliding_window </td><td>1 – 256 </td><td>Seconds </td><td>2.1 </td></tr><tr> <td>48  </td><td>PROXIMITY_EXPOSURE_50 </td><td>prox_exposure_50 </td><td>0 – 256 </td><td>NA </td><td>2.1 </td></tr><tr> <td>49  </td><td>PROXIMITY_EXPOSURE_100 </td><td>prox_exposure_100 </td><td>0 – 256 </td><td>NA </td><td>2.1 </td></tr><tr> <td>50  </td><td>PROXIMITY_EXPOSURE_150 </td><td>prox_exposure_150 </td><td>0 – 256 </td><td>NA </td><td>2.1 </td></tr><tr> <td>51  </td><td>PROXIMITY_EXPOSURE_200 </td><td>prox_exposure_200 </td><td>0 – 256 </td><td>NA </td><td>2.1 </td></tr><tr> <td>52  </td><td>PROXIMITY_EXPOSURE_250 </td><td>prox_exposure_250 </td><td>0 – 256 </td><td>NA </td><td>2.1 </td></tr><tr> <td>53  </td><td>PROXIMITY_EXPOSURE_300 </td><td>prox_exposure_300 </td><td>0 – 256 </td><td>NA </td><td>2.1 </td></tr><tr> <td>54  </td><td>PROXIMITY_EXPOSURE_400 </td><td>prox_exposure_400 </td><td>0 – 256 </td><td>NA </td><td>2.1 </td></tr><tr> <td>55  </td><td>PROXIMITY_IMMEDIATE_ALARM_DISTANCE </td><td>prox_alarm_dist_immediate </td><td>0-10 </td><td>Meters </td><td>2.1 </td></tr><tr> <td>56  </td><td>PROXIMITY_ALARM_EXPOSURE </td><td>prox_alarm_exposure </td><td>0-65535 </td><td>NA </td><td>2.1 </td></tr><tr> <td>57  </td><td>PROXIMITY_IMMEDIATE_WARNING_DISTANCE </td><td>prox_warn_dist_immediate </td><td>0-10 </td><td>Meters </td><td>2.1 </td></tr><tr> <td>58  </td><td>PROXIMITY_WARNING_EXPOSURE </td><td>prox_warn_exposure </td><td>0-65535 </td><td>NA </td><td>2.1 </td></tr><tr> <td>59  </td><td>PROXIMITY_IMMEDIATE_RECORD_DISTANCE </td><td>prox_record_dist_immediate </td><td>0-10 </td><td>Meters </td><td>2.1 </td></tr><tr> <td>60  </td><td>PROXIMITY_RECORD_EXPOSURE </td><td>prox_record_exposure </td><td>1-65535 </td><td>NA </td><td>2.1 </td></tr><tr> <td>61  </td><td>PROXIMITY_ALARM_BUZZER_DURATION </td><td>prox_alarm_buz_dur </td><td>0-256 </td><td>Seconds </td><td>2.1 </td></tr><tr> <td>62  </td><td>PROXIMITY_WARNING_BUZZER_DURATION </td><td>prox_warn_buz_dur </td><td>0-256 </td><td>Seconds </td><td>2.1 </td></tr><tr> <td>63  </td><td>PROXIMITY_CONTACT_POLICY </td><td>prox_contact_policy </td><td>NA </td><td>NA </td><td>2.1 </td></tr><tr> <td>64  </td><td>PROXIMITY_SCAN_DURATION </td><td>prox_scan_duration </td><td>0-60 </td><td>Seconds </td><td>2.1 </td></tr><tr> <td>65  </td><td>PROXIMITY_SCAN_WINDOW </td><td>prox_scan_window </td><td>10-10240 </td><td>Milliseconds </td><td>2.1 </td></tr><tr> <td>66  </td><td>PROXIMITY_SCAN_INTERVAL </td><td>prox_scan_Interval </td><td>15-10245 </td><td>Millisecond </td><td>2.1 </td></tr><tr> <td>67  </td><td>PROXIMITY_ALARM_REMANENCE </td><td>prox_alarm_remanence </td><td>0-256 </td><td>Seconds </td><td>2.1 </td></tr><tr> <td>68  </td><td>PROXIMITY_WARNING_REMANENCE </td><td>prox_warn_remanence </td><td>0-256 </td><td>Seconds </td><td>2.1 </td></tr><tr> <td>69  </td><td>PROXIMITY_BEACON_REPEAT </td><td>prox_bcn_repeat </td><td>0-65535 </td><td>Milliseconds </td><td>2.1 </td></tr><tr> <td>70  </td><td>PROXIMITY_BEACON_TX_POWER </td><td>prox_bcn_tx_power </td><td>-60..-20 </td><td>dBm </td><td>2.1 </td></tr><tr> <td>71  </td><td>PROXIMITY_REMINDER_PERIOD </td><td>prox_reminder_period </td><td>0-256 </td><td>Seconds </td><td>2.1 </td></tr><tr> <td>72  </td><td>PROXIMITY_REMINDER_DISTANCE </td><td>prox_reminder_distance </td><td>0-25.6 </td><td>Meters </td><td>2.1 </td></tr><tr> <td>73  </td><td>PROXIMITY_WARNING_DISABLE_DISTANCE </td><td>prox_warn_disable_dist </td><td>1-25.6 </td><td>Meters </td><td>2.1 </td></tr><tr> <td>74  </td><td>PROXIMITY_ALARM_DISABLE_DISTANCE </td><td>prox_alarm_disable_dist </td><td>1-25.6 </td><td>Meters </td><td>2.1 </td></tr><tr> <td>75 </td><td>PROXIMITY_MAX_SPEED_FILTER </td><td>prox_max_speed_filter </td><td>0 – 40 </td><td>Meters/s </td><td>2.1 </td></tr><tr> <td>76 </td><td>PROXIMITY_MAX_UPDATE </td><td>prox_max_update </td><td>300 – 43200 </td><td>Seconds </td><td>2.1 </td></tr><tr> <td>77 </td><td>BLE_FILTER_TYPE </td><td>position_ble_filter_type </td><td>NA </td><td>NA </td><td>2.1 </td></tr><tr> <td>78 </td><td>BLE_FILTER_MAIN_1 </td><td>position_ble_filter_main_1 </td><td>NA </td><td>NA </td><td>2.1 </td></tr><tr> <td>79 </td><td>BLE_FILTER_MAIN_2 </td><td>position_ble_filter_main_2 </td><td>NA </td><td>NA </td><td>2.1 </td></tr><tr> <td>80 </td><td>BLE_FILTER_SEC_FILTER_VALUE </td><td>position_ble_filter_sec_value </td><td>NA </td><td>NA </td><td>2.1 </td></tr><tr> <td>81 </td><td>BLE_FILTER_SEC_FILTER_MASK </td><td>position_ble_filter_sec_mask </td><td>NA </td><td>NA </td><td>2.1 </td></tr><tr> <td>82 </td><td>BLE_FILTER_REPORT_TYPE </td><td>position_ble_report_type </td><td>NA </td><td>NA </td><td>2.1 </td></tr><tr> <td>83 </td><td>BUZZER_VOLUME </td><td>buzzer_volume </td><td>0-100 </td><td>NA </td><td>2.1 </td></tr><tr> <td colspan="6" ><strong>Special parameters</strong> </td></tr><tr> <td>247 </td><td>POWER_CONSUMPTION </td><td>NA </td><td>0-4294967295 </td><td>mA </td><td>2.0 </td></tr><tr> <td>248 </td><td>BLE_BOND </td><td>NA </td><td>NA </td><td>NA </td><td>1.9 </td></tr><tr> <td>249 </td><td>GET_MODE </td><td>NA </td><td>NA </td><td>NA </td><td>1.9 </td></tr><tr> <td>250 </td><td>X_ACCELEROMETER_VALUE </td><td>NA </td><td>NA </td><td>mg </td><td>1.8 </td></tr><tr> <td>251 </td><td>Y_ACCELEROMETER_VALUE </td><td>NA </td><td>NA </td><td>mg </td><td>1.8 </td></tr><tr> <td>252 </td><td>Z_ACCELEROMETER_VALUE </td><td>NA </td><td>NA </td><td>mg </td><td>1.8 </td></tr><tr> <td>253 </td><td>BLE_VERSION </td><td>NA </td><td>NA </td><td>NA </td><td>1.7 </td></tr><tr> <td>254 </td><td>FW_VERSION </td><td>NA </td><td>NA </td><td>NA </td><td>1.7 </td></tr></table>

#### Request the full configuration

``` json
{
   "downMessageType":"REQUEST_CONFIG",
   "ackToken":1
}
```

The response is:  `0301`.

#### Request only the parameters having the identifier 1,2,3,4 and 5.

``` json
{
   "downMessageType":"REQUEST_CONFIG",
   "ackToken":1,
   "listParameterID": [
            1,
            2,
            3,
            4,
            5
        ]
}
```

The response is:  `03020102030405`.

### Parameter modification

This message allows the modification of a configuration parameter. It requires systematically an extra field called _ParameterName_ containing the string name of the parameter and a second field containing the new value. The following table provides the list of accepted parameter names as well as the second field name and its value.

For the list of parameters, see Device configuration object

**Note: Abeeway Driver allows you to set max 5 parameters at the same time in the same downlink**

#### Modify the GPS parameters:

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":10,
   "setParameters":{
      "gpsTimeout":120,
      "xgpsTimeout":250,
      "gpsEHPE":100,
      "gpsStandbyTimeout":10
   }
}
```

The response is:  `0b0a09000000780a000000fa0b00000064110000000a`.

#### Modify the BLE parameters:

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":10,
   "setParameters":{
        "bleBeaconCount": 1028,
        "bleRssiFilter": -80,
        "bleBeaconTimeout": 165
   }
}
```

The response is:  `0b0a0f0000040410000000a51affffffb0`.

#### Modify the Operational mode Parameters:

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":2,
   "setParameters":{
      "trackingUlPeriod":86400,
      "loralivePeriod":3600,
      "geolocSensorProfile":"WIFI_ONLY",
      "motionStartEndNbTx":30,
      "motionDuration":3600
   }
}
```

The response is:  `0b0200000151800100000e100500000000080000001e1700000e10`.

#### Modify the LORA parameters:

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":1,
   "setParameters":{
      "transmitStrat":"DOUBLE_FIXED",
      "confirmedUplink":{
         "confirmedUlBitmap":8,
         "confirmedUlRetry":10,
         "framePending":false,
         "position":true,
         "energyStatus":false,
         "heartbeat":false,
         "activityStatus":false,
         "configuration":false,
         "shockDetection":false,
         "shutdown":false,
         "event":false,
         "debug":false
      }
   }
}
```

The response is:  `0b010e000000021200000008130000000a`.

#### Modify the side operational mode parameters:

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":5,
   "setParameters":{
      "periodicPositionInterval":900,
      "oneshotGeolocMethod":"BLE",
      "periodicActivityPeriod":1800
   }
}
```

The response is:  `0b050300000384060000000a1600000708`.

#### Modify Config Flags

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":10,
   "setParameters":{
      "configFlags":{
         "framePendingMechanism":true,
         "buttonPressToTurnOFF":false,
         "doubleClickIsSosModeOrAlert":false,
         "wifiPayloadWithNoCypher":true,
         "bleAdvertisingAtStart":false,
         "selectWifiScanOrGeolocStartMessage":false,
         "downlinkSetParameterConfirmation":true,
         "ledBlinkWithGpsFix":false,
         "startMotionEventUplink":true,
         "endMotionEventUplink":false,
         "otaJoinWhenLeavingModeOff":false,
         "rejectAsymmetricPairing":false,
         "enableLongWifiPayload":false,
         "collectionLongReport":true,
         "autoStart":false,
         "automaticDatarateSelection":false,
         "forbidModeOff":false,
         "sosModeSound":false
      }
   }
}
```

The response is:  `0b0a0d00002119`.


#### Modify accelerometer parameters:

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":10,
   "setParameters":{
      "motionSensitivity":50,
      "shockDetection":100
   }
}
```

The response is:  `0b0a14000000321500000064`.

####  Modify temperature parameters:

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":6,
   "setParameters":{
      "temperatureHigh":60,
      "temperatureLow":-40,
      "temperatureAction":"TEMPERATURE_HIGH_TEMPERATURE_LOW"
   }
}
```

The response is:  `0b061b0000003c1cffffffd81d00000003`.

#### Modify special parameters:

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":10,
   "setParameters":{
      "mode":"ACTIVITY_TRACKING",
      "bleBond":"NOT_BONDED"
   }
}
```

The response is:  `0b06f800000000f900000004`.

#### Modify Custom Transmission Strat parameters:

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":6,
   "setParameters":{
      "transmitStratCustom":{
         "firstTransmissionDatarateDistribution":"RANDOM",
         "secondTransmissionDatarateDistribution":"BELL_CURVE",
         "firstTransmissionDatarate":{
            "dr0":false,
            "dr1":true,
            "dr2":false,
            "dr3":true,
            "dr4":false,
            "dr5":false,
            "dr6":false,
            "dr7":false
         },
         "secondTransmissionDatarate":{
            "dr0":false,
            "dr1":false,
            "dr2":true,
            "dr3":false,
            "dr4":true,
            "dr5":false,
            "dr6":false,
            "dr7":false
         },
         "transmissionType":"DOUBLE",
         "ADREnabled":true
      }
   }
}
```

The response is:  `0b061e00140a22`.

#### Modify scan collection parameters:

Note: BLE position filtering requires update of 7 parameters so we need to send two downlinks as we can only set 5 parameters at a time for one downlink message

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":10,
   "setParameters":{
      "collectionScanType":"BLE_BEACONS",
      "collectionBleFilterMain1":51966,
      "collectionBleFilterMain2":57005,
      "collectionBleFilterSecValue":47834,
      "collectionBleFilterSecMask":47806
   }
}
```

The response is:  `0b0a2100000001240000cafe250000dead260000bada270000babe`.

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":10,
   "setParameters":{
      "collectionBleFilterType":"EDDYSTONE_UID",
      "collectionNbEntry":7
   }
}
```

The response is:  `0b0a22000000072300000001`.

#### Modify BLE Position Filtering parameters:

Note: BLE position filtering requires update of 7 parameters so we need to send two downlinks as we can only set 5 parameters at a time for one downlink message

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":10,
   "setParameters":{
      "bleFilterType":"EDDYSTONE_UID",
      "bleFilterMain1":51966,
      "bleFilterMain2":57005,
      "bleFilterSecValue":47834,
      "bleFilterSecMask":47806
   }
}
```

The response is:  `0b0a4d000000014e0000cafe4f0000dead500000bada510000babe`.

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":10,
   "setParameters":{
      "bleBeaconCount":4,
      "bleFilterReportType":"SHORT_ID"
   }
}
```

The response is:  `0b0a0f000000045200000001`.

#### Modify proximity detection parameters:

``` json
{
   "downMessageType":"SET_PARAM",
   "ackToken":10,
   "setParameters":{
      "proximityContactPolicy":{
         "enable":true,
         "store":true,
         "uplink":true
      },
      "proximityScanDuration":51966,
      "proximityScanWindow":57005
   }
}
```

The response is:  `0b0a3f00000000740000cafe410000dead`.


## Decode a downlink

Make a HTTP request to ```http://{your_driver_url}/decodedownlink``` with the request body containing the downlink in json following the format:

Request Example

``` http
POST /decodedownlink HTTP/1.1
Host: 127.0.0.1:4000
Content-Type: application/json
Content-Length: 33

{
    "bytes": "03023738393a3b"
}
``` 
The returned message is the decoded downlink. For more information of the decoded downlink, check the section [Encode an downlink](#encode-a-downlink)
