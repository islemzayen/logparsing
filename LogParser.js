import { LogEntry } from "./LogEntry.js";
import { ParsingRule } from "./ParsingRule.js";

export class LogEntry {
  constructor({ timestamp, level, module, message }) {
    this.timestamp = timestamp;
    this.level = level;
    this.module = module;
    this.message = message;
    this.isTestFailure = /fail|error|exception/i.test(message);
  }
}

export class LogParser {
  constructor() {
    this.regex = /^\[(.*?)\]\s+\[(.*?)\]\s+\[(.*?)\]\s+(.*)$/;
  }

  parse(rawText) {
    const lines = rawText.split(/\r?\n/);
    const entries = [];

    for (const line of lines) {
      const match = line.match(this.regex);
      if (match) {
        const [, timestamp, level, module, message] = match;
        entries.push(
          new LogEntry({
            timestamp,
            level: this.mapLevel(level),
            module,
            message
          })
        );
      } else if (line.trim()) {
        // unmatched but non-empty
        entries.push(
          new LogEntry({
            timestamp: "",
            level: "INFO",
            module: "",
            message: line
          })
        );
      }
    }

    return entries;
  }

  mapLevel(level) {
    switch (level.toUpperCase()) {
      case "ERR": return "ERROR";
      case "WRN": return "WARNING";
      case "INF": return "INFO";
      case "DBG": return "DEBUG";
      default: return level;
    }
  }
}


