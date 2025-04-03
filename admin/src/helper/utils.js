
export const uploadImage = async(file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "First-Time");
  const cloudName= "dlpuffz8s";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  const data = await response.json();
  return data.secure_url;
}

