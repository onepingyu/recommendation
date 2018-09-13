INSERT INTO `recommendation`.`group`(`id`, `name`, `create_time`, `address`, `description`, `host_id`) VALUES ('1', '象棋社', '2018-09-13 17:35:01.183350', 'Bupt', 'Join us！益智类型游戏！', '1');
INSERT INTO `recommendation`.`group`(`id`, `name`, `create_time`, `address`, `description`, `host_id`) VALUES ('2', '游泳社', '2018-09-13 17:34:20.273243', 'BJTU', '欢迎喜欢游泳健身的人加入我们！', '1');
INSERT INTO `recommendation`.`group`(`id`, `name`, `create_time`, `address`, `description`, `host_id`) VALUES ('3', '桌游吧', '2018-09-13 17:35:12.000000', 'PKU', '狼人杀、三国杀、各种桌游任你玩', '1');


INSERT INTO `recommendation`.`event_details`(`id`, `name`, `member`, `address`, `description`, `start_time`, `end_time`, `create_time`, `update_time`, `group_id`) VALUES ('1', '一起游泳啦', 10, '水立方体育馆', '你喜欢游泳吗？一起去游泳吧！', '2018-09-14 16:00:00.000000', '2018-09-16 18:00:22.000000', '2018-09-13 16:49:39.000000', '2018-09-13 16:49:43.000000', '2');
INSERT INTO `recommendation`.`event_details`(`id`, `name`, `member`, `address`, `description`, `start_time`, `end_time`, `create_time`, `update_time`, `group_id`) VALUES ('2', '象棋大战', 5, '北京邮电大学', '象棋高手？有种就来挑战吧，我们有最强的象棋达人，前三名可以获得丰厚奖品和证书哦～', '2018-09-20 17:00:18.000000', '2018-09-20 22:00:43.000000', '2018-09-13 17:08:56.000000', '2018-09-13 17:09:00.000000', '1');
INSERT INTO `recommendation`.`event_details`(`id`, `name`, `member`, `address`, `description`, `start_time`, `end_time`, `create_time`, `update_time`, `group_id`) VALUES ('3', '动物园参观', 10, '北京动物园', '想认识一群喜欢动物和生活的伙伴吗？那就加入我们吧', '2018-09-30 17:00:59.000000', '2018-09-30 20:00:09.000000', '2018-09-13 17:10:19.000000', '2018-09-13 17:10:24.000000', '3');
INSERT INTO `recommendation`.`event_details`(`id`, `name`, `member`, `address`, `description`, `start_time`, `end_time`, `create_time`, `update_time`, `group_id`) VALUES ('4', '狼人杀桌游', 10, '北师大咖啡厅', '狼人杀，我们都是最好的演员，come on！', '2018-09-27 17:00:01.000000', '2018-09-27 22:00:19.000000', '2018-09-13 17:12:30.000000', '2018-09-13 17:12:34.000000', '3');


INSERT INTO `recommendation`.`group_member`(`id`, `group_id`, `user_id`) VALUES (1, '1', 1);