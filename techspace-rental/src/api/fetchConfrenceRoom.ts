

export async function fetchConferenceRoomsData(): Promise<any> { // Uppdatera typen efter ditt behov
  try {
    const response = await fetch('/api/conferenceRooms');
    if (!response.ok) {
      throw new Error(`Något gick fel: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

