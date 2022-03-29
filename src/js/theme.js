{
	// darkmode: false == lightmode
	// darkmode: true == darkmode

	const setTheme = (darkmode = false) => document.documentElement.toggleAttribute('darkmode', darkmode);
	setTheme(localStorage.getItem('darkmode'))
	document.querySelector('.themeSelector img[alt$="darkmode"]')
		.addEventListener('click', () => setTheme(true))
	document.querySelector('.themeSelector img[alt$="lightmode"]')
		.addEventListener('click', () => setTheme(false))
}