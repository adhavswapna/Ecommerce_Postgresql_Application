export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Dummy user creation logic
    return res.status(200).json({ message: 'User registered successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
