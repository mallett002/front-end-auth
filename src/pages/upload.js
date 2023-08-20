import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const upload = () => {
    const [saving, setSaving] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        if (data.logo[0]) {
            setSaving(true);
            // const filename = data.logo[0].name;
            const fileType = data.logo[0].type;
            console.log({fileType});
            //   const res = await fetch(
            //     `/api/presigned?file=${filename}&fileType=${fileType}`
            //   );
            //   const { url } = await res.json();
            //   console.log(url);
            const res = await fetch('/api/upload-image');
            const { imageUploadUrl } = await res.json();
            console.log(imageUploadUrl);

            const upload = await fetch(imageUploadUrl, {
                method: 'PUT',
                body: data.logo[0],
                headers: { 'Content-Type': fileType },
            });
            if (upload.ok) {
                console.log('Uploaded successfully!');
            } else {
                console.error('Upload failed.');
            }
            // const s3FileUrl = `https://popconcierge.s3.eu-west-3.amazonaws.com/${filename}`;
            //console.log('File URL', s3FileUrl);
            // setImageSrc(s3FileUrl);

            setSaving(false);
        }
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm m-auto py-10 mt-10 px-10 border"
            >
                <div className="mb-4 mt-6">
                    <input
                        type="file"
                        {...register('logo')}
                        className="w-full text-gray-600 bg-gray-100 rounded border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600"
                    />
                </div>
                <div className="text-right mt-6">
                    <input
                        type="submit"
                        value="Save"
                        disabled={saving}
                        className={`${saving && 'cursor-not-allowed'
                            } cursor-pointer  py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700  disabled:text-gray-300`}
                    />
                </div>
                {imageSrc.length > 0 && (
                    <>
                        <Image
                            src={imageSrc}
                            width={350}
                            height={350}
                            alt="Uploaded image"
                        />
                        <br />
                    </>
                )}
            </form>
        </div>
    );
};

export default upload;