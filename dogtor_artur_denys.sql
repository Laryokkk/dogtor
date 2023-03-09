-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:8889
-- Время создания: Мар 09 2023 г., 09:10
-- Версия сервера: 5.7.34
-- Версия PHP: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `dogtor_artur_denys`
--

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_animal_data` (IN `permissionId` INT)  BEGIN
  SELECT * FROM animal
WHERE `idx` = permissionId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_describtion_data` (IN `permissionId` INT)  BEGIN
  SELECT * FROM visit_event
WHERE `idx` =permissionId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_doctor_names` ()  BEGIN
    SELECT u.id, u.name, ud.idx_user, ud.idx
    FROM users u
    JOIN user_doctor ud ON u.id = ud.idx_user;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_person_data` (IN `permissionId` INT)  BEGIN
  SELECT * FROM person
WHERE `idx` =permissionId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_prenotation` (IN `permissionId` INT)  BEGIN
    SELECT prenotation_event.time_start_prenotation, prenotation_event.time_end_prenotation, users.name
    FROM prenotation_event 
    INNER JOIN users ON prenotation_event.idx_doctor = users.id
    WHERE prenotation_event.idx = permissionId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_prenotations_by_permition` (IN `permission_id` INT)  BEGIN
    SELECT * FROM `prenotation_event` WHERE `idx_permitions` = permission_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_prenotation_by_google_id` (IN `google_id` VARCHAR(150))  BEGIN
    SELECT p.idx, d.name, p.time_start_prenotation, p.time_end_prenotation
    FROM prenotation_event p
    JOIN users u ON u.id = p.idx_user
    JOIN users d ON d.id = p.idx_doctor
    WHERE u.google_id = google_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_prenotation_data` (IN `idPermission` INT)  SELECT animal.name_animal,animal.birthday_animal ,animal.birthday_place_animal, animal.residenze_place_animal , animal.chip_animal, animal.idx_type_animal, person.name_person,person.lastname_person,person.codice_fiscale_person,person.tel_person,person.tel_2_person,person.email_person ,visit_event.description_visit,visit_event.diagnosis_visit,visit_event.note_visit,visit_event.price_visit, visit_event.idx_symptoms_visit FROM `visit_event` INNER JOIN animal ON visit_event.idx_animal = animal.idx INNER JOIN person ON visit_event.idx_person = person.idx WHERE visit_event.idx_prenotaion_event=idPermission$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_statistics` ()  BEGIN
  DECLARE visits_count INT;
  DECLARE total_money_owned DECIMAL(10,2);
  
  -- count visits
  SELECT COUNT(*) INTO visits_count FROM prenotation_event;
  
  -- sum money owed
  SELECT SUM(p.idx_permitions) INTO total_money_owned FROM prenotation_event p;
  
  -- calculate percentage of symptoms
  SELECT COUNT(*) / visits_count * 100 AS percentual_of_symptoms
  FROM prenotation_event p
  JOIN symptoms s ON p.idx = s.idx;
  
  -- calculate percentage of type animals
  SELECT COUNT(*) / visits_count * 100 AS percentual_of_type_animals
  FROM prenotation_event p
  JOIN animal a ON p.idx = a.idx;
  
  -- print the results
  SELECT visits_count, total_money_owned, percentual_of_symptoms, percentual_of_type_animals;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_symptoms` ()  BEGIN
  SELECT * FROM symptoms;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_type_animals` ()  BEGIN
  SELECT type FROM type_animal;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_admin` (IN `google_id` VARCHAR(150))  BEGIN
  SELECT ua.*
  FROM user_admin ua
  JOIN users u ON u.id = ua.idx_user
  WHERE u.google_id = google_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_doctor` (IN `google_id` VARCHAR(150))  BEGIN
  SELECT ua.*
  FROM user_doctor ua
  JOIN users u ON u.id = ua.idx_user
  WHERE u.google_id = google_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_idx` (IN `idPermission` INT(150))  BEGIN
