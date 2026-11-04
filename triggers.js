
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
      "siguro ate mo moka bot",
      "moka ka siguro bot kaya ka ganyan",
      "mama mo pepe bot",
      "aning ka ba saken",
      "luh, aning sa naka ope oh hahaha", 
      "wag ka maaning jan, hoy ang ltness mo",
      "moka kang paa jan kaka bot mo",
      "asan nga yung bot, kulit mo",
      "tangina, paulit-ulit",
      "paulit-ulit ka ba?",
      "bot ka nang bot, nagiging meme ka na",
      "bobo, wala akong pake sa sinasabi mo",
      "edi bot, kwento mo 'yan",
      "amoy basang aso tong kumag na 'to",
      "puta, baho mo, layo ka nga",
      "bobohan mo pa ashuko, hambalusin kita jan e" ,
      "aning na aning ka naman sa bossing mo? hahaha shesh" ,
      "aning ka ba saken? hahahah awet yern",
      "turo mo pepe mo, may bot don",
      "turo mo lolo mo, may bot yon",
      "nandon sa mama mo yon tanga",
      "si papa mo yon",
      "young mama mong inday naka bot",
      "young ate mo yon kinakantot mg bot",
      "walang bot, nasa kuya mo kinakantot",
    ]
  },
  {
    name: "trash-talk",
    triggers: [
      "weak", "laro", "tanginamo", "lala", "patawa",
      "gago", "bobo", "tanga", "hahahaa", "pake ko", "sino yan"
    ],
    replies: [
      "ang baho mo po, asoko 😭💕",
      "asoko, explain mo 'yang kabobohan mo",
      "bunjing, ano 'yan tukmol ka? panget hahaha",
      "baboy ramo naman, didn't I tell you 'wag kang tanga?",
      "hala, si yubab nadapa dahil sa kabobohan niya haha shet",
      "asoko, mukha kang tanga jan legit",
      "dogsko, ang tapang mo naman papalag ka ba saken?",
      "aso, saan mo hinugot 'yang confidence mong pang tanga?",
      "dogs, may resibo ka ba o vibes lang?",
      "bunjeng, ang taba mo na nga ang yabang mo pa",
      "dogsko, pwede bang magpahinga ka muna sa pagiging tanga? 😭",
      "asoko, bakit parang naka-airplane mode utak mo? laging lumilipad e, hindi gumagana",
      "asoka, nag-iisip ka ba o wala ka talagang isip kaya ka ganyan?",
      "yubab, ang lakas mo magtalk para sa ganyang kaliit na point.",
      "asoko, tuloy mo lang, natutuwa akong panoorin kang maaning sa boss mo",
      "dogsko, may tutorial ba para maintindihan ko kabobohan mo?",
      "ashuko, ang ganda ng confidence mo, sayang wala sa tamang lugar.",
      "doggie, bakit parang ikaw mismo di convinced sa sinabi mo?",
      "asoko, behave ka lang, mukha kang asong inaaso jan",
      "yubab, ang kulit mo ah, pero sige bahala ka mukha ka namang aso",
      "baboy, kailangan mo ba ng hug? kaso sa leeg ahhaha shet",
      "yubabskie, calm down, baka maubos salitaan mo na puro katangahan lang",
      "bonjeng, ang dramatic mo, parang teleseryeng walang sense",
      "yubabskie, bakit every sentence mo may plot twist?",
      "yubabko, nag-practice ka ba maging tanga?",
      "baboy, ikaw na ang certified little menace ko.",
      "asuku, ang lakas ng aura mo, kaso naligaw.",
      "asoko, gusto mo bang tamaan kita sa leeg",
      "achuchuko, ang gulo mo, pero nakakaaning ka ah",
      "asoko, one brain cell at a time lang, please",
      "yobabko, wag masyadong seryoso, bagay sa'yo ang pagiging cute na sablay",
      "bunjengko, may appointment ka po ba sa kabobohan today?",
      "yubab, ang sipag mo gumawa ng problema ah? wala kasing kwenta buhay mo hshshs",
      "bunjeng, proud ka talaga sa ganyang take?",
      "lalamo, ang confidence mong pantanga naka unlimited data",
      "baboy ramo, ang logic mo naka-trial version.",
      "bunjengko, nag-buffer po ba utak mo?",
      "asoko, bakit ikaw ang pinaka-confident na walang point?",
      "asoko, ang cute ng argument mo, pero hindi convincing",
      "asuko, sige, explain mo pa, gusto kong marinig ang sequel",
      "ashuko, ang haba ng speech mo, nasaan ang point? haha pointless",
      "dogsko, may point ka ba o nagbabakasyon?",
      "doggieko, balik tayo sa reality, miss na kita ron bugbugin hshsh",
      "dogskie, ang layo ng sagot mo sa tanong ko, bobo ka talaga",
      "ashuko, ikaw ba ang final boss ng unnecessary replies?",
      "asoko, mukha kang tanga kapag trying hard",
      "asoko, don't worry, tutulungan kitang hanapin ang point mong walang kwenta",
      "bonjing, nawawala ba ang common sense mo kapag inaaning ka?",
      "asoko, bakit po parang confidence muna bago utak?",
      "asoko, ang tapang mo, gusto mo bang hambalusin kita ng yero sa mukha?",
      "aso, wag ka magalit, hindi bagay sa'yo ang pikon mukh kang aso",
      "dogs, ang cute ng tampo mo, kaso mali ka pa rin",
      "dogskie, okay, noted ang kabobohan mo",
      "doggie, sige, ikaw na ang CEO ng nonsense",
      "dogskoes, may citation ba 'yang claim mo?" ,
      "dogsko, source? o galing lang sa imagination?" ,
      "baboyko, ang effort, pero saan napunta ang sense?" ,
      "yubabskie, ang daldal mo, pero sige, favorite dog naman kita",
      "totoy, pwede bang tumigil ka muna? nami-miss ko kasi katahimikan, ingay mo para kang asoko",
      "tutoy, ang ingay mo, pero aso namab kita so pagbibigyan kita",
      "dosko, bakit parang hobby mo akong aningin? crush mo ko?",
      "asuku, ikaw ba ang scheduled interruption ko today?",
      "asoko, ang dramatic mo, gusto mo soundtrack?",
      "asoko, may script ba tayo o improv lang talaga kabobohan mo?",
      "ashuko, ang confident mo, parang may backup brain",
      "asuko, ang cute mong magpanggap na tama, pwede?" ,
      "achuchuko, sige, defend your thesis of nonsense",
      "asoko, hug muna sa leeg bago natin ayusin ang logic",
      "ashu, breathe ka, hindi ka hinahabol ng facts",
      "dogskk, relax lang, hindi contest ang pagiging tanga",
      "dogsko, acceptance po muna bago confidence." ,
      "ashushu, GPS po ba utak mo? bakit off-route?" ,
      "dogs, turn left po sa common sense." ,
      "doggie, recalculating po ang logic mo." ,
      "doggiesko, destination: tamang sagot. ETA: unknown" ,
      "dogsko, may detour yata 'yang argument mo." ,
      "asoko, bakit parang side quest lahat ng sagot mo?" ,
      "ashuko, ang reply mo nag-lag sa landing." ,
      "dogsko, bakit every comeback mo may loading screen?" ,
      "dogsie, ang banat mo walang bitaw, parang ikaw" ,
      "asoko, sige lang, roast pa ako, nakakatuwa ka" ,
      "baboyko, ang yabang mo, gusto mo bang i-redeem sa bugbog?" ,
      "ashuko, obvious na gusto mo ng attention ng boss mo haha" ,
      "asoko, nakuha mo na attention ko, happy ka na?" ,
      "ashushu, congratulations, ikaw ang little problem of the day." ,
      "asukue, ang galing mong manggulo" ,
      "ashukue, may medal ba sa pagiging tanga? deserve mo" ,
      "ashushu, ang kulit mo, pero don't stop mukha kang asoko" ,
      "dogskk, ang cute mong magpanggap na tanga" ,
      "doggiesko, ang taas ng confidence, ang baba ng accuracy" ,
      "dogsko, perfect ang delivery, questionable ang content" ,
      "bunjeng, ang smooth mo magsalita, sayang sablay ang logic" ,
      "taba, ang point mo nagtatago yata" ,
      "batako, baka kailangan natin ng search party para sa logic mo" ,
      "yubabsko, ang argumento mo may sariling side quest." ,
      "bunjeng, saan nag-road trip ang common sense?" ,
      "bunjing, ang reply mo nag-lag sa landing.",
      "doggiesko, ikaw talaga ang definition ng cute disaster."
      "batako, musta ang pagiging tanga? nakakaaning ba? hahah" ,
      "eh kung hambalusin kita ng yero sa leeg? shshsh shish" ,
      "wag kang umiyak, mukha kang asong pumapadyak 😭👈" ,
      "tama yan, mag inaso ka mukha ka namang aso 😅🐻" ,
      "wag kang mainis, di naman kita iniinis 😒" ,
      "bat ka nagagalit jan, sinabe ko bang magalit ka? 😒" ,
      "wag ka ngang makulet, hahambalusin kita sa mukha e 😤" ,
      "luh, wag ka ngang tanga jan" ,
      "e anong pake ko sa sinasabe mo?" ,
      "wala nga akong pake e, kulit mo naman" ,
      "mukha kang aso jan, tahol ka nang tahol" ,

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
      "young pake ko nasaan ba? wala naman e, wala kasi akong pake hahaha",
      "hanapin mo muna papa mo ✌️😅" ,
      "mama mo mukhang palaka"
      "papa mo nag shashabu hahaha" 
      "mama mo pokpok" 
      "papa mo kumakantot ng bakla"
      "papa mo binugbog ko >,<" ,
      "mama mo kinantot ng asoko" ,
      "e young ate mo nga kinantot ng papa mo" ,
      "young kuya mo nag tatapon basura para may pang chongke hahaha" ,
      "e young mama mo nga inday" ,
      "young tatay mo binugbog ng aso" ,
      "young mama mo kinantot ng kuya mo hahaha" ,
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
      "sosopaen mo na ba ako dogsko?",
      "lalamo, wag mo sopaen ttkels ko (⁠*⁠´⁠ω⁠｀⁠*)"
      "tinanong ko ba yan? hahaha" ,
      "may pake ba ko jan? owshie ahha" ,
      "sana all mukhang sapatos 😭👈" ,
      "mukha kang paa jan, legit" ,
      "young mama mo nga?" ,
      "ah young papa mo ba?" ,
      "hahaha young ate mo" ,
      "e kaso wala ka ngang mama e hahaha" ,
      "wala ka pala papa hahahs char" , 
      "waka kang tyansa saken hoy ahahaha"
      "young lola mo patay na gagu" ,
      "young lolo mo kinantot ng kuya mo hahaha" ,
    ]
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
