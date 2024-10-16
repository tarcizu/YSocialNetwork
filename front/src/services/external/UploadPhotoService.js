export async function UploadPhoto(photo) {


    const formData = new FormData();
    formData.append('image', photo.split(',')[1]);


    try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGEBB_TOKEN}`, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {

            const result = await res.json();
            return result.data.image.url;

        } else {
            return -1

        }
    } catch (error) {
        return -1;
    }

}