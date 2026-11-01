"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");

test("dashboard session store encrypts saved cookies and reads them back", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "test-bot-session-"));
  const file = path.join(dir, "session.enc");
  const previousPath = process.env.BOT_SESSION_PATH;
  const previousKey = process.env.ECLIPSE_SESSION_ENCRYPTION_KEY;
  process.env.BOT_SESSION_PATH = file;
  process.env.ECLIPSE_SESSION_ENCRYPTION_KEY = "test-only-encryption-key-32-bytes-minimum";
  try {
    const store = require("../session-store");
    const cookie = "c_user=12345; xs=secret-cookie-value";
    store.save(cookie);
    const encrypted = fs.readFileSync(file, "utf8");
    assert.equal(encrypted.includes("secret-cookie-value"), false);
    assert.equal(store.read(), cookie);
    assert.deepEqual(store.status(), { configured: true, storage: "encrypted", path_configured: true });
    store.clear();
    assert.equal(store.read(), null);
  } finally {
    delete require.cache[require.resolve("../session-store")];
    if (previousPath === undefined) delete process.env.BOT_SESSION_PATH; else process.env.BOT_SESSION_PATH = previousPath;
    if (previousKey === undefined) delete process.env.ECLIPSE_SESSION_ENCRYPTION_KEY; else process.env.ECLIPSE_SESSION_ENCRYPTION_KEY = previousKey;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("dashboard session store rejects missing encryption key and invalid cookie", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "test-bot-session-"));
  const previousPath = process.env.BOT_SESSION_PATH;
  const previousKey = process.env.ECLIPSE_SESSION_ENCRYPTION_KEY;
  process.env.BOT_SESSION_PATH = path.join(dir, "session.enc");
  process.env.ECLIPSE_SESSION_ENCRYPTION_KEY = "short";
  try {
    const store = require("../session-store");
    assert.throws(() => store.save("c_user=123"), /at least 32 bytes/);
    process.env.ECLIPSE_SESSION_ENCRYPTION_KEY = "test-only-encryption-key-32-bytes-minimum";
    assert.throws(() => store.save("  "), /valid cookie string/);
  } finally {
    delete require.cache[require.resolve("../session-store")];
    if (previousPath === undefined) delete process.env.BOT_SESSION_PATH; else process.env.BOT_SESSION_PATH = previousPath;
    if (previousKey === undefined) delete process.env.ECLIPSE_SESSION_ENCRYPTION_KEY; else process.env.ECLIPSE_SESSION_ENCRYPTION_KEY = previousKey;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