SELECT idx_user
FROM prenotation_event
WHERE idx = idPermission;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_animal` (IN `animal_name` TEXT, IN `animal_birthday` DATETIME, IN `animal_birthday_place` TEXT, IN `animal_residenze_place` TEXT, IN `animal_chip` TEXT, IN `animal_type_idx` INT)  BEGIN
    INSERT INTO `animal` (
        `name_animal`,
        `birthday_animal`,
        `birthday_place_animal`,
        `residenze_place_animal`,
        `chip_animal`,
        `idx_type_animal`
    )
    VALUES (
        animal_name,
        animal_birthday,
        animal_birthday_place,
        animal_residenze_place,
        animal_chip,
        animal_type_idx
    );
SELECT LAST_INSERT_ID() as new_animal_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_person` (IN `person_name` TEXT, IN `person_lastname` TEXT, IN `person_codice_fiscale` TEXT, IN `person_tel` TEXT, IN `person_tel_2` TEXT, IN `person_email` TEXT)  BEGIN
INSERT INTO person (
name_person,
lastname_person,
codice_fiscale_person,
tel_person,
tel_2_person,
email_person
)
VALUES (
person_name,
person_lastname,
person_codice_fiscale,
person_tel,
person_tel_2,
person_email
);
SELECT LAST_INSERT_ID() as new_person_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_prenotation` (IN `in_doctor` INT, IN `in_user` INT, IN `in_permitions` INT, IN `in_status` INT, IN `in_start_time` DATETIME, IN `in_end_time` DATETIME)  BEGIN
  DECLARE day_of_week INT;
  DECLARE start_hour INT;
  DECLARE end_hour INT;

  SET day_of_week = DAYOFWEEK(in_start_time);
  SET start_hour = HOUR(in_start_time);
  SET end_hour = HOUR(in_end_time);

  IF day_of_week >= 2 AND day_of_week <= 6 AND start_hour >= 7 AND end_hour <= 16 THEN
    INSERT INTO prenotation_event(idx_doctor, idx_user, idx_permitions, idx_status, time_start_prenotation, time_end_prenotation)
    VALUES (in_doctor, in_user, in_permitions, in_status, in_start_time, in_end_time);
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_visit_event` (IN `p_idx_prenotaion_event` INT, IN `p_idx_animal` INT, IN `p_idx_person` INT, IN `p_idx_symptoms_visit` INT, IN `p_description_visit` TEXT, IN `p_diagnosis_visit` TEXT, IN `p_note_visit` TEXT, IN `p_price_visit` TEXT)  BEGIN
    INSERT INTO visit_event (
        idx_prenotaion_event,
        idx_animal,
        idx_person,
        idx_symptoms_visit,
        description_visit,
        diagnosis_visit,
        note_visit,
        price_visit
    )
    VALUES (
        p_idx_prenotaion_event,
        p_idx_animal,
        p_idx_person,
        p_idx_symptoms_visit,
        p_description_visit,
        p_diagnosis_visit,
        p_note_visit,
        p_price_visit
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_animal_by_idx` (IN `animal_idx` INT)  BEGIN
    SELECT * FROM `animal` WHERE `idx` = animal_idx;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_person` (IN `person_idx` INT)  BEGIN
SELECT * FROM person WHERE idx = person_idx;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_person_by_idx` (IN `p_idx` INT)  BEGIN
    SELECT *
    FROM person
    WHERE idx = p_idx;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_prenotation` ()  BEGIN
    SELECT * FROM prenotation_event;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_visit_events` ()  BEGIN
    SELECT * FROM visit_event;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_animal_by_idx` (IN `animal_idx` INT, IN `animal_name` TEXT, IN `animal_birthday` DATETIME, IN `animal_birthday_place` TEXT, IN `animal_residenze_place` TEXT, IN `animal_chip` TEXT, IN `animal_type_idx` INT)  BEGIN
    UPDATE `animal` SET
        `name_animal` = animal_name,
        `birthday_animal` = animal_birthday,
        `birthday_place_animal` = animal_birthday_place,
        `residenze_place_animal` = animal_residenze_place,
        `chip_animal` = animal_chip,
        `idx_type_animal` = animal_type_idx
    WHERE `idx` = animal_idx;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_person_by_idx` (IN `person_idx` INT, IN `person_name` TEXT, IN `person_lastname` TEXT, IN `person_codice_fiscale` TEXT, IN `person_tel` TEXT, IN `person_tel_2` TEXT, IN `person_email` TEXT)  BEGIN
    UPDATE `person` SET
        `name_person` = person_name,
        `lastname_person` = person_lastname,
        `codice_fiscale_person` = person_codice_fiscale,
        `tel_person` = person_tel,
        `tel_2_person` = person_tel_2,
        `email_person` = person_email
    WHERE `idx` = person_idx;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_prenotation_event_user_id` (IN `idx` INT, IN `googleId` VARCHAR(255))  BEGIN
UPDATE prenotation_event
SET prenotation_event.idx_user=(SELECT id FROM users WHERE google_id=googleId)
WHERE prenotation_event.idx=idx;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_status_prenotation_event` (IN `p_idx` INT, IN `p_status` INT)  BEGIN
  UPDATE prenotation_event SET idx_status = p_status WHERE idx = p_idx;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_visit_event` (IN `idPermision` INT, IN `newDiagnosis` TEXT, IN `newNote` TEXT, IN `newPrice` TEXT)  UPDATE `visit_event`
SET 
  `diagnosis_visit` = newDiagnosis,
  `note_visit` = newNote,
  `price_visit` = newPrice
WHERE `idx_prenotaion_event`= idPermision$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `animal`
--

CREATE TABLE `animal` (
  `idx` int(11) NOT NULL,
  `name_animal` text NOT NULL,
  `birthday_animal` datetime NOT NULL,
  `birthday_place_animal` text NOT NULL,
  `residenze_place_animal` text NOT NULL,
  `chip_animal` text,
  `idx_type_animal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `animal`
--

INSERT INTO `animal` (`idx`, `name_animal`, `birthday_animal`, `birthday_place_animal`, `residenze_place_animal`, `chip_animal`, `idx_type_animal`) VALUES
(1, 'Sobaka', '2023-02-02 00:00:00', 'Moscow', 'Moscow', '123321123321321', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `person`
--

CREATE TABLE `person` (
  `idx` int(11) NOT NULL,
  `name_person` text NOT NULL,
  `lastname_person` text NOT NULL,
  `codice_fiscale_person` text NOT NULL,
  `tel_person` text NOT NULL,
  `tel_2_person` text,
  `email_person` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `person`
--

INSERT INTO `person` (`idx`, `name_person`, `lastname_person`, `codice_fiscale_person`, `tel_person`, `tel_2_person`, `email_person`) VALUES
(1, 'Artur', 'Smirnov', 'asdasd332', '1231231231', '', 'asdsd@gmail.com');

-- --------------------------------------------------------

--
-- Структура таблицы `prenotation_event`
--

CREATE TABLE `prenotation_event` (
  `idx` int(11) NOT NULL,
  `idx_doctor` int(11) NOT NULL,
  `idx_user` int(11) DEFAULT NULL,
  `idx_permitions` int(11) NOT NULL,
  `idx_status` int(11) NOT NULL,
  `time_start_prenotation` datetime NOT NULL,
  `time_end_prenotation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `prenotation_event`
--

INSERT INTO `prenotation_event` (`idx`, `idx_doctor`, `idx_user`, `idx_permitions`, `idx_status`, `time_start_prenotation`, `time_end_prenotation`) VALUES
(1, 5, NULL, 3, 1, '2023-03-10 08:00:00', '2023-03-10 11:00:00'),
(2, 4, 5, 3, 2, '2023-03-15 11:00:00', '2023-03-15 13:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `prenotation_status`
--

CREATE TABLE `prenotation_status` (
  `idx` int(11) NOT NULL,
  `state` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `prenotation_status`
--

INSERT INTO `prenotation_status` (`idx`, `state`) VALUES
(1, 'open'),
(2, 'close'),
(3, 'booked'),
(4, 'pending'),
(5, 'unavailable');

-- --------------------------------------------------------

--
-- Структура таблицы `symptoms`
--

CREATE TABLE `symptoms` (
  `idx` int(11) NOT NULL,
  `symptom` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `symptoms`
--

INSERT INTO `symptoms` (`idx`, `symptom`) VALUES
(1, 'Cancer'),
(2, 'Non sa fare \'Use Case\''),
(3, 'Non sa fare integrali');

-- --------------------------------------------------------

--
-- Структура таблицы `sys_permitions`
--

CREATE TABLE `sys_permitions` (
  `idx` int(11) NOT NULL,
  `permition` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sys_permitions`
--

INSERT INTO `sys_permitions` (`idx`, `permition`) VALUES
(1, 'doctor'),
(2, 'admin'),
(3, 'user');

-- --------------------------------------------------------

--
-- Структура таблицы `type_animal`
--

CREATE TABLE `type_animal` (
  `idx` int(11) NOT NULL,
  `type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `type_animal`
--

INSERT INTO `type_animal` (`idx`, `type`) VALUES
(1, 'Cane'),
(2, 'Porco'),
(3, 'Cat'),
(4, 'PhpCoder');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `google_id` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `google_id`, `name`, `email`) VALUES
(1, '117775418539283253501', 'Artur Smirnov', 'asu.artur.smirnov@gmail.com'),
(2, '108181142824443223252', 'Arthur Smirnov', 'wlankasper@gmail.com'),
(3, '105333407483013060107', 'DENYS VYSOTSKYY', 'deniska.visotskiy2003@gmail.com'),
(4, '111351439709494441094', 'Denys Vysotskyy', 'vysotskyy.denys@volta.ts.it'),
(5, '104870715437686442696', 'Naturally', 'artikol2003.15@gmail.com');

-- --------------------------------------------------------

--
-- Структура таблицы `user_admin`
--

CREATE TABLE `user_admin` (
  `idx` int(11) NOT NULL,
  `idx_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_admin`
--

INSERT INTO `user_admin` (`idx`, `idx_user`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `user_doctor`
--

CREATE TABLE `user_doctor` (
  `idx` int(11) NOT NULL,
  `idx_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_doctor`
--

INSERT INTO `user_doctor` (`idx`, `idx_user`) VALUES
(4, 2),
(5, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `visit_event`
--

CREATE TABLE `visit_event` (
  `idx` int(11) NOT NULL,
  `idx_prenotaion_event` int(11) NOT NULL,
  `idx_animal` int(11) NOT NULL,
  `idx_person` int(11) NOT NULL,
  `idx_symptoms_visit` int(11) NOT NULL,
  `description_visit` text NOT NULL,
  `diagnosis_visit` text,
  `note_visit` text,
  `price_visit` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `visit_event`
--

INSERT INTO `visit_event` (`idx`, `idx_prenotaion_event`, `idx_animal`, `idx_person`, `idx_symptoms_visit`, `description_visit`, `diagnosis_visit`, `note_visit`, `price_visit`) VALUES
(1, 2, 1, 1, 3, 'LOL', 'PADSJFPOJFDJOPSs', 'fsdklfsdlkfdsjk', '23432');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`idx`),
  ADD KEY `idx_type_animal` (`idx_type_animal`);

--
-- Индексы таблицы `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`idx`);

--
-- Индексы таблицы `prenotation_event`
--
ALTER TABLE `prenotation_event`
  ADD PRIMARY KEY (`idx`),
  ADD KEY `idx_doctor` (`idx_doctor`),
  ADD KEY `idx_user` (`idx_user`),
  ADD KEY `idx_permitions` (`idx_permitions`),
  ADD KEY `idx_status` (`idx_status`);

--
-- Индексы таблицы `prenotation_status`
--
ALTER TABLE `prenotation_status`
  ADD PRIMARY KEY (`idx`);

--
-- Индексы таблицы `symptoms`
--
ALTER TABLE `symptoms`
  ADD PRIMARY KEY (`idx`);

--
-- Индексы таблицы `sys_permitions`
--
ALTER TABLE `sys_permitions`
  ADD PRIMARY KEY (`idx`);

--
-- Индексы таблицы `type_animal`
--
ALTER TABLE `type_animal`
  ADD PRIMARY KEY (`idx`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `google_id` (`google_id`);

--
-- Индексы таблицы `user_admin`
--
ALTER TABLE `user_admin`
  ADD PRIMARY KEY (`idx`),
  ADD KEY `idx_user` (`idx_user`);

--
-- Индексы таблицы `user_doctor`
--
ALTER TABLE `user_doctor`
  ADD PRIMARY KEY (`idx`);

--
-- Индексы таблицы `visit_event`
--
ALTER TABLE `visit_event`
  ADD PRIMARY KEY (`idx`),
  ADD KEY `idx_prenotaion_event` (`idx_prenotaion_event`),
  ADD KEY `idx_animal` (`idx_animal`),
  ADD KEY `idx_person` (`idx_person`),
  ADD KEY `idx_symptoms_visit` (`idx_symptoms_visit`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `animal`
--
ALTER TABLE `animal`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `person`
--
ALTER TABLE `person`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `prenotation_event`
--
ALTER TABLE `prenotation_event`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `prenotation_status`
--
ALTER TABLE `prenotation_status`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `symptoms`
--
ALTER TABLE `symptoms`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `sys_permitions`
--
ALTER TABLE `sys_permitions`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `type_animal`
--
ALTER TABLE `type_animal`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `user_admin`
--
ALTER TABLE `user_admin`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `user_doctor`
--
ALTER TABLE `user_doctor`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `visit_event`
--
ALTER TABLE `visit_event`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `animal`
--
ALTER TABLE `animal`
  ADD CONSTRAINT `animal_ibfk_1` FOREIGN KEY (`idx_type_animal`) REFERENCES `type_animal` (`idx`);

--
-- Ограничения внешнего ключа таблицы `prenotation_event`
--
ALTER TABLE `prenotation_event`
  ADD CONSTRAINT `prenotation_event_ibfk_1` FOREIGN KEY (`idx_doctor`) REFERENCES `user_doctor` (`idx`),
  ADD CONSTRAINT `prenotation_event_ibfk_2` FOREIGN KEY (`idx_permitions`) REFERENCES `sys_permitions` (`idx`),
  ADD CONSTRAINT `prenotation_event_ibfk_3` FOREIGN KEY (`idx_status`) REFERENCES `prenotation_status` (`idx`),
  ADD CONSTRAINT `prenotation_event_ibfk_4` FOREIGN KEY (`idx_user`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `user_admin`
--
ALTER TABLE `user_admin`
  ADD CONSTRAINT `user_admin_ibfk_1` FOREIGN KEY (`idx_user`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `visit_event`
--
ALTER TABLE `visit_event`
  ADD CONSTRAINT `visit_event_ibfk_1` FOREIGN KEY (`idx_prenotaion_event`) REFERENCES `prenotation_event` (`idx`),
  ADD CONSTRAINT `visit_event_ibfk_2` FOREIGN KEY (`idx_animal`) REFERENCES `animal` (`idx`),
  ADD CONSTRAINT `visit_event_ibfk_3` FOREIGN KEY (`idx_person`) REFERENCES `person` (`idx`),
  ADD CONSTRAINT `visit_event_ibfk_4` FOREIGN KEY (`idx_symptoms_visit`) REFERENCES `symptoms` (`idx`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
