const getCurrentTab = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};
const currentTab = await getCurrentTab();

const talk = (textToSay) => {
  console.log("I'm gonna say: ", textToSay);
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  console.log(synth.getVoices());
  const utterance = new SpeechSynthesisUtterance(textToSay);
  utterance.rate = 0.85;
  utterance.lang = "pl-PL";
  speechSynthesis.speak(utterance);
};

chrome.scripting?.executeScript(
  {
    target: { tabId: currentTab.id },
    func: () => {
      return window.getSelection().toString();
    },
  },
  (selection) => {
    talk(selection[0].result);
  }
);
