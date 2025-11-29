import { NextResponse } from 'next/server';
import { getAllArticlesSync } from '@/lib/mdx-server.mjs';

export async function GET() {
  try {
    const articles = getAllArticlesSync();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}