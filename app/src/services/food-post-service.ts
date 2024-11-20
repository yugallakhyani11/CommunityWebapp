const BASE_URL = 'http://localhost:3000';

export interface FoodPost {
  _id: string;
  name: string;
  numOfPeople: number;
  shelfLife: number;
  location: string;
  image: string;
  description: string;
  email: string;
  status: boolean;
  timestamp: string;
}

// Function to fetch all food posts from the server
export async function getAllFoodPosts(): Promise<FoodPost[]> {
  try {
    const response = await fetch(`${BASE_URL}/foodPosts`);
    if (!response.ok) {
      throw new Error('Failed to fetch food posts');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching food posts:', error);
    throw error;
  }
}

// Function to fetch a food post by its ID from the server
export async function getFoodPostById(id: string): Promise<FoodPost> {
  try {
    const response = await fetch(`${BASE_URL}/foodPosts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch food post');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching food post:', error);
    throw error;
  }
}

// Function to create a new food post on the server
export async function createFoodPost(foodPostData: Omit<FoodPost, '_id'>): Promise<FoodPost> {
  try {
    const response = await fetch(`${BASE_URL}/foodPosts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodPostData),
    });
    if (!response.ok) {
      throw new Error('Failed to create food post');
    }
    return response.json();
  } catch (error) {
    console.error('Error creating food post:', error);
    throw error;
  }
}



// Function to update an existing food post on the server
export async function updateFoodPost(id: string, updatedData: Partial<FoodPost>): Promise<FoodPost> {
  try {
    const response = await fetch(`${BASE_URL}/foodPosts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update food post');
    }
    return response.json();
  } catch (error) {
    console.error('Error updating food post:', error);
    throw error;
  }
}

// Function to delete a food post by its ID from the server
export async function deleteFoodPostById(id: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/foodPosts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete food post');
    }
  } catch (error) {
    console.error('Error deleting food post:', error);
    throw error;
  }
}



// Function to search for food posts based on filter criteria
export async function searchFoodPosts(filterCriteria: { [key: string]: string }): Promise<FoodPost[]> {
  try {
    // Construct the query string from the filter criteria
    const queryString = new URLSearchParams(filterCriteria).toString();
    // Fetch food posts based on the constructed query string
    const response = await fetch(`${BASE_URL}/foodPosts/search?${queryString}`);
    if (!response.ok) {
      throw new Error('Failed to search food posts');
    }
    return response.json();
  } catch (error) {
    console.error('Error searching food posts:', error);
    throw error;
  }
}





