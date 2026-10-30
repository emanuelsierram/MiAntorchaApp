# Arquitectura de componentes - Mi Antorcha App

> Inventario de la implementación actual. Los nombres se muestran en inglés (nombre técnico del código) y español (nombre funcional o de producto).

## 1. Resumen de arquitectura

Mi Antorcha App es una aplicación Expo/React Native con TypeScript y Expo Router. La navegación se organiza mediante rutas basadas en archivos dentro de `app/`; la interfaz reutilizable se encuentra en `components/`; y la lógica transversal se divide en constantes, contextos, hooks, servicios y tipos dentro de `src/`.

La composición visual sigue el patrón de diseño atómico:

```text
Pages (app/)
└── Templates (components/templates/)
    └── Organisms (components/organisms/)
        └── Molecules (components/molecules/)
            └── Atoms (components/atoms/)
```

Los componentes de infraestructura y soporte (`components/` fuera de las carpetas atómicas), así como `src/`, complementan esta jerarquía sin ser necesariamente una capa visual del patrón.

### Stack identificado

- Expo Router con rutas tipadas habilitadas.
- React Native y React Native Web.
- TypeScript.
- `@gorhom/bottom-sheet` para la hoja inferior de la pantalla principal.
- `lottie-react-native` para animaciones.
- AsyncStorage para persistencia de sesión y preferencias.
- React Context para tema, configuración, alertas y menú lateral.
- `react-native-gesture-handler` como raíz de gestos.

## 2. Átomos / Atoms

Los átomos son las unidades visuales más pequeñas y reutilizables. No deberían contener reglas de navegación ni lógica de negocio.

| Nombre técnico (EN) | Nombre funcional (ES) | Archivo | Responsabilidad |
|---|---|---|---|
| `Icon` | Icono | `components/atoms/Icon.tsx` | Adaptador unificado para familias de iconos como Ionicons, MaterialIcons y FontAwesome. |
| `IconSymbol` | Símbolo de icono | `components/atoms/icon-symbol.tsx` | Renderiza símbolos del sistema en iOS y un mapa de iconos equivalente en otras plataformas. |
| `IconSymbol` (iOS) | Símbolo de icono para iOS | `components/atoms/icon-symbol.ios.tsx` | Implementación específica para símbolos nativos de iOS. |
| `Checkbox` | Casilla de verificación | `components/atoms/checkbox.tsx` | Control visual controlado para estados marcado/no marcado y acción de pulsación. |
| `CircularIcon` | Icono circular | `components/atoms/circular-icon.tsx` | Presenta un icono dentro de un contenedor circular configurable. |
| `ProgressBar` | Barra de progreso | `components/atoms/progress-bar.tsx` | Representa el avance entre un valor actual y uno total. |
| `ThemedText` | Texto tematizado | `components/atoms/themed-text.tsx` | Texto con variantes tipográficas y colores dependientes del tema. |

## 3. Moléculas / Molecules

Las moléculas agrupan átomos para resolver una interacción o pieza visual concreta.

| Nombre técnico (EN) | Nombre funcional (ES) | Archivo | Responsabilidad |
|---|---|---|---|
| `ActionCard` | Tarjeta de acción | `components/molecules/action-card.tsx` | Tarjeta pulsable con icono, título, subtítulo, flecha y variantes para menú lateral. |
| `ActivityCard` | Tarjeta de actividad | `components/molecules/activity-card.tsx` | Muestra una actividad, su estado completado y permite alternarlo. |
| `EmptyState` | Estado vacío | `components/molecules/empty-state.tsx` | Comunica que una colección no tiene registros y muestra un mensaje orientativo. |
| `FormHeader` | Encabezado de formulario | `components/molecules/form-header.tsx` | Encabezado reutilizable para formularios de registro de estudio bíblico. |
| `FormInputField` | Campo de entrada de formulario | `components/molecules/form-input-field.tsx` | Campo con etiqueta, icono, entrada de texto y configuración de teclado. |
| `GoalProgressRow` | Fila de progreso de meta | `components/molecules/goal-progress-row.tsx` | Muestra una meta, sus valores actual/total y una barra de progreso. |
| `NewStudentCard` | Tarjeta de nuevo alumno | `components/molecules/new-student-card.tsx` | Acción visual para iniciar el registro de un nuevo alumno desde el carrusel de estudios. |
| `SectionHeader` | Encabezado de sección | `components/molecules/section-header.tsx` | Título de sección con icono y acción opcional a la derecha. |
| `StudentInfoCard` | Tarjeta de información del alumno | `components/molecules/student-info-card.tsx` | Muestra el nombre y las semanas de un alumno dentro del carrusel de estudios. |

