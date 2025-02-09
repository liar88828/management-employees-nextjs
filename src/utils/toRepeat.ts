export function toRepeat(n: number) {
  return Array.from({ length: n }, (_, i) => i + 1)
}


export async function repeatAsync(n: number) {
	return Array.from({ length: n }, (_, i) => i + 1)
}
