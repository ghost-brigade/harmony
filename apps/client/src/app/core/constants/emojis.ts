export const EMOJI_CATEGORIES = [
  "SMILEYS_AND_EMOTION",
  "PEOPLE_AND_BODY",
  "ANIMALS_AND_NATURE",
  "FOOD_AND_DRINK",
  "TRAVEL_AND_PLACES",
  "ACTIVITIES",
  "OBJECTS",
  "SYMBOLS",
  "FLAGS",
] as const;

export type EMOJI = {
  emoji: string;
  names: string[];
  category: string;
};

export const EMOJIS: EMOJI[] = [
  {
    emoji: "😀",
    names: ["grinning face", "smile", "happy"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😃",
    names: ["grinning face with big eyes", "happy", "joy", "haha"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😄",
    names: [
      "grinning face with smiling eyes",
      "happy",
      "joy",
      "laugh",
      "pleased",
    ],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😁",
    names: ["beaming face with smiling eyes"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😆",
    names: ["grinning squinting face", "happy", "haha"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😅",
    names: ["grinning face with sweat", "hot"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤣",
    names: ["rolling on the floor laughing", "lol", "laughing"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😂",
    names: ["face with tears of joy", "tears"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🙂",
    names: ["slightly smiling face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🙃",
    names: ["upside-down face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🫠",
    names: ["melting face", "sarcasm", "dread"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😉",
    names: ["winking face", "flirt"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😊",
    names: ["smiling face with smiling eyes", "proud"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😇",
    names: ["smiling face with halo", "angel"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🥰",
    names: ["smiling face with hearts", "love"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😍",
    names: ["smiling face with heart-eyes", "love", "crush"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤩",
    names: ["star-struck", "eyes"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😘",
    names: ["face blowing a kiss", "flirt"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😗",
    names: ["kissing face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "☺️",
    names: ["smiling face", "blush", "pleased"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😚",
    names: ["kissing face with closed eyes"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😙",
    names: ["kissing face with smiling eyes"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🥲",
    names: ["smiling face with tear"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😋",
    names: ["face savoring food", "tongue", "lick"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😛",
    names: ["face with tongue"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😜",
    names: ["winking face with tongue", "prank", "silly"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤪",
    names: ["zany face", "goofy", "wacky"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😝",
    names: ["squinting face with tongue", "prank"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤑",
    names: ["money-mouth face", "rich"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤗",
    names: ["smiling face with open hands"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤭",
    names: ["face with hand over mouth", "quiet", "whoops"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🫢",
    names: ["face with open eyes and hand over mouth", "gasp", "shock"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🫣",
    names: ["face with peeking eye"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤫",
    names: ["shushing face", "silence", "quiet"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤔",
    names: ["thinking face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🫡",
    names: ["saluting face", "respect"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤐",
    names: ["zipper-mouth face", "silence", "hush"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤨",
    names: ["face with raised eyebrow", "suspicious"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😐",
    names: ["neutral face", "meh"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😑",
    names: ["expressionless face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😶",
    names: ["face without mouth", "mute", "silence"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🫥",
    names: ["dotted line face", "invisible"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😶‍🌫️",
    names: ["face in clouds"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😏",
    names: ["smirking face", "smug"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😒",
    names: ["unamused face", "meh"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🙄",
    names: ["face with rolling eyes"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😬",
    names: ["grimacing face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😮‍💨",
    names: ["face exhaling"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤥",
    names: ["lying face", "liar"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🫨",
    names: ["shaking face", "shock"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😌",
    names: ["relieved face", "whew"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😔",
    names: ["pensive face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😪",
    names: ["sleepy face", "tired"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤤",
    names: ["drooling face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😴",
    names: ["sleeping face", "zzz"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😷",
    names: ["face with medical mask", "sick", "ill"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤒",
    names: ["face with thermometer", "sick"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤕",
    names: ["face with head-bandage", "hurt"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤢",
    names: ["nauseated face", "sick", "barf", "disgusted"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤮",
    names: ["face vomiting", "barf", "sick"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤧",
    names: ["sneezing face", "achoo", "sick"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🥵",
    names: ["hot face", "heat", "sweating"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🥶",
    names: ["cold face", "freezing", "ice"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🥴",
    names: ["woozy face", "groggy"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😵",
    names: ["face with crossed-out eyes"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😵‍💫",
    names: ["face with spiral eyes"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤯",
    names: ["exploding head", "mind", "blown"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤠",
    names: ["cowboy hat face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🥳",
    names: ["partying face", "celebration", "birthday"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🥸",
    names: ["disguised face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😎",
    names: ["smiling face with sunglasses", "cool"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤓",
    names: ["nerd face", "geek", "glasses"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🧐",
    names: ["face with monocle"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😕",
    names: ["confused face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🫤",
    names: ["face with diagonal mouth", "confused"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😟",
    names: ["worried face", "nervous"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🙁",
    names: ["slightly frowning face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "☹️",
    names: ["frowning face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😮",
    names: ["face with open mouth", "surprise", "impressed", "wow"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😯",
    names: ["hushed face", "silence", "speechless"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😲",
    names: ["astonished face", "amazed", "gasp"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😳",
    names: ["flushed face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🥺",
    names: ["pleading face", "puppy", "eyes"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🥹",
    names: ["face holding back tears", "tears", "gratitude"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😦",
    names: ["frowning face with open mouth"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😧",
    names: ["anguished face", "stunned"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😨",
    names: ["fearful face", "scared", "shocked", "oops"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😰",
    names: ["anxious face with sweat", "nervous"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😥",
    names: ["sad but relieved face", "phew", "sweat", "nervous"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😢",
    names: ["crying face", "sad", "tear"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😭",
    names: ["loudly crying face", "sad", "cry", "bawling"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😱",
    names: ["face screaming in fear", "horror", "shocked"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😖",
    names: ["confounded face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😣",
    names: ["persevering face", "struggling"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😞",
    names: ["disappointed face", "sad"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😓",
    names: ["downcast face with sweat"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😩",
    names: ["weary face", "tired"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😫",
    names: ["tired face", "upset", "whine"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🥱",
    names: ["yawning face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😤",
    names: ["face with steam from nose", "smug"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😡",
    names: ["enraged face", "angry"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😠",
    names: ["angry face", "mad", "annoyed"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤬",
    names: ["face with symbols on mouth", "foul"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😈",
    names: ["smiling face with horns", "devil", "evil", "horns"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "👿",
    names: ["angry face with horns", "angry", "devil", "evil", "horns"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💀",
    names: ["skull", "dead", "danger", "poison"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "☠️",
    names: ["skull and crossbones", "danger", "pirate"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💩",
    names: ["pile of poo", "crap"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤡",
    names: ["clown face"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "👹",
    names: ["ogre", "monster"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "👺",
    names: ["goblin"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "👻",
    names: ["ghost", "halloween"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "👽",
    names: ["alien", "ufo"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "👾",
    names: ["alien monster", "game", "retro"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤖",
    names: ["robot"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😺",
    names: ["grinning cat"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😸",
    names: ["grinning cat with smiling eyes"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😹",
    names: ["cat with tears of joy"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😻",
    names: ["smiling cat with heart-eyes"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😼",
    names: ["cat with wry smile"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😽",
    names: ["kissing cat"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🙀",
    names: ["weary cat", "horror"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😿",
    names: ["crying cat", "sad", "tear"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "😾",
    names: ["pouting cat"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🙈",
    names: ["see-no-evil monkey", "monkey", "blind", "ignore"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🙉",
    names: ["hear-no-evil monkey", "monkey", "deaf"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🙊",
    names: ["speak-no-evil monkey", "monkey", "mute", "hush"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💌",
    names: ["love letter", "email", "envelope"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💘",
    names: ["heart with arrow", "love", "heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💝",
    names: ["heart with ribbon", "chocolates"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💖",
    names: ["sparkling heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💗",
    names: ["growing heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💓",
    names: ["beating heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💞",
    names: ["revolving hearts"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💕",
    names: ["two hearts"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💟",
    names: ["heart decoration"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "❣️",
    names: ["heart exclamation"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💔",
    names: ["broken heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "❤️‍🔥",
    names: ["heart on fire"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "❤️‍🩹",
    names: ["mending heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "❤️",
    names: ["red heart", "love"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🩷",
    names: ["pink heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🧡",
    names: ["orange heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💛",
    names: ["yellow heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💚",
    names: ["green heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💙",
    names: ["blue heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🩵",
    names: ["light blue heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💜",
    names: ["purple heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤎",
    names: ["brown heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🖤",
    names: ["black heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🩶",
    names: ["grey heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🤍",
    names: ["white heart"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💋",
    names: ["kiss mark", "lipstick"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💯",
    names: ["hundred points", "score", "perfect"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💢",
    names: ["anger symbol", "angry"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💥",
    names: ["collision", "explode"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💫",
    names: ["dizzy", "star"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💦",
    names: ["sweat droplets", "water", "workout"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💨",
    names: ["dashing away", "wind", "blow", "fast"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🕳️",
    names: ["hole"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💬",
    names: ["speech balloon", "comment"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "👁️‍🗨️",
    names: ["eye in speech bubble"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🗨️",
    names: ["left speech bubble"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "🗯️",
    names: ["right anger bubble"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💭",
    names: ["thought balloon", "thinking"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "💤",
    names: ["ZZZ", "sleeping"],
    category: "SMILEYS_AND_EMOTION",
  },
  {
    emoji: "👋",
    names: ["waving hand", "goodbye"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤚",
    names: ["raised back of hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🖐️",
    names: ["hand with fingers splayed"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "✋",
    names: ["raised hand", "highfive", "stop"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🖖",
    names: ["vulcan salute", "prosper", "spock"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫱",
    names: ["rightwards hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫲",
    names: ["leftwards hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫳",
    names: ["palm down hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫴",
    names: ["palm up hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫷",
    names: ["leftwards pushing hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫸",
    names: ["rightwards pushing hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👌",
    names: ["OK hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤌",
    names: ["pinched fingers"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤏",
    names: ["pinching hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "✌️",
    names: ["victory hand", "victory", "peace"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤞",
    names: ["crossed fingers", "luck", "hopeful"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫰",
    names: ["hand with index finger and thumb crossed"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤟",
    names: ["love-you gesture"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤘",
    names: ["sign of the horns"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤙",
    names: ["call me hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👈",
    names: ["backhand index pointing left"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👉",
    names: ["backhand index pointing right"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👆",
    names: ["backhand index pointing up"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🖕",
    names: ["middle finger"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👇",
    names: ["backhand index pointing down"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "☝️",
    names: ["index pointing up"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫵",
    names: ["index pointing at the viewer"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👍",
    names: ["thumbs up", "approve", "ok"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👎",
    names: ["thumbs down", "disapprove", "bury"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "✊",
    names: ["raised fist", "power"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👊",
    names: ["oncoming fist", "attack"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤛",
    names: ["left-facing fist"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤜",
    names: ["right-facing fist"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👏",
    names: ["clapping hands", "praise", "applause"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙌",
    names: ["raising hands", "hooray"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫶",
    names: ["heart hands", "love"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👐",
    names: ["open hands"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤲",
    names: ["palms up together"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤝",
    names: ["handshake", "deal"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙏",
    names: ["folded hands", "please", "hope", "wish"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "✍️",
    names: ["writing hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💅",
    names: ["nail polish", "beauty", "manicure"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤳",
    names: ["selfie"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💪",
    names: ["flexed biceps", "flex", "bicep", "strong", "workout"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦾",
    names: ["mechanical arm"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦿",
    names: ["mechanical leg"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦵",
    names: ["leg"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦶",
    names: ["foot"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👂",
    names: ["ear", "hear", "sound", "listen"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦻",
    names: ["ear with hearing aid"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👃",
    names: ["nose", "smell"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧠",
    names: ["brain"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫀",
    names: ["anatomical heart"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫁",
    names: ["lungs"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦷",
    names: ["tooth"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦴",
    names: ["bone"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👀",
    names: ["eyes", "look", "see", "watch"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👁️",
    names: ["eye"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👅",
    names: ["tongue", "taste"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👄",
    names: ["mouth", "kiss"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫦",
    names: ["biting lip"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👶",
    names: ["baby", "child", "newborn"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧒",
    names: ["child"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👦",
    names: ["boy", "child"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👧",
    names: ["girl", "child"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑",
    names: ["person"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👱",
    names: ["person: blond hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨",
    names: ["man", "mustache", "father", "dad"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧔",
    names: ["person: beard"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧔‍♂️",
    names: ["man: beard"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧔‍♀️",
    names: ["woman: beard"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🦰",
    names: ["man: red hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🦱",
    names: ["man: curly hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🦳",
    names: ["man: white hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🦲",
    names: ["man: bald"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩",
    names: ["woman", "girls"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🦰",
    names: ["woman: red hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🦰",
    names: ["person: red hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🦱",
    names: ["woman: curly hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🦱",
    names: ["person: curly hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🦳",
    names: ["woman: white hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🦳",
    names: ["person: white hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🦲",
    names: ["woman: bald"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🦲",
    names: ["person: bald"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👱‍♀️",
    names: ["woman: blond hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👱‍♂️",
    names: ["man: blond hair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧓",
    names: ["older person"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👴",
    names: ["old man"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👵",
    names: ["old woman"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙍",
    names: ["person frowning"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙍‍♂️",
    names: ["man frowning"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙍‍♀️",
    names: ["woman frowning"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙎",
    names: ["person pouting"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙎‍♂️",
    names: ["man pouting"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙎‍♀️",
    names: ["woman pouting"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙅",
    names: ["person gesturing NO", "stop", "halt", "denied"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙅‍♂️",
    names: ["man gesturing NO", "stop", "halt", "denied"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙅‍♀️",
    names: ["woman gesturing NO", "stop", "halt", "denied"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙆",
    names: ["person gesturing OK"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙆‍♂️",
    names: ["man gesturing OK"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙆‍♀️",
    names: ["woman gesturing OK"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💁",
    names: ["person tipping hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💁‍♂️",
    names: ["man tipping hand", "information"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💁‍♀️",
    names: ["woman tipping hand", "information"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙋",
    names: ["person raising hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙋‍♂️",
    names: ["man raising hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙋‍♀️",
    names: ["woman raising hand"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧏",
    names: ["deaf person"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧏‍♂️",
    names: ["deaf man"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧏‍♀️",
    names: ["deaf woman"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙇",
    names: ["person bowing", "respect", "thanks"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙇‍♂️",
    names: ["man bowing", "respect", "thanks"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🙇‍♀️",
    names: ["woman bowing", "respect", "thanks"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤦",
    names: ["person facepalming"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤦‍♂️",
    names: ["man facepalming"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤦‍♀️",
    names: ["woman facepalming"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤷",
    names: ["person shrugging"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤷‍♂️",
    names: ["man shrugging"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤷‍♀️",
    names: ["woman shrugging"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍⚕️",
    names: ["health worker"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍⚕️",
    names: ["man health worker", "doctor", "nurse"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍⚕️",
    names: ["woman health worker", "doctor", "nurse"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🎓",
    names: ["student"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🎓",
    names: ["man student", "graduation"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🎓",
    names: ["woman student", "graduation"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🏫",
    names: ["teacher"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🏫",
    names: ["man teacher", "school", "professor"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🏫",
    names: ["woman teacher", "school", "professor"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍⚖️",
    names: ["judge"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍⚖️",
    names: ["man judge", "justice"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍⚖️",
    names: ["woman judge", "justice"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🌾",
    names: ["farmer"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🌾",
    names: ["man farmer"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🌾",
    names: ["woman farmer"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🍳",
    names: ["cook"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🍳",
    names: ["man cook", "chef"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🍳",
    names: ["woman cook", "chef"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🔧",
    names: ["mechanic"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🔧",
    names: ["man mechanic"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🔧",
    names: ["woman mechanic"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🏭",
    names: ["factory worker"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🏭",
    names: ["man factory worker"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🏭",
    names: ["woman factory worker"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍💼",
    names: ["office worker"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍💼",
    names: ["man office worker", "business"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍💼",
    names: ["woman office worker", "business"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🔬",
    names: ["scientist"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🔬",
    names: ["man scientist", "research"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🔬",
    names: ["woman scientist", "research"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍💻",
    names: ["technologist"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍💻",
    names: ["man technologist", "coder"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍💻",
    names: ["woman technologist", "coder"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🎤",
    names: ["singer"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🎤",
    names: ["man singer", "rockstar"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🎤",
    names: ["woman singer", "rockstar"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🎨",
    names: ["artist"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🎨",
    names: ["man artist", "painter"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🎨",
    names: ["woman artist", "painter"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍✈️",
    names: ["pilot"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍✈️",
    names: ["man pilot"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍✈️",
    names: ["woman pilot"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🚀",
    names: ["astronaut"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🚀",
    names: ["man astronaut", "space"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🚀",
    names: ["woman astronaut", "space"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🚒",
    names: ["firefighter"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🚒",
    names: ["man firefighter"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🚒",
    names: ["woman firefighter"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👮",
    names: ["police officer", "law"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👮‍♂️",
    names: ["man police officer", "law", "cop"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👮‍♀️",
    names: ["woman police officer", "law", "cop"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🕵️",
    names: ["detective", "sleuth"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🕵️‍♂️",
    names: ["man detective", "sleuth"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🕵️‍♀️",
    names: ["woman detective", "sleuth"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💂",
    names: ["guard"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💂‍♂️",
    names: ["man guard"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💂‍♀️",
    names: ["woman guard"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🥷",
    names: ["ninja"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👷",
    names: ["construction worker", "helmet"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👷‍♂️",
    names: ["man construction worker", "helmet"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👷‍♀️",
    names: ["woman construction worker", "helmet"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫅",
    names: ["person with crown"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤴",
    names: ["prince", "crown", "royal"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👸",
    names: ["princess", "crown", "royal"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👳",
    names: ["person wearing turban"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👳‍♂️",
    names: ["man wearing turban"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👳‍♀️",
    names: ["woman wearing turban"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👲",
    names: ["person with skullcap"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧕",
    names: ["woman with headscarf", "hijab"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤵",
    names: ["person in tuxedo", "groom", "marriage", "wedding"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤵‍♂️",
    names: ["man in tuxedo"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤵‍♀️",
    names: ["woman in tuxedo"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👰",
    names: ["person with veil", "marriage", "wedding"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👰‍♂️",
    names: ["man with veil"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👰‍♀️",
    names: ["woman with veil"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤰",
    names: ["pregnant woman"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫃",
    names: ["pregnant man"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫄",
    names: ["pregnant person"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤱",
    names: ["breast-feeding", "nursing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🍼",
    names: ["woman feeding baby"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🍼",
    names: ["man feeding baby"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🍼",
    names: ["person feeding baby"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👼",
    names: ["baby angel"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🎅",
    names: ["Santa Claus", "christmas"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤶",
    names: ["Mrs. Claus", "santa"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🎄",
    names: ["mx claus"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦸",
    names: ["superhero"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦸‍♂️",
    names: ["man superhero"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦸‍♀️",
    names: ["woman superhero"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦹",
    names: ["supervillain"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦹‍♂️",
    names: ["man supervillain"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🦹‍♀️",
    names: ["woman supervillain"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧙",
    names: ["mage", "wizard"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧙‍♂️",
    names: ["man mage", "wizard"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧙‍♀️",
    names: ["woman mage", "wizard"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧚",
    names: ["fairy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧚‍♂️",
    names: ["man fairy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧚‍♀️",
    names: ["woman fairy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧛",
    names: ["vampire"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧛‍♂️",
    names: ["man vampire"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧛‍♀️",
    names: ["woman vampire"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧜",
    names: ["merperson"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧜‍♂️",
    names: ["merman"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧜‍♀️",
    names: ["mermaid"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧝",
    names: ["elf"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧝‍♂️",
    names: ["man elf"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧝‍♀️",
    names: ["woman elf"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧞",
    names: ["genie"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧞‍♂️",
    names: ["man genie"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧞‍♀️",
    names: ["woman genie"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧟",
    names: ["zombie"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧟‍♂️",
    names: ["man zombie"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧟‍♀️",
    names: ["woman zombie"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧌",
    names: ["troll"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💆",
    names: ["person getting massage", "spa"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💆‍♂️",
    names: ["man getting massage", "spa"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💆‍♀️",
    names: ["woman getting massage", "spa"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💇",
    names: ["person getting haircut", "beauty"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💇‍♂️",
    names: ["man getting haircut"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💇‍♀️",
    names: ["woman getting haircut"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚶",
    names: ["person walking"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚶‍♂️",
    names: ["man walking"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚶‍♀️",
    names: ["woman walking"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧍",
    names: ["person standing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧍‍♂️",
    names: ["man standing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧍‍♀️",
    names: ["woman standing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧎",
    names: ["person kneeling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧎‍♂️",
    names: ["man kneeling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧎‍♀️",
    names: ["woman kneeling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🦯",
    names: ["person with white cane"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🦯",
    names: ["man with white cane"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🦯",
    names: ["woman with white cane"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🦼",
    names: ["person in motorized wheelchair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🦼",
    names: ["man in motorized wheelchair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🦼",
    names: ["woman in motorized wheelchair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🦽",
    names: ["person in manual wheelchair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍🦽",
    names: ["man in manual wheelchair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍🦽",
    names: ["woman in manual wheelchair"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏃",
    names: ["person running", "exercise", "workout", "marathon"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏃‍♂️",
    names: ["man running", "exercise", "workout", "marathon"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏃‍♀️",
    names: ["woman running", "exercise", "workout", "marathon"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💃",
    names: ["woman dancing", "dress"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🕺",
    names: ["man dancing", "dancer"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🕴️",
    names: ["person in suit levitating"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👯",
    names: ["people with bunny ears", "bunny"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👯‍♂️",
    names: ["men with bunny ears", "bunny"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👯‍♀️",
    names: ["women with bunny ears", "bunny"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧖",
    names: ["person in steamy room", "steamy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧖‍♂️",
    names: ["man in steamy room", "steamy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧖‍♀️",
    names: ["woman in steamy room", "steamy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧗",
    names: ["person climbing", "bouldering"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧗‍♂️",
    names: ["man climbing", "bouldering"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧗‍♀️",
    names: ["woman climbing", "bouldering"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤺",
    names: ["person fencing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏇",
    names: ["horse racing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "⛷️",
    names: ["skier"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏂",
    names: ["snowboarder"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏌️",
    names: ["person golfing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏌️‍♂️",
    names: ["man golfing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏌️‍♀️",
    names: ["woman golfing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏄",
    names: ["person surfing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏄‍♂️",
    names: ["man surfing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏄‍♀️",
    names: ["woman surfing"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚣",
    names: ["person rowing boat"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚣‍♂️",
    names: ["man rowing boat"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚣‍♀️",
    names: ["woman rowing boat"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏊",
    names: ["person swimming"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏊‍♂️",
    names: ["man swimming"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏊‍♀️",
    names: ["woman swimming"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "⛹️",
    names: ["person bouncing ball", "basketball"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "⛹️‍♂️",
    names: ["man bouncing ball"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "⛹️‍♀️",
    names: ["woman bouncing ball"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏋️",
    names: ["person lifting weights", "gym", "workout"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏋️‍♂️",
    names: ["man lifting weights", "gym", "workout"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🏋️‍♀️",
    names: ["woman lifting weights", "gym", "workout"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚴",
    names: ["person biking"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚴‍♂️",
    names: ["man biking"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚴‍♀️",
    names: ["woman biking"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚵",
    names: ["person mountain biking"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚵‍♂️",
    names: ["man mountain biking"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🚵‍♀️",
    names: ["woman mountain biking"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤸",
    names: ["person cartwheeling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤸‍♂️",
    names: ["man cartwheeling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤸‍♀️",
    names: ["woman cartwheeling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤼",
    names: ["people wrestling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤼‍♂️",
    names: ["men wrestling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤼‍♀️",
    names: ["women wrestling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤽",
    names: ["person playing water polo"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤽‍♂️",
    names: ["man playing water polo"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤽‍♀️",
    names: ["woman playing water polo"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤾",
    names: ["person playing handball"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤾‍♂️",
    names: ["man playing handball"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤾‍♀️",
    names: ["woman playing handball"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤹",
    names: ["person juggling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤹‍♂️",
    names: ["man juggling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🤹‍♀️",
    names: ["woman juggling"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧘",
    names: ["person in lotus position", "meditation"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧘‍♂️",
    names: ["man in lotus position", "meditation"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧘‍♀️",
    names: ["woman in lotus position", "meditation"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🛀",
    names: ["person taking bath", "shower"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🛌",
    names: ["person in bed"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🧑‍🤝‍🧑",
    names: ["people holding hands", "couple", "date"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👭",
    names: ["women holding hands", "couple", "date"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👫",
    names: ["woman and man holding hands", "date"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👬",
    names: ["men holding hands", "couple", "date"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💏",
    names: ["kiss"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍❤️‍💋‍👨",
    names: ["kiss: woman, man"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍❤️‍💋‍👨",
    names: ["kiss: man, man"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍❤️‍💋‍👩",
    names: ["kiss: woman, woman"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "💑",
    names: ["couple with heart"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍❤️‍👨",
    names: ["couple with heart: woman, man"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍❤️‍👨",
    names: ["couple with heart: man, man"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍❤️‍👩",
    names: ["couple with heart: woman, woman"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👪",
    names: ["family", "home", "parents", "child"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👩‍👦",
    names: ["family: man, woman, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👩‍👧",
    names: ["family: man, woman, girl"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    names: ["family: man, woman, girl, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👩‍👦‍👦",
    names: ["family: man, woman, boy, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👩‍👧‍👧",
    names: ["family: man, woman, girl, girl"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👨‍👦",
    names: ["family: man, man, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👨‍👧",
    names: ["family: man, man, girl"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👨‍👧‍👦",
    names: ["family: man, man, girl, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👨‍👦‍👦",
    names: ["family: man, man, boy, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👨‍👧‍👧",
    names: ["family: man, man, girl, girl"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍👩‍👦",
    names: ["family: woman, woman, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍👩‍👧",
    names: ["family: woman, woman, girl"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍👩‍👧‍👦",
    names: ["family: woman, woman, girl, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍👩‍👦‍👦",
    names: ["family: woman, woman, boy, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍👩‍👧‍👧",
    names: ["family: woman, woman, girl, girl"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👦",
    names: ["family: man, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👦‍👦",
    names: ["family: man, boy, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👧",
    names: ["family: man, girl"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👧‍👦",
    names: ["family: man, girl, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👨‍👧‍👧",
    names: ["family: man, girl, girl"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍👦",
    names: ["family: woman, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍👦‍👦",
    names: ["family: woman, boy, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍👧",
    names: ["family: woman, girl"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍👧‍👦",
    names: ["family: woman, girl, boy"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👩‍👧‍👧",
    names: ["family: woman, girl, girl"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🗣️",
    names: ["speaking head"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👤",
    names: ["bust in silhouette", "user"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👥",
    names: ["busts in silhouette", "users", "group", "team"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🫂",
    names: ["people hugging"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "👣",
    names: ["footprints", "feet", "tracks"],
    category: "PEOPLE_AND_BODY",
  },
  {
    emoji: "🐵",
    names: ["monkey face"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐒",
    names: ["monkey"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦍",
    names: ["gorilla"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦧",
    names: ["orangutan"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐶",
    names: ["dog face", "pet"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐕",
    names: ["dog"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦮",
    names: ["guide dog"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐕‍🦺",
    names: ["service dog"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐩",
    names: ["poodle", "dog"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐺",
    names: ["wolf"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦊",
    names: ["fox"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦝",
    names: ["raccoon"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐱",
    names: ["cat face", "pet"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐈",
    names: ["cat"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐈‍⬛",
    names: ["black cat"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦁",
    names: ["lion"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐯",
    names: ["tiger face"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐅",
    names: ["tiger"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐆",
    names: ["leopard"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐴",
    names: ["horse face"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🫎",
    names: ["moose", "canada"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🫏",
    names: ["donkey", "mule"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐎",
    names: ["horse", "speed"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦄",
    names: ["unicorn"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦓",
    names: ["zebra"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦌",
    names: ["deer"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦬",
    names: ["bison"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐮",
    names: ["cow face"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐂",
    names: ["ox"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐃",
    names: ["water buffalo"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐄",
    names: ["cow"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐷",
    names: ["pig face"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐖",
    names: ["pig"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐗",
    names: ["boar"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐽",
    names: ["pig nose"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐏",
    names: ["ram"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐑",
    names: ["ewe"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐐",
    names: ["goat"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐪",
    names: ["camel", "desert"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐫",
    names: ["two-hump camel"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦙",
    names: ["llama"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦒",
    names: ["giraffe"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐘",
    names: ["elephant"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦣",
    names: ["mammoth"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦏",
    names: ["rhinoceros"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦛",
    names: ["hippopotamus"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐭",
    names: ["mouse face"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐁",
    names: ["mouse"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐀",
    names: ["rat"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐹",
    names: ["hamster", "pet"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐰",
    names: ["rabbit face", "bunny"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐇",
    names: ["rabbit"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐿️",
    names: ["chipmunk"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦫",
    names: ["beaver"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦔",
    names: ["hedgehog"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦇",
    names: ["bat"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐻",
    names: ["bear"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐻‍❄️",
    names: ["polar bear"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐨",
    names: ["koala"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐼",
    names: ["panda"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦥",
    names: ["sloth"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦦",
    names: ["otter"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦨",
    names: ["skunk"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦘",
    names: ["kangaroo"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦡",
    names: ["badger"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐾",
    names: ["paw prints"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦃",
    names: ["turkey", "thanksgiving"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐔",
    names: ["chicken"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐓",
    names: ["rooster"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐣",
    names: ["hatching chick"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐤",
    names: ["baby chick"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐥",
    names: ["front-facing baby chick"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐦",
    names: ["bird"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐧",
    names: ["penguin"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🕊️",
    names: ["dove", "peace"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦅",
    names: ["eagle"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦆",
    names: ["duck"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦢",
    names: ["swan"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦉",
    names: ["owl"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦤",
    names: ["dodo"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪶",
    names: ["feather"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦩",
    names: ["flamingo"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦚",
    names: ["peacock"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦜",
    names: ["parrot"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪽",
    names: ["wing", "fly"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐦‍⬛",
    names: ["black bird"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪿",
    names: ["goose", "honk"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐸",
    names: ["frog"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐊",
    names: ["crocodile"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐢",
    names: ["turtle", "slow"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦎",
    names: ["lizard"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐍",
    names: ["snake"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐲",
    names: ["dragon face"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐉",
    names: ["dragon"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦕",
    names: ["sauropod", "dinosaur"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦖",
    names: ["T-Rex", "dinosaur"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐳",
    names: ["spouting whale", "sea"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐋",
    names: ["whale"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐬",
    names: ["dolphin"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦭",
    names: ["seal"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐟",
    names: ["fish"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐠",
    names: ["tropical fish"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐡",
    names: ["blowfish"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦈",
    names: ["shark"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐙",
    names: ["octopus"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐚",
    names: ["spiral shell", "sea", "beach"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪸",
    names: ["coral"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪼",
    names: ["jellyfish"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐌",
    names: ["snail", "slow"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦋",
    names: ["butterfly"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐛",
    names: ["bug"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐜",
    names: ["ant"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐝",
    names: ["honeybee"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪲",
    names: ["beetle"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🐞",
    names: ["lady beetle", "bug"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦗",
    names: ["cricket"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪳",
    names: ["cockroach"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🕷️",
    names: ["spider"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🕸️",
    names: ["spider web"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦂",
    names: ["scorpion"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦟",
    names: ["mosquito"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪰",
    names: ["fly"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪱",
    names: ["worm"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🦠",
    names: ["microbe", "germ"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "💐",
    names: ["bouquet", "flowers"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌸",
    names: ["cherry blossom", "flower", "spring"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "💮",
    names: ["white flower"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪷",
    names: ["lotus"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🏵️",
    names: ["rosette"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌹",
    names: ["rose", "flower"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🥀",
    names: ["wilted flower"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌺",
    names: ["hibiscus"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌻",
    names: ["sunflower"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌼",
    names: ["blossom"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌷",
    names: ["tulip", "flower"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪻",
    names: ["hyacinth"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌱",
    names: ["seedling", "plant"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪴",
    names: ["potted plant"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌲",
    names: ["evergreen tree", "wood"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌳",
    names: ["deciduous tree", "wood"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌴",
    names: ["palm tree"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌵",
    names: ["cactus"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌾",
    names: ["sheaf of rice"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🌿",
    names: ["herb"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "☘️",
    names: ["shamrock"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🍀",
    names: ["four leaf clover", "luck"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🍁",
    names: ["maple leaf", "canada"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🍂",
    names: ["fallen leaf", "autumn"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🍃",
    names: ["leaf fluttering in wind", "leaf"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪹",
    names: ["empty nest"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🪺",
    names: ["nest with eggs"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🍄",
    names: ["mushroom", "fungus"],
    category: "ANIMALS_AND_NATURE",
  },
  {
    emoji: "🍇",
    names: ["grapes"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍈",
    names: ["melon"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍉",
    names: ["watermelon"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍊",
    names: ["tangerine"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍋",
    names: ["lemon"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍌",
    names: ["banana", "fruit"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍍",
    names: ["pineapple"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥭",
    names: ["mango"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍎",
    names: ["red apple"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍏",
    names: ["green apple", "fruit"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍐",
    names: ["pear"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍑",
    names: ["peach"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍒",
    names: ["cherries", "fruit"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍓",
    names: ["strawberry", "fruit"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫐",
    names: ["blueberries"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥝",
    names: ["kiwi fruit"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍅",
    names: ["tomato"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫒",
    names: ["olive"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥥",
    names: ["coconut"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥑",
    names: ["avocado"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍆",
    names: ["eggplant", "aubergine"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥔",
    names: ["potato"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥕",
    names: ["carrot"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🌽",
    names: ["ear of corn"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🌶️",
    names: ["hot pepper", "spicy"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫑",
    names: ["bell pepper"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥒",
    names: ["cucumber"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥬",
    names: ["leafy green"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥦",
    names: ["broccoli"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧄",
    names: ["garlic"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧅",
    names: ["onion"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥜",
    names: ["peanuts"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫘",
    names: ["beans"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🌰",
    names: ["chestnut"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫚",
    names: ["ginger root"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫛",
    names: ["pea pod"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍞",
    names: ["bread", "toast"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥐",
    names: ["croissant"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥖",
    names: ["baguette bread"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫓",
    names: ["flatbread"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥨",
    names: ["pretzel"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥯",
    names: ["bagel"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥞",
    names: ["pancakes"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧇",
    names: ["waffle"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧀",
    names: ["cheese wedge"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍖",
    names: ["meat on bone"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍗",
    names: ["poultry leg", "meat", "chicken"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥩",
    names: ["cut of meat"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥓",
    names: ["bacon"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍔",
    names: ["hamburger", "burger"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍟",
    names: ["french fries"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍕",
    names: ["pizza"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🌭",
    names: ["hot dog"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥪",
    names: ["sandwich"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🌮",
    names: ["taco"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🌯",
    names: ["burrito"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫔",
    names: ["tamale"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥙",
    names: ["stuffed flatbread"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧆",
    names: ["falafel"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥚",
    names: ["egg"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍳",
    names: ["cooking", "breakfast"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥘",
    names: ["shallow pan of food", "paella", "curry"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍲",
    names: ["pot of food"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫕",
    names: ["fondue"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥣",
    names: ["bowl with spoon"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥗",
    names: ["green salad"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍿",
    names: ["popcorn"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧈",
    names: ["butter"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧂",
    names: ["salt"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥫",
    names: ["canned food"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍱",
    names: ["bento box"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍘",
    names: ["rice cracker"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍙",
    names: ["rice ball"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍚",
    names: ["cooked rice"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍛",
    names: ["curry rice"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍜",
    names: ["steaming bowl", "noodle"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍝",
    names: ["spaghetti", "pasta"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍠",
    names: ["roasted sweet potato"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍢",
    names: ["oden"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍣",
    names: ["sushi"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍤",
    names: ["fried shrimp", "tempura"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍥",
    names: ["fish cake with swirl"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥮",
    names: ["moon cake"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍡",
    names: ["dango"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥟",
    names: ["dumpling"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥠",
    names: ["fortune cookie"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥡",
    names: ["takeout box"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🦀",
    names: ["crab"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🦞",
    names: ["lobster"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🦐",
    names: ["shrimp"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🦑",
    names: ["squid"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🦪",
    names: ["oyster"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍦",
    names: ["soft ice cream"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍧",
    names: ["shaved ice"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍨",
    names: ["ice cream"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍩",
    names: ["doughnut"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍪",
    names: ["cookie"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🎂",
    names: ["birthday cake", "party"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍰",
    names: ["shortcake", "dessert"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧁",
    names: ["cupcake"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥧",
    names: ["pie"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍫",
    names: ["chocolate bar"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍬",
    names: ["candy", "sweet"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍭",
    names: ["lollipop"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍮",
    names: ["custard"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍯",
    names: ["honey pot"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍼",
    names: ["baby bottle", "milk"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥛",
    names: ["glass of milk"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "☕",
    names: ["hot beverage", "cafe", "espresso"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫖",
    names: ["teapot"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍵",
    names: ["teacup without handle", "green", "breakfast"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍶",
    names: ["sake"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍾",
    names: ["bottle with popping cork", "bottle", "bubbly", "celebration"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍷",
    names: ["wine glass"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍸",
    names: ["cocktail glass", "drink"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍹",
    names: ["tropical drink", "summer", "vacation"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍺",
    names: ["beer mug", "drink"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍻",
    names: ["clinking beer mugs", "drinks"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥂",
    names: ["clinking glasses", "cheers", "toast"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥃",
    names: ["tumbler glass", "whisky"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫗",
    names: ["pouring liquid"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥤",
    names: ["cup with straw"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧋",
    names: ["bubble tea"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧃",
    names: ["beverage box"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧉",
    names: ["mate"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🧊",
    names: ["ice"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥢",
    names: ["chopsticks"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍽️",
    names: ["fork and knife with plate", "dining", "dinner"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🍴",
    names: ["fork and knife", "cutlery"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🥄",
    names: ["spoon"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🔪",
    names: ["kitchen knife", "cut", "chop"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🫙",
    names: ["jar"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🏺",
    names: ["amphora"],
    category: "FOOD_AND_DRINK",
  },
  {
    emoji: "🌍",
    names: ["globe showing Europe-Africa", "globe", "world", "international"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌎",
    names: ["globe showing Americas", "globe", "world", "international"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌏",
    names: ["globe showing Asia-Australia", "globe", "world", "international"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌐",
    names: ["globe with meridians", "world", "global", "international"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🗺️",
    names: ["world map", "travel"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🗾",
    names: ["map of Japan"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🧭",
    names: ["compass"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏔️",
    names: ["snow-capped mountain"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛰️",
    names: ["mountain"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌋",
    names: ["volcano"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🗻",
    names: ["mount fuji"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏕️",
    names: ["camping"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏖️",
    names: ["beach with umbrella"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏜️",
    names: ["desert"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏝️",
    names: ["desert island"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏞️",
    names: ["national park"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏟️",
    names: ["stadium"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏛️",
    names: ["classical building"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏗️",
    names: ["building construction"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🧱",
    names: ["brick"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🪨",
    names: ["rock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🪵",
    names: ["wood"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛖",
    names: ["hut"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏘️",
    names: ["houses"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏚️",
    names: ["derelict house"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏠",
    names: ["house"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏡",
    names: ["house with garden"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏢",
    names: ["office building"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏣",
    names: ["Japanese post office"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏤",
    names: ["post office"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏥",
    names: ["hospital"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏦",
    names: ["bank"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏨",
    names: ["hotel"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏩",
    names: ["love hotel"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏪",
    names: ["convenience store"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏫",
    names: ["school"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏬",
    names: ["department store"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏭",
    names: ["factory"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏯",
    names: ["Japanese castle"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏰",
    names: ["castle"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "💒",
    names: ["wedding", "marriage"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🗼",
    names: ["Tokyo tower"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🗽",
    names: ["Statue of Liberty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛪",
    names: ["church"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕌",
    names: ["mosque"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛕",
    names: ["hindu temple"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕍",
    names: ["synagogue"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛩️",
    names: ["shinto shrine"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕋",
    names: ["kaaba"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛲",
    names: ["fountain"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛺",
    names: ["tent", "camping"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌁",
    names: ["foggy", "karl"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌃",
    names: ["night with stars"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏙️",
    names: ["cityscape", "skyline"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌄",
    names: ["sunrise over mountains"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌅",
    names: ["sunrise"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌆",
    names: ["cityscape at dusk"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌇",
    names: ["sunset"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌉",
    names: ["bridge at night"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "♨️",
    names: ["hot springs"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🎠",
    names: ["carousel horse"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛝",
    names: ["playground slide"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🎡",
    names: ["ferris wheel"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🎢",
    names: ["roller coaster"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "💈",
    names: ["barber pole"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🎪",
    names: ["circus tent"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚂",
    names: ["locomotive", "train"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚃",
    names: ["railway car"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚄",
    names: ["high-speed train", "train"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚅",
    names: ["bullet train", "train"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚆",
    names: ["train"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚇",
    names: ["metro"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚈",
    names: ["light rail"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚉",
    names: ["station"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚊",
    names: ["tram"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚝",
    names: ["monorail"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚞",
    names: ["mountain railway"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚋",
    names: ["tram car"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚌",
    names: ["bus"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚍",
    names: ["oncoming bus"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚎",
    names: ["trolleybus"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚐",
    names: ["minibus"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚑",
    names: ["ambulance"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚒",
    names: ["fire engine"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚓",
    names: ["police car"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚔",
    names: ["oncoming police car"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚕",
    names: ["taxi"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚖",
    names: ["oncoming taxi"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚗",
    names: ["automobile"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚘",
    names: ["oncoming automobile"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚙",
    names: ["sport utility vehicle"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛻",
    names: ["pickup truck"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚚",
    names: ["delivery truck"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚛",
    names: ["articulated lorry"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚜",
    names: ["tractor"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏎️",
    names: ["racing car"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🏍️",
    names: ["motorcycle"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛵",
    names: ["motor scooter"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🦽",
    names: ["manual wheelchair"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🦼",
    names: ["motorized wheelchair"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛺",
    names: ["auto rickshaw"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚲",
    names: ["bicycle", "bicycle"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛴",
    names: ["kick scooter"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛹",
    names: ["skateboard"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛼",
    names: ["roller skate"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚏",
    names: ["bus stop"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛣️",
    names: ["motorway"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛤️",
    names: ["railway track"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛢️",
    names: ["oil drum"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛽",
    names: ["fuel pump"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛞",
    names: ["wheel"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚨",
    names: ["police car light", "911", "emergency"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚥",
    names: ["horizontal traffic light"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚦",
    names: ["vertical traffic light", "semaphore"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛑",
    names: ["stop sign"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚧",
    names: ["construction", "wip"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⚓",
    names: ["anchor", "ship"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛟",
    names: ["ring buoy", "life preserver"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛵",
    names: ["sailboat"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛶",
    names: ["canoe"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚤",
    names: ["speedboat", "ship"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛳️",
    names: ["passenger ship", "cruise"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛴️",
    names: ["ferry"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛥️",
    names: ["motor boat"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚢",
    names: ["ship"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "✈️",
    names: ["airplane", "flight"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛩️",
    names: ["small airplane", "flight"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛫",
    names: ["airplane departure"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛬",
    names: ["airplane arrival"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🪂",
    names: ["parachute"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "💺",
    names: ["seat"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚁",
    names: ["helicopter"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚟",
    names: ["suspension railway"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚠",
    names: ["mountain cableway"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚡",
    names: ["aerial tramway"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛰️",
    names: ["satellite", "orbit", "space"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🚀",
    names: ["rocket", "ship", "launch"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛸",
    names: ["flying saucer", "ufo"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🛎️",
    names: ["bellhop bell"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🧳",
    names: ["luggage"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⌛",
    names: ["hourglass done", "time"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⏳",
    names: ["hourglass not done", "time"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⌚",
    names: ["watch", "time"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⏰",
    names: ["alarm clock", "morning"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⏱️",
    names: ["stopwatch"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⏲️",
    names: ["timer clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕰️",
    names: ["mantelpiece clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕛",
    names: ["twelve o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕧",
    names: ["twelve-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕐",
    names: ["one o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕜",
    names: ["one-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕑",
    names: ["two o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕝",
    names: ["two-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕒",
    names: ["three o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕞",
    names: ["three-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕓",
    names: ["four o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕟",
    names: ["four-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕔",
    names: ["five o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕠",
    names: ["five-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕕",
    names: ["six o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕡",
    names: ["six-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕖",
    names: ["seven o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕢",
    names: ["seven-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕗",
    names: ["eight o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕣",
    names: ["eight-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕘",
    names: ["nine o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕤",
    names: ["nine-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕙",
    names: ["ten o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕥",
    names: ["ten-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕚",
    names: ["eleven o’clock"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🕦",
    names: ["eleven-thirty"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌑",
    names: ["new moon"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌒",
    names: ["waxing crescent moon"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌓",
    names: ["first quarter moon"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌔",
    names: ["waxing gibbous moon"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌕",
    names: ["full moon"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌖",
    names: ["waning gibbous moon"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌗",
    names: ["last quarter moon"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌘",
    names: ["waning crescent moon"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌙",
    names: ["crescent moon", "night"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌚",
    names: ["new moon face"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌛",
    names: ["first quarter moon face"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌜",
    names: ["last quarter moon face"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌡️",
    names: ["thermometer"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "☀️",
    names: ["sun", "weather"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌝",
    names: ["full moon face"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌞",
    names: ["sun with face", "summer"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🪐",
    names: ["ringed planet"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⭐",
    names: ["star"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌟",
    names: ["glowing star"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌠",
    names: ["shooting star"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌌",
    names: ["milky way"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "☁️",
    names: ["cloud"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛅",
    names: ["sun behind cloud", "weather", "cloud"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛈️",
    names: ["cloud with lightning and rain"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌤️",
    names: ["sun behind small cloud"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌥️",
    names: ["sun behind large cloud"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌦️",
    names: ["sun behind rain cloud"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌧️",
    names: ["cloud with rain"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌨️",
    names: ["cloud with snow"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌩️",
    names: ["cloud with lightning"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌪️",
    names: ["tornado"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌫️",
    names: ["fog"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌬️",
    names: ["wind face"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌀",
    names: ["cyclone", "swirl"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌈",
    names: ["rainbow"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌂",
    names: ["closed umbrella", "weather", "rain"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "☂️",
    names: ["umbrella"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "☔",
    names: ["umbrella with rain drops", "rain", "weather"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛱️",
    names: ["umbrella on ground", "beach_umbrella"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⚡",
    names: ["high voltage", "lightning", "thunder"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "❄️",
    names: ["snowflake", "winter", "cold", "weather"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "☃️",
    names: ["snowman", "winter", "christmas"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "⛄",
    names: ["snowman without snow", "winter"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "☄️",
    names: ["comet"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🔥",
    names: ["fire", "burn"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "💧",
    names: ["droplet", "water"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🌊",
    names: ["water wave", "sea"],
    category: "TRAVEL_AND_PLACES",
  },
  {
    emoji: "🎃",
    names: ["jack-o-lantern", "halloween"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎄",
    names: ["Christmas tree"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎆",
    names: ["fireworks", "festival", "celebration"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎇",
    names: ["sparkler"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🧨",
    names: ["firecracker"],
    category: "ACTIVITIES",
  },
  {
    emoji: "✨",
    names: ["sparkles", "shiny"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎈",
    names: ["balloon", "party", "birthday"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎉",
    names: ["party popper", "hooray", "party"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎊",
    names: ["confetti ball"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎋",
    names: ["tanabata tree"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎍",
    names: ["pine decoration"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎎",
    names: ["Japanese dolls"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎏",
    names: ["carp streamer"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎐",
    names: ["wind chime"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎑",
    names: ["moon viewing ceremony"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🧧",
    names: ["red envelope"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎀",
    names: ["ribbon"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎁",
    names: ["wrapped gift", "present", "birthday", "christmas"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎗️",
    names: ["reminder ribbon"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎟️",
    names: ["admission tickets"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎫",
    names: ["ticket"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎖️",
    names: ["military medal"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🏆",
    names: ["trophy", "award", "contest", "winner"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🏅",
    names: ["sports medal", "gold", "winner"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🥇",
    names: ["1st place medal", "gold"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🥈",
    names: ["2nd place medal", "silver"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🥉",
    names: ["3rd place medal", "bronze"],
    category: "ACTIVITIES",
  },
  {
    emoji: "⚽",
    names: ["soccer ball", "sports"],
    category: "ACTIVITIES",
  },
  {
    emoji: "⚾",
    names: ["baseball", "sports"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🥎",
    names: ["softball"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🏀",
    names: ["basketball", "sports"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🏐",
    names: ["volleyball"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🏈",
    names: ["american football", "sports"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🏉",
    names: ["rugby football"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎾",
    names: ["tennis", "sports"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🥏",
    names: ["flying disc"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎳",
    names: ["bowling"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🏏",
    names: ["cricket game"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🏑",
    names: ["field hockey"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🏒",
    names: ["ice hockey"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🥍",
    names: ["lacrosse"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🏓",
    names: ["ping pong"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🏸",
    names: ["badminton"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🥊",
    names: ["boxing glove"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🥋",
    names: ["martial arts uniform"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🥅",
    names: ["goal net"],
    category: "ACTIVITIES",
  },
  {
    emoji: "⛳",
    names: ["flag in hole"],
    category: "ACTIVITIES",
  },
  {
    emoji: "⛸️",
    names: ["ice skate", "skating"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎣",
    names: ["fishing pole"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🤿",
    names: ["diving mask"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎽",
    names: ["running shirt", "marathon"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎿",
    names: ["skis"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🛷",
    names: ["sled"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🥌",
    names: ["curling stone"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎯",
    names: ["bullseye", "target"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🪀",
    names: ["yo-yo"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🪁",
    names: ["kite"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🔫",
    names: ["water pistol", "shoot", "weapon"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎱",
    names: ["pool 8 ball", "pool", "billiards"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🔮",
    names: ["crystal ball", "fortune"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🪄",
    names: ["magic wand"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎮",
    names: ["video game", "play", "controller", "console"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🕹️",
    names: ["joystick"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎰",
    names: ["slot machine"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎲",
    names: ["game die", "dice", "gambling"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🧩",
    names: ["puzzle piece"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🧸",
    names: ["teddy bear"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🪅",
    names: ["piñata"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🪩",
    names: ["mirror ball", "disco", "party"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🪆",
    names: ["nesting dolls"],
    category: "ACTIVITIES",
  },
  {
    emoji: "♠️",
    names: ["spade suit"],
    category: "ACTIVITIES",
  },
  {
    emoji: "♥️",
    names: ["heart suit"],
    category: "ACTIVITIES",
  },
  {
    emoji: "♦️",
    names: ["diamond suit"],
    category: "ACTIVITIES",
  },
  {
    emoji: "♣️",
    names: ["club suit"],
    category: "ACTIVITIES",
  },
  {
    emoji: "♟️",
    names: ["chess pawn"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🃏",
    names: ["joker"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🀄",
    names: ["mahjong red dragon"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎴",
    names: ["flower playing cards"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎭",
    names: ["performing arts", "theater", "drama"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🖼️",
    names: ["framed picture"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🎨",
    names: ["artist palette", "design", "paint"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🧵",
    names: ["thread"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🪡",
    names: ["sewing needle"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🧶",
    names: ["yarn"],
    category: "ACTIVITIES",
  },
  {
    emoji: "🪢",
    names: ["knot"],
    category: "ACTIVITIES",
  },
  {
    emoji: "👓",
    names: ["glasses", "glasses"],
    category: "OBJECTS",
  },
  {
    emoji: "🕶️",
    names: ["sunglasses"],
    category: "OBJECTS",
  },
  {
    emoji: "🥽",
    names: ["goggles"],
    category: "OBJECTS",
  },
  {
    emoji: "🥼",
    names: ["lab coat"],
    category: "OBJECTS",
  },
  {
    emoji: "🦺",
    names: ["safety vest"],
    category: "OBJECTS",
  },
  {
    emoji: "👔",
    names: ["necktie", "shirt", "formal"],
    category: "OBJECTS",
  },
  {
    emoji: "👕",
    names: ["t-shirt"],
    category: "OBJECTS",
  },
  {
    emoji: "👖",
    names: ["jeans", "pants"],
    category: "OBJECTS",
  },
  {
    emoji: "🧣",
    names: ["scarf"],
    category: "OBJECTS",
  },
  {
    emoji: "🧤",
    names: ["gloves"],
    category: "OBJECTS",
  },
  {
    emoji: "🧥",
    names: ["coat"],
    category: "OBJECTS",
  },
  {
    emoji: "🧦",
    names: ["socks"],
    category: "OBJECTS",
  },
  {
    emoji: "👗",
    names: ["dress"],
    category: "OBJECTS",
  },
  {
    emoji: "👘",
    names: ["kimono"],
    category: "OBJECTS",
  },
  {
    emoji: "🥻",
    names: ["sari"],
    category: "OBJECTS",
  },
  {
    emoji: "🩱",
    names: ["one-piece swimsuit"],
    category: "OBJECTS",
  },
  {
    emoji: "🩲",
    names: ["briefs"],
    category: "OBJECTS",
  },
  {
    emoji: "🩳",
    names: ["shorts"],
    category: "OBJECTS",
  },
  {
    emoji: "👙",
    names: ["bikini", "beach"],
    category: "OBJECTS",
  },
  {
    emoji: "👚",
    names: ["woman’s clothes"],
    category: "OBJECTS",
  },
  {
    emoji: "🪭",
    names: ["folding hand fan", "sensu"],
    category: "OBJECTS",
  },
  {
    emoji: "👛",
    names: ["purse"],
    category: "OBJECTS",
  },
  {
    emoji: "👜",
    names: ["handbag", "bag"],
    category: "OBJECTS",
  },
  {
    emoji: "👝",
    names: ["clutch bag", "bag"],
    category: "OBJECTS",
  },
  {
    emoji: "🛍️",
    names: ["shopping bags", "bags"],
    category: "OBJECTS",
  },
  {
    emoji: "🎒",
    names: ["backpack"],
    category: "OBJECTS",
  },
  {
    emoji: "🩴",
    names: ["thong sandal"],
    category: "OBJECTS",
  },
  {
    emoji: "👞",
    names: ["man’s shoe"],
    category: "OBJECTS",
  },
  {
    emoji: "👟",
    names: ["running shoe", "sneaker", "sport", "running"],
    category: "OBJECTS",
  },
  {
    emoji: "🥾",
    names: ["hiking boot"],
    category: "OBJECTS",
  },
  {
    emoji: "🥿",
    names: ["flat shoe"],
    category: "OBJECTS",
  },
  {
    emoji: "👠",
    names: ["high-heeled shoe", "shoe"],
    category: "OBJECTS",
  },
  {
    emoji: "👡",
    names: ["woman’s sandal", "shoe"],
    category: "OBJECTS",
  },
  {
    emoji: "🩰",
    names: ["ballet shoes"],
    category: "OBJECTS",
  },
  {
    emoji: "👢",
    names: ["woman’s boot"],
    category: "OBJECTS",
  },
  {
    emoji: "🪮",
    names: ["hair pick"],
    category: "OBJECTS",
  },
  {
    emoji: "👑",
    names: ["crown", "king", "queen", "royal"],
    category: "OBJECTS",
  },
  {
    emoji: "👒",
    names: ["woman’s hat"],
    category: "OBJECTS",
  },
  {
    emoji: "🎩",
    names: ["top hat", "hat", "classy"],
    category: "OBJECTS",
  },
  {
    emoji: "🎓",
    names: [
      "graduation cap",
      "education",
      "college",
      "university",
      "graduation",
    ],
    category: "OBJECTS",
  },
  {
    emoji: "🧢",
    names: ["billed cap"],
    category: "OBJECTS",
  },
  {
    emoji: "🪖",
    names: ["military helmet"],
    category: "OBJECTS",
  },
  {
    emoji: "⛑️",
    names: ["rescue worker’s helmet"],
    category: "OBJECTS",
  },
  {
    emoji: "📿",
    names: ["prayer beads"],
    category: "OBJECTS",
  },
  {
    emoji: "💄",
    names: ["lipstick", "makeup"],
    category: "OBJECTS",
  },
  {
    emoji: "💍",
    names: ["ring", "wedding", "marriage", "engaged"],
    category: "OBJECTS",
  },
  {
    emoji: "💎",
    names: ["gem stone", "diamond"],
    category: "OBJECTS",
  },
  {
    emoji: "🔇",
    names: ["muted speaker", "sound", "volume"],
    category: "OBJECTS",
  },
  {
    emoji: "🔈",
    names: ["speaker low volume"],
    category: "OBJECTS",
  },
  {
    emoji: "🔉",
    names: ["speaker medium volume", "volume"],
    category: "OBJECTS",
  },
  {
    emoji: "🔊",
    names: ["speaker high volume", "volume"],
    category: "OBJECTS",
  },
  {
    emoji: "📢",
    names: ["loudspeaker", "announcement"],
    category: "OBJECTS",
  },
  {
    emoji: "📣",
    names: ["megaphone"],
    category: "OBJECTS",
  },
  {
    emoji: "📯",
    names: ["postal horn"],
    category: "OBJECTS",
  },
  {
    emoji: "🔔",
    names: ["bell", "sound", "notification"],
    category: "OBJECTS",
  },
  {
    emoji: "🔕",
    names: ["bell with slash", "volume", "off"],
    category: "OBJECTS",
  },
  {
    emoji: "🎼",
    names: ["musical score"],
    category: "OBJECTS",
  },
  {
    emoji: "🎵",
    names: ["musical note"],
    category: "OBJECTS",
  },
  {
    emoji: "🎶",
    names: ["musical notes", "music"],
    category: "OBJECTS",
  },
  {
    emoji: "🎙️",
    names: ["studio microphone", "podcast"],
    category: "OBJECTS",
  },
  {
    emoji: "🎚️",
    names: ["level slider"],
    category: "OBJECTS",
  },
  {
    emoji: "🎛️",
    names: ["control knobs"],
    category: "OBJECTS",
  },
  {
    emoji: "🎤",
    names: ["microphone", "sing"],
    category: "OBJECTS",
  },
  {
    emoji: "🎧",
    names: ["headphone", "music", "earphones"],
    category: "OBJECTS",
  },
  {
    emoji: "📻",
    names: ["radio", "podcast"],
    category: "OBJECTS",
  },
  {
    emoji: "🎷",
    names: ["saxophone"],
    category: "OBJECTS",
  },
  {
    emoji: "🪗",
    names: ["accordion"],
    category: "OBJECTS",
  },
  {
    emoji: "🎸",
    names: ["guitar", "rock"],
    category: "OBJECTS",
  },
  {
    emoji: "🎹",
    names: ["musical keyboard", "piano"],
    category: "OBJECTS",
  },
  {
    emoji: "🎺",
    names: ["trumpet"],
    category: "OBJECTS",
  },
  {
    emoji: "🎻",
    names: ["violin"],
    category: "OBJECTS",
  },
  {
    emoji: "🪕",
    names: ["banjo"],
    category: "OBJECTS",
  },
  {
    emoji: "🥁",
    names: ["drum"],
    category: "OBJECTS",
  },
  {
    emoji: "🪘",
    names: ["long drum"],
    category: "OBJECTS",
  },
  {
    emoji: "🪇",
    names: ["maracas", "shaker"],
    category: "OBJECTS",
  },
  {
    emoji: "🪈",
    names: ["flute", "recorder"],
    category: "OBJECTS",
  },
  {
    emoji: "📱",
    names: ["mobile phone", "smartphone", "mobile"],
    category: "OBJECTS",
  },
  {
    emoji: "📲",
    names: ["mobile phone with arrow", "call", "incoming"],
    category: "OBJECTS",
  },
  {
    emoji: "☎️",
    names: ["telephone"],
    category: "OBJECTS",
  },
  {
    emoji: "📞",
    names: ["telephone receiver", "phone", "call"],
    category: "OBJECTS",
  },
  {
    emoji: "📟",
    names: ["pager"],
    category: "OBJECTS",
  },
  {
    emoji: "📠",
    names: ["fax machine"],
    category: "OBJECTS",
  },
  {
    emoji: "🔋",
    names: ["battery", "power"],
    category: "OBJECTS",
  },
  {
    emoji: "🪫",
    names: ["low battery"],
    category: "OBJECTS",
  },
  {
    emoji: "🔌",
    names: ["electric plug"],
    category: "OBJECTS",
  },
  {
    emoji: "💻",
    names: ["laptop", "desktop", "screen"],
    category: "OBJECTS",
  },
  {
    emoji: "🖥️",
    names: ["desktop computer"],
    category: "OBJECTS",
  },
  {
    emoji: "🖨️",
    names: ["printer"],
    category: "OBJECTS",
  },
  {
    emoji: "⌨️",
    names: ["keyboard"],
    category: "OBJECTS",
  },
  {
    emoji: "🖱️",
    names: ["computer mouse"],
    category: "OBJECTS",
  },
  {
    emoji: "🖲️",
    names: ["trackball"],
    category: "OBJECTS",
  },
  {
    emoji: "💽",
    names: ["computer disk"],
    category: "OBJECTS",
  },
  {
    emoji: "💾",
    names: ["floppy disk", "save"],
    category: "OBJECTS",
  },
  {
    emoji: "💿",
    names: ["optical disk"],
    category: "OBJECTS",
  },
  {
    emoji: "📀",
    names: ["dvd"],
    category: "OBJECTS",
  },
  {
    emoji: "🧮",
    names: ["abacus"],
    category: "OBJECTS",
  },
  {
    emoji: "🎥",
    names: ["movie camera", "film", "video"],
    category: "OBJECTS",
  },
  {
    emoji: "🎞️",
    names: ["film frames"],
    category: "OBJECTS",
  },
  {
    emoji: "📽️",
    names: ["film projector"],
    category: "OBJECTS",
  },
  {
    emoji: "🎬",
    names: ["clapper board", "film"],
    category: "OBJECTS",
  },
  {
    emoji: "📺",
    names: ["television"],
    category: "OBJECTS",
  },
  {
    emoji: "📷",
    names: ["camera", "photo"],
    category: "OBJECTS",
  },
  {
    emoji: "📸",
    names: ["camera with flash", "photo"],
    category: "OBJECTS",
  },
  {
    emoji: "📹",
    names: ["video camera"],
    category: "OBJECTS",
  },
  {
    emoji: "📼",
    names: ["videocassette"],
    category: "OBJECTS",
  },
  {
    emoji: "🔍",
    names: ["magnifying glass tilted left", "search", "zoom"],
    category: "OBJECTS",
  },
  {
    emoji: "🔎",
    names: ["magnifying glass tilted right"],
    category: "OBJECTS",
  },
  {
    emoji: "🕯️",
    names: ["candle"],
    category: "OBJECTS",
  },
  {
    emoji: "💡",
    names: ["light bulb", "idea", "light"],
    category: "OBJECTS",
  },
  {
    emoji: "🔦",
    names: ["flashlight"],
    category: "OBJECTS",
  },
  {
    emoji: "🏮",
    names: ["red paper lantern"],
    category: "OBJECTS",
  },
  {
    emoji: "🪔",
    names: ["diya lamp"],
    category: "OBJECTS",
  },
  {
    emoji: "📔",
    names: ["notebook with decorative cover"],
    category: "OBJECTS",
  },
  {
    emoji: "📕",
    names: ["closed book"],
    category: "OBJECTS",
  },
  {
    emoji: "📖",
    names: ["open book"],
    category: "OBJECTS",
  },
  {
    emoji: "📗",
    names: ["green book"],
    category: "OBJECTS",
  },
  {
    emoji: "📘",
    names: ["blue book"],
    category: "OBJECTS",
  },
  {
    emoji: "📙",
    names: ["orange book"],
    category: "OBJECTS",
  },
  {
    emoji: "📚",
    names: ["books", "library"],
    category: "OBJECTS",
  },
  {
    emoji: "📓",
    names: ["notebook"],
    category: "OBJECTS",
  },
  {
    emoji: "📒",
    names: ["ledger"],
    category: "OBJECTS",
  },
  {
    emoji: "📃",
    names: ["page with curl"],
    category: "OBJECTS",
  },
  {
    emoji: "📜",
    names: ["scroll", "document"],
    category: "OBJECTS",
  },
  {
    emoji: "📄",
    names: ["page facing up", "document"],
    category: "OBJECTS",
  },
  {
    emoji: "📰",
    names: ["newspaper", "press"],
    category: "OBJECTS",
  },
  {
    emoji: "🗞️",
    names: ["rolled-up newspaper", "press"],
    category: "OBJECTS",
  },
  {
    emoji: "📑",
    names: ["bookmark tabs"],
    category: "OBJECTS",
  },
  {
    emoji: "🔖",
    names: ["bookmark"],
    category: "OBJECTS",
  },
  {
    emoji: "🏷️",
    names: ["label", "tag"],
    category: "OBJECTS",
  },
  {
    emoji: "💰",
    names: ["money bag", "dollar", "cream"],
    category: "OBJECTS",
  },
  {
    emoji: "🪙",
    names: ["coin"],
    category: "OBJECTS",
  },
  {
    emoji: "💴",
    names: ["yen banknote"],
    category: "OBJECTS",
  },
  {
    emoji: "💵",
    names: ["dollar banknote", "money"],
    category: "OBJECTS",
  },
  {
    emoji: "💶",
    names: ["euro banknote"],
    category: "OBJECTS",
  },
  {
    emoji: "💷",
    names: ["pound banknote"],
    category: "OBJECTS",
  },
  {
    emoji: "💸",
    names: ["money with wings", "dollar"],
    category: "OBJECTS",
  },
  {
    emoji: "💳",
    names: ["credit card", "subscription"],
    category: "OBJECTS",
  },
  {
    emoji: "🧾",
    names: ["receipt"],
    category: "OBJECTS",
  },
  {
    emoji: "💹",
    names: ["chart increasing with yen"],
    category: "OBJECTS",
  },
  {
    emoji: "✉️",
    names: ["envelope", "letter", "email"],
    category: "OBJECTS",
  },
  {
    emoji: "📧",
    names: ["e-mail"],
    category: "OBJECTS",
  },
  {
    emoji: "📨",
    names: ["incoming envelope"],
    category: "OBJECTS",
  },
  {
    emoji: "📩",
    names: ["envelope with arrow"],
    category: "OBJECTS",
  },
  {
    emoji: "📤",
    names: ["outbox tray"],
    category: "OBJECTS",
  },
  {
    emoji: "📥",
    names: ["inbox tray"],
    category: "OBJECTS",
  },
  {
    emoji: "📦",
    names: ["package", "shipping"],
    category: "OBJECTS",
  },
  {
    emoji: "📫",
    names: ["closed mailbox with raised flag"],
    category: "OBJECTS",
  },
  {
    emoji: "📪",
    names: ["closed mailbox with lowered flag"],
    category: "OBJECTS",
  },
  {
    emoji: "📬",
    names: ["open mailbox with raised flag"],
    category: "OBJECTS",
  },
  {
    emoji: "📭",
    names: ["open mailbox with lowered flag"],
    category: "OBJECTS",
  },
  {
    emoji: "📮",
    names: ["postbox"],
    category: "OBJECTS",
  },
  {
    emoji: "🗳️",
    names: ["ballot box with ballot"],
    category: "OBJECTS",
  },
  {
    emoji: "✏️",
    names: ["pencil"],
    category: "OBJECTS",
  },
  {
    emoji: "✒️",
    names: ["black nib"],
    category: "OBJECTS",
  },
  {
    emoji: "🖋️",
    names: ["fountain pen"],
    category: "OBJECTS",
  },
  {
    emoji: "🖊️",
    names: ["pen"],
    category: "OBJECTS",
  },
  {
    emoji: "🖌️",
    names: ["paintbrush"],
    category: "OBJECTS",
  },
  {
    emoji: "🖍️",
    names: ["crayon"],
    category: "OBJECTS",
  },
  {
    emoji: "📝",
    names: ["memo", "document", "note"],
    category: "OBJECTS",
  },
  {
    emoji: "💼",
    names: ["briefcase", "business"],
    category: "OBJECTS",
  },
  {
    emoji: "📁",
    names: ["file folder", "directory"],
    category: "OBJECTS",
  },
  {
    emoji: "📂",
    names: ["open file folder"],
    category: "OBJECTS",
  },
  {
    emoji: "🗂️",
    names: ["card index dividers"],
    category: "OBJECTS",
  },
  {
    emoji: "📅",
    names: ["calendar", "calendar", "schedule"],
    category: "OBJECTS",
  },
  {
    emoji: "📆",
    names: ["tear-off calendar", "schedule"],
    category: "OBJECTS",
  },
  {
    emoji: "🗒️",
    names: ["spiral notepad"],
    category: "OBJECTS",
  },
  {
    emoji: "🗓️",
    names: ["spiral calendar"],
    category: "OBJECTS",
  },
  {
    emoji: "📇",
    names: ["card index"],
    category: "OBJECTS",
  },
  {
    emoji: "📈",
    names: ["chart increasing", "graph", "metrics"],
    category: "OBJECTS",
  },
  {
    emoji: "📉",
    names: ["chart decreasing", "graph", "metrics"],
    category: "OBJECTS",
  },
  {
    emoji: "📊",
    names: ["bar chart", "stats", "metrics"],
    category: "OBJECTS",
  },
  {
    emoji: "📋",
    names: ["clipboard"],
    category: "OBJECTS",
  },
  {
    emoji: "📌",
    names: ["pushpin", "location"],
    category: "OBJECTS",
  },
  {
    emoji: "📍",
    names: ["round pushpin", "location"],
    category: "OBJECTS",
  },
  {
    emoji: "📎",
    names: ["paperclip"],
    category: "OBJECTS",
  },
  {
    emoji: "🖇️",
    names: ["linked paperclips"],
    category: "OBJECTS",
  },
  {
    emoji: "📏",
    names: ["straight ruler"],
    category: "OBJECTS",
  },
  {
    emoji: "📐",
    names: ["triangular ruler"],
    category: "OBJECTS",
  },
  {
    emoji: "✂️",
    names: ["scissors", "cut"],
    category: "OBJECTS",
  },
  {
    emoji: "🗃️",
    names: ["card file box"],
    category: "OBJECTS",
  },
  {
    emoji: "🗄️",
    names: ["file cabinet"],
    category: "OBJECTS",
  },
  {
    emoji: "🗑️",
    names: ["wastebasket", "trash"],
    category: "OBJECTS",
  },
  {
    emoji: "🔒",
    names: ["locked", "security", "private"],
    category: "OBJECTS",
  },
  {
    emoji: "🔓",
    names: ["unlocked", "security"],
    category: "OBJECTS",
  },
  {
    emoji: "🔏",
    names: ["locked with pen"],
    category: "OBJECTS",
  },
  {
    emoji: "🔐",
    names: ["locked with key", "security"],
    category: "OBJECTS",
  },
  {
    emoji: "🔑",
    names: ["key", "lock", "password"],
    category: "OBJECTS",
  },
  {
    emoji: "🗝️",
    names: ["old key"],
    category: "OBJECTS",
  },
  {
    emoji: "🔨",
    names: ["hammer", "tool"],
    category: "OBJECTS",
  },
  {
    emoji: "🪓",
    names: ["axe"],
    category: "OBJECTS",
  },
  {
    emoji: "⛏️",
    names: ["pick"],
    category: "OBJECTS",
  },
  {
    emoji: "⚒️",
    names: ["hammer and pick"],
    category: "OBJECTS",
  },
  {
    emoji: "🛠️",
    names: ["hammer and wrench"],
    category: "OBJECTS",
  },
  {
    emoji: "🗡️",
    names: ["dagger"],
    category: "OBJECTS",
  },
  {
    emoji: "⚔️",
    names: ["crossed swords"],
    category: "OBJECTS",
  },
  {
    emoji: "💣",
    names: ["bomb", "boom"],
    category: "OBJECTS",
  },
  {
    emoji: "🪃",
    names: ["boomerang"],
    category: "OBJECTS",
  },
  {
    emoji: "🏹",
    names: ["bow and arrow", "archery"],
    category: "OBJECTS",
  },
  {
    emoji: "🛡️",
    names: ["shield"],
    category: "OBJECTS",
  },
  {
    emoji: "🪚",
    names: ["carpentry saw"],
    category: "OBJECTS",
  },
  {
    emoji: "🔧",
    names: ["wrench", "tool"],
    category: "OBJECTS",
  },
  {
    emoji: "🪛",
    names: ["screwdriver"],
    category: "OBJECTS",
  },
  {
    emoji: "🔩",
    names: ["nut and bolt"],
    category: "OBJECTS",
  },
  {
    emoji: "⚙️",
    names: ["gear"],
    category: "OBJECTS",
  },
  {
    emoji: "🗜️",
    names: ["clamp"],
    category: "OBJECTS",
  },
  {
    emoji: "⚖️",
    names: ["balance scale"],
    category: "OBJECTS",
  },
  {
    emoji: "🦯",
    names: ["white cane"],
    category: "OBJECTS",
  },
  {
    emoji: "🔗",
    names: ["link"],
    category: "OBJECTS",
  },
  {
    emoji: "⛓️",
    names: ["chains"],
    category: "OBJECTS",
  },
  {
    emoji: "🪝",
    names: ["hook"],
    category: "OBJECTS",
  },
  {
    emoji: "🧰",
    names: ["toolbox"],
    category: "OBJECTS",
  },
  {
    emoji: "🧲",
    names: ["magnet"],
    category: "OBJECTS",
  },
  {
    emoji: "🪜",
    names: ["ladder"],
    category: "OBJECTS",
  },
  {
    emoji: "⚗️",
    names: ["alembic"],
    category: "OBJECTS",
  },
  {
    emoji: "🧪",
    names: ["test tube"],
    category: "OBJECTS",
  },
  {
    emoji: "🧫",
    names: ["petri dish"],
    category: "OBJECTS",
  },
  {
    emoji: "🧬",
    names: ["dna"],
    category: "OBJECTS",
  },
  {
    emoji: "🔬",
    names: ["microscope", "science", "laboratory", "investigate"],
    category: "OBJECTS",
  },
  {
    emoji: "🔭",
    names: ["telescope"],
    category: "OBJECTS",
  },
  {
    emoji: "📡",
    names: ["satellite antenna", "signal"],
    category: "OBJECTS",
  },
  {
    emoji: "💉",
    names: ["syringe", "health", "hospital", "needle"],
    category: "OBJECTS",
  },
  {
    emoji: "🩸",
    names: ["drop of blood"],
    category: "OBJECTS",
  },
  {
    emoji: "💊",
    names: ["pill", "health", "medicine"],
    category: "OBJECTS",
  },
  {
    emoji: "🩹",
    names: ["adhesive bandage"],
    category: "OBJECTS",
  },
  {
    emoji: "🩼",
    names: ["crutch"],
    category: "OBJECTS",
  },
  {
    emoji: "🩺",
    names: ["stethoscope"],
    category: "OBJECTS",
  },
  {
    emoji: "🩻",
    names: ["x-ray"],
    category: "OBJECTS",
  },
  {
    emoji: "🚪",
    names: ["door"],
    category: "OBJECTS",
  },
  {
    emoji: "🛗",
    names: ["elevator"],
    category: "OBJECTS",
  },
  {
    emoji: "🪞",
    names: ["mirror"],
    category: "OBJECTS",
  },
  {
    emoji: "🪟",
    names: ["window"],
    category: "OBJECTS",
  },
  {
    emoji: "🛏️",
    names: ["bed"],
    category: "OBJECTS",
  },
  {
    emoji: "🛋️",
    names: ["couch and lamp"],
    category: "OBJECTS",
  },
  {
    emoji: "🪑",
    names: ["chair"],
    category: "OBJECTS",
  },
  {
    emoji: "🚽",
    names: ["toilet", "wc"],
    category: "OBJECTS",
  },
  {
    emoji: "🪠",
    names: ["plunger"],
    category: "OBJECTS",
  },
  {
    emoji: "🚿",
    names: ["shower", "bath"],
    category: "OBJECTS",
  },
  {
    emoji: "🛁",
    names: ["bathtub"],
    category: "OBJECTS",
  },
  {
    emoji: "🪤",
    names: ["mouse trap"],
    category: "OBJECTS",
  },
  {
    emoji: "🪒",
    names: ["razor"],
    category: "OBJECTS",
  },
  {
    emoji: "🧴",
    names: ["lotion bottle"],
    category: "OBJECTS",
  },
  {
    emoji: "🧷",
    names: ["safety pin"],
    category: "OBJECTS",
  },
  {
    emoji: "🧹",
    names: ["broom"],
    category: "OBJECTS",
  },
  {
    emoji: "🧺",
    names: ["basket"],
    category: "OBJECTS",
  },
  {
    emoji: "🧻",
    names: ["roll of paper", "toilet"],
    category: "OBJECTS",
  },
  {
    emoji: "🪣",
    names: ["bucket"],
    category: "OBJECTS",
  },
  {
    emoji: "🧼",
    names: ["soap"],
    category: "OBJECTS",
  },
  {
    emoji: "🫧",
    names: ["bubbles"],
    category: "OBJECTS",
  },
  {
    emoji: "🪥",
    names: ["toothbrush"],
    category: "OBJECTS",
  },
  {
    emoji: "🧽",
    names: ["sponge"],
    category: "OBJECTS",
  },
  {
    emoji: "🧯",
    names: ["fire extinguisher"],
    category: "OBJECTS",
  },
  {
    emoji: "🛒",
    names: ["shopping cart"],
    category: "OBJECTS",
  },
  {
    emoji: "🚬",
    names: ["cigarette", "cigarette"],
    category: "OBJECTS",
  },
  {
    emoji: "⚰️",
    names: ["coffin", "funeral"],
    category: "OBJECTS",
  },
  {
    emoji: "🪦",
    names: ["headstone"],
    category: "OBJECTS",
  },
  {
    emoji: "⚱️",
    names: ["funeral urn"],
    category: "OBJECTS",
  },
  {
    emoji: "🧿",
    names: ["nazar amulet"],
    category: "OBJECTS",
  },
  {
    emoji: "🪬",
    names: ["hamsa"],
    category: "OBJECTS",
  },
  {
    emoji: "🗿",
    names: ["moai", "stone"],
    category: "OBJECTS",
  },
  {
    emoji: "🪧",
    names: ["placard"],
    category: "OBJECTS",
  },
  {
    emoji: "🪪",
    names: ["identification card"],
    category: "OBJECTS",
  },
  {
    emoji: "🏧",
    names: ["ATM sign"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚮",
    names: ["litter in bin sign"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚰",
    names: ["potable water"],
    category: "SYMBOLS",
  },
  {
    emoji: "♿",
    names: ["wheelchair symbol", "accessibility"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚹",
    names: ["men’s room"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚺",
    names: ["women’s room"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚻",
    names: ["restroom", "toilet"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚼",
    names: ["baby symbol"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚾",
    names: ["water closet", "toilet", "restroom"],
    category: "SYMBOLS",
  },
  {
    emoji: "🛂",
    names: ["passport control"],
    category: "SYMBOLS",
  },
  {
    emoji: "🛃",
    names: ["customs"],
    category: "SYMBOLS",
  },
  {
    emoji: "🛄",
    names: ["baggage claim", "airport"],
    category: "SYMBOLS",
  },
  {
    emoji: "🛅",
    names: ["left luggage"],
    category: "SYMBOLS",
  },
  {
    emoji: "⚠️",
    names: ["warning", "wip"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚸",
    names: ["children crossing"],
    category: "SYMBOLS",
  },
  {
    emoji: "⛔",
    names: ["no entry", "limit"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚫",
    names: ["prohibited", "block", "forbidden"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚳",
    names: ["no bicycles"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚭",
    names: ["no smoking"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚯",
    names: ["no littering"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚱",
    names: ["non-potable water"],
    category: "SYMBOLS",
  },
  {
    emoji: "🚷",
    names: ["no pedestrians"],
    category: "SYMBOLS",
  },
  {
    emoji: "📵",
    names: ["no mobile phones"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔞",
    names: ["no one under eighteen"],
    category: "SYMBOLS",
  },
  {
    emoji: "☢️",
    names: ["radioactive"],
    category: "SYMBOLS",
  },
  {
    emoji: "☣️",
    names: ["biohazard"],
    category: "SYMBOLS",
  },
  {
    emoji: "⬆️",
    names: ["up arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "↗️",
    names: ["up-right arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "➡️",
    names: ["right arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "↘️",
    names: ["down-right arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "⬇️",
    names: ["down arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "↙️",
    names: ["down-left arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "⬅️",
    names: ["left arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "↖️",
    names: ["up-left arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "↕️",
    names: ["up-down arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "↔️",
    names: ["left-right arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "↩️",
    names: ["right arrow curving left", "return"],
    category: "SYMBOLS",
  },
  {
    emoji: "↪️",
    names: ["left arrow curving right"],
    category: "SYMBOLS",
  },
  {
    emoji: "⤴️",
    names: ["right arrow curving up"],
    category: "SYMBOLS",
  },
  {
    emoji: "⤵️",
    names: ["right arrow curving down"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔃",
    names: ["clockwise vertical arrows"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔄",
    names: ["counterclockwise arrows button", "sync"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔙",
    names: ["BACK arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔚",
    names: ["END arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔛",
    names: ["ON! arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔜",
    names: ["SOON arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔝",
    names: ["TOP arrow"],
    category: "SYMBOLS",
  },
  {
    emoji: "🛐",
    names: ["place of worship"],
    category: "SYMBOLS",
  },
  {
    emoji: "⚛️",
    names: ["atom symbol"],
    category: "SYMBOLS",
  },
  {
    emoji: "🕉️",
    names: ["om"],
    category: "SYMBOLS",
  },
  {
    emoji: "✡️",
    names: ["star of David"],
    category: "SYMBOLS",
  },
  {
    emoji: "☸️",
    names: ["wheel of dharma"],
    category: "SYMBOLS",
  },
  {
    emoji: "☯️",
    names: ["yin yang"],
    category: "SYMBOLS",
  },
  {
    emoji: "✝️",
    names: ["latin cross"],
    category: "SYMBOLS",
  },
  {
    emoji: "☦️",
    names: ["orthodox cross"],
    category: "SYMBOLS",
  },
  {
    emoji: "☪️",
    names: ["star and crescent"],
    category: "SYMBOLS",
  },
  {
    emoji: "☮️",
    names: ["peace symbol"],
    category: "SYMBOLS",
  },
  {
    emoji: "🕎",
    names: ["menorah"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔯",
    names: ["dotted six-pointed star"],
    category: "SYMBOLS",
  },
  {
    emoji: "🪯",
    names: ["khanda"],
    category: "SYMBOLS",
  },
  {
    emoji: "♈",
    names: ["Aries"],
    category: "SYMBOLS",
  },
  {
    emoji: "♉",
    names: ["Taurus"],
    category: "SYMBOLS",
  },
  {
    emoji: "♊",
    names: ["Gemini"],
    category: "SYMBOLS",
  },
  {
    emoji: "♋",
    names: ["Cancer"],
    category: "SYMBOLS",
  },
  {
    emoji: "♌",
    names: ["Leo"],
    category: "SYMBOLS",
  },
  {
    emoji: "♍",
    names: ["Virgo"],
    category: "SYMBOLS",
  },
  {
    emoji: "♎",
    names: ["Libra"],
    category: "SYMBOLS",
  },
  {
    emoji: "♏",
    names: ["Scorpio"],
    category: "SYMBOLS",
  },
  {
    emoji: "♐",
    names: ["Sagittarius"],
    category: "SYMBOLS",
  },
  {
    emoji: "♑",
    names: ["Capricorn"],
    category: "SYMBOLS",
  },
  {
    emoji: "♒",
    names: ["Aquarius"],
    category: "SYMBOLS",
  },
  {
    emoji: "♓",
    names: ["Pisces"],
    category: "SYMBOLS",
  },
  {
    emoji: "⛎",
    names: ["Ophiuchus"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔀",
    names: ["shuffle tracks button", "shuffle"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔁",
    names: ["repeat button", "loop"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔂",
    names: ["repeat single button"],
    category: "SYMBOLS",
  },
  {
    emoji: "▶️",
    names: ["play button"],
    category: "SYMBOLS",
  },
  {
    emoji: "⏩",
    names: ["fast-forward button"],
    category: "SYMBOLS",
  },
  {
    emoji: "⏭️",
    names: ["next track button"],
    category: "SYMBOLS",
  },
  {
    emoji: "⏯️",
    names: ["play or pause button"],
    category: "SYMBOLS",
  },
  {
    emoji: "◀️",
    names: ["reverse button"],
    category: "SYMBOLS",
  },
  {
    emoji: "⏪",
    names: ["fast reverse button"],
    category: "SYMBOLS",
  },
  {
    emoji: "⏮️",
    names: ["last track button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔼",
    names: ["upwards button"],
    category: "SYMBOLS",
  },
  {
    emoji: "⏫",
    names: ["fast up button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔽",
    names: ["downwards button"],
    category: "SYMBOLS",
  },
  {
    emoji: "⏬",
    names: ["fast down button"],
    category: "SYMBOLS",
  },
  {
    emoji: "⏸️",
    names: ["pause button"],
    category: "SYMBOLS",
  },
  {
    emoji: "⏹️",
    names: ["stop button"],
    category: "SYMBOLS",
  },
  {
    emoji: "⏺️",
    names: ["record button"],
    category: "SYMBOLS",
  },
  {
    emoji: "⏏️",
    names: ["eject button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🎦",
    names: ["cinema", "film", "movie"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔅",
    names: ["dim button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔆",
    names: ["bright button"],
    category: "SYMBOLS",
  },
  {
    emoji: "📶",
    names: ["antenna bars", "wifi"],
    category: "SYMBOLS",
  },
  {
    emoji: "🛜",
    names: ["wireless", "wifi"],
    category: "SYMBOLS",
  },
  {
    emoji: "📳",
    names: ["vibration mode"],
    category: "SYMBOLS",
  },
  {
    emoji: "📴",
    names: ["mobile phone off", "mute", "off"],
    category: "SYMBOLS",
  },
  {
    emoji: "♀️",
    names: ["female sign"],
    category: "SYMBOLS",
  },
  {
    emoji: "♂️",
    names: ["male sign"],
    category: "SYMBOLS",
  },
  {
    emoji: "⚧️",
    names: ["transgender symbol"],
    category: "SYMBOLS",
  },
  {
    emoji: "✖️",
    names: ["multiply"],
    category: "SYMBOLS",
  },
  {
    emoji: "➕",
    names: ["plus"],
    category: "SYMBOLS",
  },
  {
    emoji: "➖",
    names: ["minus"],
    category: "SYMBOLS",
  },
  {
    emoji: "➗",
    names: ["divide"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟰",
    names: ["heavy equals sign"],
    category: "SYMBOLS",
  },
  {
    emoji: "♾️",
    names: ["infinity"],
    category: "SYMBOLS",
  },
  {
    emoji: "‼️",
    names: ["double exclamation mark"],
    category: "SYMBOLS",
  },
  {
    emoji: "⁉️",
    names: ["exclamation question mark"],
    category: "SYMBOLS",
  },
  {
    emoji: "❓",
    names: ["red question mark", "confused"],
    category: "SYMBOLS",
  },
  {
    emoji: "❔",
    names: ["white question mark"],
    category: "SYMBOLS",
  },
  {
    emoji: "❕",
    names: ["white exclamation mark"],
    category: "SYMBOLS",
  },
  {
    emoji: "❗",
    names: ["red exclamation mark", "bang"],
    category: "SYMBOLS",
  },
  {
    emoji: "〰️",
    names: ["wavy dash"],
    category: "SYMBOLS",
  },
  {
    emoji: "💱",
    names: ["currency exchange"],
    category: "SYMBOLS",
  },
  {
    emoji: "💲",
    names: ["heavy dollar sign"],
    category: "SYMBOLS",
  },
  {
    emoji: "⚕️",
    names: ["medical symbol"],
    category: "SYMBOLS",
  },
  {
    emoji: "♻️",
    names: ["recycling symbol", "environment", "green"],
    category: "SYMBOLS",
  },
  {
    emoji: "⚜️",
    names: ["fleur-de-lis"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔱",
    names: ["trident emblem"],
    category: "SYMBOLS",
  },
  {
    emoji: "📛",
    names: ["name badge"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔰",
    names: ["Japanese symbol for beginner"],
    category: "SYMBOLS",
  },
  {
    emoji: "⭕",
    names: ["hollow red circle"],
    category: "SYMBOLS",
  },
  {
    emoji: "✅",
    names: ["check mark button"],
    category: "SYMBOLS",
  },
  {
    emoji: "☑️",
    names: ["check box with check"],
    category: "SYMBOLS",
  },
  {
    emoji: "✔️",
    names: ["check mark"],
    category: "SYMBOLS",
  },
  {
    emoji: "❌",
    names: ["cross mark"],
    category: "SYMBOLS",
  },
  {
    emoji: "❎",
    names: ["cross mark button"],
    category: "SYMBOLS",
  },
  {
    emoji: "➰",
    names: ["curly loop"],
    category: "SYMBOLS",
  },
  {
    emoji: "➿",
    names: ["double curly loop"],
    category: "SYMBOLS",
  },
  {
    emoji: "〽️",
    names: ["part alternation mark"],
    category: "SYMBOLS",
  },
  {
    emoji: "✳️",
    names: ["eight-spoked asterisk"],
    category: "SYMBOLS",
  },
  {
    emoji: "✴️",
    names: ["eight-pointed star"],
    category: "SYMBOLS",
  },
  {
    emoji: "❇️",
    names: ["sparkle"],
    category: "SYMBOLS",
  },
  {
    emoji: "©️",
    names: ["copyright"],
    category: "SYMBOLS",
  },
  {
    emoji: "®️",
    names: ["registered"],
    category: "SYMBOLS",
  },
  {
    emoji: "™️",
    names: ["trade mark", "trademark"],
    category: "SYMBOLS",
  },
  {
    emoji: "#️⃣",
    names: ["keycap: #", "number"],
    category: "SYMBOLS",
  },
  {
    emoji: "*️⃣",
    names: ["keycap: *"],
    category: "SYMBOLS",
  },
  {
    emoji: "0️⃣",
    names: ["keycap: 0"],
    category: "SYMBOLS",
  },
  {
    emoji: "1️⃣",
    names: ["keycap: 1"],
    category: "SYMBOLS",
  },
  {
    emoji: "2️⃣",
    names: ["keycap: 2"],
    category: "SYMBOLS",
  },
  {
    emoji: "3️⃣",
    names: ["keycap: 3"],
    category: "SYMBOLS",
  },
  {
    emoji: "4️⃣",
    names: ["keycap: 4"],
    category: "SYMBOLS",
  },
  {
    emoji: "5️⃣",
    names: ["keycap: 5"],
    category: "SYMBOLS",
  },
  {
    emoji: "6️⃣",
    names: ["keycap: 6"],
    category: "SYMBOLS",
  },
  {
    emoji: "7️⃣",
    names: ["keycap: 7"],
    category: "SYMBOLS",
  },
  {
    emoji: "8️⃣",
    names: ["keycap: 8"],
    category: "SYMBOLS",
  },
  {
    emoji: "9️⃣",
    names: ["keycap: 9"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔟",
    names: ["keycap: 10"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔠",
    names: ["input latin uppercase", "letters"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔡",
    names: ["input latin lowercase"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔢",
    names: ["input numbers", "numbers"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔣",
    names: ["input symbols"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔤",
    names: ["input latin letters", "alphabet"],
    category: "SYMBOLS",
  },
  {
    emoji: "🅰️",
    names: ["A button (blood type)"],
    category: "SYMBOLS",
  },
  {
    emoji: "🆎",
    names: ["AB button (blood type)"],
    category: "SYMBOLS",
  },
  {
    emoji: "🅱️",
    names: ["B button (blood type)"],
    category: "SYMBOLS",
  },
  {
    emoji: "🆑",
    names: ["CL button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🆒",
    names: ["COOL button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🆓",
    names: ["FREE button"],
    category: "SYMBOLS",
  },
  {
    emoji: "ℹ️",
    names: ["information"],
    category: "SYMBOLS",
  },
  {
    emoji: "🆔",
    names: ["ID button"],
    category: "SYMBOLS",
  },
  {
    emoji: "Ⓜ️",
    names: ["circled M"],
    category: "SYMBOLS",
  },
  {
    emoji: "🆕",
    names: ["NEW button", "fresh"],
    category: "SYMBOLS",
  },
  {
    emoji: "🆖",
    names: ["NG button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🅾️",
    names: ["O button (blood type)"],
    category: "SYMBOLS",
  },
  {
    emoji: "🆗",
    names: ["OK button", "yes"],
    category: "SYMBOLS",
  },
  {
    emoji: "🅿️",
    names: ["P button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🆘",
    names: ["SOS button", "help", "emergency"],
    category: "SYMBOLS",
  },
  {
    emoji: "🆙",
    names: ["UP! button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🆚",
    names: ["VS button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈁",
    names: ["Japanese “here” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈂️",
    names: ["Japanese “service charge” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈷️",
    names: ["Japanese “monthly amount” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈶",
    names: ["Japanese “not free of charge” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈯",
    names: ["Japanese “reserved” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🉐",
    names: ["Japanese “bargain” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈹",
    names: ["Japanese “discount” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈚",
    names: ["Japanese “free of charge” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈲",
    names: ["Japanese “prohibited” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🉑",
    names: ["Japanese “acceptable” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈸",
    names: ["Japanese “application” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈴",
    names: ["Japanese “passing grade” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈳",
    names: ["Japanese “vacancy” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "㊗️",
    names: ["Japanese “congratulations” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "㊙️",
    names: ["Japanese “secret” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈺",
    names: ["Japanese “open for business” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🈵",
    names: ["Japanese “no vacancy” button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔴",
    names: ["red circle"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟠",
    names: ["orange circle"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟡",
    names: ["yellow circle"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟢",
    names: ["green circle"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔵",
    names: ["blue circle"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟣",
    names: ["purple circle"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟤",
    names: ["brown circle"],
    category: "SYMBOLS",
  },
  {
    emoji: "⚫",
    names: ["black circle"],
    category: "SYMBOLS",
  },
  {
    emoji: "⚪",
    names: ["white circle"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟥",
    names: ["red square"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟧",
    names: ["orange square"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟨",
    names: ["yellow square"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟩",
    names: ["green square"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟦",
    names: ["blue square"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟪",
    names: ["purple square"],
    category: "SYMBOLS",
  },
  {
    emoji: "🟫",
    names: ["brown square"],
    category: "SYMBOLS",
  },
  {
    emoji: "⬛",
    names: ["black large square"],
    category: "SYMBOLS",
  },
  {
    emoji: "⬜",
    names: ["white large square"],
    category: "SYMBOLS",
  },
  {
    emoji: "◼️",
    names: ["black medium square"],
    category: "SYMBOLS",
  },
  {
    emoji: "◻️",
    names: ["white medium square"],
    category: "SYMBOLS",
  },
  {
    emoji: "◾",
    names: ["black medium-small square"],
    category: "SYMBOLS",
  },
  {
    emoji: "◽",
    names: ["white medium-small square"],
    category: "SYMBOLS",
  },
  {
    emoji: "▪️",
    names: ["black small square"],
    category: "SYMBOLS",
  },
  {
    emoji: "▫️",
    names: ["white small square"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔶",
    names: ["large orange diamond"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔷",
    names: ["large blue diamond"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔸",
    names: ["small orange diamond"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔹",
    names: ["small blue diamond"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔺",
    names: ["red triangle pointed up"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔻",
    names: ["red triangle pointed down"],
    category: "SYMBOLS",
  },
  {
    emoji: "💠",
    names: ["diamond with a dot"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔘",
    names: ["radio button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔳",
    names: ["white square button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🔲",
    names: ["black square button"],
    category: "SYMBOLS",
  },
  {
    emoji: "🏁",
    names: ["chequered flag", "milestone", "finish"],
    category: "FLAGS",
  },
  {
    emoji: "🚩",
    names: ["triangular flag"],
    category: "FLAGS",
  },
  {
    emoji: "🎌",
    names: ["crossed flags"],
    category: "FLAGS",
  },
  {
    emoji: "🏴",
    names: ["black flag"],
    category: "FLAGS",
  },
  {
    emoji: "🏳️",
    names: ["white flag"],
    category: "FLAGS",
  },
  {
    emoji: "🏳️‍🌈",
    names: ["rainbow flag", "pride"],
    category: "FLAGS",
  },
  {
    emoji: "🏳️‍⚧️",
    names: ["transgender flag"],
    category: "FLAGS",
  },
  {
    emoji: "🏴‍☠️",
    names: ["pirate flag"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇨",
    names: ["flag: Ascension Island"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇩",
    names: ["flag: Andorra"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇪",
    names: ["flag: United Arab Emirates"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇫",
    names: ["flag: Afghanistan"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇬",
    names: ["flag: Antigua & Barbuda"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇮",
    names: ["flag: Anguilla"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇱",
    names: ["flag: Albania"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇲",
    names: ["flag: Armenia"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇴",
    names: ["flag: Angola"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇶",
    names: ["flag: Antarctica"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇷",
    names: ["flag: Argentina"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇸",
    names: ["flag: American Samoa"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇹",
    names: ["flag: Austria"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇺",
    names: ["flag: Australia"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇼",
    names: ["flag: Aruba"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇽",
    names: ["flag: Åland Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇦🇿",
    names: ["flag: Azerbaijan"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇦",
    names: ["flag: Bosnia & Herzegovina"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇧",
    names: ["flag: Barbados"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇩",
    names: ["flag: Bangladesh"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇪",
    names: ["flag: Belgium"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇫",
    names: ["flag: Burkina Faso"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇬",
    names: ["flag: Bulgaria"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇭",
    names: ["flag: Bahrain"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇮",
    names: ["flag: Burundi"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇯",
    names: ["flag: Benin"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇱",
    names: ["flag: St. Barthélemy"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇲",
    names: ["flag: Bermuda"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇳",
    names: ["flag: Brunei"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇴",
    names: ["flag: Bolivia"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇶",
    names: ["flag: Caribbean Netherlands"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇷",
    names: ["flag: Brazil"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇸",
    names: ["flag: Bahamas"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇹",
    names: ["flag: Bhutan"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇻",
    names: ["flag: Bouvet Island"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇼",
    names: ["flag: Botswana"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇾",
    names: ["flag: Belarus"],
    category: "FLAGS",
  },
  {
    emoji: "🇧🇿",
    names: ["flag: Belize"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇦",
    names: ["flag: Canada"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇨",
    names: ["flag: Cocos (Keeling) Islands", "keeling"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇩",
    names: ["flag: Congo - Kinshasa"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇫",
    names: ["flag: Central African Republic"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇬",
    names: ["flag: Congo - Brazzaville"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇭",
    names: ["flag: Switzerland"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇮",
    names: ["flag: Côte d’Ivoire", "ivory"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇰",
    names: ["flag: Cook Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇱",
    names: ["flag: Chile"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇲",
    names: ["flag: Cameroon"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇳",
    names: ["flag: China", "china"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇴",
    names: ["flag: Colombia"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇵",
    names: ["flag: Clipperton Island"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇷",
    names: ["flag: Costa Rica"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇺",
    names: ["flag: Cuba"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇻",
    names: ["flag: Cape Verde"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇼",
    names: ["flag: Curaçao"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇽",
    names: ["flag: Christmas Island"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇾",
    names: ["flag: Cyprus"],
    category: "FLAGS",
  },
  {
    emoji: "🇨🇿",
    names: ["flag: Czechia"],
    category: "FLAGS",
  },
  {
    emoji: "🇩🇪",
    names: ["flag: Germany", "flag", "germany"],
    category: "FLAGS",
  },
  {
    emoji: "🇩🇬",
    names: ["flag: Diego Garcia"],
    category: "FLAGS",
  },
  {
    emoji: "🇩🇯",
    names: ["flag: Djibouti"],
    category: "FLAGS",
  },
  {
    emoji: "🇩🇰",
    names: ["flag: Denmark"],
    category: "FLAGS",
  },
  {
    emoji: "🇩🇲",
    names: ["flag: Dominica"],
    category: "FLAGS",
  },
  {
    emoji: "🇩🇴",
    names: ["flag: Dominican Republic"],
    category: "FLAGS",
  },
  {
    emoji: "🇩🇿",
    names: ["flag: Algeria"],
    category: "FLAGS",
  },
  {
    emoji: "🇪🇦",
    names: ["flag: Ceuta & Melilla"],
    category: "FLAGS",
  },
  {
    emoji: "🇪🇨",
    names: ["flag: Ecuador"],
    category: "FLAGS",
  },
  {
    emoji: "🇪🇪",
    names: ["flag: Estonia"],
    category: "FLAGS",
  },
  {
    emoji: "🇪🇬",
    names: ["flag: Egypt"],
    category: "FLAGS",
  },
  {
    emoji: "🇪🇭",
    names: ["flag: Western Sahara"],
    category: "FLAGS",
  },
  {
    emoji: "🇪🇷",
    names: ["flag: Eritrea"],
    category: "FLAGS",
  },
  {
    emoji: "🇪🇸",
    names: ["flag: Spain", "spain"],
    category: "FLAGS",
  },
  {
    emoji: "🇪🇹",
    names: ["flag: Ethiopia"],
    category: "FLAGS",
  },
  {
    emoji: "🇪🇺",
    names: ["flag: European Union"],
    category: "FLAGS",
  },
  {
    emoji: "🇫🇮",
    names: ["flag: Finland"],
    category: "FLAGS",
  },
  {
    emoji: "🇫🇯",
    names: ["flag: Fiji"],
    category: "FLAGS",
  },
  {
    emoji: "🇫🇰",
    names: ["flag: Falkland Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇫🇲",
    names: ["flag: Micronesia"],
    category: "FLAGS",
  },
  {
    emoji: "🇫🇴",
    names: ["flag: Faroe Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇫🇷",
    names: ["flag: France", "france", "french"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇦",
    names: ["flag: Gabon"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇧",
    names: ["flag: United Kingdom", "flag", "british"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇩",
    names: ["flag: Grenada"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇪",
    names: ["flag: Georgia"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇫",
    names: ["flag: French Guiana"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇬",
    names: ["flag: Guernsey"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇭",
    names: ["flag: Ghana"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇮",
    names: ["flag: Gibraltar"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇱",
    names: ["flag: Greenland"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇲",
    names: ["flag: Gambia"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇳",
    names: ["flag: Guinea"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇵",
    names: ["flag: Guadeloupe"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇶",
    names: ["flag: Equatorial Guinea"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇷",
    names: ["flag: Greece"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇸",
    names: ["flag: South Georgia & South Sandwich Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇹",
    names: ["flag: Guatemala"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇺",
    names: ["flag: Guam"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇼",
    names: ["flag: Guinea-Bissau"],
    category: "FLAGS",
  },
  {
    emoji: "🇬🇾",
    names: ["flag: Guyana"],
    category: "FLAGS",
  },
  {
    emoji: "🇭🇰",
    names: ["flag: Hong Kong SAR China"],
    category: "FLAGS",
  },
  {
    emoji: "🇭🇲",
    names: ["flag: Heard & McDonald Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇭🇳",
    names: ["flag: Honduras"],
    category: "FLAGS",
  },
  {
    emoji: "🇭🇷",
    names: ["flag: Croatia"],
    category: "FLAGS",
  },
  {
    emoji: "🇭🇹",
    names: ["flag: Haiti"],
    category: "FLAGS",
  },
  {
    emoji: "🇭🇺",
    names: ["flag: Hungary"],
    category: "FLAGS",
  },
  {
    emoji: "🇮🇨",
    names: ["flag: Canary Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇮🇩",
    names: ["flag: Indonesia"],
    category: "FLAGS",
  },
  {
    emoji: "🇮🇪",
    names: ["flag: Ireland"],
    category: "FLAGS",
  },
  {
    emoji: "🇮🇱",
    names: ["flag: Israel"],
    category: "FLAGS",
  },
  {
    emoji: "🇮🇲",
    names: ["flag: Isle of Man"],
    category: "FLAGS",
  },
  {
    emoji: "🇮🇳",
    names: ["flag: India"],
    category: "FLAGS",
  },
  {
    emoji: "🇮🇴",
    names: ["flag: British Indian Ocean Territory"],
    category: "FLAGS",
  },
  {
    emoji: "🇮🇶",
    names: ["flag: Iraq"],
    category: "FLAGS",
  },
  {
    emoji: "🇮🇷",
    names: ["flag: Iran"],
    category: "FLAGS",
  },
  {
    emoji: "🇮🇸",
    names: ["flag: Iceland"],
    category: "FLAGS",
  },
  {
    emoji: "🇮🇹",
    names: ["flag: Italy", "italy"],
    category: "FLAGS",
  },
  {
    emoji: "🇯🇪",
    names: ["flag: Jersey"],
    category: "FLAGS",
  },
  {
    emoji: "🇯🇲",
    names: ["flag: Jamaica"],
    category: "FLAGS",
  },
  {
    emoji: "🇯🇴",
    names: ["flag: Jordan"],
    category: "FLAGS",
  },
  {
    emoji: "🇯🇵",
    names: ["flag: Japan", "japan"],
    category: "FLAGS",
  },
  {
    emoji: "🇰🇪",
    names: ["flag: Kenya"],
    category: "FLAGS",
  },
  {
    emoji: "🇰🇬",
    names: ["flag: Kyrgyzstan"],
    category: "FLAGS",
  },
  {
    emoji: "🇰🇭",
    names: ["flag: Cambodia"],
    category: "FLAGS",
  },
  {
    emoji: "🇰🇮",
    names: ["flag: Kiribati"],
    category: "FLAGS",
  },
  {
    emoji: "🇰🇲",
    names: ["flag: Comoros"],
    category: "FLAGS",
  },
  {
    emoji: "🇰🇳",
    names: ["flag: St. Kitts & Nevis"],
    category: "FLAGS",
  },
  {
    emoji: "🇰🇵",
    names: ["flag: North Korea"],
    category: "FLAGS",
  },
  {
    emoji: "🇰🇷",
    names: ["flag: South Korea", "korea"],
    category: "FLAGS",
  },
  {
    emoji: "🇰🇼",
    names: ["flag: Kuwait"],
    category: "FLAGS",
  },
  {
    emoji: "🇰🇾",
    names: ["flag: Cayman Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇰🇿",
    names: ["flag: Kazakhstan"],
    category: "FLAGS",
  },
  {
    emoji: "🇱🇦",
    names: ["flag: Laos"],
    category: "FLAGS",
  },
  {
    emoji: "🇱🇧",
    names: ["flag: Lebanon"],
    category: "FLAGS",
  },
  {
    emoji: "🇱🇨",
    names: ["flag: St. Lucia"],
    category: "FLAGS",
  },
  {
    emoji: "🇱🇮",
    names: ["flag: Liechtenstein"],
    category: "FLAGS",
  },
  {
    emoji: "🇱🇰",
    names: ["flag: Sri Lanka"],
    category: "FLAGS",
  },
  {
    emoji: "🇱🇷",
    names: ["flag: Liberia"],
    category: "FLAGS",
  },
  {
    emoji: "🇱🇸",
    names: ["flag: Lesotho"],
    category: "FLAGS",
  },
  {
    emoji: "🇱🇹",
    names: ["flag: Lithuania"],
    category: "FLAGS",
  },
  {
    emoji: "🇱🇺",
    names: ["flag: Luxembourg"],
    category: "FLAGS",
  },
  {
    emoji: "🇱🇻",
    names: ["flag: Latvia"],
    category: "FLAGS",
  },
  {
    emoji: "🇱🇾",
    names: ["flag: Libya"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇦",
    names: ["flag: Morocco"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇨",
    names: ["flag: Monaco"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇩",
    names: ["flag: Moldova"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇪",
    names: ["flag: Montenegro"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇫",
    names: ["flag: St. Martin"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇬",
    names: ["flag: Madagascar"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇭",
    names: ["flag: Marshall Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇰",
    names: ["flag: North Macedonia"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇱",
    names: ["flag: Mali"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇲",
    names: ["flag: Myanmar (Burma)", "burma"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇳",
    names: ["flag: Mongolia"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇴",
    names: ["flag: Macao SAR China"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇵",
    names: ["flag: Northern Mariana Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇶",
    names: ["flag: Martinique"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇷",
    names: ["flag: Mauritania"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇸",
    names: ["flag: Montserrat"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇹",
    names: ["flag: Malta"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇺",
    names: ["flag: Mauritius"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇻",
    names: ["flag: Maldives"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇼",
    names: ["flag: Malawi"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇽",
    names: ["flag: Mexico"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇾",
    names: ["flag: Malaysia"],
    category: "FLAGS",
  },
  {
    emoji: "🇲🇿",
    names: ["flag: Mozambique"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇦",
    names: ["flag: Namibia"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇨",
    names: ["flag: New Caledonia"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇪",
    names: ["flag: Niger"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇫",
    names: ["flag: Norfolk Island"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇬",
    names: ["flag: Nigeria"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇮",
    names: ["flag: Nicaragua"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇱",
    names: ["flag: Netherlands"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇴",
    names: ["flag: Norway"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇵",
    names: ["flag: Nepal"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇷",
    names: ["flag: Nauru"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇺",
    names: ["flag: Niue"],
    category: "FLAGS",
  },
  {
    emoji: "🇳🇿",
    names: ["flag: New Zealand"],
    category: "FLAGS",
  },
  {
    emoji: "🇴🇲",
    names: ["flag: Oman"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇦",
    names: ["flag: Panama"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇪",
    names: ["flag: Peru"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇫",
    names: ["flag: French Polynesia"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇬",
    names: ["flag: Papua New Guinea"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇭",
    names: ["flag: Philippines"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇰",
    names: ["flag: Pakistan"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇱",
    names: ["flag: Poland"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇲",
    names: ["flag: St. Pierre & Miquelon"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇳",
    names: ["flag: Pitcairn Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇷",
    names: ["flag: Puerto Rico"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇸",
    names: ["flag: Palestinian Territories"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇹",
    names: ["flag: Portugal"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇼",
    names: ["flag: Palau"],
    category: "FLAGS",
  },
  {
    emoji: "🇵🇾",
    names: ["flag: Paraguay"],
    category: "FLAGS",
  },
  {
    emoji: "🇶🇦",
    names: ["flag: Qatar"],
    category: "FLAGS",
  },
  {
    emoji: "🇷🇪",
    names: ["flag: Réunion"],
    category: "FLAGS",
  },
  {
    emoji: "🇷🇴",
    names: ["flag: Romania"],
    category: "FLAGS",
  },
  {
    emoji: "🇷🇸",
    names: ["flag: Serbia"],
    category: "FLAGS",
  },
  {
    emoji: "🇷🇺",
    names: ["flag: Russia", "russia"],
    category: "FLAGS",
  },
  {
    emoji: "🇷🇼",
    names: ["flag: Rwanda"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇦",
    names: ["flag: Saudi Arabia"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇧",
    names: ["flag: Solomon Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇨",
    names: ["flag: Seychelles"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇩",
    names: ["flag: Sudan"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇪",
    names: ["flag: Sweden"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇬",
    names: ["flag: Singapore"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇭",
    names: ["flag: St. Helena"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇮",
    names: ["flag: Slovenia"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇯",
    names: ["flag: Svalbard & Jan Mayen"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇰",
    names: ["flag: Slovakia"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇱",
    names: ["flag: Sierra Leone"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇲",
    names: ["flag: San Marino"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇳",
    names: ["flag: Senegal"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇴",
    names: ["flag: Somalia"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇷",
    names: ["flag: Suriname"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇸",
    names: ["flag: South Sudan"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇹",
    names: ["flag: São Tomé & Príncipe"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇻",
    names: ["flag: El Salvador"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇽",
    names: ["flag: Sint Maarten"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇾",
    names: ["flag: Syria"],
    category: "FLAGS",
  },
  {
    emoji: "🇸🇿",
    names: ["flag: Eswatini"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇦",
    names: ["flag: Tristan da Cunha"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇨",
    names: ["flag: Turks & Caicos Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇩",
    names: ["flag: Chad"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇫",
    names: ["flag: French Southern Territories"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇬",
    names: ["flag: Togo"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇭",
    names: ["flag: Thailand"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇯",
    names: ["flag: Tajikistan"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇰",
    names: ["flag: Tokelau"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇱",
    names: ["flag: Timor-Leste"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇲",
    names: ["flag: Turkmenistan"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇳",
    names: ["flag: Tunisia"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇴",
    names: ["flag: Tonga"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇷",
    names: ["flag: Turkey", "turkey"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇹",
    names: ["flag: Trinidad & Tobago"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇻",
    names: ["flag: Tuvalu"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇼",
    names: ["flag: Taiwan"],
    category: "FLAGS",
  },
  {
    emoji: "🇹🇿",
    names: ["flag: Tanzania"],
    category: "FLAGS",
  },
  {
    emoji: "🇺🇦",
    names: ["flag: Ukraine"],
    category: "FLAGS",
  },
  {
    emoji: "🇺🇬",
    names: ["flag: Uganda"],
    category: "FLAGS",
  },
  {
    emoji: "🇺🇲",
    names: ["flag: U.S. Outlying Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇺🇳",
    names: ["flag: United Nations"],
    category: "FLAGS",
  },
  {
    emoji: "🇺🇸",
    names: ["flag: United States", "flag", "united", "america"],
    category: "FLAGS",
  },
  {
    emoji: "🇺🇾",
    names: ["flag: Uruguay"],
    category: "FLAGS",
  },
  {
    emoji: "🇺🇿",
    names: ["flag: Uzbekistan"],
    category: "FLAGS",
  },
  {
    emoji: "🇻🇦",
    names: ["flag: Vatican City"],
    category: "FLAGS",
  },
  {
    emoji: "🇻🇨",
    names: ["flag: St. Vincent & Grenadines"],
    category: "FLAGS",
  },
  {
    emoji: "🇻🇪",
    names: ["flag: Venezuela"],
    category: "FLAGS",
  },
  {
    emoji: "🇻🇬",
    names: ["flag: British Virgin Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇻🇮",
    names: ["flag: U.S. Virgin Islands"],
    category: "FLAGS",
  },
  {
    emoji: "🇻🇳",
    names: ["flag: Vietnam"],
    category: "FLAGS",
  },
  {
    emoji: "🇻🇺",
    names: ["flag: Vanuatu"],
    category: "FLAGS",
  },
  {
    emoji: "🇼🇫",
    names: ["flag: Wallis & Futuna"],
    category: "FLAGS",
  },
  {
    emoji: "🇼🇸",
    names: ["flag: Samoa"],
    category: "FLAGS",
  },
  {
    emoji: "🇽🇰",
    names: ["flag: Kosovo"],
    category: "FLAGS",
  },
  {
    emoji: "🇾🇪",
    names: ["flag: Yemen"],
    category: "FLAGS",
  },
  {
    emoji: "🇾🇹",
    names: ["flag: Mayotte"],
    category: "FLAGS",
  },
  {
    emoji: "🇿🇦",
    names: ["flag: South Africa"],
    category: "FLAGS",
  },
  {
    emoji: "🇿🇲",
    names: ["flag: Zambia"],
    category: "FLAGS",
  },
  {
    emoji: "🇿🇼",
    names: ["flag: Zimbabwe"],
    category: "FLAGS",
  },
  {
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    names: ["flag: England"],
    category: "FLAGS",
  },
  {
    emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    names: ["flag: Scotland"],
    category: "FLAGS",
  },
  {
    emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    names: ["flag: Wales"],
    category: "FLAGS",
  },
];