## 4. Organismos / Organisms

Los organismos componen moléculas y átomos para representar bloques funcionales completos del producto.

| Nombre técnico (EN) | Nombre funcional (ES) | Archivo | Responsabilidad |
|---|---|---|---|
| `TopNavBar` | Barra de navegación superior | `components/organisms/top-nav-bar.tsx` | Encabezado de pantalla con título, acceso al menú y acciones de navegación. |
| `MenuDrawer` | Menú lateral | `components/organisms/menu-drawer.tsx` | Menú de perfil y accesos a estudio, visitas, metas, información, seguridad y configuración. |
| `AddStudyForm` | Formulario para agregar estudio | `components/organisms/add-study-form.tsx` | Captura los datos de un nuevo estudio bíblico y notifica el envío mediante `StudyFormData`. |
| `WeeklyActivitiesList` | Lista de actividades semanales | `components/organisms/weekly-activities-list.tsx` | Agrupa actividades por día y permite marcar/desmarcar cada actividad. |
| `GoalsList` | Lista de metas | `components/organisms/goals-list.tsx` | Renderiza las metas del usuario usando filas de progreso. |
| `ModoApariencia` | Selector de modo de apariencia | `components/organisms/appearance-mode.tsx` | Permite seleccionar apariencia clara, oscura o del sistema. |
| `StudyStudentsCarousel` | Carrusel de alumnos de estudio | `components/organisms/study-students-carousel.tsx` | Compone la acción para agregar alumnos y las tarjetas de información de los alumnos asignados en un carrusel horizontal. |

### Tipos de dominio exportados desde organismos

- `StudyFormData`: datos capturados por `AddStudyForm`.
- `StudyStudent`: identificador, nombre y semanas mostradas para un alumno en `StudyStudentsCarousel`.
- `ActivityItem`: identificador, día, título, icono y estado de una actividad.
- `GoalItem`: identificador, título, icono y valores actual/total de una meta.

## 5. Templates / Plantillas

Los templates definen una composición de alto nivel que puede recibir datos y callbacks desde una página.

| Nombre técnico (EN) | Nombre funcional (ES) | Archivo | Responsabilidad |
|---|---|---|---|
| `TorchBottomSheet` | Hoja inferior de la antorcha | `components/templates/torch-bottom-sheet.tsx` | Composición principal de la hoja inferior; integra actividades semanales y metas, y expone el cambio de estado de una actividad. |

### Composición interna del template

`TorchBottomSheet` utiliza directamente los siguientes componentes:

- **Molécula / Molecule:** `SectionHeader` (Encabezado de sección).
- **Organismos / Organisms:** `WeeklyActivitiesList` (Lista de actividades semanales) y `GoalsList` (Lista de metas).
- **Átomo / Atom:** `IconSymbol` (Símbolo de icono), usado para la acción de expandir/contraer.

```text
TorchBottomSheet
├── SectionHeader
├── WeeklyActivitiesList
│   └── ActivityCard
└── GoalsList
    └── GoalProgressRow
```

## 5.1 Dependencias de moléculas por organismo

Esta tabla muestra las moléculas que cada organismo compone directamente. Los átomos internos de las moléculas se describen en la sección de átomos y no se repiten aquí.

| Organismo / Organism | Nombre funcional (ES) | Moléculas / Molecules que utiliza |
|---|---|---|
| `AddStudyForm` | Formulario para agregar estudio | `FormHeader` (Encabezado de formulario), `FormInputField` (Campo de entrada de formulario). |
| `GoalsList` | Lista de metas | `GoalProgressRow` (Fila de progreso de meta). |
| `WeeklyActivitiesList` | Lista de actividades semanales | `ActivityCard` (Tarjeta de actividad). |
| `MenuDrawer` | Menú lateral | `ActionCard` (Tarjeta de acción). |
| `StudyStudentsCarousel` | Carrusel de alumnos de estudio | `NewStudentCard` (Tarjeta de nuevo alumno), `StudentInfoCard` (Tarjeta de información del alumno). |
| `TopNavBar` | Barra de navegación superior | No utiliza moléculas; compone directamente átomos y elementos nativos. |
| `ModoApariencia` | Selector de modo de apariencia | No utiliza moléculas; compone directamente `Icon` y controles nativos. |

