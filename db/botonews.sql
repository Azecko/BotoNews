-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jan 31, 2022 at 01:31 PM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `botonews`
--

CREATE DATABASE IF NOT EXISTS botonews;

-- Utilisation de cette base de donnée

USE botonews; 


DROP TABLE IF EXISTS `t_providers`;
DROP TABLE IF EXISTS `t_sources`;
DROP TABLE IF EXISTS `t_subscriptions`;
DROP TABLE IF EXISTS `t_subscription_sources`;
DROP TABLE IF EXISTS `t_supports`;
DROP TABLE IF EXISTS `t_users`;
-- --------------------------------------------------------

--
-- Table structure for table `t_providers`
--

CREATE TABLE `t_providers` (
  `provider` int NOT NULL,
  `user` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `id_of_provider` varchar(100) DEFAULT NULL,
  `username_of_provider` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_sources`
--

CREATE TABLE `t_sources` (
  `source` int NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `t_sources`
--

INSERT INTO `t_sources` (`source`, `title`, `description`, `picture`) VALUES
(1, 'Go', 'Latest links from go.epfl.ch', ''),
(2, 'Actu', 'Latest news from actu.epfl.ch', ''),
(3, 'HackerNews', 'Latest news from news.ycombinator.com', ''),
(4, 'NewYorkTimes', 'Latest articles from https://www.nytimes.com/', ''),
(5, 'MotivationalQuotes', 'Some motival quotes from https://zenquotes.io/', ''),
(6, 'Unsplash', 'Some random image from unsplash.com', ''),
(7, 'WallStreetJournal', 'Latest news from https://www.wsj.com/', '');

-- --------------------------------------------------------

--
-- Table structure for table `t_subscriptions`
--

CREATE TABLE `t_subscriptions` (
  `subscription` int NOT NULL,
  `user` int NOT NULL,
  `support` int NOT NULL,
  `modalities` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_subscription_sources`
--

CREATE TABLE `t_subscription_sources` (
  `subscription` int NOT NULL,
  `source` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_supports`
--

CREATE TABLE `t_supports` (
  `support` int NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `is_unique` tinyint(1) DEFAULT 0,
  `modalities` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `t_supports`
--

INSERT INTO `t_supports` (`support`, `title`, `description`, `picture`, `is_unique`, `modalities`) VALUES
(1, 'Telegram', 'Receive news on Telegram', '', 0, 'days,time,recipient'),
(2, 'Discord', 'Receive news on Discord', '', 0, 'days,time,recipient'),
(3, 'Mail', 'Receive news by email', '', 0, 'days,time,recipient'),
(4, 'SplashPage', 'News on the botonews splash page', '', 1, 'number,random');

-- --------------------------------------------------------

--
-- Table structure for table `t_users`
--

CREATE TABLE `t_users` (
  `user` int NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `t_users`
--

INSERT INTO `t_users` (`user`, `username`, `email`) VALUES
(1, 'ponsfrilus', 'ponsfrilus@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_providers`
--
ALTER TABLE `t_providers`
  ADD PRIMARY KEY (`provider`,`user`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `t_sources`
--
ALTER TABLE `t_sources`
  ADD PRIMARY KEY (`source`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `t_subscriptions`
--
ALTER TABLE `t_subscriptions`
  ADD PRIMARY KEY (`subscription`,`user`,`support`),
  ADD KEY `support` (`support`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `t_subscription_sources`
--
ALTER TABLE `t_subscription_sources`
  ADD PRIMARY KEY (`subscription`,`source`),
  ADD KEY `source` (`source`);

--
-- Indexes for table `t_supports`
--
ALTER TABLE `t_supports`
  ADD PRIMARY KEY (`support`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_providers`
--
ALTER TABLE `t_providers`
  MODIFY `provider` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_sources`
--
ALTER TABLE `t_sources`
  MODIFY `source` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `t_supports`
--
ALTER TABLE `t_supports`
  MODIFY `support` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `t_subscriptions`
--
ALTER TABLE `t_subscriptions`
  MODIFY `subscription` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `t_providers`
--
ALTER TABLE `t_providers`
  ADD CONSTRAINT `t_providers_ibfk_1` FOREIGN KEY (`user`) REFERENCES `t_users` (`user`);

--
-- Constraints for table `t_subscriptions`
--
ALTER TABLE `t_subscriptions`
  ADD CONSTRAINT `t_subscriptions_ibfk_2` FOREIGN KEY (`support`) REFERENCES `t_supports` (`support`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `t_subscriptions_ibfk_3` FOREIGN KEY (`user`) REFERENCES `t_users` (`user`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `t_subscription_sources`
--
ALTER TABLE `t_subscription_sources`
  ADD CONSTRAINT `t_subscription_sources_ibfk_1` FOREIGN KEY (`source`) REFERENCES `t_sources` (`source`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `t_subscription_sources_ibfk_2` FOREIGN KEY (`subscription`) REFERENCES `t_subscriptions` (`subscription`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
