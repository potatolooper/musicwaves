-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-12-2021 a las 03:07:20
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `musicwaves`
--
CREATE DATABASE IF NOT EXISTS `musicwaves` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `musicwaves`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `Id` int(11) UNSIGNED NOT NULL,
  `Message_user` varchar(100) NOT NULL,
  `Menssage` varchar(250) NOT NULL COMMENT 'Contenido del mensaje',
  `Positive` int(20) NOT NULL DEFAULT 0 COMMENT 'Puntos positivos',
  `Negative` int(20) NOT NULL DEFAULT 0 COMMENT 'Puntos Negativos',
  `Id_Song` varchar(100) NOT NULL,
  `Id_Menssages` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `message`
--

INSERT INTO `message` (`Id`, `Message_user`, `Menssage`, `Positive`, `Negative`, `Id_Song`, `Id_Menssages`) VALUES
(1, 'potatolooper', 'Esta Bastante diveritida', 2, 1, '4ObxJP7kYUkBqpiklCzrBo', NULL),
(6, 'potatolooper', 'La verdad es que no esta tan buena como la recordaba', 0, 1, '4ObxJP7kYUkBqpiklCzrBo', NULL),
(8, 'Proyecto', 'Me encanta para poner en el coche', 2, 1, '2uzyiRdvfNI5WxUiItv1y9', NULL),
(9, '', 'Creo que no estas en lo cierto, al menos como opino yo', 0, 0, '4ObxJP7kYUkBqpiklCzrBo', 1),
(10, 'Proyecto', 'Me gsuta el solo de guitarra', 0, 0, '2uzyiRdvfNI5WxUiItv1y9', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profiles`
--

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `User` varchar(100) NOT NULL,
  `Password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profiles`
--

INSERT INTO `profiles` (`id`, `Email`, `User`, `Password`) VALUES
(1, 'potatolooper@gmail.com', 'potatolooper', '$2a$08$9PynjjIQxBha2zBR8Mzy1OldVVLPntLISUr3u5ugDIv8q1jFtS3Ri'),
(2, 'diegofamil@gmail.com', 'diegofamil', '$2a$08$uT/hN7z8o7ZhsMqhB2Q/zOA4VTca2hqQ618XlouwRig0SNlkmdwQS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `songs`
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `Code_Song` varchar(100) NOT NULL COMMENT 'Id de la cancion'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `songs`
--

INSERT INTO `songs` (`Code_Song`) VALUES
('01ICFoBoco3TaM5r3HthXy'),
('02dphTJYUQ9pmdNC52iyOz'),
('0bVtevEgtDIeRjCJbK3Lmv'),
('0fYE2mmsuNUaFDi8mab99Q'),
('0lA1c6MmTzpNsRMxq6SvTV'),
('0wzABO1igQsSy8cQ7dIeHK'),
('10qlTaZXfdAkUfsp5dcpcd'),
('1fZvEmAmWtsDSUjAgDhddU'),
('1iW2ktyrQHNKZwFTvgP0Ta'),
('1jDJFeK9x3OZboIAHsY9k2'),
('1wXuogT7bvqnhuWzDBNOdV'),
('2d4e45fmUnguxh6yqC7gNT'),
('2lLrKDoQFyMcdQUdXwTWdc'),
('2pcwmk8c1pTYwX0COSVX52'),
('2pxAohyJptQWTQ5ZRWYijN'),
('2qqPOFjYjwGuJhCj3tnIkx'),
('2uzyiRdvfNI5WxUiItv1y9'),
('3AfbPmMRZdGUPYedeCBjvz'),
('3c7hwSOFfMa5MtYNzBLdQw'),
('3cwDSDzTiWr5H5xMQhQ6Mx'),
('3HFqO1Khvk1pdmhjz3tXsk'),
('3N6tMHqZXnNQAYHoYmclqq'),
('3s6xDWJVpWYLVNkC3SOrF0'),
('45W8En2qul3ljQKzIbsyT4'),
('46QazXxQS0B31CnbRCy8CV'),
('4COR2ZPEyUn0lsbAouRWxA'),
('4ECOvnBBOpMok5H9fiyS96'),
('4fV8fZLi28Hk02euDxYbMQ'),
('4ObxJP7kYUkBqpiklCzrBo'),
('4rDbp1vnvEhieiccprPMdI'),
('4uU6act5NMMofc5vdfuhZS'),
('4wYq5wugZDzQiMZQYG4wVB'),
('4yWfEHt0oBNObi2RpLLfhA'),
('5arVt2Wg0zbiWwAOZef2Nl'),
('5I1qo8eE4UmF0O2CcptoZh'),
('5sICkBXVmaCQk5aISGR3x1'),
('5soMJpcVhSrGrB4prvPL6P'),
('5tU9JM1v72X7oM808Am6Fq'),
('5u8JQ4bEIV7vJt5ngcIVXv'),
('5YnNWHKCJaJKwbagXDb5Uf'),
('63OFKbMaZSDZ4wtesuuq6f'),
('661taqJg9eRwIFPn6c67OO'),
('6fj4Ag9M4r27Lvs1qMwpwz'),
('6FUwPb4mGlUDbx42uspXaZ'),
('6goUTcMn0V30hWtKFIj6Kh'),
('6nnacTL5on2aVsRhVDNUSo'),
('6UB9mShVLbMm0W4e6vud4C'),
('6yKkDXi8qHIX5esyhOGEjX'),
('753KutoAy00apPsplMRetG'),
('7AYSl3u70hJ402o0u0gry5'),
('7bDIxtZAb4T4628gPgKojf'),
('7GonnnalI2s19OCQO1J7Tf'),
('7LRMbd3LEoV5wZJvXT1Lwb'),
('7ouMYWpwJ422jRcDASZB7P'),
('7quEtyE9uF5pSkgQtHQDlp'),
('7uSsHbBFFAnkRQR1rDwP3L'),
('7wzA2KgMuSIFXajk8lRoNd'),
('7zjzu90Q4mtNNaE9Ol9Zbv');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_Id_Menssage` (`Id_Menssages`),
  ADD KEY `FK_Id_Song` (`Id_Song`);

--
-- Indices de la tabla `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User` (`User`);

--
-- Indices de la tabla `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`Code_Song`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `message`
--
ALTER TABLE `message`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `menssagge_ibfk_1` FOREIGN KEY (`Id_Menssages`) REFERENCES `message` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `menssagge_ibfk_2` FOREIGN KEY (`Id_Song`) REFERENCES `songs` (`Code_Song`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
