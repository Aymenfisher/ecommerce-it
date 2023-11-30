import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import  Box from '@mui/material/Box'
import React from 'react'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import extractCoordinatesFromGoogleMapsLink from '../../../../helpers/extractCoordinatesFromGoogleMapsLink';
import LaunchIcon from '@mui/icons-material/Launch';


const Location = ({ mapsLocation }) => {

    const [coordinates, setCoordinates] = React.useState([36.740690, 3.096240])
    React.useEffect(() => { //extract coordinates from link on component mount
        const newCoordinates = extractCoordinatesFromGoogleMapsLink(mapsLocation)
        setCoordinates([newCoordinates.latitude, newCoordinates.longitude])

    }, [])

    return (
        <Stack spacing={2} p={2} bgcolor={'brights.two'}>
            <Typography sx={{ fontWeight: '600 !important', typography: { xs: 'h6', sm: 'h4' } }}>
                <u style={{ textDecorationThickness: '8px', textUnderlineOffset: '10px', textDecorationColor: '#f0ce16' }}>Location</u>
            </Typography>
            <a href={mapsLocation} target='_blank' style={{ color: 'inherit',alignSelf:'flex-end' }}>
                <Stack direction={'row'}>
                    <Typography variant='body1' fontWeight={600} color={'text.secondary'} children='Open in maps' />
                    <LaunchIcon color='text.secondary' />
                </Stack>

            </a>
            <Box sx={{ width: '320px', height: '400px', alignSelf: 'center' }}>
                <MapContainer style={{ height: '100%', width: '100%' }}
                    center={coordinates} zoom={12}
                    scrollWheelZoom={false}
                    attributionControl={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={coordinates}>
                        <Popup>
                            Aymen Info Store
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>

        </Stack>
    )
}

export default Location