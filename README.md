# Yamuna Yuki - Ocean Hazard Platform

A comprehensive ocean hazard reporting and monitoring platform for coastal communities, built for INCOIS (Indian National Centre for Ocean Information Services).

## Features

### 🚨 Real-time Hazard Reporting
- **Citizen Reporting**: Easy-to-use interface for reporting ocean hazards
- **Geotagging**: Automatic location detection and manual location input
- **Media Upload**: Support for photos and videos with drag-and-drop interface
- **Hazard Types**: Tsunami, Storm Surge, High Waves, Flooding, Coastal Damage, and more
- **Severity Levels**: Low, Medium, High, Critical classification

### 🗺️ Interactive Dashboard
- **Live Map**: Real-time visualization using OpenStreetMap (free)
- **Dynamic Hotspots**: AI-generated hotspots based on report density
- **Filtering System**: Filter by hazard type, severity, location, and time range
- **Statistics**: Real-time stats on active reports, hotspots, and contributors

### 📱 Social Media Monitoring
- **NLP Engine**: Natural language processing for hazard detection using Natural.js
- **Multi-platform**: Twitter, Facebook, YouTube monitoring
- **Sentiment Analysis**: Urgent, Negative, Positive, Neutral classification
- **Location Extraction**: Automatic location detection from social media posts

### 🔧 Technical Features
- **Free APIs Only**: No paid services used
- **Offline Support**: Data collection works offline (syncs later)
- **Multilingual Ready**: Framework for regional language support
- **Role-based Access**: Citizen, Official, Analyst, Admin roles
- **Real-time Updates**: Live data refresh and notifications

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Maps**: Leaflet with OpenStreetMap tiles (free)
- **Database**: SQLite with Prisma ORM
- **NLP**: Natural.js for text processing
- **Authentication**: NextAuth.js
- **File Upload**: React Dropzone
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yamuna-yuki
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### For Citizens
1. **Report Hazards**: Click "Report Hazard" button
2. **Fill Details**: Provide title, description, hazard type, and severity
3. **Add Location**: Use auto-detect or enter manually
4. **Upload Media**: Add photos/videos if available
5. **Submit**: Your report will appear on the map

### For Officials/Analysts
1. **View Dashboard**: See all reports and hotspots
2. **Filter Data**: Use filters to focus on specific areas/types
3. **Monitor Social Media**: Check social media activity
4. **Verify Reports**: Mark reports as verified
5. **Generate Insights**: Use hotspot data for decision making

## API Endpoints

- `GET /api/reports` - Fetch hazard reports with filtering
- `POST /api/reports` - Submit new hazard report
- `GET /api/social-media` - Fetch social media posts
- `POST /api/social-media` - Process social media post
- `GET /api/hotspots` - Generate dynamic hotspots

## Database Schema

The platform uses a comprehensive database schema with:
- **Users**: Role-based user management
- **Reports**: Hazard reports with geolocation and media
- **Social Media Posts**: Processed social media content
- **Hotspots**: AI-generated hazard concentration areas

## Contributing

This is a prototype built for INCOIS. For production deployment:

1. **Add Authentication**: Implement proper user authentication
2. **Cloud Storage**: Add cloud storage for media files
3. **Real Social Media APIs**: Integrate actual social media APIs
4. **Mobile App**: Build companion mobile application
5. **Offline Sync**: Implement robust offline data collection
6. **Multilingual**: Add regional language support

## License

This project is developed for INCOIS and follows their guidelines for ocean hazard monitoring and disaster risk reduction.

## Contact

For questions about this platform, contact the development team or INCOIS directly.
# sih-prototype
