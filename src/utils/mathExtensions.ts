export class MathExtensions {
	public static lerp(x: number, y: number, a: number) {
		return x * (1 - a) + y * a
	}

	public static invlerp(x: number, y: number, a: number) {
		return this.clamp((a - x) / (y - x))
	}

	public static clamp(a: number, min = 0, max = 1) {
		return Math.min(max, Math.max(min, a))
	}

	public static range(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		a: number,
	) {
		return this.lerp(x2, y2, this.invlerp(x1, y1, a))
	}
}
