import { toast } from 'sonner';

const getEnvVar = (key: string, fallback: string): string => {
  return import.meta.env[key] || fallback;
};

const SECRET_KEY = getEnvVar('VITE_ENCRYPTION_KEY', 'asdf');

const encrypt = (text: string): string => {
  return btoa(text + SECRET_KEY);
};

const decrypt = (encryptedText: string): string => {
  try {
    const decoded = atob(encryptedText);
    return decoded.replace(SECRET_KEY, '');
  } catch {
    return '';
  }
};


const ENCRYPTED_CREDENTIALS = {
  username: encrypt(getEnvVar('VITE_ADMIN_USERNAME', '')),
  password: encrypt(getEnvVar('VITE_ADMIN_PASSWORD', '')),
  secretKey: encrypt(getEnvVar('VITE_ADMIN_SECRET_KEY', ''))
};

let failedAttempts = 0;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000;
let lockoutUntil = 0;

export const isAccountLocked = (): boolean => {
  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    const now = Date.now();
    if (now < lockoutUntil) {
      return true;
    } else {
      failedAttempts = 0;
      lockoutUntil = 0;
      return false;
    }
  }
  return false;
};

export const getLockoutTimeRemaining = (): number => {
  if (isAccountLocked()) {
    return Math.max(0, lockoutUntil - Date.now());
  }
  return 0;
};

// Función para registrar intento fallido
const recordFailedAttempt = (username: string) => {
  failedAttempts++;
  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    lockoutUntil = Date.now() + LOCKOUT_TIME;
    toast.error(`Cuenta bloqueada por ${Math.floor(LOCKOUT_TIME / 60000)} minutos por múltiples intentos fallidos`);
  }
};

// Función para registrar acceso exitoso
const recordSuccessfulAccess = (username: string) => {
  failedAttempts = 0;
  lockoutUntil = 0;
};

// Función principal de autenticación
export const authenticate = (username: string, password: string, secretKey: string): boolean => {
  try {
    console.log('🔍 Verificando credenciales...');
    
    // Verificar si la cuenta está bloqueada
    if (isAccountLocked()) {
      const remaining = getLockoutTimeRemaining();
      console.log('🚫 Cuenta bloqueada, tiempo restante:', remaining);
      toast.error(`Cuenta bloqueada. Intenta de nuevo en ${Math.floor(remaining / 60000)} minutos`);
      return false;
    }
    
    // Obtener credenciales esperadas
    const expectedUsername = decrypt(ENCRYPTED_CREDENTIALS.username);
    const expectedPassword = decrypt(ENCRYPTED_CREDENTIALS.password);
    const expectedSecretKey = decrypt(ENCRYPTED_CREDENTIALS.secretKey);
    
    console.log('🔍 Debug de variables de entorno:');
    console.log('  VITE_ADMIN_USERNAME:', import.meta.env.VITE_ADMIN_USERNAME);
    console.log('  VITE_ADMIN_PASSWORD:', import.meta.env.VITE_ADMIN_PASSWORD ? '***' : 'VACÍO');
    console.log('  VITE_ADMIN_SECRET_KEY:', import.meta.env.VITE_ADMIN_SECRET_KEY ? '***' : 'VACÍO');
    console.log('  VITE_ENCRYPTION_KEY:', import.meta.env.VITE_ENCRYPTION_KEY ? '***' : 'VACÍO');
    
    console.log('📋 Credenciales esperadas:');
    console.log('  Usuario esperado:', expectedUsername);
    console.log('  Contraseña esperada:', expectedPassword ? '***' : 'VACÍO');
    console.log('  Clave secreta esperada:', expectedSecretKey ? '***' : 'VACÍO');
    
    // Verificar credenciales
    const isValidUsername = expectedUsername === username;
    const isValidPassword = expectedPassword === password;
    const isValidSecretKey = expectedSecretKey === secretKey;
    
    console.log('✅ Validaciones:');
    console.log('  Usuario válido:', isValidUsername);
    console.log('  Contraseña válida:', isValidPassword);
    console.log('  Clave secreta válida:', isValidSecretKey);
    
    if (isValidUsername && isValidPassword && isValidSecretKey) {
      console.log('🎉 Todas las credenciales son correctas');
      recordSuccessfulAccess(username);
      toast.success('¡Autenticación exitosa!');
      return true;
    } else {
      console.log('❌ Al menos una credencial es incorrecta');
      recordFailedAttempt(username);
      const remainingAttempts = MAX_FAILED_ATTEMPTS - failedAttempts;
      
      if (remainingAttempts > 0) {
        toast.error(`Credenciales incorrectas. ${remainingAttempts} intentos restantes`);
      } else {
        toast.error('Demasiados intentos fallidos. Cuenta bloqueada temporalmente');
      }
      
      return false;
    }
    
  } catch (error) {
    console.error('🚨 Error en autenticación:', error);
    toast.error('Error interno del sistema de autenticación');
    return false;
  }
};



// Función para generar token de sesión temporal
export const generateSessionToken = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return encrypt(`${timestamp}-${random}`);
};

// Función para validar token de sesión
export const validateSessionToken = (token: string): boolean => {
  try {
    const decoded = decrypt(token);
    const [timestamp] = decoded.split('-');
    const tokenAge = Date.now() - parseInt(timestamp);
    
    // Token válido por 2 horas
    return tokenAge < 2 * 60 * 60 * 1000;
  } catch {
    return false;
  }
};
