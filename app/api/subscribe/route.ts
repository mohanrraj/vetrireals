import { NextResponse } from 'next/server';
import { writeFile, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Create data directory if it doesn't exist
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    // Create or append to subscribers file
    const filePath = join(dataDir, 'subscribers.json');
    const timestamp = new Date().toISOString();
    const subscriber = { id: uuidv4(), email, subscribedAt: timestamp };
    
    let subscribers = [];
    
    // Read existing subscribers if file exists
    if (existsSync(filePath)) {
      const fileContent = await import('fs/promises').then(fs => 
        fs.readFile(filePath, 'utf-8')
      );
      subscribers = JSON.parse(fileContent);
    }

    // Check if email already exists
    const existingSubscriber = subscribers.find((sub: any) => sub.email === email);
    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'You are already subscribed to our updates!' },
        { status: 200 }
      );
    }

    // Add new subscriber
    subscribers.push(subscriber);
    
    // Save to file
    await import('fs/promises').then(fs => 
      fs.writeFile(filePath, JSON.stringify(subscribers, null, 2))
    );

    return NextResponse.json(
      { message: 'Thank you for subscribing! We\'ll notify you when we launch.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process your subscription. Please try again later.' },
      { status: 500 }
    );
  }
}
