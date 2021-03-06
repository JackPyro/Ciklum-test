export const theme = {
  colors: {
    dark: '#050404',
    light: '#eaeaea',
    default: '#034078',
    primary: '#001f54',
    secondary: '#0a1128'
  }
}

export const withColorTheme = `
  background: ${theme.colors.dark};
  color: ${theme.colors.light};
`