
"use strict";

const { rememberBanatReply, pickBanatReply } = require("./banat-memory");

// Banat-only local reply pools. Nothing here calls an AI service.
const groups = [
  {
    name: "bot",
    triggers: ["bot", "robot", "ai"],
    replies: [
      "ikaw bot",
      "mama mo bot",
      "bot nang bot, aning ka?",
      "ikaw mukhang bot tanga",
      "wag aning sa ope",
      "bot nganii yung lolo mo",
      "ona bot na",
      "pumapalag ka pala sa bot e",
      "may bot pala?",
      "siguro ate mo moka bot" ,
      "moka ka siguro bot kaya ka ganyan" ,
      "mama mo pepe bot" ,
      "aning ka ba saken" ,
      "asan nga yung bot, kulit mo",
      "tangina, paulit-ulit",
      "paulit-ulit ka ba?",
      "bot ka nang bot, nagiging meme ka na",
      "bobo, wala akong pake sa sinasabi mo",
      "edi bot, kwento mo 'yan",
      "amoy basang aso tong kumag na 'to",
      "puta, baho mo, layo ka nga"
    ]
  },
  {
    name: "trash-talk",
    triggers: [
      "weak", "laro", "tanginamo", "lala", "patawa",
      "gago", "bobo", "tanga", "hahahaa", "pake ko", "sino yan"
    ],
    replies: [
      "ang baho mo po, bunjeng 😭💕",
      "yubab, explain mo po 'yang kabobohan mo.",
      "bunjing, ano po 'yang tukmol ka?",
      "baboy ramo naman, didn't I tell you po 'wag kang tanga?",
      "hala po, si yubab nadapa dahil sa kabobohan niya.",
      "asoko, cute mo po kapag mali ka.",
      "dogsko, ang tapang mo po para sa taong ganyan ka-cute.",
      "aso, saan mo po hinugot 'yang confidence mo?",
      "dogs, may resibo ka po ba o vibes lang?",
      "bunjeng, ang cute po ng yabang mo.",
      "palaka, pwede bang magpahinga ka muna sa pagiging tanga? 😭",
      "asoko, bakit po parang naka-airplane mode utak mo?",
      "asoka, nag-iisip ka po ba o nagpapacute lang?",
      "yubab, ang lakas mo po magtalk para sa ganyang kaliit na point.",
      "asoko, tuloy mo lang po, natutuwa akong panoorin kang malito.",
      "dogsko, may tutorial po ba para maintindihan kita?",
      "ashuko, ang ganda po ng confidence mo, sayang wala sa tamang lugar.",
      "doggie, bakit po parang ikaw mismo di convinced sa sinabi mo?",
      "asoko, behave po, ang cute mo na nga, makulit ka pa.",
      "yubab, ang kulit mo po, pero sige cute ka naman.",
      "baboy, kailangan mo po ba ng hug bago ka ulit magsalita?",
      "baboy ramo, calm down po, baka maubos ang cute points mo.",
      "bonjeng, ang dramatic mo po, parang teleserye.",
      "yubabskie, bakit po every sentence mo may plot twist?",
      "yubabko, nag-practice ka po ba maging makulit?",
      "baboy, ikaw na po ang certified little menace ko.",
      "asuku, ang lakas ng aura mo po, kaso naligaw.",
      "asoko, gusto mo po bang tamaan kita ng lambing?",
      "achuchuko, ang gulo mo po, pero adorable somehow.",
      "asutu, one brain cell at a time lang po, please.",
      "yobabko, wag po masyadong seryoso, bagay sa'yo ang pagiging cute na sablay.",
      "bunjengko, may appointment ka po ba sa kabobohan today?",
      "baboy ramo, ang sipag mo po gumawa ng problema.",
      "bunjeng, proud ka po talaga sa ganyang take?",
      "lalamo, ang confidence mo po parang unlimited data.",
      "baboy ramo, ang logic mo po naka-trial version.",
      "bunjengko, nag-buffer po ba utak mo?",
      "bilogko, bakit po ikaw ang pinaka-confident na walang point?",
      "asoko, ang cute po ng argument mo, pero hindi convincing.",
      "asuko, sige po, explain mo pa, gusto kong marinig ang sequel.",
      "ashuko, ang haba po ng speech mo, nasaan ang point?",
      "dogsko, may point ka po ba o nagbabakasyon?",
      "doggieko, balik po tayo sa reality, miss na kita doon.",
      "dogskie, ang layo po ng sagot mo sa tanong.",
      "ashuko, ikaw po ba ang final boss ng unnecessary replies?",
      "asoko, ang cute mo po kapag trying hard.",
      "yubab, don't worry po, tutulungan kitang hanapin ang point mo.",
      "bonjing, nawawala po ba ang common sense mo kapag cute ka?",
      "asoko, bakit po parang confidence muna bago utak?",
      "asoko, ang tapang mo po, gusto mo ba ng forehead kiss?",
      "aso, wag ka po magalit, bagay sa'yo ang pikon.",
      "dogs, ang cute po ng tampo mo, kaso mali ka pa rin.",
      "dogskie, okay po, noted ang kabobohan.",
      "doggie, sige po, ikaw na ang CEO ng nonsense.",
      "dogskoes, may citation po ba 'yang claim mo?",
      "dogsko, source po? o galing lang sa imagination?",
      "baboyko, ang effort po, pero saan napunta ang sense?",
      "yubabskie, ang daldal mo po, pero sige, favorite kita.",
      "totoy, pwede po bang tumigil ka muna? nami-miss ko kasi katahimikan.",
      "tutoy, ang ingay mo po, pero cute so pagbibigyan kita.",
      "dosko, bakit po parang hobby mo akong inisin?",
      "asuku, ikaw po ba ang scheduled interruption ko today?",
      "asoko, ang dramatic mo po, gusto mo soundtrack?",
      "asoko, may script po ba tayo o improv lang talaga kabobohan mo?",
      "ashuko, ang confident mo po, parang may backup brain.",
      "asuko, ang cute mong magpanggap na tama po.",
      "achuchuko, sige po, defend your thesis of nonsense.",
      "asoko, hug muna po bago natin ayusin ang logic.",
      "ashu, breathe po, hindi ka hinahabol ng facts.",
      "dogskk, relax po, hindi contest ang pagiging tama.",
      "dogsko, acceptance po muna bago confidence.",
      "ashushu, GPS po ba utak mo? bakit off-route?",
      "dogs, turn left po sa common sense.",
      "doggie, recalculating po ang logic mo.",
      "doggiesko, destination: tamang sagot. ETA: unknown.",
      "dogsko, may detour po yata 'yang argument mo.",
      "asoko, bakit po parang side quest lahat ng sagot mo?",
      "ashuko, ang reply mo po nag-lag sa landing.",
      "dogsko, bakit po every comeback mo may loading screen?",
      "dogsie, ang banat mo po cute, parang ikaw.",
      "asoko, sige po, roast mo pa ako, nakakatuwa ka.",
      "baboyko, ang yabang mo po, gusto mo bang i-redeem sa lambing?",
      "ashuko, obvious po na gusto mo ng attention.",
      "asoko, nakuha mo na po attention ko, happy ka na?",
      "ashushu, congratulations po, ikaw ang little problem of the day.",
      "asukue, ang galing mong manggulo po.",
      "ashukue, may medal po ba sa pagiging makulit? deserve mo.",
      "ashushu, ang kulit mo po, pero don't stop.",
      "dogskk, ang cute mong magpanggap na tama.",
      "doggiesko, ang taas po ng confidence, ang baba ng accuracy.",
      "dogsko, perfect po ang delivery, questionable ang content.",
      "bunjeng, ang smooth mo po magsalita, sayang sablay ang logic.",
      "taba, ang point mo po nagtatago yata.",
      "tabamo, baka kailangan po natin ng search party para sa logic mo.",
      "yubabsko, ang argumento mo po may sariling side quest.",
      "bunjeng, saan po nag-road trip ang common sense?",
      "bunjing, ang reply mo po nag-lag sa landing.",
      "doggiesko, ikaw po talaga ang definition ng cute disaster."
    ]
  },
  {
    name: "asoko" ,
    
    triggers: ["asoko"],
    replies: [
      "asoko na naman",
      "al-bai-no",
      "bai-gone",
      "bai-tamins",
      "one bai one",
      "asoko, yung mukhang paa ba?",
      "la, dogs ko ulit",
      "asoko and his broke boys era",
      "yubab mukhang nahulugan langka e",
      "iyak si gago",
      "pake ko nga?",
      "turo mo sino nag tanong",
      "bilang ka muna",
      "moka ka libro",
      "moka ma fan",
      "moka ka mama mo",
      "moka ka lapis",
      "moka ka tiles",
      "moka ka bahay",
      "moka ka semento",
      "moka ka aspalto",
      "moka ka tanga",
      "moka ka gago (⁠人⁠ ⁠•͈⁠ᴗ⁠•͈⁠)",
      "e moka ka namang talakitok",
      "moka kang lamesa jan hahaha",
      "moka kang burat jan",
      "sosopaen mo na ba ako (⁠☆⁠▽⁠☆⁠)",
      "sopaen mo ttkels ko (⁠*⁠´⁠ω⁠｀⁠*⁠)",
      "chopaen mo boyat ko (⁠≧⁠▽⁠≦⁠)" ,
    "sopaen mo ttkels ko (⁠ʘ⁠ᴗ⁠ʘ⁠✿⁠)" ,
      "soboen mo boyat kueh <⁠(⁠￣⁠︶⁠￣⁠)⁠>" ,
      "sosopaen mo na ba ako dogsko?" ,
      "lalamo, wag mo sopaen ttkels ko (⁠*⁠´⁠ω⁠｀⁠*⁠)" ,
  }
];

function normalize(text) {
  return String(text || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function findGroups(body) {
  const text = normalize(body);

  return groups.filter(group =>
    group.triggers.some(trigger => {
      const t = String(trigger).toLowerCase();

      return t.length <= 4
        ? new RegExp(
            `\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
            "i"
          ).test(text)
        : text.includes(t);
    })
  );
}

function getTriggerReply(body, threadID = "") {
  const matched = findGroups(body);

  if (!matched.length) return null;

  const group = matched[Math.floor(Math.random() * matched.length)];
  const reply = pickBanatReply(threadID, group.replies);

  if (reply) rememberBanatReply(threadID, reply);

  return reply;
}

function getBanatConversationReply(body, threadID = "") {
  const direct = getTriggerReply(body, threadID);

  if (direct) return direct;

  const fallback = groups.flatMap(g => g.replies);

  const reply =
    pickBanatReply(threadID, fallback) ||
    fallback[Math.floor(Math.random() * fallback.length)] ||
    null;

  if (reply) rememberBanatReply(threadID, reply);

  return reply;
}

module.exports = {
  groups,
  getTriggerReply,
  getBanatConversationReply
};
