// import joi from "joi"

// const schema = joi.object({
//     firstName: joi.string().alphanum().min(3).required(),
//     surName: joi.string().alphanum().min(3).required(),
//     email: joi.string().email({ minDomainSegments: 2 }),
//     password: joi.string().min(6).required()
// })

// schema.validate({ username: 'abc', birth_year: 1994 });
// // -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// // -> { value: {}, error: '"username" is required' }

// // Also -

// try {
//     const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { }

// export function ValidateRegisterUser() {

// }