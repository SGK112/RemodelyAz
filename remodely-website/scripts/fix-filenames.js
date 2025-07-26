const mongoose = require('mongoose');

// MongoDB connection
async function connectMongoDB() {
    if (mongoose.connections[0].readyState) {
        return;
    }
    try {
        await mongoose.connect('mongodb://localhost:27017/remodely', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// Schema for partner images
const PartnerImageSchema = new mongoose.Schema({
    partner_name: String,
    project_name: String,
    src: String,
    file_path: String,
    original_filename: String
});

const PartnerImage = mongoose.models.partner_images || mongoose.model('partner_images', PartnerImageSchema);

async function updateFilenames() {
    console.log('🔧 Updating image filenames...');

    await connectMongoDB();

    // Update kitchen image
    await PartnerImage.updateOne(
        { original_filename: { $regex: /Linda.*Kitchen.*Remodel/ } },
        {
            $set: {
                src: '/uploads/surprise-granite/kitchen-linda-ullrich-remodel.avif',
                file_path: '/uploads/surprise-granite/kitchen-linda-ullrich-remodel.avif',
                original_filename: 'kitchen-linda-ullrich-remodel.avif'
            }
        }
    );

    // Update countertop image
    await PartnerImage.updateOne(
        { original_filename: { $regex: /countertops.*quartz/ } },
        {
            $set: {
                src: '/uploads/surprise-granite/countertops-quartz-installation.webp',
                file_path: '/uploads/surprise-granite/countertops-quartz-installation.webp',
                original_filename: 'countertops-quartz-installation.webp'
            }
        }
    );

    console.log('✅ Updated image filenames in database');

    mongoose.connection.close();
}

updateFilenames().catch(console.error);
