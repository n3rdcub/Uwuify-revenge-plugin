import { Plugin } from "@vendetta/types";
import { storage } from "@vendetta/plugin";
import { getByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";
import { showToast } from "@vendetta/ui/toasts";

// UwU transformation rules
const uwuifyText = (text: string): string => {
  return text
    // Replace r and l with w
    .replace(/[rl]/g, 'w')
    .replace(/[RL]/g, 'W')
    // Replace n with ny before vowels
    .replace(/n([aeiou])/g, 'ny$1')
    .replace(/N([aeiou])/g, 'Ny$1')
    .replace(/N([AEIOU])/g, 'NY$1')
    // Replace ove with uv
    .replace(/ove/g, 'uv')
    .replace(/OVE/g, 'UV')
    // Add stutters randomly (10% chance)
    .replace(/\b([bcdfghjklmnpqrstvwxyz])/gi, (match, consonant) => {
      return Math.random() < 0.1 ? `${consonant}-${consonant}${consonant.toLowerCase()}` : match;
    })
    // Add uwu expressions
    .replace(/!+/g, ' uwu!')
    .replace(/\?+/g, ' owo?')
    // Replace common words
    .replace(/\bthe\b/gi, 'da')
    .replace(/\byou\b/gi, 'u')
    .replace(/\bare\b/gi, 'awe')
    .replace(/\bthis\b/gi, 'dis')
    .replace(/\bthat\b/gi, 'dat')
    .replace(/\blove\b/gi, 'wuv')
    .replace(/\breally\b/gi, 'weawwy');
};

let patches: (() => void)[] = [];

// Plugin settings with default values
const settings = storage;
if (settings.enabled === undefined) settings.enabled = false;
if (settings.autoUwu === undefined) settings.autoUwu = false;
if (settings.uwuIntensity === undefined) settings.uwuIntensity = 1;

export const onLoad = (): void => {
  try {
    // Find Discord's message sending module
    const MessageActions = getByProps("sendMessage", "editMessage");
    
    if (MessageActions?.sendMessage) {
      // Patch sendMessage to uwuify outgoing messages when auto-uwu is enabled
      const unpatchSend = before("sendMessage", MessageActions, (args) => {
        if (!settings.enabled || !settings.autoUwu) return;
        
        const [channelId, message] = args;
        if (message?.content && typeof message.content === 'string' && message.content.trim()) {
          let uwuified = message.content;
          
          // Apply uwuification based on intensity setting
          for (let i = 0; i < (settings.uwuIntensity || 1); i++) {
            uwuified = uwuifyText(uwuified);
          }
          
          message.content = uwuified;
        }
      });
      
      patches.push(unpatchSend);
    }

    // Register the /uwu slash command
    const { ApplicationCommandInputType, ApplicationCommandType } = getByProps("ApplicationCommandInputType") ?? {};
    const CommandsModule = getByProps("registerCommand");
    
    if (CommandsModule?.registerCommand) {
      CommandsModule.registerCommand({
        name: "uwu",
        description: "UwUify any text message",
        type: ApplicationCommandType?.CHAT ?? 1,
        inputType: ApplicationCommandInputType?.BUILT_IN_TEXT ?? 1,
        options: [{
          name: "text",
          description: "The text you want to uwuify",
          type: 3, // STRING type
          required: true
        }, {
          name: "intensity",
          description: "UwU intensity level (1-3)",
          type: 4, // INTEGER type
          required: false,
          choices: [
            { name: "Mild", value: 1 },
            { name: "Medium", value: 2 },
            { name: "Maximum", value: 3 }
          ]
        }],
        execute: (args: any[], ctx: any) => {
          const textArg = args.find(arg => arg.name === "text");
          const intensityArg = args.find(arg => arg.name === "intensity");
          
          if (!textArg?.value) {
            showToast("Please provide text to uwuify!", "error");
            return;
          }
          
          const intensity = intensityArg?.value || settings.uwuIntensity || 1;
          let uwuified = textArg.value;
          
          // Apply uwuification multiple times based on intensity
          for (let i = 0; i < intensity; i++) {
            uwuified = uwuifyText(uwuified);
          }
          
          // Send the uwuified message
          if (MessageActions?.sendMessage) {
            MessageActions.sendMessage(ctx.channel.id, {
              content: uwuified,
              tts: false,
              invalidEmojis: [],
              validNonShortcutEmojis: []
            });
          }
        }
      });
    }

    showToast("UwUify plugin loaded successfully! owo", "success");
  } catch (error) {
    console.error("UwUify plugin failed to load:", error);
    showToast("Failed to load UwUify plugin uwu", "error");
  }
};

export const onUnload = (): void => {
  // Clean up all patches
  patches.forEach(unpatch => {
    try {
      unpatch?.();
    } catch (error) {
      console.error("Error unpatching:", error);
    }
  });
  patches = [];
  
  showToast("UwUify plugin unloaded! Goodbye uwu", "info");
};

// Plugin settings configuration
export const settings = {
  enabled: {
    type: "boolean",
    title: "Enable UwUify",
    description: "Master toggle for the UwUify plugin",
    default: false
  },
  autoUwu: {
    type: "boolean",
    title: "Auto UwUify Messages",
    description: "Automatically uwuify all your outgoing messages",
    default: false
  },
  uwuIntensity: {
    type: "slider",
    title: "UwU Intensity",
    description: "How intensely to uwuify your text (1 = mild, 3 = maximum)",
    default: 1,
    min: 1,
    max: 3,
    step: 1
  }
};

// Export the plugin
export default {
  onLoad,
  onUnload,
  settings
} satisfies Plugin;
