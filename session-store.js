"use strict";

// Render Free uses ephemeral storage.
// Sessions are held in memory and cleared after a restart.

const MAX_SESSION_BYTES = 120 * 1024;
let savedCookie = null;

function normalizeSessionInput(value) {
  if (typeof value !== "string") {
    throw new Error("Paste a cookie string or a JSON appstate export.");
  }

  const input = value.trim();

  if (!input || Buffer.byteLength(input, "utf8") > MAX_SESSION_BYTES) {
    throw new Error("Paste a valid session (maximum 120 KB).");
  }

  let normalized;

  if (input.startsWith("[") || input.startsWith("{")) {
    let parsed;

    try {
      parsed = JSON.parse(input);
    } catch {
      throw new Error("Invalid JSON appstate. Paste the complete JSON export.");
    }

    const entries = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.appState)
        ? parsed.appState
        : Array.isArray(parsed?.cookies)
          ? parsed.cookies
          : null;

    if (!entries) {
      throw new Error(
        "JSON must be a cookie array or contain an appState or cookies array."
      );
    }

    const parts = entries.map(cookie => {
      const name = cookie?.key ?? cookie?.name;
      const val = cookie?.value;

      if (name == null || val == null) return null;

      const safeName = String(name).trim();
      const safeValue = String(val);

      if (
        !safeName ||
        /[=;\s\r\n]/.test(safeName) ||
        /[;\r\n]/.test(safeValue)
      ) {
        return null;
      }

      return `${safeName}=${safeValue}`;
    }).filter(Boolean);

    if (!parts.length) {
      throw new Error("No valid cookie entries were found in the appstate.");
    }

    normalized = parts.join("; ");
  } else {
    if (/[\r\n]/.test(input)) {
      throw new Error(
        "Cookie-header format must be a single line. Paste the complete JSON appstate instead."
      );
    }

    normalized = input;
  }

  if (!/(?:^|;\s*)c_user=[^;]+/i.test(normalized)) {
    throw new Error("Session must include a c_user cookie.");
  }

  if (Buffer.byteLength(normalized, "utf8") > MAX_SESSION_BYTES) {
    throw new Error("Normalized session exceeds 120 KB.");
  }

  return normalized;
}

function save(value) {
  savedCookie = normalizeSessionInput(value);

  return {
    saved: true,
    storage: "memory"
  };
}

function read() {
  return savedCookie;
}

function status() {
  return {
    configured: Boolean(savedCookie),
    storage: "memory",
    survivesRestart: false
  };
}

function clear() {
  savedCookie = null;

  return {
    configured: false,
    storage: "memory"
  };
}

module.exports = {
  save,
  read,
  status,
  clear,
  normalizeSessionInput
};
