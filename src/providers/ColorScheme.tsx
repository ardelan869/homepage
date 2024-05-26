'use client';

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

export type ColorSchemes = 'system' | 'dark' | 'light';

const ColorSchemeContext = createContext<
	[ColorSchemes, Dispatch<SetStateAction<ColorSchemes>>]
>(['system', () => {}]);

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
	const [colorScheme, setColorScheme] = useState<ColorSchemes>('system');
	const [prefersDarkMode, setPrefersDarkMode] = useState(false);

	const isDarkMode =
		colorScheme === 'dark' || (colorScheme === 'system' && prefersDarkMode);

	useEffect(() => {
		localStorage.setItem('colorscheme', colorScheme);

		document.documentElement.classList[isDarkMode ? 'add' : 'remove'](
			'dark',
		);
	}, [colorScheme, isDarkMode]);

	useEffect(() => {
		if (!window.matchMedia) return;

		setColorScheme(
			(localStorage?.getItem('colorscheme') as ColorSchemes | null) ??
				'system',
		);

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		setPrefersDarkMode(mediaQuery.matches);

		const handleChange = (event: MediaQueryListEvent) =>
			setPrefersDarkMode(event.matches);

		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.addEventListener('change', handleChange);
	}, []);

	return (
		<ColorSchemeContext.Provider value={[colorScheme, setColorScheme]}>
			{children}
		</ColorSchemeContext.Provider>
	);
}

export function useColorScheme() {
	return useContext(ColorSchemeContext);
}
