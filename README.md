# Sitio Web de Sanyi Lights Argentina 

Este es un sitio web de Sanyi Lights Argentina que muestra equipos de iluminación profesional, incluyendo cabezas móviles, luces de lavado, luces LED estroboscópicas, luces LED PAR, luces láser y luces de efectos.

## 🚀 Cómo Empezar

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── data/
│   ├── products.ts      # Catálogo de productos
│   └── categories.ts    # Categorías de productos
├── assets/
│   └── product-images.ts # Registro de imágenes
├── components/          # Componentes de React
├── pages/              # Páginas del sitio
└── types/              # Definiciones de TypeScript
```

## 🛍️ Cómo Gestionar Productos

### Estructura de un Producto

Cada producto en `src/data/products.ts` tiene esta información:

```typescript
interface Product {
  model: string;           // Número de modelo del producto
  description: string;     // Descripción breve del producto
  category: Category;      // Categoría del producto
  image: string;          // Imagen principal del producto
  content: string;        // Imagen detallada del producto
  video?: string;         // Enlace de YouTube (opcional)
  new: boolean;           // Si el producto es nuevo (muestra "NUEVO")
}
```

### 📸 Agregar Productos Nuevos

#### Paso 1: Preparar las Imágenes del Producto
1. Crear una nueva carpeta en `public/images/products/` con el nombre exacto del modelo del producto
2. Agregar dos imágenes:
   - `image.png` - Imagen principal del producto (se muestra en las tarjetas de productos)
   - `content.png` - Imagen detallada del producto (se muestra en las páginas de detalle)

**Ejemplo de estructura de carpeta:**
```
public/images/products/
└── SPL-LED-NUEVO-1000/
    ├── image.png
    └── content.png
```

#### Paso 2: Actualizar el Registro de Imágenes
Agregar constantes de imagen en `src/assets/product-images.ts`:

```typescript
// SPL-LED-NUEVO-1000
export const SPL_LED_NUEVO_1000_IMAGE = "/images/products/SPL-LED-NUEVO-1000/image.png";
export const SPL_LED_NUEVO_1000_CONTENT = "/images/products/SPL-LED-NUEVO-1000/content.png";
```

#### Paso 3: Agregar al Mapa de Imágenes
Actualizar la función `getProductImages` en el mismo archivo:

```typescript
export const getProductImages = (model: string) => {
  const imageMap: Record<string, { image: string; content: string }> = {
    // ... productos existentes ...
    "SPL-LED-NUEVO-1000": {
      image: SPL_LED_NUEVO_1000_IMAGE,
      content: SPL_LED_NUEVO_1000_CONTENT
    },
  };
  
  return imageMap[model] || { image: "", content: "" };
};
```

#### Paso 4: Agregar Producto al Catálogo
Agregar el producto al array `products` en `src/data/products.ts`:

```typescript
export const products: Product[] = [
  // ... productos existentes ...
  {
    "model": "SPL-LED-NUEVO-1000",
    "description": "Luz LED de Cabeza Móvil de 1000W",
    "category": Category.MOVING_HEAD,
    "image": getProductImages("SPL-LED-NUEVO-1000").image,
    "content": getProductImages("SPL-LED-NUEVO-1000").content,
    "video": "https://www.youtube.com/watch?v=ejemplo", // Opcional
    "new": true // Cambiar a false después del lanzamiento inicial
  },
];
```

### 🗑️ Quitar Productos

1. Quitar el producto del array `products` en `src/data/products.ts`
2. Quitar las constantes de imagen de `src/assets/product-images.ts`
3. Quitar la entrada del mapa de imágenes de la función `getProductImages`
4. Eliminar la carpeta del producto de `public/images/products/`


### ✏️ Actualizar Productos

#### Actualizar Información del Producto
Modificar el objeto del producto en `src/data/products.ts`:

```typescript
{
  "model": "SPL-LED-700",
  "description": "Actualizado: Perfil LED de 700W con Características Mejoradas", // Descripción actualizada
  "category": Category.MOVING_HEAD,
  "image": getProductImages("SPL-LED-700").image,
  "content": getProductImages("SPL-LED-700").content,
  "video": "https://www.youtube.com/watch?v=nuevoVideo", // Video actualizado
  "new": false // Cambiado de true a false
}
```

#### Actualizar Imágenes del Producto
1. Reemplazar las imágenes en la carpeta del producto
2. Mantener los mismos nombres de archivo (`image.png`, `content.png`)
3. No se necesitan cambios en el código - las imágenes se actualizarán automáticamente

#### Actualizar Categoría del Producto
Cambiar el campo `category` a cualquier valor del enum `Category` en `src/data/categories.ts`:

```typescript
import { Category } from "./categories";

