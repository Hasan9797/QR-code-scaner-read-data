﻿# QR-code-scaner-read-data

# For Linux Operating System !!

# <b>Step 1:</b>

```
 npm i usb node-hid nodemon
```

# Identifying the VendorID and ProductID of the USB connected to the QR code scanner device,

# I used usb library for this

```
 const usb = require("usb");
 const HID = require('node-hid');

 const VENDOR_ID = 1317;
 const PRODUCT_ID = 42152;

 const devicesUSB = usb.getDeviceList();

 console.log("Connected USB devices:");

 devicesUSB.forEach((device) => {
   console.log("Manufacturer:", device.deviceDescriptor.iManufacturer);
   console.log("Product:", device.deviceDescriptor.iProduct);
   console.log("Serial Number:", device.deviceDescriptor.iSerialNumber);
   console.log("Vendor ID:", device.deviceDescriptor.idVendor);
   console.log("Product ID:", device.deviceDescriptor.idProduct);
   console.log(
     "----------------------------------------------------------------"
   );
 });

```
# USB vendorID and productID of connected devices:
```
Connected USB devices:
Manufacturer: 1
Product: 2
Serial Number: 0
Vendor ID: 2522
Product ID: 8808
----------------------------------------------------------------
Manufacturer: 1
Product: 2
Serial Number: 0
Vendor ID: 2522
Product ID: 34614
----------------------------------------------------------------
Manufacturer: 0
Product: 0
Serial Number: 0
Vendor ID: 32902
Product ID: 31456
----------------------------------------------------------------
Manufacturer: 0
Product: 0
Serial Number: 0
Vendor ID: 4318
Product ID: 6874
----------------------------------------------------------------
```
# Among them you can find the device you want to connect,

# how to: ?

# first disconnect your device from the computer and run the code, and then connect the device and run the code again, you can find the USB IDs you want.

# <b>Step 2:</b>

# Reading data from USB connected device via HID standby

```
 const devices = HID.devices();
 const scanner = devices.find(
   (device) => device.vendorId === VENDOR_ID && device.productId === PRODUCT_ID
 );

 if (scanner) {
   console.log("Scanner found:", scanner.manufacturer, scanner.product);

  // Create a new HID device instance
   const device = new HID.HID(scanner.path);

   // Listen for data events
  device.on("data", (data) => {
     const scannedData = data.toString("utf8");
     console.log("Scanned data:", scannedData);
     // Process the scanned data as needed
   });

   // Handle device errors
   device.on("error", (error) => {
     console.error("Scanner error:", error);
   });
 } else {
  console.log("Scanner not found");
 }

```
# If you place your QR code device VendorID and ProductID correctly

# and when the application is run on nodemon, when any QR code is hit on the device, console.log("Scanned data:", scannedData); will output the read information

# it should output its name as below
 ```
 Scanner found: SAGE Technology QR Scanner
 ```

