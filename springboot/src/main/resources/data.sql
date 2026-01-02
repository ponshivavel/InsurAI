@getfrom

INSERT INTO users (email, password, name) VALUES
('admin@admin.com', '$2a$10$exampleHashedPasswordForAdmin', 'Admin User');

-- Insert roles for the admin user
INSERT INTO user_roles (user_id, roles) VALUES
((SELECT id FROM users WHERE email = 'admin@admin.com'), 'ADMIN');
