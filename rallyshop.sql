-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 03-06-2025 a las 16:34:40
-- Versión del servidor: 8.0.27
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rallyshop`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

DROP TABLE IF EXISTS `carritos`;
CREATE TABLE IF NOT EXISTS `carritos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `coche_id` bigint DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKoyjavfjww0b8n6ahu1ohiqya3` (`coche_id`),
  KEY `FK1oqtem41uj4podo8a2lbsyyhm` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coches`
--

DROP TABLE IF EXISTS `coches`;
CREATE TABLE IF NOT EXISTS `coches` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `precio` double NOT NULL,
  `stock` int NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `anio` int NOT NULL,
  `km` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `coches`
--

INSERT INTO `coches` (`id`, `marca`, `modelo`, `precio`, `stock`, `descripcion`, `imagen`, `anio`, `km`) VALUES
(15, 'Ford', 'Escort RS Cosworth', 125000, 0, 'Ícono del Grupo A. Tracción total, turbo de 227 CV, y alerón legendario. Un coche de culto para rally.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748787489/yilttqwwizjs7tv0lxj4.jpg', 1995, 32000),
(16, 'Peugeot', '205 T16', 230000, 0, 'Monstruo del Grupo B. 350 CV, motor central y tracción total. Uno de los coches más radicales jamás construidos.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748787554/affbhqdh62r4id6riyqc.jpg', 1985, 21000),
(17, 'Audi', 'Quattro S1 E2', 285000, 1, 'Grupo B definitivo. Más de 500 CV, diseño brutal y sonido inolvidable. Dominador absoluto de su era.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748787609/vd5xxndjscc0pazfewnn.jpg', 1986, 18000),
(18, 'Citroën', 'C4 WRC Loeb', 145000, 1, 'Piloteado por Sébastien Loeb, 9 veces campeón. Potente, preciso y campeón del mundo en múltiples temporadas.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748787667/ten4hguzzdm7pzci9dug.jpg', 2010, 29000),
(19, 'Subaru', 'Impreza WRC Solberg', 138000, 1, 'Petter Solberg, campeón mundial 2003. Motor bóxer turbo y ADN de rally. Colores míticos de Subaru.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748787859/y0ncvtpobif0ikyjudif.jpg', 2003, 29000),
(20, 'Lancia', 'Delta S4', 350000, 1, 'Tecnología híbrida turbo + compresor. Grupo B llevado al extremo. Uno de los más deseados del mundo.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748787917/bqis9gzqmummufbnsl6n.jpg', 1986, 17000),
(21, 'MG', 'Metro 6R4', 115000, 1, 'Motor V6 atmosférico, tracción total. Compacto pero brutal. Sorpresa británica del Grupo B.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748787973/nl3lqoufjycdt6xe3pxm.jpg', 1985, 34000),
(22, 'Toyota', 'Yaris WRC', 250000, 2, 'Campeón mundial reciente. Motor 1.6 turbo, más de 380 CV y aerodinámica extrema. Tecnología de fábrica.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748788017/akcfntvytqwionaqtrjp.jpg', 2022, 9000),
(23, 'Skoda', 'Fabia R5 Evo', 195000, 3, 'Dominador absoluto del WRC2. Ágil, preciso y fiable. Elección top para equipos privados.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748788062/pd8dwenjzr4md9rdhbwp.jpg', 2021, 16000),
(24, 'Hyundai', 'i20 Rally1', 380000, 1, 'WRC híbrido de última generación. Más de 500 CV combinados. El futuro del rally ya está aquí.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748788109/s8n5hscvmdcc8chbcklm.jpg', 2023, 4000),
(25, 'Citroën', 'DS3 R5', 110000, 2, 'Compacto, rápido y competitivo. Uno de los R5 más equilibrados en asfalto y tierra.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748788166/t0i4fc6uexkbtib6dy3r.jpg', 2017, 41000),
(27, 'Mitsubishi', 'Lancer Evo VI', 89000, 2, 'Uno de los Evo más queridos. 280 CV, tracción 4WD y espíritu de rally puro. Tommi Mäkinen lo convirtió en leyenda.', 'https://res.cloudinary.com/dlvjdzl4q/image/upload/v1748789242/eea71s1fuoi1heslscz4.jpg', 1999, 69000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
CREATE TABLE IF NOT EXISTS `favoritos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `coche_id` bigint DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4lhowknomkmgm75ets9e9bjix` (`coche_id`),
  KEY `FKq9wif2hcqfxj8t49wo613wm0h` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id`, `coche_id`, `usuario_id`) VALUES
(34, 15, 5),
(35, 16, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_deseos`
--

DROP TABLE IF EXISTS `lista_deseos`;
CREATE TABLE IF NOT EXISTS `lista_deseos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `coche_id` bigint DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc6v0yop4rt099cb6lwfey79f2` (`coche_id`),
  KEY `FK6igq1u9ajlcwila40fgv7h7ur` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `total` double NOT NULL,
  `usuario_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5g0es69v35nmkmpi8uewbphs2` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_detalles`
--

DROP TABLE IF EXISTS `pedido_detalles`;
CREATE TABLE IF NOT EXISTS `pedido_detalles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `precio_unitario` double NOT NULL,
  `coche_id` bigint DEFAULT NULL,
  `pedido_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5u5imuqo3u6b2713kyq162l32` (`coche_id`),
  KEY `FKnnxrhaa3hfk0jlpn5fb849flt` (`pedido_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `contrasena` varchar(255) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `rol` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKcdmw5hxlfj78uf4997i3qyyw5` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `contrasena`, `correo`, `nombre`, `rol`) VALUES
(4, '$2a$10$9.z8U6aiDirIK9o.62WDIe4TkMGJUcBHWSHOrRNe6dLiFrBSQ91H2', 'miguel@gmail.com', 'miguel', 'user'),
(5, '$2a$10$USNL1s7HXRSaqrj9qQ9Bou0aKTek/Qd2cH7FGmyydcA/0uBkHq4e.', '8pabloes@gmail.com', 'pablo', 'admin'),
(6, '$2a$10$mGrGdxvE8KSOHsn8AXB1sO2ZEQOUwzz7QY8fBVEV/rOESM6qKcsJO', 'daniela@gmail.com', 'daniela', 'user'),
(7, '$2a$10$3a61F9S6rPc2pFWd2VLScuPht28hshCXSQ8utU/J5M8TsvAtQOjhK', 'riverocriadopablo@gmail.com', 'Elena', 'user'),
(9, '$2a$10$85TkqKEyWFmxaUHsDLxKXu1nPhQ4mpyLXv.aT62sr3vz4Wl.rUToq', 'profesores@gmail.com', 'Profesores', 'admin');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD CONSTRAINT `FK1oqtem41uj4podo8a2lbsyyhm` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `FKoyjavfjww0b8n6ahu1ohiqya3` FOREIGN KEY (`coche_id`) REFERENCES `coches` (`id`);

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `FK4lhowknomkmgm75ets9e9bjix` FOREIGN KEY (`coche_id`) REFERENCES `coches` (`id`),
  ADD CONSTRAINT `FKq9wif2hcqfxj8t49wo613wm0h` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `lista_deseos`
--
ALTER TABLE `lista_deseos`
  ADD CONSTRAINT `FK6igq1u9ajlcwila40fgv7h7ur` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `FKc6v0yop4rt099cb6lwfey79f2` FOREIGN KEY (`coche_id`) REFERENCES `coches` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `FK5g0es69v35nmkmpi8uewbphs2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `pedido_detalles`
--
ALTER TABLE `pedido_detalles`
  ADD CONSTRAINT `FK5u5imuqo3u6b2713kyq162l32` FOREIGN KEY (`coche_id`) REFERENCES `coches` (`id`),
  ADD CONSTRAINT `FKnnxrhaa3hfk0jlpn5fb849flt` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
