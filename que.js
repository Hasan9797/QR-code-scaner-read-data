
const usb = require("usb");
const HID = require('node-hid');
// Replace with your scanner's VID and PID
const VENDOR_ID = 1317;
const PRODUCT_ID = 42152;


// Get the list of connected USB devices
// const devicesUSB = usb.getDeviceList();

// console.log("Connected USB devices:");

// devicesUSB.forEach((device) => {
//   console.log("Manufacturer:", device.deviceDescriptor.iManufacturer);
//   console.log("Product:", device.deviceDescriptor.iProduct);
//   console.log("Serial Number:", device.deviceDescriptor.iSerialNumber);
//   console.log("Vendor ID:", device.deviceDescriptor.idVendor);
//   console.log("Product ID:", device.deviceDescriptor.idProduct);
//   console.log(
//     "----------------------------------------------------------------"
//   );
// });

// Find the scanner device
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
