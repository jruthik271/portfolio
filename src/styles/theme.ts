export const theme = {
  spacing: {
    grid: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    section: '80px',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    sizes: {
      hero: 'clamp(2.5rem, 6vw + 1rem, 5.5rem)',
      sectionTitle: 'clamp(2rem, 4vw + 0.5rem, 3.5rem)',
      cardTitle: '1.25rem',
      body: '1rem',
      small: '0.875rem',
    }
  },
  transitions: {
    smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  }
};
