/**
 * Upload image to ImgBB and return the public URL
 * @param file - The File object to upload
 * @returns Promise with the image URL or null if failed
 */
export async function uploadToImgBB(file: File): Promise<string | null> {
  const API_KEY = "f934156a9cbd332096a0999cc3725dcd";
  
  if (!API_KEY) {
    console.error('ImgBB API key is missing');
    return null;
  }

  try {
    // Convert File to base64
    const base64 = await fileToBase64(file);
    
    // Remove data:image/...;base64, prefix
    const base64Data = base64.split(',')[1];

    const formData = new FormData();
    formData.append('key', API_KEY);
    formData.append('image', base64Data);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success && data.data?.url) {
      return data.data.url;
    } else {
      console.error('ImgBB upload failed:', data);
      return null;
    }
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    return null;
  }
}

/**
 * Convert File to base64 string
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