// Categorías disponibles:
// Category.MOVING_HEAD
// Category.WASH_LIGHT
// Category.LED_STROBE_LIGHT
// Category.LED_PAR_LIGHT
// Category.LASER_LIGHT
// Category.EFFECT_LIGHT
```

### 📋 Categorías de Productos

El sistema soporta estas categorías de productos:

- **Moving Head** - Luces de cabeza móvil y accesorios
- **Wash Light** - Luces de lavado e inundación
- **LED Strobe Light** - Luces LED estroboscópicas y efectos
- **LED PAR Light** - Luces LED PAR y latas
- **Laser Light** - Luces láser y efectos
- **Effect Light** - Luces de efectos especiales y accesorios

### 🔧 Consejos Importantes

#### Convenciones de Nomenclatura
- Usar nombres de modelo consistentes (ej: `SPL-LED-XXX`)
- Mantener descripciones concisas pero informativas
- Usar mayúsculas y espaciado apropiados

#### Requisitos de Imágenes
- **Imagen principal**: Relación de aspecto 16:9 o 4:3 recomendada
- **Imagen de contenido**: Resolución más alta para páginas de detalle
- **Formato**: PNG con soporte de transparencia
- **Tamaño**: Optimizar para web (máximo 2MB por imagen)

#### Enlaces de Video
- Usar URLs completas de YouTube
- Probar enlaces antes de agregar
- Dejar cadena vacía `""` si no hay video disponible

#### Bandera de Producto Nuevo
- Establecer `new: true` para productos recién agregados
- Cambiar a `false` después del período de lanzamiento inicial
- Usar esto para destacar nuevas llegadas en el sitio web

### 🚨 Problemas Comunes y Soluciones

#### Producto No Se Muestra
1. Verificar si el producto está agregado al array `products`
2. Verificar rutas de imagen en `product-images.ts`
3. Asegurar que las imágenes existen en la carpeta correcta
4. Revisar consola del navegador para errores

#### Imágenes No Se Cargan
1. Verificar que los nombres de archivo coincidan exactamente
2. Revisar permisos de archivo en `public/images/products/`
3. Asegurar que las imágenes estén en formato PNG
4. Limpiar caché del navegador

#### Problemas con Filtros de Categoría
1. Verificar que la categoría coincida exactamente con el enum `Category`
2. Revisar errores tipográficos en nombres de categoría
3. Asegurar que la categoría esté importada correctamente

### 📝 Ejemplo: Agregar un Producto Completo

Aquí hay un ejemplo completo de cómo agregar un nuevo producto:

#### 1. Crear Carpeta de Imagen
```bash
mkdir -p public/images/products/SPL-LED-EJEMPLO
# Agregar image.png y content.png a esta carpeta
```

#### 2. Actualizar product-images.ts
```typescript
// SPL-LED-EJEMPLO
export const SPL_LED_EJEMPLO_IMAGE = "/images/products/SPL-LED-EJEMPLO/image.png";
export const SPL_LED_EJEMPLO_CONTENT = "/images/products/SPL-LED-EJEMPLO/content.png";

// Agregar a la función getProductImages
"SPL-LED-EJEMPLO": {
  image: SPL_LED_EJEMPLO_IMAGE,
  content: SPL_LED_EJEMPLO_CONTENT
}
```

#### 3. Actualizar products.ts
```typescript
{
  "model": "SPL-LED-EJEMPLO",
  "description": "Luz LED de Ejemplo para Pruebas",
  "category": Category.MOVING_HEAD,
  "image": getProductImages("SPL-LED-EJEMPLO").image,
  "content": getProductImages("SPL-LED-EJEMPLO").content,
  "video": "",
  "new": true
}
```

### 🔍 Probar Cambios

Después de hacer cambios:

1. **Iniciar servidor de desarrollo**: `npm run dev`
2. **Navegar a la página de Productos** para ver productos nuevos/actualizados
3. **Revisar páginas de detalle de productos** para mostrar imágenes correctamente
4. **Probar filtros de categoría** para asegurar categorización correcta
5. **Verificar diseño responsivo** en diferentes tamaños de pantalla

### 📚 Recursos Adicionales

- **Documentación de React**: [react.dev](https://react.dev)
- **Manual de TypeScript**: [typescriptlang.org](https://www.typescriptlang.org/docs)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)

---

## 🤝 Contribuir

Al contribuir al catálogo de productos:

1. Seguir las convenciones de nomenclatura establecidas
2. Probar cambios exhaustivamente
3. Asegurar que las imágenes estén optimizadas correctamente
4. Actualizar documentación si es necesario
5. Usar mensajes de commit descriptivos

## 📄 Licencia

Este proyecto es software propietario. Todos los derechos reservados.
