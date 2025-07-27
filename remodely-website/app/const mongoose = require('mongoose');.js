const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: drrwdgggx,
    api_key: 947268741246623,
    api_secret: wCPN - vlM72Rc4X8kg7KIubUZ2I0,
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const ImageModel = mongoose.model('Image', new mongoose.Schema({ imagePath: String, cloudinaryUrl: String }));

async function migrateImages() {
    const images = await ImageModel.find({ cloudinaryUrl: { $exists: false } });

    for (const image of images) {
        try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(image.imagePath);

            // Update MongoDB with the Cloudinary URL
            image.cloudinaryUrl = result.secure_url;
            await image.save();

            console.log(`Migrated: ${image.imagePath} -> ${result.secure_url}`);
        } catch (error) {
            console.error(`Failed to migrate ${image.imagePath}:`, error);
        }
    }
}

migrateImages().then(() => {
    console.log('Migration complete');
    mongoose.disconnect();
});