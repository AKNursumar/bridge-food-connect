# Frontend - Bridge Food Connect

*Frontend implementation coming soon...*

## 🎯 **Planned Features**

- **User Interface**: Clean, responsive design for food sharing
- **Authentication**: Login/Register forms connected to backend API
- **Food Listings**: Browse available food items with filters
- **Food Requests**: Request food items and manage requests
- **User Dashboard**: Manage profile, donations, and requests
- **Interactive Maps**: Show pickup locations
- **Real-time Updates**: Live notifications for new food items and requests

## 🛠️ **Recommended Tech Stack**

Choose one of these popular frontend frameworks:

### Option 1: React.js
```bash
npx create-react-app bridge-food-connect-frontend
cd bridge-food-connect-frontend
npm install axios react-router-dom
```

### Option 2: Next.js (Recommended)
```bash
npx create-next-app@latest bridge-food-connect-frontend
cd bridge-food-connect-frontend
npm install axios
```

### Option 3: Vue.js
```bash
npm create vue@latest bridge-food-connect-frontend
cd bridge-food-connect-frontend
npm install axios vue-router
```

## 🔗 **Backend Integration**

The backend API is already running at `http://localhost:3000` with the following endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Food Items
- `GET /api/food` - Get all food items
- `POST /api/food` - Create food item
- `GET /api/food/:id` - Get specific food item
- `PUT /api/food/:id` - Update food item
- `DELETE /api/food/:id` - Delete food item

### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 📋 **Todo List**

- [ ] Choose frontend framework (React/Next.js/Vue)
- [ ] Set up project structure
- [ ] Create authentication pages (login/register)
- [ ] Design main dashboard
- [ ] Implement food listing page
- [ ] Create food item creation form
- [ ] Add food request functionality
- [ ] Implement user profile management
- [ ] Add responsive design
- [ ] Connect to backend API
- [ ] Add error handling
- [ ] Implement loading states
- [ ] Add form validation

## 🎨 **Design Considerations**

- **Mobile-first design** for accessibility
- **Clean, intuitive interface** for easy food sharing
- **Map integration** for pickup locations
- **Image upload** for food items
- **Dark/light mode** support
- **Accessibility features** (WCAG compliance)

---

**Note**: The original frontend was accidentally removed. This folder is prepared for a new frontend implementation that will connect to the existing, fully functional backend API.