## 5.2 Dependencias de átomos por molécula

Como referencia de la composición completa, estas son las dependencias atómicas directas de las moléculas:

| Molécula / Molecule | Átomos / Atoms que utiliza |
|---|---|
| `ActionCard` | `CircularIcon`, `IconSymbol`. |
| `ActivityCard` | `Checkbox`, `CircularIcon`, `IconSymbol`, `ThemedText`. |
| `EmptyState` | `CircularIcon`, `IconSymbol`, `ThemedText`. |
| `FormHeader` | `CircularIcon`, `ThemedText`. |
| `FormInputField` | `IconSymbol`. |
| `GoalProgressRow` | `CircularIcon`, `IconSymbol`, `ProgressBar`, `ThemedText`. |
| `NewStudentCard` | `CircularIcon`. |
| `SectionHeader` | `IconSymbol`, `ThemedText`. |
| `StudentInfoCard` | `CircularIcon`, `IconSymbol`. |

## 6. Páginas / Pages

Las páginas son rutas de Expo Router. Coordinan datos, navegación y composición, pero deben delegar la presentación reutilizable a componentes.

| Ruta | Nombre técnico (EN) | Nombre funcional (ES) | Archivo | Estado actual |
|---|---|---|---|---|
| `/login` | `LoginScreen` | Inicio de sesión | `app/login.tsx` | Pantalla de teléfono/PIN; usa `usePinLogin`, `AuthService` y `SessionService`. |
| `/(tabs)` | `HomeScreen` | Mi Antorcha | `app/(tabs)/index.tsx` | Pantalla principal con animación de cielo, composición visual de la antorcha y `TorchBottomSheet`. Actualmente usa actividades y metas mock en estado local. |
| `/(tabs)/estudio` | `EstudioScreen` | Mis estudios bíblicos | `app/(tabs)/estudio.tsx` | Muestra el estado vacío cuando no hay alumnos asignados; después del primer registro muestra el carrusel, el acceso de búsqueda y el formulario. El envío todavía se gestiona localmente. |
| `/(tabs)/actividades` | `TabTwoScreen` | Actividades / Explorar | `app/(tabs)/actividades.tsx` | Actualmente conserva contenido de demostración del template de Expo (`Explore`, acordeones y enlaces); requiere evolución hacia el módulo funcional de actividades. |
| `/configuration` | `ConfigurationScreen` | Configuración | `app/configuration.tsx` | Ajustes de la aplicación, modo de apariencia y cierre de sesión. |
| `/modal` | `ModalScreen` | Modal de ejemplo | `app/modal.tsx` | Ruta modal de demostración configurada con presentación modal. |

### Layouts de navegación

| Nombre técnico (EN) | Nombre funcional (ES) | Archivo | Responsabilidad |
|---|---|---|---|
| `RootLayout` | Layout raíz | `app/_layout.tsx` | Configura providers, tema de navegación, gesto raíz, validación de sesión y stack principal. |
| `TabLayout` | Layout de pestañas | `app/(tabs)/_layout.tsx` | Declara las tres tabs, iconos, colores, botón háptico y estilos de la barra inferior. |

### Componentes utilizados por las páginas

El siguiente mapa registra los componentes propios utilizados directamente por cada página. También incluye los layouts porque son el punto donde Expo Router conecta la navegación con componentes reutilizables.

| Página / Page | Componentes que utiliza directamente |
|---|---|
| `LoginScreen` (`/login`) | No utiliza componentes propios de `components/`; usa componentes nativos de React Native, `FontAwesome`, `usePinLogin` y `SessionService`. |
| `HomeScreen` (`/(tabs)`) | `ThemedView` (Contenedor tematizado), `TopNavBar` (Barra de navegación superior), `TorchBottomSheet` (Hoja inferior de la antorcha). `GoalItem` y `ActivityItem` se importan únicamente como tipos. |
| `EstudioScreen` (`/(tabs)/estudio`) | `TopNavBar`, `EmptyState` (Estado vacío), `StudyStudentsCarousel` (Carrusel de alumnos de estudio), `ActionCard` (Tarjeta de acción), `AddStudyForm` (Formulario para agregar estudio). |
| `TabTwoScreen` (`/(tabs)/actividades`) | `ParallaxScrollView` (Scroll con paralaje), `IconSymbol`, `ThemedText`, `ThemedView`, `ExternalLink` (Enlace externo), `Collapsible` (Sección colapsable). |
| `ConfigurationScreen` (`/configuration`) | `TopNavBar`, `ModoApariencia` (Selector de modo de apariencia), `ActionCard`. |
| `ModalScreen` (`/modal`) | `ThemedView`, `ThemedText`. |
| `TabLayout` (`app/(tabs)/_layout.tsx`) | `IconSymbol` y `HapticTab` (Tab háptica), integrados en la configuración de `Tabs`. |
| `RootLayout` (`app/_layout.tsx`) | No utiliza componentes visuales propios directamente; compone providers de `src/`, `GestureHandlerRootView`, `ThemeProvider`, `Stack` y controles nativos de carga. |

