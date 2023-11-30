import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import  Box from '@mui/material/Box'
import React from 'react'

const Brands = () => {
    const [images, setImages] = React.useState([]);
    React.useEffect(() => {
        const importImages = async () => {
            const imageFiles = import.meta.glob('/public/assets/brands/*.+(png|jpe?g|svg|webp)');
            const importedImages = await Promise.all(
                Object.values(imageFiles).map((importedModule) => importedModule())
            );
            setImages(importedImages.map(image => image.default));
        };

        importImages();
    }, []);
    return (
        <Stack spacing={2} sx={{ p: 4, bgcolor: 'brights.one' }}>
            <Typography sx={{ fontWeight: '800 !important', alignSelf: 'center',typography:{xs:'h6',sm:'h4'} }}>
                <u style={{ textDecorationThickness: '8px', textUnderlineOffset: '10px', textDecorationColor: '#f0ce16' }}>Top</u> Brands we deal with
            </Typography>
            <Stack direction={'row'} justifyContent={'space-evenly'} flexWrap={'wrap'} spacing={1} rowGap={2} sx={{ py: 4 }}>
                {
                    images.map( image =>
                        <Box
                        key={image}
                        component="img"
                        sx={{
                            maxWidth: { xs: 50, sm: 80,md:100 },
                            objectFit: 'contain'
                        }}
                        alt="brand"
                        src={image}
                    />
                    )
                }
            </Stack>
        </Stack>
    )
}

export default Brands