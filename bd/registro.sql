-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2025 a las 20:17:24
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
  `cantidad` int(11) DEFAULT NULL,
  `codigo_solicitud` varchar(255) DEFAULT NULL,
  `detalle_solicitud` varchar(255) DEFAULT NULL,
  `solicitud_modificada` bit(1) DEFAULT NULL,
  `usuario_solicitante` varchar(255) DEFAULT NULL,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `producto_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `buzon`
--

INSERT INTO `buzon` (`id`, `estado`, `fecha_solicitud`, `motivo_de_eliminacion`, `tipo_solicitud`, `producto`, `categoria`, `cantidad`, `codigo_solicitud`, `detalle_solicitud`, `solicitud_modificada`, `usuario_solicitante`, `fecha_registro`, `producto_id`) VALUES
(4, 'PENDIENTE', '2025-06-03 15:32:34.000000', 'NINGUNO', 'REGISTRAR', 'a', 'a', 1, 'SOL-20250603-3642', 'aaa', b'0', 'admin', NULL, NULL),
(5, 'PENDIENTE', '2025-06-03 15:44:58.000000', 'NINGUNO', 'REGISTRAR', 'b', 'b', 1, 'SOL-20250603-3935', 'bbb', b'0', 'admin', NULL, NULL),
(6, 'PENDIENTE', '2025-06-03 17:54:09.000000', 'NINGUNO', 'REGISTRAR', 'c', 'c', 1, 'SOL-20250603-5654', 'ccc', b'0', 'admin', NULL, NULL);

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
(4, 'Producto C', 'Categoría 4', '2025-06-03 01:43:00', 'COD-003', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud_registro`
--

CREATE TABLE `solicitud_registro` (
  `id` int(11) NOT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT current_timestamp(),
  `usuario_solicitante` varchar(100) NOT NULL,
  `codigo_solicitud` varchar(50) NOT NULL,
  `producto` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `detalle_solicitud` text DEFAULT NULL,
  `solicitud_modificada` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `solicitud_registro`
--
ALTER TABLE `solicitud_registro`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_solicitud` (`codigo_solicitud`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `solicitud_registro`
--
ALTER TABLE `solicitud_registro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