## 7. Tabs / Pestañas

Las tabs están declaradas en `app/(tabs)/_layout.tsx`:

| Nombre técnico (EN) | Nombre visible (ES) | Ruta | Icono | Propósito |
|---|---|---|---|---|
| `Bible Study` | `Estudio Bíblico` | `/(tabs)/estudio` | `book.fill` | Gestionar o registrar estudios bíblicos. |
| `My Torch` | `Mi Antorcha` | `/(tabs)/index` | `flame.fill` | Vista principal de progreso, metas y actividades. |
| `Activities` | `Actividades` | `/(tabs)/actividades` | `list.bullet` | Punto de entrada para actividades; actualmente contiene la pantalla de ejemplo de Expo. |

Todas las tabs usan `HapticTab` como botón y respetan el color de tinta del tema actual.

## 8. Componentes de soporte fuera de la estructura atómica

Son componentes reutilizables, de infraestructura o heredados del starter de Expo. Se documentan para evitar que queden fuera del mapa arquitectónico.

| Nombre técnico (EN) | Nombre funcional (ES) | Archivo | Clasificación | Responsabilidad |
|---|---|---|---|---|
| `ExternalLink` | Enlace externo | `components/external-link.tsx` | Infraestructura UI | Abre enlaces web con `expo-web-browser`, especialmente en móvil. |
| `HapticTab` | Tab háptica | `components/haptic-tab.tsx` | Navegación/UI | Añade respuesta háptica al pulsar una tab en plataformas compatibles. |
| `ThemedView` | Contenedor tematizado | `components/themed-view.tsx` | Primitiva UI | `View` con colores claro/oscuro configurables. |
| `ParallaxScrollView` | Scroll con paralaje | `components/parallax-scroll-view.tsx` | Layout UI | Scroll animado con encabezado de paralaje. |
| `Collapsible` | Sección colapsable | `components/ui/collapsible.tsx` | UI auxiliar | Expande y contrae contenido con un título y un icono. |
| `HelloWave` | Animación de saludo | `components/hello-wave.tsx` | Demo/starter | Animación heredada del proyecto inicial de Expo; no representa una capacidad de negocio actual. |

### Componentes utilizados por los componentes fuera de la estructura atómica

| Componente | Componentes propios que utiliza directamente | Dependencias principales |
|---|---|---|
| `ExternalLink` (Enlace externo) | No utiliza componentes propios del proyecto. | `Link` de Expo Router y `openBrowserAsync` de Expo Web Browser. |
| `HapticTab` (Tab háptica) | No utiliza componentes propios del proyecto. | `PlatformPressable` de Expo Router y `expo-haptics`. |
| `ThemedView` (Contenedor tematizado) | No utiliza componentes visuales propios. | `useThemeColor` y `View` de React Native. |
| `ParallaxScrollView` (Scroll con paralaje) | `ThemedView`. | `useColorScheme`, `useThemeColor`, `Animated` y componentes de React Native. |
| `Collapsible` (Sección colapsable) | `ThemedView`, `IconSymbol`, `ThemedText`. | `useColorScheme`, `Colors` y componentes de React Native. |
| `HelloWave` (Animación de saludo) | No utiliza componentes propios del proyecto. | `Animated.Text` de `react-native-reanimated`. |

## 9. Constantes / Constants

