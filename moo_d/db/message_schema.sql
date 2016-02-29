DROP TABLE if EXISTS profile CASCADE;

CREATE TABLE profile (
  profile_id SERIAL UNIQUE PRIMARY KEY,
  email VARCHAR(255),
  password_digest TEXT,
  name TEXT,
  emotion_id INTEGER REFERENCES emotion,
  activity_id INTEGER REFERENCES activity,
  message_id INTEGER REFERENCES messages
);
