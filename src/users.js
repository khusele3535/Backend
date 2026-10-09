export const users = [
    { id: 1, name: "Бат", email: "bat@ufe.edu.mn", role: "admin", password: "securepassword123" },
    { id: 2, name: "Сувд", email: "suvd@ufe.edu.mn", role: "user", password: "suvdpassword456" },
    { id: 3, name: "Болд", email: "bold@ufe.edu.mn", role: "user", password: "boldpassword789" },
    { id: 4, name: "Ану", email: "anu@ufe.edu.mn", role: "admin", password: "anupassword000" }
];

export function findUserById(id) {
    return users.find((user) => user.id === id);
}

export function findByEmail(email) {
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function countAdmins() {
    return users.filter((user) => user.role === "admin").length;
}
