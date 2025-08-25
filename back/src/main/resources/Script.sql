DROP TABLE IF EXISTS message;

CREATE TABLE message (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         sender VARCHAR(255),
                         content TEXT,status VARCHAR(255),
                         created_at TIMESTAMP,
                         updated_at TIMESTAMP
);

TRUNCATE TABLE message;

INSERT INTO message (sender, content, created_at, updated_at) VALUES
('Yumi Ishiyama', 'Bonjour, j''ai besoin d''aide pour ma réservation.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FullSTACK', 'Bien sûr, comment puis-je vous aider ?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Yumi Ishiyama', 'Je voudrais modifier ma réservation.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FullSTACK', 'Pas de problème, donnez-moi plus de détails.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Yumi Ishiyama', 'Merci pour votre assistance.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);