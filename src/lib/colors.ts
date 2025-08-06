// Configuración centralizada de colores
export const colors = {
  primary: {
    // Color principal del logo Sanyi Lights
    main: 'bg-red-600',
    hover: 'hover:bg-red-700',
    light: 'bg-red-500',
    dark: 'bg-red-800',
    text: 'text-red-600',
    textHover: 'hover:text-red-700',
    border: 'border-red-600',
    borderHover: 'hover:border-red-700',
    // Variantes con opacidad
    bg10: 'bg-red-500/10',
    bg20: 'bg-red-500/20',
    bg30: 'bg-red-500/30',
    // Gradientes
    gradient: 'bg-gradient-to-r from-red-600 to-red-700',
    gradientHover: 'hover:from-red-700 hover:to-red-800',
    // Sombras
    shadow: 'shadow-red-500/20',
    glow: 'shadow-red-500/40',
  },
  // Colores secundarios para diferentes contextos
  secondary: {
    gray: {
      bg: 'bg-gray-600',
      hover: 'hover:bg-gray-700',
      text: 'text-gray-600',
    },
    blue: {
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600',
    },
    green: {
      bg: 'bg-green-600',
      hover: 'hover:bg-green-700',
      text: 'text-green-600',
    },
  },
  // Estados
  states: {
    success: 'bg-green-600 hover:bg-green-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    error: 'bg-red-600 hover:bg-red-700',
    info: 'bg-blue-600 hover:bg-blue-700',
  },
  // Texto
  text: {
    primary: 'text-red-600',
    secondary: 'text-gray-600',
    muted: 'text-gray-500',
    white: 'text-white',
    black: 'text-black',
  },
  // Fondos
  background: {
    primary: 'bg-red-600',
    secondary: 'bg-gray-100',
    white: 'bg-white',
    black: 'bg-black',
    transparent: 'bg-transparent',
  },
  // Bordes
  border: {
    primary: 'border-red-600',
    secondary: 'border-gray-300',
    white: 'border-white',
    black: 'border-black',
  }
};

// Función helper para combinar clases de colores
export const getColorClass = (type: keyof typeof colors, variant?: string) => {
  if (variant) {
    return colors[type][variant as keyof typeof colors[typeof type]];
  }
  return colors[type];
};

// Función para obtener clases de botones
export const getButtonClasses = (variant: 'primary' | 'secondary' | 'outline' = 'primary') => {
  switch (variant) {
    case 'primary':
      return `${colors.primary.main} ${colors.primary.hover} text-white`;
    case 'secondary':
      return `${colors.secondary.gray.bg} ${colors.secondary.gray.hover} text-white`;
    case 'outline':
      return `border ${colors.primary.border} ${colors.primary.text} ${colors.primary.textHover}`;
    default:
      return `${colors.primary.main} ${colors.primary.hover} text-white`;
  }
};

// Función para obtener clases de badges
export const getBadgeClasses = (variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'primary') => {
  switch (variant) {
    case 'primary':
      return `${colors.primary.main} text-white border-0`;
    case 'secondary':
      return `${colors.secondary.gray.bg} text-white border-0`;
    case 'success':
      return `${colors.states.success} text-white`;
    case 'warning':
      return `${colors.states.warning} text-white`;
    case 'error':
      return `${colors.states.error} text-white`;
    default:
      return `${colors.primary.main} text-white border-0`;
  }
}; 