export class ProblemPattern {
  constructor(name, description, severity) {
    this.name = name;
    this.description = description;
    this.severity = severity;
    this.matchingEntries = [];
  }
}
