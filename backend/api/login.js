export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Dummy check
    if (username === 'admin' && password === 'admin') {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
