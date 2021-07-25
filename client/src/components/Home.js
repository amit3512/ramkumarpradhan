import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';

export default function Home() {
    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        try {
            const res = await fetch('/api/images');
            const data = await res.json();
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadImages();
    }, []);
    return (
        <div>
            <h1 className="title">Cloudinary Gallery</h1>
            <div className="container">
            <div className="row">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                    
                           
                                     <div className="col-md-4">
                                     <Image
                                            key={index}
                                            cloudName="amit-shrestha"
                                            publicId={imageId}
                                            // width="300"
                                            crop="scale"
                                            className="img"
                                        />
                                     </div>
                        
                           
                        
                        
                    ))}
            </div>
            </div>
        </div>
    );
}
