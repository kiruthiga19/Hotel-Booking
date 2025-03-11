const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const SECRET_KEY = "abckjwekjdkejoi";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


// User Registration
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(200).json({
        statusCode:400,
         message: 'Email already exists. Please login.'
         });
    }

    //  Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });

    res.json({
      statusCode:200,
       message: 'User registered successfully', user
    });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found. Please register." });
    }

    //  Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    //  Generate JWT token
    const token = jwt.encode({ userId: user.id, email: user.email }, SECRET_KEY);

    res.json({ message: "Login successful", token,email });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Hotel Booking
app.post('/book', async (req, res) => {
  const { email, hotelName, checkIn, checkOut } = req.body;
  try {
    // const user = parseInt(userId)
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("user",user)
    const booking = await prisma.booking.create({
        data: {
            user: { connect: { id: user?.id } }, // Connects existing user
            hotelName:hotelName,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut)
          }
    });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: 'Booking failed' });
  }
});

// Web Check-in (Add Guests)
app.post('/check-in', async (req, res) => {
  const { guests, email } = req.body;

  try {
    //  Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    //  Find booking by user ID
    const booking = await prisma.booking.findFirst({
      where: { userId: user?.id }
    });

    //  Add guests to the booking
    const createdGuests = await prisma.guest.createMany({
      data: guests.map((g) => ({
        bookingId: booking.id,
        name: g.name,
        aadhaar: g.aadhaar
      }))
    });

    res.json({ message: "Check-in successful!", guests: createdGuests });

  } catch (error) {
    console.error("Check-in Error:", error);
    res.status(500).json({ error: "Check-in failed. Please try again." });
  }
});


// Get User Bookings
app.get('/bookings/:userId', async (req, res) => {
  const { userId } = req.params;
  const bookings = await prisma.booking.findMany({
    where: { userId: parseInt(userId) },
    include: { guests: true },
  });
  res.json(bookings);
});

app.listen(5000, () => console.log('Server running on port 5000'));
