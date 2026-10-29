import { users, addUser, findByEmail } from "../data/users.js";

export function list(req, res) {
  const { q } = req.query;
  if (!q) {
    const allSafeUsers = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    return res.json(allSafeUsers);
  }

  const filtered = users.filter((u) => 
    (u.name && u.name.toLowerCase().includes(q.toLowerCase())) ||
    (u.email && u.email.toLowerCase().includes(q.toLowerCase()))
  );

  const safeUsers = filtered.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  res.json(safeUsers);
}

export function getOne(req, res) {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
}

export function create(req, res) {
  const { name, email, role, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  const newUser = addUser({ name, email, role, password });
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
}

export function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Required field missing" });
  }

  const user = findByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.password === password) {
    const { password: _, ...userWithoutPassword } = user;
    return res.json({ user: userWithoutPassword });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
}
