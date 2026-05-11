# RideKs Supabase Setup Guide

## Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

You can find these values in:
- Supabase Dashboard → Settings → API
- Copy the "Project URL" and "anon" key for the public keys

---

## Database Tables to Create

### 1. **users** (Manages user accounts)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  phone_number TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('rider', 'driver')), -- rider or driver
  profile_picture_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. **riders** (Rider-specific information)

```sql
CREATE TABLE riders (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  rating DECIMAL(3,2) DEFAULT 5.0,
  total_rides INT DEFAULT 0,
  preferred_payment_method TEXT, -- cash, card, digital_wallet
  emergency_contact TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. **drivers** (Driver-specific information)

```sql
CREATE TABLE drivers (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  license_number TEXT UNIQUE NOT NULL,
  license_expiry DATE,
  vehicle_plate TEXT UNIQUE NOT NULL,
  vehicle_model TEXT,
  vehicle_year INT,
  vehicle_color TEXT,
  rating DECIMAL(3,2) DEFAULT 5.0,
  total_rides INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  current_location POINT, -- for storing latitude/longitude
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. **rides** (Booking & ride information)

```sql
CREATE TABLE rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rider_id UUID NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT NOT NULL,
  pickup_latitude DECIMAL(10,8),
  pickup_longitude DECIMAL(11,8),
  dropoff_latitude DECIMAL(10,8),
  dropoff_longitude DECIMAL(11,8),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
  estimated_distance DECIMAL(10,2), -- in km
  estimated_fare DECIMAL(10,2), -- in EUR
  actual_fare DECIMAL(10,2),
  scheduled_time TIMESTAMP,
  pickup_time TIMESTAMP,
  dropoff_time TIMESTAMP,
  rating_by_rider INT, -- 1-5 stars
  rating_by_driver INT, -- 1-5 stars
  rider_review TEXT,
  driver_review TEXT,
  payment_method TEXT, -- cash, card, digital_wallet
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. **ride_locations** (Kosovo cities reference)

```sql
CREATE TABLE ride_locations (
  id SERIAL PRIMARY KEY,
  city_name TEXT UNIQUE NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Kosovo cities
INSERT INTO ride_locations (city_name, latitude, longitude) VALUES
('Prishtina', 42.6026, 21.1619),
('Prizren', 42.2133, 20.7411),
('Peja', 42.6597, 20.2660),
('Gjakova', 42.4142, 20.4314),
('Mitrovica', 42.8850, 20.8669),
('Ferizaj', 42.3758, 21.3145),
('Gjilan', 42.4617, 21.7879),
('Vushtrri', 42.7539, 20.9947),
('Podujeva', 42.6631, 21.1864),
('Suhareka', 42.4086, 20.9117),
('Rahovec', 42.3028, 20.6531),
('Drenas', 42.7097, 21.1986),
('Lipjan', 42.5250, 21.2667),
('Malisheva', 42.2408, 20.6006),
('Kamenica', 42.5667, 21.8667),
('Viti', 42.3333, 21.8167),
('Deçan', 42.3014, 20.3061),
('Istog', 42.3533, 20.1633),
('Klinë', 42.2600, 20.9200),
('Skenderaj', 42.7167, 20.6500);
```

### 6. **ratings** (Separate table for ride ratings)

```sql
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
  rater_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ratee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. **payments** (Payment history)

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'EUR',
  payment_method TEXT,
  status TEXT DEFAULT 'pending',
  transaction_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);
```

### 8. **support_tickets** (Customer support)

```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ride_id UUID REFERENCES rides(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);
```

---

## Setting Up Row Level Security (RLS)

For security, enable RLS on these tables in Supabase:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE riders ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Riders can only see their own rides
CREATE POLICY "Riders can view own rides" ON rides
  FOR SELECT USING (rider_id = auth.uid() OR driver_id = auth.uid());

-- Add more policies as needed based on your auth setup
```

---

## Installation Steps

1. **Create Supabase Client** - Install `@supabase/supabase-js`:
```bash
pnpm add @supabase/supabase-js
```

2. **Create a Supabase utility file** at `lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

3. **Create Authentication Service** - Add `lib/auth.ts` for user management:
```typescript
import { supabase } from './supabase'

export const auth = {
  signUp: (email: string, password: string) =>
    supabase.auth.signUp({ email, password }),
  
  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),
  
  signOut: () => supabase.auth.signOut(),
}
```

---

## Next Steps

1. Copy these table creation scripts
2. Go to Supabase Dashboard → SQL Editor
3. Create a new query and paste each table script
4. Run them one by one
5. Add the environment variables to `.env.local`
6. Install `@supabase/supabase-js`
7. Create the utility files mentioned above

That's it! Your database is ready for RideKs.
