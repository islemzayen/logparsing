export class LogEntry {
  constructor({ timestamp, level, module, message, isTestFailure = false }) {
    this.timestamp = timestamp;
    this.level = level;
    this.module = module;
    this.message = message;
    this.isTestFailure = isTestFailure;
  }
}
