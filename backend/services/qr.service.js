import QRCode from "qrcode";

/**
 * Generates a scannable QR code from a plain ticket number string.
 * We intentionally encode ONLY the ticketNumber (e.g. "IXC-2026-A1B2C3")
 * and NOT a JSON object, so the QR is low-density and easy for any camera to read.
 */
export async function generateQRCodeDataURL(ticketNumber) {
  try {
    // Always encode just the plain ticket number string
    const dataString = typeof ticketNumber === "object"
      ? (ticketNumber.ticketNumber || JSON.stringify(ticketNumber))
      : String(ticketNumber);

    return await QRCode.toDataURL(dataString, {
      errorCorrectionLevel: "M",
      type: "image/png",
      margin: 3,
      width: 400,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
  } catch (error) {
    throw new Error("QR Code Generation Failed");
  }
}
