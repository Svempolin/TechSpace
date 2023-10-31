import { Router } from 'express';
const router = Router();

// Registrera en ny användare
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Skapa en ny användare i databasen
    const newUser = new UserModel({ username, password, email });
    await newUser.save();

    res.status(201).json({ message: 'Användaren har registrerats' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något gick fel vid registreringen' });
  }
});

// Logga in användaren
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Sök efter användaren i databasen
    const user = await UserModel.findOne({ username });

    if (!user || user.password !== password) {
      res.status(401).json({ error: 'Fel användarnamn eller lösenord' });
    } else {
      res.json({ message: 'Inloggning lyckades', user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något gick fel vid inloggningen' });
  }
});

// Hämta användarprofil
router.get('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Sök efter användaren i databasen baserat på användarens ID
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).json({ error: 'Användaren hittades inte' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något gick fel vid hämtningen av användarprofilen' });
  }
});

router.put('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

    // Uppdatera användarprofilen i databasen
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      res.status(404).json({ error: 'Användaren hittades inte' });
    } else {
      res.json({ message: 'Användarprofilen har uppdaterats', user: updatedUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något gick fel vid uppdateringen av användarprofilen' });
  }
});

export default router;
