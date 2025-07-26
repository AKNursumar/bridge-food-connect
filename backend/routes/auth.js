const express = require('express');
const supabase = require('../config/supabase');
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, full_name, user_type } = req.body;

    // Validate input
    if (!email || !password || !full_name || !user_type) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, password, full_name, user_type' 
      });
    }

    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          user_type,
          phone: req.body.phone || '',
          address: req.body.address || ''
        }
      }
    });

    if (authError) {
      console.log('Registration error:', authError);
      return res.status(400).json({ error: authError.message });
    }

    // Check if user was created but needs email confirmation
    if (authData.user && !authData.session) {
      return res.status(201).json({
        success: true,
        message: 'Registration successful! Please check your email to confirm your account before logging in.',
        user: authData.user,
        requiresConfirmation: true
      });
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: authData.user,
      token: authData.session?.access_token,
      session: authData.session
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, password' 
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.log('Login error:', error);
      return res.status(401).json({ error: error.message });
    }

    res.json({
      success: true,
      message: 'Login successful',
      user: data.user,
      token: data.session.access_token,
      session: data.session
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout user
router.post('/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
