import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Package, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const DonorPage = () => {
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    expiryDate: '',
    expiryTime: '',
    location: '',
    pickupWindow: '',
    description: '',
  });

  const [donations] = useState([
    {
      id: 1,
      foodType: 'Fresh Vegetables',
      quantity: '50 lbs',
      location: 'Downtown Restaurant',
      status: 'Picked Up',
      date: '2024-01-15',
      volunteer: 'Food Bank SF',
    },
    {
      id: 2,
      foodType: 'Baked Goods',
      quantity: '20 items',
      location: 'City Bakery',
      status: 'Pending',
      date: '2024-01-20',
      volunteer: null,
    },
    {
      id: 3,
      foodType: 'Canned Foods',
      quantity: '30 cans',
      location: 'Grocery Store',
      status: 'Expired',
      date: '2024-01-10',
      volunteer: null,
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Donation submitted:', formData);
    // Reset form
    setFormData({
      foodType: '',
      quantity: '',
      expiryDate: '',
      expiryTime: '',
      location: '',
      pickupWindow: '',
      description: '',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Picked Up':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'Expired':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Picked Up':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Donate Food & Make an Impact
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your surplus food with those in need. Every donation helps build stronger communities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Donation Form */}
            <Card className="shadow-elevation animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span>Create New Donation</span>
                </CardTitle>
                <CardDescription>
                  Fill out the details about your food donation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="foodType">Food Type</Label>
                      <Input
                        id="foodType"
                        name="foodType"
                        value={formData.foodType}
                        onChange={handleInputChange}
                        placeholder="e.g., Fresh vegetables, Baked goods"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="e.g., 10 lbs, 50 items"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryTime">Expiry Time</Label>
                      <Input
                        id="expiryTime"
                        name="expiryTime"
                        type="time"
                        value={formData.expiryTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Pickup Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., 123 Main St, San Francisco, CA"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="pickupWindow">Pickup Time Window</Label>
                    <Input
                      id="pickupWindow"
                      name="pickupWindow"
                      value={formData.pickupWindow}
                      onChange={handleInputChange}
                      placeholder="e.g., 2:00 PM - 6:00 PM"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Additional Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Any special instructions or additional details..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" variant="hero">
                    Submit Donation
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Donation History */}
            <Card className="shadow-elevation animate-slide-in">
              <CardHeader>
                <CardTitle>Your Donation History</CardTitle>
                <CardDescription>
                  Track the status of your current and past donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <div
                      key={donation.id}
                      className="p-4 border border-border rounded-lg bg-gradient-card hover:shadow-soft transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {donation.foodType}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {donation.quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(donation.status)}
                          <Badge className={getStatusColor(donation.status)}>
                            {donation.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{donation.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{donation.date}</span>
                        </div>
                      </div>

                      {donation.volunteer && (
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Picked up by: </span>
                          <span className="font-medium text-primary">
                            {donation.volunteer}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonorPage;