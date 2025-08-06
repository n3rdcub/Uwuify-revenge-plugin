const suffixes = [" owo", " UwU", " >w<", " ~", " (＾• ω •＾)", " nya~"];

function uwuify(text) {
  return text
    .replace(/r|l/g, "w")
    .replace(/R|L/g, "W")
    .replace(/n([aeiou])/g, "ny$1")
    .replace(/N([aeiou])/g, "Ny$1")
    .replace(/N([AEIOU])/g, "NY$1")
    .replace(/ove/g, "uv")
    .replace(/\!+/g, " " + suffixes[Math.floor(Math.random() * suffixes.length)]);
}

module.exports = {
  onLoad: () => console.log("[Uwuifier] Loaded UwU plugin!"),
  onUnload: () => console.log("[Uwuifier] Unloaded UwU plugin!"),
  messageSendInterceptor: (message) => ({
    ...message,
    content: uwuify(message.content),
  })
};
