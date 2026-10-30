export async function getUsers(req, res) {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function getUser(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "id буруу байна" });
  }
  try {
    res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
  } catch (error) {
    res.status(500).json({ message: "Серверийн алдаа" });
  }
}

export async function createUser(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Нэр шаардлагатай" });
  }
  try {
    res.status(201).json({ id: Date.now(), name });
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа" });
  }
}
