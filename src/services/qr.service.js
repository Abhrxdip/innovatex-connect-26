import QRCode from "qrcode";

export async function generateQRCodeDataURL(payload) {
  try {
    const dataString = typeof payload === "string" ? payload : JSON.stringify(payload);
    return await QRCode.toDataURL(dataString, {
      errorCorrectionLevel: "H",
      type: "image/png",
      margin: 2,
      color: {
        dark: "#1E1B4B",
        light: "#FFFFFF",
      },
    });
  } catch (error) {
    throw new Error("QR Code Generation Failed");
  }
}
