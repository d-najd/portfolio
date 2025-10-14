import { useEffect, useState } from 'react';

export function useTimeSinceStartup(updateInterval: number = 10) {
	const [startTime] = useState(() => performance.now());
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setElapsedTime(performance.now() - startTime);
		}, updateInterval);

		return () => clearInterval(interval);
	}, [startTime, updateInterval]);

	return elapsedTime / 1000;
}