const express = require('express');
const supabase = require('../config/supabase');
const router = express.Router();

// Get all food items
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('food_items')
      .select(`
        *,
        profiles:created_by (
          full_name,
          user_type
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ food_items: data });
  } catch (error) {
    console.error('Get food items error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new food item
router.post('/', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError) {
      return res.status(401).json({ error: authError.message });
    }

    const {
      title,
      description,
      quantity,
      expiry_date,
      pickup_location,
      category,
      dietary_info
    } = req.body;

    if (!title || !description || !quantity || !pickup_location) {
      return res.status(400).json({
        error: 'Missing required fields: title, description, quantity, pickup_location'
      });
    }

    // Convert dietary_info to array if it's a string
    let dietary_info_array = null;
    if (dietary_info) {
      if (Array.isArray(dietary_info)) {
        dietary_info_array = dietary_info;
      } else if (typeof dietary_info === 'string') {
        // Split by comma and trim whitespace
        dietary_info_array = dietary_info.split(',').map(item => item.trim()).filter(item => item.length > 0);
      }
    }

    const { data, error } = await supabase
      .from('food_items')
      .insert({
        title,
        description,
        quantity,
        expiry_date,
        pickup_location,
        category,
        dietary_info: dietary_info_array,
        created_by: user.id,
        status: 'available'
      })
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Food item created successfully',
      food_item: data[0]
    });
  } catch (error) {
    console.error('Create food item error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific food item
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('food_items')
      .select(`
        *,
        profiles:created_by (
          full_name,
          user_type,
          phone
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.json({ food_item: data });
  } catch (error) {
    console.error('Get food item error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update food item
router.put('/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError) {
      return res.status(401).json({ error: authError.message });
    }

    const { id } = req.params;
    const updates = req.body;

    // Check if user owns this food item
    const { data: foodItem, error: fetchError } = await supabase
      .from('food_items')
      .select('created_by')
      .eq('id', id)
      .single();

    if (fetchError) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    if (foodItem.created_by !== user.id) {
      return res.status(403).json({ error: 'You can only update your own food items' });
    }

    const { data, error } = await supabase
      .from('food_items')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Food item updated successfully',
      food_item: data[0]
    });
  } catch (error) {
    console.error('Update food item error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete food item
router.delete('/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError) {
      return res.status(401).json({ error: authError.message });
    }

    const { id } = req.params;

    // Check if user owns this food item
    const { data: foodItem, error: fetchError } = await supabase
      .from('food_items')
      .select('created_by')
      .eq('id', id)
      .single();

    if (fetchError) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    if (foodItem.created_by !== user.id) {
      return res.status(403).json({ error: 'You can only delete your own food items' });
    }

    const { error } = await supabase
      .from('food_items')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error('Delete food item error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Request food item
router.post('/:id/request', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError) {
      return res.status(401).json({ error: authError.message });
    }

    const { id } = req.params;
    const { message } = req.body;

    // Check if food item exists and is available
    const { data: foodItem, error: fetchError } = await supabase
      .from('food_items')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    if (foodItem.status !== 'available') {
      return res.status(400).json({ error: 'Food item is not available' });
    }

    // Create food request
    const { data, error } = await supabase
      .from('food_requests')
      .insert({
        food_item_id: id,
        requested_by: user.id,
        message: message || '',
        status: 'pending'
      })
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Food request submitted successfully',
      request: data[0]
    });
  } catch (error) {
    console.error('Request food error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all food requests (for donors to see requests for their food)
router.get('/requests', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError) {
      return res.status(401).json({ error: authError.message });
    }

    const { data, error } = await supabase
      .from('food_requests')
      .select(`
        *,
        food_items (
          id,
          title,
          description,
          quantity,
          pickup_location,
          category
        ),
        profiles:requested_by (
          full_name,
          phone,
          user_type
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ requests: data });
  } catch (error) {
    console.error('Get food requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get requests for a specific food item
router.get('/:id/requests', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError) {
      return res.status(401).json({ error: authError.message });
    }

    const { id } = req.params;

    // Check if user owns this food item
    const { data: foodItem, error: ownerError } = await supabase
      .from('food_items')
      .select('created_by')
      .eq('id', id)
      .single();

    if (ownerError) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    if (foodItem.created_by !== user.id) {
      return res.status(403).json({ error: 'You can only view requests for your own food items' });
    }

    const { data, error } = await supabase
      .from('food_requests')
      .select(`
        *,
        profiles:requested_by (
          full_name,
          phone,
          user_type
        )
      `)
      .eq('food_item_id', id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ requests: data });
  } catch (error) {
    console.error('Get food item requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
