export function remapPercent(
  minThresh: number,
  maxThresh: number,
  percentage: number
): number {
  const minP = minThresh / maxThresh;
  return (minP + (percentage / 100) * (1 - minP)) * 100;
}
