import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/database';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  
  const flightId = searchParams.get('flightId');
  
  if (!flightId) {
    return NextResponse.json({ error: 'Flight ID required' }, { status: 400 });
  }
  
  try {
    // Get booked seats for this flight
    const bookedSeats = await sql`
      SELECT seat_id 
      FROM booking 
      WHERE flight_id = ${flightId}
    `;
    
    // Get aircraft configuration
    const flightDetails = await sql`
      SELECT aircraft_type, total_rows 
      FROM flight_details 
      WHERE flight_id = ${flightId}
    `;
    
    return NextResponse.json({
      
    });
    
  } catch (error) {
    console.error('Error fetching seat data:', error);
    return NextResponse.json({ error: 'Failed to fetch seat data' }, { status: 500 });
  }
}