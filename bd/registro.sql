-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2025 a las 04:01:27
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
(24, 'Nestor Johan Carrasco Arcos', 'admin', '123', 'nestorcarrasco2004@hotmail.com', '2025-06-14 02:00:35');

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT de la tabla `buzonactualizar`
--
ALTER TABLE `buzonactualizar`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `buzoneliminar`
--
ALTER TABLE `buzoneliminar`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