| Nombre técnico (EN) | Nombre funcional (ES) | Archivo | Responsabilidad |
|---|---|---|---|
| `Colors` | Colores del tema | `src/constants/theme.ts` | Define colores de texto, fondo, tintes, iconos y estados para modo claro y oscuro. |
| `Fonts` | Fuentes del tema | `src/constants/theme.ts` | Define familias tipográficas por plataforma. |
| `API_URL` | URL de API | `src/services/auth.services.ts` | Endpoint base usado actualmente por el servicio de autenticación. |
| `TOKEN_KEY` | Clave de token de sesión | `src/services/session.service.ts` | Clave privada de AsyncStorage para el JWT. |
| `PHONE_KEY` | Clave de último teléfono | `src/services/session.service.ts` | Clave de AsyncStorage para recordar el último teléfono usado. |
| `THEME_STORAGE_KEY` | Clave de preferencia de tema | `src/context/theme-context.tsx` | Clave de AsyncStorage para persistir la apariencia elegida. |

## 10. Contextos / Contexts

Los contextos se registran en el layout raíz y exponen hooks de acceso para evitar pasar estado transversal por props.

| Nombre técnico (EN) | Nombre funcional (ES) | Archivo | API principal | Responsabilidad |
|---|---|---|---|---|
| `CustomThemeProvider` / `useCustomTheme` | Proveedor y contexto de tema | `src/context/theme-context.tsx` | `themeSetting`, `colorScheme`, `setThemeSetting` | Persiste y resuelve el modo claro, oscuro o del sistema. |
| `AlertProvider` / `useAlert` | Proveedor y contexto de alertas | `src/context/alert-context.tsx` | `showAlert` | Controla un modal de confirmación reutilizable. |
| `MenuProvider` / `useMenu` | Proveedor y contexto de menú | `src/context/menu-context.tsx` | `showMenu`, `hideMenu` | Controla visibilidad y animación del drawer lateral. |
| `SettingsProvider` / `useSettings` | Proveedor y contexto de configuración | `src/context/settings-context.tsx` | API de configuración expuesta por el contexto | Centraliza el estado de configuración usado por el menú y la pantalla de configuración. |

Orden actual de composición:

```text
CustomThemeProvider
└── GestureHandlerRootView
    └── ThemeProvider (Expo Router)
        ├── AlertProvider
        ├── SettingsProvider
        └── MenuProvider
            └── AppContent / Stack
```

## 11. Hooks

| Nombre técnico (EN) | Nombre funcional (ES) | Archivo | Responsabilidad |
|---|---|---|---|
| `useColorScheme` | Esquema de color actual | `src/hooks/use-color-scheme.ts` | Obtiene el modo claro/oscuro; tiene implementación web separada en `use-color-scheme.web.ts`. |
| `useThemeColor` | Color del tema | `src/hooks/use-theme-color.ts` | Resuelve un color a partir de overrides claro/oscuro o de `Colors`. |
| `usePinLogin` | Inicio de sesión por PIN | `src/hooks/use-pin-login.ts` | Observa un PIN de cuatro dígitos, ejecuta autenticación, persiste sesión y redirige a tabs. |

## 12. Services / Servicios

| Nombre técnico (EN) | Nombre funcional (ES) | Archivo | Responsabilidad |
|---|---|---|---|
| `AuthService` | Servicio de autenticación | `src/services/auth.services.ts` | Envía credenciales a `/login` y obtiene el token `Authorization` del backend. |
| `SessionService` | Servicio de sesión | `src/services/session.service.ts` | Guarda, obtiene y elimina el token; recuerda el último teléfono, construye cabeceras `Bearer` autorizadas y extrae el identificador del JWT. |
| `EstudiosBiblicosService` | Servicio de estudios bíblicos | `src/services/estudios-biblicos.service.ts` | Consulta los estudios actuales por usuario y registra nuevos estudios usando el token de `SessionService`. |
| `AlertService` | Servicio de alertas nativo | `src/services/alert.service.ts` | Adaptador de alertas para React Native; muestra mensajes simples con botón `Aceptar` y confirmación de cierre de sesión. |
| `AlertService` | Servicio de alertas web | `src/services/alert.service.web.ts` | Implementación específica para web usando SweetAlert2 con el mismo fondo, color de confirmación y comportamiento modal para mensajes simples y confirmación de cierre de sesión. |

## 13. Types / Tipos

