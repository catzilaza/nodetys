"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConstraintSchema = void 0;
// Class Implementation
class User {
    constructor(user_id, user_token, user_level, user_timeStamp, user_name, user_firstname, user_lastname, user_sex, user_age, user_address, user_telephone, user_email, user_image, user_password, id) {
        this.user_id = user_id;
        this.user_token = user_token;
        this.user_level = user_level;
        this.user_timeStamp = user_timeStamp;
        this.user_name = user_name;
        this.user_firstname = user_firstname;
        this.user_lastname = user_lastname;
        this.user_sex = user_sex;
        this.user_age = user_age;
        this.user_address = user_address;
        this.user_telephone = user_telephone;
        this.user_email = user_email;
        this.user_image = user_image;
        this.user_password = user_password;
        this.id = id;
    }
}
exports.default = User;
exports.UserConstraintSchema = {
    collMod: process.env.USER_COLLECTION_NAME,
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "user_name",
                "user_firstname",
                "user_lastname",
                "user_email",
                "user_address",
                "user_telephone",
                "user_password",
                "user_level",
                "user_timeStamp",
            ],
            additionalProperties: false,
            properties: {
                _id: {},
                user_timeStamp: {
                    bsonType: "date",
                    description: "'user_time_stamp' is required and is a string",
                },
                user_level: {
                    bsonType: "string",
                    description: "'user_level' is required and is a string",
                },
                user_name: {
                    bsonType: "string",
                    description: "'user_name' is required and is a string",
                },
                user_age: {
                    bsonType: "string",
                    description: "'user_age' is required and is a number",
                },
                user_firstname: {
                    bsonType: "string",
                    description: "'user_firstname' is required and is a string",
                },
                user_lastname: {
                    bsonType: "string",
                    description: "'user_lastname' is required and is a string",
                },
                user_address: {
                    bsonType: "string",
                    description: "'user_address' is required and is a string",
                },
                user_email: {
                    bsonType: "string",
                    description: "'user_email' is required and is a string",
                },
                user_telephone: {
                    bsonType: "string",
                    description: "'user_telephone' is required and is a string",
                },
                user_password: {
                    bsonType: "string",
                    description: "'user_password' is required and is a string",
                },
            },
        },
    },
};
