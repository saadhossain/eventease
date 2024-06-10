export const uploadImgToImgbb = async (formData: FormData) => {
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`;
    const res = await fetch(imgbbUrl, {
        method: 'POST',
        body: formData
    });
    const { data } = await res.json();
    const imageUrl = data.display_url;
    return imageUrl;
}