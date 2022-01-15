import { useEffect, useRef } from 'react'

export const useScrollerRef =
	(): React.MutableRefObject<HTMLDivElement | null> => {
		const scrollerRef = useRef<HTMLDivElement | null>(null)

		useEffect(() => {
			if (!scrollerRef.current) {
				return
			}

			scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight
		})

		return scrollerRef
	}
