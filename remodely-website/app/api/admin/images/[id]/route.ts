import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { jwtVerify } from 'jose';

async function verifyAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) return false;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'remodely-admin-secret-key-2024');
    const { payload } = await jwtVerify(token, secret);
    return payload.admin === true;
  } catch (error) {
    return false;
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyAuth(request);
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const DATA_DIR = path.join(process.cwd(), 'data');
    const IMAGES_FILE = path.join(DATA_DIR, 'images.json');
    const fileContent = await fs.readFile(IMAGES_FILE, 'utf8');
    const rawData = JSON.parse(fileContent);
    const existingData = Array.isArray(rawData) ? { images: rawData } : rawData;
    const image = existingData.images.find((img: any) => img.id === params.id);
    
    if (!image) {
      return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch image' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyAuth(request);
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedData = await request.json();
    const DATA_DIR = path.join(process.cwd(), 'data');
    const IMAGES_FILE = path.join(DATA_DIR, 'images.json');
    const fileContent = await fs.readFile(IMAGES_FILE, 'utf8');
    const rawData = JSON.parse(fileContent);
    let existingData = Array.isArray(rawData) ? { images: rawData } : rawData;
    
    const imageIndex = existingData.images.findIndex((img: any) => img.id === params.id);
    if (imageIndex === -1) {
      return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
    }

    existingData.images[imageIndex] = { ...existingData.images[imageIndex], ...updatedData };
    await fs.writeFile(IMAGES_FILE, JSON.stringify(existingData, null, 2));
    
    return NextResponse.json({ success: true, data: existingData.images[imageIndex] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update image' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyAuth(request);
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const DATA_DIR = path.join(process.cwd(), 'data');
    const IMAGES_FILE = path.join(DATA_DIR, 'images.json');
    const fileContent = await fs.readFile(IMAGES_FILE, 'utf8');
    const rawData = JSON.parse(fileContent);
    let existingData = Array.isArray(rawData) ? { images: rawData } : rawData;
    
    existingData.images = existingData.images.filter((img: any) => img.id !== params.id);
    await fs.writeFile(IMAGES_FILE, JSON.stringify(existingData, null, 2));
    
    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete image' }, { status: 500 });
  }
}
