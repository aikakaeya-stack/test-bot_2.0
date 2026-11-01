"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Fixed storage location; mount Render's persistent disk at the app's data/ directory.
const sessionPath = path.resolve(process.cwd(), "data", "dashboard-session.enc");
function key() {
  const secret = String(process.env.ECLIPSE_SESSION_ENCRYPTION_KEY || "");
  if (Buffer.byteLength(secret) < 32) throw new Error("Set ECLIPSE_SESSION_ENCRYPTION_KEY to a secret of at least 32 bytes before using dashboard cookie storage.");
  return crypto.createHash("sha256").update(secret).digest();
}
function encrypt(value) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  const encrypted = Buffer.concat([cipher.update(String(value), "utf8"), cipher.final()]);
  return JSON.stringify({ version: 1, iv: iv.toString("base64"), tag: cipher.getAuthTag().toString("base64"), data: encrypted.toString("base64") }) + "\n";
}
function decrypt(raw) {
  const record = JSON.parse(raw);
  if (record.version !== 1) throw new Error("Unsupported encrypted session format.");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key(), Buffer.from(record.iv, "base64"));
  decipher.setAuthTag(Buffer.from(record.tag, "base64"));
  return Buffer.concat([decipher.update(Buffer.from(record.data, "base64")), decipher.final()]).toString("utf8");
}
function save(value) {
  const cookie = String(value || "").trim();
  if (!cookie || cookie.length > 120000 || /[\r\n]/.test(cookie)) throw new Error("Paste a valid cookie string (maximum 120 KB, single line).");
  const dir = path.dirname(sessionPath);
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  const temp = sessionPath + ".tmp";
  fs.writeFileSync(temp, encrypt(cookie), { mode: 0o600 });
  fs.renameSync(temp, sessionPath);
  try { fs.chmodSync(sessionPath, 0o600); } catch (_) {}
  return { saved: true };
}
function read() {
  if (!fs.existsSync(sessionPath)) return null;
  return decrypt(fs.readFileSync(sessionPath, "utf8"));
}
function status() {
  return { configured: fs.existsSync(sessionPath), storage: "encrypted" };
}
function clear() {
  if (fs.existsSync(sessionPath)) fs.unlinkSync(sessionPath);
  return { configured: false };
}
module.exports = { save, read, status, clear };
