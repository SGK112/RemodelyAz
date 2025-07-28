import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

// Graceful handling when MongoDB is not configured
if (!MONGODB_URI) {
    console.warn('MongoDB URI not configured. MongoDB-dependent features will be disabled.')
}

interface MongooseCache {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
    var mongoose: MongooseCache | undefined
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    // Return null if MongoDB is not configured instead of throwing
    if (!MONGODB_URI) {
        console.warn('MongoDB connection attempted without URI configuration')
        return null
    }

    if (cached!.conn) {
        return cached!.conn
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 5, // Maintain a minimum of 5 socket connections
        }

        cached!.promise = mongoose.connect(MONGODB_URI, opts)
    }

    try {
        cached!.conn = await cached!.promise
        console.log('MongoDB connected successfully')
        return cached!.conn
    } catch (e) {
        cached!.promise = null
        console.error('MongoDB connection failed:', e)
        return null // Return null instead of throwing to prevent site crashes
    }

    return cached!.conn
}

export default dbConnect
