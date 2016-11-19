ALTER TABLE prediction ADD INDEX idx_stock_id(stock_id);
ALTER TABLE prediction ADD INDEX idx_will_up(will_up);
ALTER TABLE user ADD INDEX idx_email(email);

CREATE UNIQUE INDEX unique_email ON user (email);