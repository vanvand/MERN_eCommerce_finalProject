import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
        location: {
            city: "Berlin",
            district: "Neukölln"
        }
    },
    {
        name: "Diala S.",
        email: "diala@example.com",
        password: bcrypt.hashSync("123456", 10),
        location: {
            city: "Leipzig",
            district: "Südvorstadt"
        }
    },
    {
        name: "Nico C.",
        email: "nico@example.com",
        password: bcrypt.hashSync("123456", 10),
        location: {
            city: "Berlin",
            district: "Neukölln"
        }
    },
    {
        name: "Nicolò Fa.",
        email: "nicolo@example.com",
        password: bcrypt.hashSync("123456", 10),
        location: {
            city: "Berlin",
            district: "Mitte"
        }
    },
    {
        name: "Vanessa D.",
        email: "vanessa@example.com",
        password: bcrypt.hashSync("123456", 10),
        location: {
            city: "Berlin",
            district: "Neukölln"
        }
    },
    {
        name: "Marta Thompson",
        email: "marta@example.com",
        password: bcrypt.hashSync("123456", 10),
        location: {
            city: "Berlin",
            district: "Moabit"
        }
    },
    {
        name: "Tim Tiefenbach",
        email: "tim@example.com",
        password: bcrypt.hashSync("123456", 10),
        location: {
            city: "Berlin",
            district: ""
        }
    },
    {
        name: "Lydia Clementine",
        email: "lydia@example.com",
        password: bcrypt.hashSync("123456", 10),
        location: {
            city: "Leipzig",
            district: "Connewitz"
        }
    }
]

export default users