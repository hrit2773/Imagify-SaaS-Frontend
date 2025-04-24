export async function generativeBackground({id,data}:{id:string, data:any}) {
    const response = await fetch(`http://localhost:8000/api/transform_image/${id}/generative_background/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to transform image');
    }
  
    return response.json();
}

export async function generativeFill({id,data}:{id:string, data:any}) {
    const response = await fetch(`http://localhost:8000/api/transform_image/${id}/generative_fill/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to transform image');
    }
  
    return response.json();
}
export async function enhance({id,data}:{id:string, data:any}) {
    const response = await fetch(`http://localhost:8000/api/transform_image/${id}/enhance/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to transform image');
    }
  
    return response.json();
}

export async function generativeReplace({id,data}:{id:string, data:any}) {
    const response = await fetch(`http://localhost:8000/api/transform_image/${id}/generative_replace/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to transform image');
    }
  
    return response.json();
}

export async function generativeRestore({id,data}:{id:string, data:any}) {
    const response = await fetch(`http://localhost:8000/api/transform_image/${id}/generative_restore/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to transform image');
    }
  
    return response.json();
}