# Data Dictionary

## User

| Field            | Type    | Specifics                             | Description                                              |
| ---------------- | ------- | ------------------------------------- | -------------------------------------------------------- |
| **id**           | INT     | PRIMARY KEY, AUTO_INCREMENT, NOT NULL | Unique identifier for the user (automatically generated) |
| **firstname**    | VARCHAR | NOT NULL                              | First name of the user                                   |
| **lastname**     | VARCHAR | NOT NULL                              | Last name of the user                                    |
| **email**        | VARCHAR | NOT NULL, UNIQUE                      | User's email address                                     |
| **password**     | VARCHAR | NOT NULL                              | User's password                                          |
| **phone_number** | VARCHAR | NULLABLE                              | User's phone number                                      |
| **address**      | VARCHAR | NULLABLE                              | User's physical address                                  |
| **role_id**      | INT     | FOREIGN KEY (role)                    | Identifier for the role assigned to the user             |

## Role

| Field    | Type    | Specifics                             | Description                                              |
| -------- | ------- | ------------------------------------- | -------------------------------------------------------- |
| **id**   | INT     | PRIMARY KEY, AUTO_INCREMENT, NOT NULL | Unique identifier for the role (automatically generated) |
| **name** | VARCHAR | NOT NULL, UNIQUE                      | Name of the role (e.g., User, Instructor)                |

## Category

| Field    | Type    | Specifics                             | Description                                                  |
| -------- | ------- | ------------------------------------- | ------------------------------------------------------------ |
| **id**   | INT     | PRIMARY KEY, AUTO_INCREMENT, NOT NULL | Unique identifier for the category (automatically generated) |
| **name** | VARCHAR | NOT NULL, UNIQUE                      | Name of the category                                         |

## Course

| Field           | Type     | Specifics                             | Description                                                |
| --------------- | -------- | ------------------------------------- | ---------------------------------------------------------- |
| **id**          | INT      | PRIMARY KEY, AUTO_INCREMENT, NOT NULL | Unique identifier for the course (automatically generated) |
| **name**        | VARCHAR  | NOT NULL                              | Name of the course                                         |
| **description** | VARCHAR  | NOT NULL                              | Description of the course                                  |
| **content**     | TEXT     | NOT NULL                              | Content of the course                                      |
| **image**       | VARCHAR  | NULLABLE                              | Link or path to the course image                           |
| **created_at**  | DATETIME | NOT NULL                              | Date when the course was created                           |
| **updated_at**  | DATETIME | NULLABLE                              | Date when the course was last updated                      |
| **level**       | VARCHAR  | NULLABLE                              | Course level (e.g., beginner, intermediate, advanced)      |
| **created_by**  | INT      | FOREIGN KEY (user)                    | Identifier of the user who created the course              |

## CourseCategory

| Field           | Type | Specifics                             | Description                                                            |
| --------------- | ---- | ------------------------------------- | ---------------------------------------------------------------------- |
| **id**          | INT  | PRIMARY KEY, AUTO_INCREMENT, NOT NULL | Unique identifier for the relationship between a course and a category |
| **course_id**   | INT  | FOREIGN KEY (course)                  | Identifier of the course                                               |
| **category_id** | INT  | FOREIGN KEY (category)                | Identifier of the category                                             |

## Post

| Field          | Type     | Specifics                             | Description                                              |
| -------------- | -------- | ------------------------------------- | -------------------------------------------------------- |
| **id**         | INT      | PRIMARY KEY, AUTO_INCREMENT, NOT NULL | Unique identifier for the post (automatically generated) |
| **title**      | VARCHAR  | NOT NULL                              | Title of the post                                        |
| **content**    | TEXT     | NOT NULL                              | Content of the post                                      |
| **created_at** | DATETIME | NOT NULL                              | Date when the post was created                           |
| **updated_at** | DATETIME | NULLABLE                              | Date when the post was last updated                      |
| **user_id**    | INT      | FOREIGN KEY (user)                    | Identifier of the user who created the post              |

## Message

| Field          | Type     | Specifics                             | Description                                                 |
| -------------- | -------- | ------------------------------------- | ----------------------------------------------------------- |
| **id**         | INT      | PRIMARY KEY, AUTO_INCREMENT, NOT NULL | Unique identifier for the message (automatically generated) |
| **content**    | TEXT     | NOT NULL                              | Content of the message                                      |
| **created_at** | DATETIME | NOT NULL                              | Date when the message was created                           |
| **updated_at** | DATETIME | NULLABLE                              | Date when the message was last updated                      |
| **user_id**    | INT      | FOREIGN KEY (user)                    | Identifier of the user who sent the message                 |
| **post_id**    | INT      | FOREIGN KEY (post)                    | Identifier of the post associated with the message          |
