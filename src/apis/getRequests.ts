export const fetchImages = async () => {
  const res = await fetch('http://localhost:8000/api/images/')
  if (!res.ok) {
    throw new Error('Failed to fetch Images')
  }
  const data=await res.json()
  return data
}

export const fetchImageById = async ({queryKey}:any) => {
  const [, id] = queryKey;
  const res = await fetch(`http://localhost:8000/api/images/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch Images')
  }
  const data=await res.json()
  return data
}
