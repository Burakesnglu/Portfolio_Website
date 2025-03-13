import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/app/lib/auth';
import { projectSchema } from '@/app/lib/validators';

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const category = searchParams.get('category');
  const limit = searchParams.get('limit');
  
  // Build query
  let query = supabase.from('projects').select('*');
  
  // Apply filters
  if (featured === 'true') {
    query = query.eq('featured', true);
  }
  
  if (category) {
    query = query.eq('category', category);
  }
  
  // Apply ordering
  query = query.order('order', { ascending: true });
  
  // Apply limit
  if (limit) {
    query = query.limit(parseInt(limit));
  }
  
  // Execute query
  const { data, error } = await query;
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  
  // Check authentication
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = projectSchema.parse(body);
    
    // Insert project
    const { data, error } = await supabase
      .from('projects')
      .insert(validatedData)
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Invalid request' },
      { status: 400 }
    );
  }
} 