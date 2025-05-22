// This is a mock file upload service
// In a real application, you would use a file storage service like AWS S3, Google Cloud Storage, etc.

export const uploadFile = async (file: File): Promise<string> => {
  // In a real app, we would upload the file to a storage service
  // For this demo, we'll just return a mock URL
  
  // First, validate the file
  if (!isValidFile(file)) {
    throw new Error('Invalid file type or size');
  }
  
  // Mock upload delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a mock URL
  return `https://example.com/uploads/${file.name}`;
};

export const isValidFile = (file: File): boolean => {
  const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  return validTypes.includes(file.type) && file.size <= maxSize;
};