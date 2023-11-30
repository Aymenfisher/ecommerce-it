import UploadIcon from '@mui/icons-material/Upload';
import React from 'react'
import { Stack, Button, Card, CardMedia, IconButton,Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';



const ImagesForm = ({ getValues, setValue, watch }) => {

    const handleImageChange = (event) => {
        //getting uploaded images
        const files = event.target.files;
        //only image files allowed
        const newImages = Array.from(files).filter(file => file.type.includes('image/'))
        setValue('images', [...getValues('images'), ...newImages],{shouldDirty:true}) // update the images field state with the new uploaded images

        // in case no main image exists , we choose the first uploaded image as the main image
        if (!getValues('mainImage')) {
            setValue('mainImage', newImages[0],{shouldDirty:true})
        }
    };

    const removeImage = (image) => {
        //deleting the image from the images field state
        setValue('images', getValues('images').filter(oldImage => oldImage !== image),{shouldDirty:true})
         // if the deleted image is the main image, we change the main image to be the first image from the images field state
        if (image == getValues('mainImage')) {
            setValue('mainImage', getValues('images')[0],{shouldDirty:true})
        }
        //if this is the last image , we reset default values
        if(!getValues('images').length){
            setValue('mainImage','',{shouldDirty:true})
        }
        return
    };

    React.useEffect(() => { // rerender to display uploaded images
    }, [watch(['images', 'mainImage'])])

    return (
        <Stack alignItems={'center'} spacing={2} sx={{ p: 2, alignItems: 'center' }}>
            {
                !getValues('images').length ?
                <Stack sx={{height:'300px',width:'100%',border:'1px dashed black',p:2}} alignItems={'center'} justifyContent={'center'} >
                    <Typography variant='body1' textAlign={'center'} fontWeight={800} color={'text.secondary'} children='No images uploaded, click the button below to upload'/>
                </Stack>
                :
                <Stack direction={'row'} columnGap={2} rowGap={2} flexWrap={'wrap'} justifyContent={'center'}>
                {getValues('images').map((image, index) => {
                    return (
                        <Card key={`${image.type || image}${index}`} sx={{ width: '200px', height: '230px', border: getValues('mainImage') == image && '2px solid #2979ff', boxShadow: getValues('mainImage') == image && '0 0 10px #2979ff' }}>
                            <Stack height='100%'>
                                <IconButton
                                    sx={{ alignSelf: 'flex-end', height: '30px' }}
                                    title='Clear Image'
                                    onClick={() => removeImage(image)}
                                >
                                    <ClearIcon color='mainBlack' />
                                </IconButton>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '100%', height: '200px', objectFit: 'contain', cursor: 'pointer' }}
                                    alt="Image Preview"
                                    src={image.type ? URL.createObjectURL(image) : image}
                                    onClick={() => setValue('mainImage', image,{shouldDirty:true})}
                                />
                            </Stack>
                        </Card>
                    )
                })}
            </Stack>
            }

            <Button
                variant="contained"
                component="label"
                startIcon={<UploadIcon />}
                size='medium'
            >
                Upload Images
                <input
                    accept='/image/*'
                    type="file"
                    multiple
                    hidden
                    onChange={handleImageChange}
                />
            </Button>

        </Stack>
    )
}

export default ImagesForm