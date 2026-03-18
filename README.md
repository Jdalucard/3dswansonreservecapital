# Swanson Reserve Capital - 3D Web 

Este proyecto es una réplica de alta fidelidad del sitio **Swanson Reserve Capital**, desarrollada como prueba técnica para la posición de **3D Web Developer**. El objetivo principal fue demostrar habilidades en el manejo de secuencias de imágenes, integración de modelos 3D en tiempo real (WebGL) y optimización de rendimiento para dispositivos móviles.

 **Deploy:** [https://taupe-sunburst-cabcbb.netlify.app/](https://taupe-sunburst-cabcbb.netlify.app/)

 Stack Tecnológico

* **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
* **3D Engine:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) (Three.js)
* **Animaciones:** [GSAP](https://greensock.com/gsap/) + ScrollTrigger & [Framer Motion](https://www.framer.com/motion/)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Renderizado:** HTML5 Canvas 2D (Secuencias) & WebGL (Modelos 3D)

## 🎯 Desafíos y Soluciones Técnicas

### 1. Optimización de Scroll en Mobile
Se detectó un bloqueo inicial en el scroll debido a la interceptación de eventos de Three.js. 
* **Solución:** Implementación de `touch-action: pan-y` y eliminación de `eventSource` global, devolviendo el control del scroll al navegador y garantizando 60 FPS estables.

### 2. Sincronización de Secuencias (Scrollytelling)
El Hero utiliza una secuencia de 237 frames.
* **Solución:** Uso de **HTML5 Canvas API** para renderizar frames bajo demanda sincronizados con el progreso del scroll de GSAP, evitando el consumo excesivo de memoria de los elementos `<img>` tradicionales.

### 3. Estabilidad de Layout (CLS 0)
* **Solución:** Uso de `next/dynamic` con `ssr: false` y *Skeletons* con dimensiones fijas para evitar saltos visuales (Layout Shift) mientras se hidratan los componentes 3D.

### 4. Rendimiento WebGL
* **Solución:** Limitación dinámica de `devicePixelRatio` (DPR) a un máximo de 1.5 en móviles para balancear nitidez visual y consumo energético.

 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/Jdalucard/3dswansonreservecapital.git](https://github.com/Jdalucard/3dswansonreservecapital.git)
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Correr en modo desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Generar build de producción:**
    ```bash
    npm run build
    ```

---
Desarrollado por **Jose Daniel Martínez Pacheco**
