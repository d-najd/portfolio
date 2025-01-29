import type React from "react"
import { useEffect, useRef, useState } from "react"

/**
 * @param element optional for better compatibility, will always return 0 in that case though
 * @return number of fully visible items, note this works a bit differently from
 * what one may expect,
 * <pre>
 *     n is the amount of elements
 *     0: no elements visible
 *     1...n: elements visibility excluding first and last
 *     n+1: last element visible
 * </pre>
 * @see {useRef}
 */
export const useFullyVisibleChildrenCount = (
	element: React.RefObject<HTMLDivElement>,
): number => {
	const [visibleChildren, setVisibleChildren] = useState(0)

	useEffect(() => {
		if (!element.current) return

		const observer = new ResizeObserver(entries => {
			const parent = entries[0].target
			const children = parent.children

			for (let i = 0; i < children.length; i++) {
				const child = children[i]

				if (
					child.getBoundingClientRect().right >
					parent.getBoundingClientRect().right
				) {
					setVisibleChildren(i - 1)
					break
				} else if (i === children.length - 1) {
					setVisibleChildren(i)
				}
			}
		})

		observer.observe(element.current)

		return () => {
			observer.disconnect()
		}
	}, [element])

	return visibleChildren
}
