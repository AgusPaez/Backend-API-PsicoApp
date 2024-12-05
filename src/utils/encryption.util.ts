import crypto from "crypto";

// Claves de cifrado desde el entorno
const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "lodfr42sjumnfs4890oi56rdescfl234";
const ENCRYPTION_IV = process.env.ENCRYPTION_IV || "1234567899284637";

export const encryptData = (data: string): string => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(ENCRYPTION_IV)
  );
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decryptData = (encryptedData: string): string => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(ENCRYPTION_IV)
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};