| Nombre técnico (EN) | Nombre funcional (ES) | Archivo | Uso |
|---|---|---|---|
| `LoginRequest` | Solicitud de inicio de sesión | `src/types/auth.ts` | Define `usuario` y `contrasena` enviados al backend. |
| `AuthResponse` | Respuesta de autenticación | `src/types/auth.ts` | Modela una respuesta que contiene `token`. |
| `CreateStudyRequest` | Solicitud de alta de estudio | `src/types/study.ts` | Datos enviados al endpoint de creación: persona, contacto, estado, usuario asignado/reportador y grupo opcional. La edad del formulario no forma parte del contrato del backend. |
| `StudyFormData` | Datos del estudio bíblico | `components/organisms/add-study-form.tsx` | Contrato de salida del formulario de alta de estudio. |
| `StudyStudent` | Alumno de estudio | `components/organisms/study-students-carousel.tsx` | Modelo local de presentación con identificador, nombre y semanas del alumno. |
| `Study` | Estudio bíblico | `src/types/study.ts` | Modelo normalizado usado por el servicio y el carrusel de alumnos. |
| `StudyResponse` | Respuesta de estudio bíblico | `src/types/study.ts` | Contrato exacto de la respuesta del backend; se transforma a `Study` para las cards. |
| `ActivityItem` | Elemento de actividad | `components/organisms/weekly-activities-list.tsx` | Modelo visual de una actividad semanal. |
| `GoalItem` | Elemento de meta | `components/organisms/goals-list.tsx` | Modelo visual de una meta con progreso. |
| `ThemeSetting` | Preferencia de tema | `src/context/theme-context.tsx` | Unión `light`, `dark` o `system`. |

## 14. Flujos de negocio identificados

### Autenticación y sesión

1. `LoginScreen` captura teléfono y PIN.
2. `usePinLogin` dispara el login al alcanzar cuatro dígitos.
3. `AuthService` devuelve el token JWT del backend.
4. `SessionService` persiste token y teléfono.
5. `RootLayout` valida la sesión y redirige entre `/login` y `/(tabs)`.

### Actividades y metas

`HomeScreen` crea datos mock locales, los pasa a `TorchBottomSheet` y permite alternar el estado de las actividades. Todavía no existe un servicio de persistencia o consulta de actividades/metas.

### Estudios bíblicos

`EstudiosBiblicosService` consulta los estudios actuales del usuario en `/api/estudios-biblicos/actuales/{idUsuario}` y registra nuevos estudios mediante `POST /api/estudios-biblicos`, reutilizando las cabeceras de `SessionService`. La respuesta del backend se modela con `StudyResponse` y se transforma a `Study`: `id` alimenta la identidad de la card, `nombrePersona` se muestra como nombre y `leccion` se muestra como `Semana {leccion}/20`. `SessionService` obtiene el identificador desde los claims del JWT. `EstudioScreen` transforma los datos del formulario al contrato del backend: usa `en curso` como estado, envía el mismo `id_usuario` como `idUsuarioAsignado` y `personaQueReporta`, y envía `idGrupo: null`; la edad se conserva sólo en el formulario porque no pertenece al payload. La pantalla carga los estudios al montarse; si la colección está vacía compone `EmptyState`, y cuando existe al menos uno compone `StudyStudentsCarousel`, que incluye `NewStudentCard` y una `StudentInfoCard` por alumno. `AddStudyForm` espera el `POST` y sólo limpia los campos después de una respuesta exitosa. Durante el alta, `EstudioScreen` muestra un loader de pantalla completa que bloquea la interacción hasta que el `POST` responde y la nueva card optimista se agrega al estado local. El acceso para buscar estudio continúa siendo un placeholder.

### Configuración, tema y menú

`MenuDrawer` abre la pantalla de configuración mediante Expo Router. El tema se persiste con `CustomThemeProvider`; la configuración y los accesos del drawer están preparados para crecer, aunque varios accesos todavía muestran alertas mock.

## 15. Observaciones de mantenimiento

- `app/(tabs)/actividades.tsx` conserva contenido de demostración de Expo y debería reemplazarse o renombrarse cuando el módulo de actividades tenga su diseño definitivo.
- La pantalla principal referencia una animación de fuego en `assets/animations/fire.json`; debe verificarse que el archivo exista antes de generar un build de producción.
- Los datos de actividades y metas de `HomeScreen` son mocks locales y no deben considerarse persistencia de dominio.
- El mock de autenticación con PIN `1234` es exclusivamente para pruebas locales y debe retirarse o protegerse mediante configuración de entorno antes de producción.
- Los nombres de carpetas y componentes atómicos están en inglés, mientras que el contenido visible está principalmente en español. Esta convención debe mantenerse para distinguir API técnica de lenguaje de producto.
