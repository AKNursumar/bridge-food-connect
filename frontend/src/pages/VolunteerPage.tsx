import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Package, Filter, Map, List, CheckCircle, ArrowRight } from 'lucide-react';

const VolunteerPage = () => {
  const [filters, setFilters] = useState({
    distance: '',
    foodType: '',
    urgency: '',
  });

  const [availableDonations] = useState([
    {
      id: 1,
      foodType: 'Fresh Vegetables',
      quantity: '50 lbs',
      location: 'Downtown Restaurant, 123 Main St',
      distance: '0.5 miles',
      expiryTime: '6:00 PM today',
      urgency: 'High',
      pickupWindow: '2:00 PM - 6:00 PM',
      donor: 'Green Garden Restaurant',
    },
    {
      id: 2,
      foodType: 'Baked Goods',
      quantity: '20 items',
      location: 'City Bakery, 456 Oak Ave',
      distance: '1.2 miles',
      expiryTime: '8:00 PM today',
      urgency: 'Medium',
      pickupWindow: '4:00 PM - 8:00 PM',
      donor: 'Sunrise Bakery',
    },
    {
      id: 3,
      foodType: 'Prepared Meals',
      quantity: '15 meals',
      location: 'Community Center, 789 Pine St',
      distance: '2.1 miles',
      expiryTime: '7:00 PM today',
      urgency: 'High',
      pickupWindow: '5:00 PM - 7:00 PM',
      donor: 'Unity Community Kitchen',
    },
    {
      id: 4,
      foodType: 'Dairy Products',
      quantity: '30 items',
      location: 'Local Grocery, 321 Elm St',
      distance: '3.0 miles',
      expiryTime: '10:00 PM today',
      urgency: 'Low',
      pickupWindow: '6:00 PM - 10:00 PM',
      donor: 'FreshMart Grocery',
    },
  ]);

  const [pickupHistory] = useState([
    {
      id: 1,
      foodType: 'Canned Foods',
      quantity: '25 cans',
      donor: 'Metro Supermarket',
      date: '2024-01-18',
      status: 'Completed',
      recipient: 'City Food Bank',
    },
    {
      id: 2,
      foodType: 'Fresh Bread',
      quantity: '40 loaves',
      donor: 'Artisan Bakery',
      date: '2024-01-15',
      status: 'Completed',
      recipient: 'Homeless Shelter',
    },
  ]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClaimPickup = (donationId: number) => {
    console.log('Claiming pickup for donation:', donationId);
    // Handle pickup claim logic
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Find Food Donations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with local food donors and help redistribute surplus food to those in need.
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-primary" />
                <span>Filter Donations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="distance">Distance</Label>
                  <Select value={filters.distance} onValueChange={(value) => setFilters({...filters, distance: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Within 1 mile</SelectItem>
                      <SelectItem value="3">Within 3 miles</SelectItem>
                      <SelectItem value="5">Within 5 miles</SelectItem>
                      <SelectItem value="10">Within 10 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="foodType">Food Type</Label>
                  <Select value={filters.foodType} onValueChange={(value) => setFilters({...filters, foodType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Fresh Vegetables</SelectItem>
                      <SelectItem value="baked">Baked Goods</SelectItem>
                      <SelectItem value="prepared">Prepared Meals</SelectItem>
                      <SelectItem value="dairy">Dairy Products</SelectItem>
                      <SelectItem value="canned">Canned Foods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency</Label>
                  <Select value={filters.urgency} onValueChange={(value) => setFilters({...filters, urgency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="list" className="flex items-center space-x-2">
                <List className="h-4 w-4" />
                <span>List View</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center space-x-2">
                <Map className="h-4 w-4" />
                <span>Map View</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Available Donations */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Available Donations</h2>
                  <div className="space-y-4">
                    {availableDonations.map((donation) => (
                      <Card key={donation.id} className="shadow-soft hover:shadow-elevation transition-all duration-300 animate-slide-in">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg text-foreground">
                                {donation.foodType}
                              </h3>
                              <p className="text-muted-foreground">{donation.quantity}</p>
                            </div>
                            <Badge className={getUrgencyColor(donation.urgency)}>
                              {donation.urgency} Urgency
                            </Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{donation.location}</span>
                              <span className="text-primary font-medium">({donation.distance})</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Pickup: {donation.pickupWindow}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Package className="h-4 w-4" />
                              <span>Expires: {donation.expiryTime}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              From: <span className="font-medium text-foreground">{donation.donor}</span>
                            </span>
                            <Button 
                              variant="hero" 
                              onClick={() => handleClaimPickup(donation.id)}
                              className="group"
                            >
                              Claim Pickup
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Pickup History */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Your Pickup History</h2>
                  <div className="space-y-4">
                    {pickupHistory.map((pickup) => (
                      <Card key={pickup.id} className="shadow-soft animate-slide-in">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {pickup.foodType}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {pickup.quantity}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <Badge className="bg-green-100 text-green-800">
                                {pickup.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>From: <span className="font-medium text-foreground">{pickup.donor}</span></p>
                            <p>Delivered to: <span className="font-medium text-foreground">{pickup.recipient}</span></p>
                            <p>Date: {pickup.date}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="map">
              <Card className="shadow-elevation">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center h-96 bg-gradient-subtle rounded-lg border-2 border-dashed border-border">
                    <div className="text-center">
                      <Map className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Interactive Map View
                      </h3>
                      <p className="text-muted-foreground">
                        Map functionality would be integrated here with markers showing donation locations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default VolunteerPage;