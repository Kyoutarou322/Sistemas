-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2025 a las 19:35:28
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `registro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buzon`
--

CREATE TABLE `buzon` (
  `id` bigint(20) NOT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_solicitud` datetime(6) DEFAULT NULL,
  `motivo_de_eliminacion` varchar(255) DEFAULT NULL,
  `tipo_solicitud` varchar(255) NOT NULL,
  `producto` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `cantidad` varchar(255) DEFAULT NULL,
  `codigo_solicitud` varchar(255) DEFAULT NULL,
  `detalle_solicitud` varchar(255) DEFAULT NULL,
  `solicitud_modificada` bit(1) DEFAULT NULL,
  `usuario_solicitante` varchar(255) DEFAULT NULL,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `producto_id` bigint(20) DEFAULT NULL,
  `detalle` varchar(255) DEFAULT NULL,
  `fue_modificado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `buzon`
--

INSERT INTO `buzon` (`id`, `estado`, `fecha_solicitud`, `motivo_de_eliminacion`, `tipo_solicitud`, `producto`, `categoria`, `cantidad`, `codigo_solicitud`, `detalle_solicitud`, `solicitud_modificada`, `usuario_solicitante`, `fecha_registro`, `producto_id`, `detalle`, `fue_modificado`) VALUES
(4, 'ACEPTADO', '2025-06-03 15:32:34.000000', 'NINGUNO', 'REGISTRAR', 'a', 'a', '1', 'SOL-20250603-3642', 'aaa', b'0', 'admin', '2025-06-04 01:01:43.000000', 5, NULL, 0),
(5, 'ACEPTADO', '2025-06-03 15:44:58.000000', 'NINGUNO', 'REGISTRAR', 'b', 'b', '1', 'SOL-20250603-3935', 'bbb', b'0', 'admin', '2025-06-04 01:02:17.000000', 6, NULL, 0),
(6, 'ACEPTADO', '2025-06-03 17:54:09.000000', 'NINGUNO', 'REGISTRAR', 'c', 'c', '1', 'SOL-20250603-5654', 'ccc', b'0', 'admin', '2025-06-04 01:04:32.000000', 7, NULL, 0),
(8, 'ACEPTADO', '2025-06-04 01:04:11.000000', 'NINGUNO', 'REGISTRAR', 'e', 'e', '1', 'SOL-20250604-7990', 'e', b'0', 'admin', '2025-06-04 01:07:19.000000', 8, NULL, 0),
(13, 'ACEPTADO', '2025-06-04 01:13:05.000000', 'NINGUNO', 'REGISTRAR', 'dasdda', 'ss', '1', 'SOL-20250604-7393', 'da', b'0', 'admin', '2025-06-04 01:14:10.000000', 12, NULL, 0),
(20, 'ACEPTADA', '2025-06-04 22:29:48.000000', 'NINGUNO', 'REGISTRAR', 'XDDDDDDD', '1111', '1111', 'SOL-20250604-3312', 'XD', b'0', 'admin', '2025-06-05 02:06:55.000000', 13, NULL, 0),
(27, 'ACEPTADA', '2025-06-05 02:30:34.000000', 'NINGUNO', 'REGISTRAR', '312313', '231231', '231', 'SOL-20250605-6063', 'dsad', b'0', 'admin', '2025-06-05 17:40:07.000000', 14, NULL, 0),
(67, 'ACEPTADA', '2025-06-05 17:41:57.000000', 'NINGUNO', 'REGISTRAR', 'dasdasd', 'sada', '111', 'SOL-20250605-9025', 'adsa', b'0', 'admin', '2025-06-05 17:51:47.000000', 15, NULL, 0),
(68, 'ACEPTADA', '2025-06-05 17:52:36.000000', 'NINGUNO', 'REGISTRAR', 'si', 'no', '322', 'SOL-20250605-2346', 'aea', b'0', 'admin', '2025-06-06 02:18:32.000000', 16, NULL, 0),
(70, 'ACEPTADA', '2025-06-06 00:06:51.000000', 'NINGUNO', 'REGISTRAR', 'xdd', '213', '21', 'SOL-20250606-2380', '12', b'0', 'admin', '2025-06-06 02:42:51.000000', 17, NULL, 0),
(76, 'PENDIENTE', '2025-06-06 03:08:38.000000', 'NINGUNO', 'REGISTRAR', 'rer', 'rer', '12', 'SOL-20250606-5123', '12', b'0', 'admin', NULL, NULL, NULL, 0),
(77, 'PENDIENTE', '2025-06-06 03:56:56.000000', 'NINGUNO', 'REGISTRAR', 'xd', 'xd', '1', 'SOL-20250606-4954', 'xd', b'0', 'admin', NULL, NULL, NULL, 0),
(78, 'ACEPTADA', '2025-06-08 17:31:52.000000', 'NINGUNO', 'REGISTRAR', 'dsa', 'dsa', '321', 'SOL-20250608-6321', 'dsa', b'0', 'admin', '2025-06-08 17:32:25.000000', 18, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buzonactualizar`
--

CREATE TABLE `buzonactualizar` (
  `id` bigint(20) NOT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_solicitud` datetime DEFAULT current_timestamp(),
  `motivo_de_eliminacion` varchar(255) DEFAULT 'NINGUNO',
  `tipo_solicitud` varchar(255) DEFAULT NULL,
  `producto` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `cantidad` varchar(255) DEFAULT NULL,
  `codigo_solicitud` varchar(255) DEFAULT NULL,
  `detalle_solicitud` varchar(1000) DEFAULT NULL,
  `solicitud_modificada` tinyint(1) DEFAULT 0,
  `usuario_solicitante` varchar(255) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL,
  `producto_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `buzonactualizar`
--

INSERT INTO `buzonactualizar` (`id`, `estado`, `fecha_solicitud`, `motivo_de_eliminacion`, `tipo_solicitud`, `producto`, `categoria`, `cantidad`, `codigo_solicitud`, `detalle_solicitud`, `solicitud_modificada`, `usuario_solicitante`, `fecha_registro`, `producto_id`) VALUES
(7, 'ACEPTADA', '2025-06-07 02:19:55', 'NINGUNO', 'ACTUALIZAR', 'Producto A / Producto A31231', 'Categoría 1 / Categoría 131321', '10 / 1031231', 'SOL-20250606-2450', '31231', 0, 'admin', '2025-06-06 21:19:59', 2),
(10, 'ACEPTADA', '2025-06-07 02:29:06', 'NINGUNO', 'ACTUALIZAR', 'Producto A / Producto A31', 'Categoría 1 / Categoría 1312', '10 / 1031', 'SOL-20250606-6204', '321', 0, 'admin', '2025-06-06 21:29:10', 2),
(11, 'ACEPTADA', '2025-06-07 02:29:34', 'NINGUNO', 'ACTUALIZAR', 'Producto A31 / Producto A', 'Categoría 1312 / Categoría 1', '1031 / 10', 'SOL-20250606-7582', 'xdd', 0, 'admin', '2025-06-06 21:29:38', 2),
(12, 'PENDIENTE', '2025-06-07 03:13:45', 'NINGUNO', 'ACTUALIZAR', 'Producto A / Producto Adsda', 'Categoría 1 / Categoría 1dasda', '10 / 10321', 'SOL-20250606-8776', 'dsad', 0, 'admin', NULL, 2),
(13, 'ACEPTADA', '2025-06-08 22:32:52', 'NINGUNO', 'ACTUALIZAR', 'dsa / dsaeee', 'dsa / dsa', '321 / 321', 'SOL-20250608-2186', 'dsa', 0, 'admin', '2025-06-08 17:32:58', 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buzoneliminar`
--

CREATE TABLE `buzoneliminar` (
  `id` bigint(20) NOT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_solicitud` datetime(6) DEFAULT NULL,
  `tipo_solicitud` varchar(255) DEFAULT NULL,
  `producto` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `cantidad` varchar(255) DEFAULT NULL,
  `codigo_solicitud` varchar(255) DEFAULT NULL,
  `detalle_eliminacion` varchar(1000) DEFAULT NULL,
  `solicitud_modificada` bit(1) NOT NULL,
  `usuario_solicitante` varchar(255) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL,
  `producto_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `buzoneliminar`
--

INSERT INTO `buzoneliminar` (`id`, `estado`, `fecha_solicitud`, `tipo_solicitud`, `producto`, `categoria`, `cantidad`, `codigo_solicitud`, `detalle_eliminacion`, `solicitud_modificada`, `usuario_solicitante`, `fecha_registro`, `producto_id`) VALUES
(15, 'ACEPTADA', '2025-06-08 06:35:08.000000', 'ELIMINAR', 'xdd', '213', '21', 'SOL-20250608-7558', 'dsa', b'0', 'admin', '2025-06-08 17:33:19', NULL),
(16, 'ACEPTADA', '2025-06-08 17:34:24.000000', 'ELIMINAR', 'si', 'no', '322', 'SOL-20250608-5575', 'ijo', b'0', 'admin', '2025-06-08 17:34:39', NULL),
(17, 'PENDIENTE', '2025-06-08 17:35:04.000000', 'ELIMINAR', 'dsaeee', 'dsa', '321', 'SOL-20250608-8385', 'a', b'0', 'admin', NULL, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) NOT NULL,
  `nombreproducto` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `fechacreacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `codigo` varchar(255) DEFAULT NULL,
  `cantidad` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombreproducto`, `categoria`, `fechacreacion`, `codigo`, `cantidad`) VALUES
(2, 'Producto A', 'Categoría 1', '2025-05-28 15:07:18', 'COD-001', 10),
(3, 'Producto B', 'Categoría 2', '2025-05-28 15:07:18', 'COD-002', 5),
(4, 'Producto ', 'Categoría 4', '2025-06-03 19:46:11', 'COD-003', 7),
(5, 'a', 'a', '2025-06-04 01:01:43', 'COD-4', 1),
(6, 'b', 'b', '2025-06-04 01:02:17', 'COD-5', 1),
(7, 'c', 'c', '2025-06-04 01:04:32', 'COD-6', 1),
(8, 'e', 'e', '2025-06-04 01:07:19', 'COD-008', 1),
(9, 'pro', 'xd', '2025-06-04 01:07:59', 'COD-009', 31),
(10, 'da', 'da', '2025-06-04 01:10:17', 'COD-010', 22),
(11, 'da', 'xd', '2025-06-04 01:13:10', 'COD-12', 111),
(12, 'dasdda', 'ss', '2025-06-04 01:14:10', 'COD-013', 1),
(13, 'XDDDDDDD', '1111', '2025-06-05 02:06:55', 'COD-020', 1111),
(14, '312313', '231231', '2025-06-05 17:40:07', 'COD-027', 231),
(15, 'dasdasd', 'sada', '2025-06-05 17:51:47', 'COD-067', 111),
(18, 'dsaeee', 'dsa', '2025-06-08 17:32:25', 'COD-078', 321);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `nombres` varchar(150) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombres`, `usuario`, `contrasena`, `correo_electronico`, `fecha_creacion`) VALUES
(17, '2', '2', '123', '2', '2025-05-28 18:18:04'),
(18, '3', '3', '123', '3', '2025-05-28 18:21:31'),
(19, '1', '1', '123', '1', '2025-05-28 18:22:45'),
(20, '4', '4', '123', '4', '2025-05-28 18:30:17'),
(21, '6', '6', '123', '6', '2025-05-28 18:37:23'),
(22, 'a', 'a', '123', 'a', '2025-05-28 19:01:39'),
(23, 'admin', 'admin', '123', 'admin', '2025-05-28 19:02:33');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `buzon`
--
ALTER TABLE `buzon`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `buzonactualizar`
--
ALTER TABLE `buzonactualizar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_solicitud` (`codigo_solicitud`),
  ADD KEY `fk_producto_buzonactualizar` (`producto_id`);

--
-- Indices de la tabla `buzoneliminar`
--
ALTER TABLE `buzoneliminar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_solicitud` (`codigo_solicitud`),
  ADD KEY `fk_producto_buzoneliminar` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `buzon`
--
ALTER TABLE `buzon`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `buzonactualizar`
--
ALTER TABLE `buzonactualizar`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `buzoneliminar`
--
ALTER TABLE `buzoneliminar`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `buzonactualizar`
--
ALTER TABLE `buzonactualizar`
  ADD CONSTRAINT `fk_producto_buzonactualizar` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `buzoneliminar`
--
ALTER TABLE `buzoneliminar`
  ADD CONSTRAINT `fk_producto_buzoneliminar` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
