export function gradeConversion(score: number) {
  switch (true) {
    case score >= 75:
      return '◎';
    case score >= 50 && score < 75:
      return '○';
    case score >= 25 && score < 50:
      return '△';
    case score > 0 && score < 25:
      return '×';
    default:
      return '×';
  }
}
