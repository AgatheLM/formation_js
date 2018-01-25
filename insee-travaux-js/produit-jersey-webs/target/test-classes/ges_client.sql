-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  sam. 20 jan. 2018 à 20:02
-- Version du serveur :  5.7.19
-- Version de PHP :  7.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `ges_client`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `ID_CLIENT` int(11) NOT NULL AUTO_INCREMENT,
  `NUM_CLIENT` varchar(45) NOT NULL COMMENT 'Numéro metier identifiant le client',
  `NOM` varchar(45) NOT NULL,
  `PRENOM` varchar(45) DEFAULT NULL,
  `SEXE` int(11) NOT NULL,
  `ADRESSE` varchar(45) DEFAULT NULL,
  `CODE_POSTAL` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`ID_CLIENT`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`ID_CLIENT`, `NUM_CLIENT`, `NOM`, `PRENOM`, `SEXE`, `ADRESSE`, `CODE_POSTAL`) VALUES
(1, '1254C', 'ZOME', 'Christophe', 1, '22 Rue Marechal Le FOCH', '35700'),
(2, '56983J', 'LECLERC', 'Edouard', 1, '45 Rue François PIGNON', '75012'),
(3, '58967O', 'MAZURAIS', 'Ludivine', 2, '15 Rue Marechal Le Foch', '35640'),
(6, '56789U', 'SARKOZY', 'Nicolas', 1, '34 Avenue Martin Luther King', '95360'),
(7, '56776K', 'TARTAMPION', 'Yves Maieul', 1, '56 Boulevard Jean Luc', '44230'),
(8, '26789N', 'LOINSARD', 'Olivia', 2, '89 Rue Jean Jaurès', '56100'),
(9, '10789Q', 'LETERTRE', 'Yannick', 1, '56 Place de Corps-Nuds', '35600'),
(10, '90787G', 'QUEGUINER', 'Charles', 1, '32 Rue COMPOSTEL', '75020'),
(11, '12089V', 'PLACIDE', 'Fresnais', 1, '23 Rue LEGRAND MARCHAL', '72001'),
(12, '12299A', 'SHEMATSI', 'Johnny', 1, '45 RUE DU LOYAL', '72010'),
(13, '12089V', 'NEVO', 'Stéphane', 1, '33 RUE DU CLERC', '44000'),
(14, '12285D', 'CHEVAL', 'Martine', 2, '67 Rue du vin', '33063'),
(15, '300890G', 'ELBAZ', 'Michelle', 2, '167 Rue Vercingétorix', '75016'),
(19, '098HJH', 'EDOUARD', 'Philippe', 1, '24 rue de matignon', '75014'),
(20, '0987Y', 'LEBARA', 'Michel', 1, '25 rue Jean', '36000'),
(21, '1254DIOP', 'DIOP', 'IBRAHIMA', 1, '22 Rue Marechal Le FOCH', '35440');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `ID_COMMANDE` int(11) NOT NULL AUTO_INCREMENT,
  `NUM_COMMANDE` varchar(45) NOT NULL,
  `DATE` datetime NOT NULL,
  `QUANTITE` int(11) DEFAULT NULL,
  `ID_CLIENT` int(11) NOT NULL,
  PRIMARY KEY (`ID_COMMANDE`),
  KEY `fk_COMMANDE_Client_idx` (`ID_CLIENT`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`ID_COMMANDE`, `NUM_COMMANDE`, `DATE`, `QUANTITE`, `ID_CLIENT`) VALUES
(1, 'CMD_01', '2015-11-10 15:00:00', 10, 1),
(2, 'CMD_02', '2015-12-09 10:00:00', 30, 1),
(3, 'CMD_03', '2016-01-09 09:00:00', 40, 2),
(4, 'CMD_04', '2016-02-15 14:30:00', 30, 2),
(5, 'CMD_05', '2016-06-17 17:30:00', 5, 10);

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `ID_PRODUIT` int(11) NOT NULL AUTO_INCREMENT,
  `REF_PRODUIT` varchar(45) DEFAULT NULL,
  `MARQUE` varchar(45) DEFAULT NULL,
  `GAMME` varchar(45) DEFAULT NULL,
  `LIBELLE` varchar(45) DEFAULT NULL,
  `PRIX_UNITAIRE` double DEFAULT NULL,
  `ID_COMMANDE` int(11) NOT NULL,
  PRIMARY KEY (`ID_PRODUIT`),
  KEY `fk_PRODUIT_COMMANDE1_idx` (`ID_COMMANDE`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`ID_PRODUIT`, `REF_PRODUIT`, `MARQUE`, `GAMME`, `LIBELLE`, `PRIX_UNITAIRE`, `ID_COMMANDE`) VALUES
(2, 'REF_PRD01', 'RENAULT', 'LAGUNA', 'RENAULT LAGUNA COUPE', 7000, 1),
(3, 'REF_PRD02', 'RENAULT', 'MEGANE', 'RENAULT MEGANE I', 8900, 1),
(4, 'REF_PRD03', 'BMW', 'Serie 1', 'BMW Serie 1 Berline', 15000, 2),
(5, 'REF_PRD04', 'FORD', 'FIESTA', 'FORD FIESTA Break', 12000, 2),
(6, 'REF_PRD05', 'FORD', 'CMAX', 'FORD CMAX MONOSPACE', 18000, 3),
(7, 'REF_PRD06', 'NISSAN', 'QASHQAI', 'NISSAN QASHQAI ACENTA', 12500, 4),
(8, 'REF_PRD07', 'NISSAN', 'EVALIA', 'NISSAN EVALIA BERLINE', 23000, 4),
(9, 'REF_PRD07', 'NISSAN', 'JUKE', 'NISSAN JUKE CROSSOVER', 30000, 5),
(10, 'REF_PRD08', 'PEUGEOT', '108', 'PEUGEOT 108 CITADINE', 22000, 5),
(11, 'REF_PRD09', 'PEUGEOT', '2008', 'PEUGEOT 2008 CROSSOVER', 32000, 5);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `fk_COMMANDE_Client` FOREIGN KEY (`ID_CLIENT`) REFERENCES `client` (`ID_CLIENT`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `fk_PRODUIT_COMMANDE1` FOREIGN KEY (`ID_COMMANDE`) REFERENCES `commande` (`ID_COMMANDE`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
