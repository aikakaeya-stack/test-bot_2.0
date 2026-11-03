"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { changeNickname } = require("../raid-mode");

test("Raid Mode calls ws3-fca changeNickname with nickname, thread ID, then participant ID", async () => {
  const calls = [];
  const api = {
    changeNickname(nickname, threadID, participantID, callback) {
      calls.push([nickname, threadID, participantID]);
      callback(null);
    }
  };

  await changeNickname(api, "Raid Member", "group-123", "member-456");
  assert.deepEqual(calls, [["Raid Member", "group-123", "member-456"]]);
});
