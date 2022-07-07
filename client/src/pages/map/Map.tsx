import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Heading, Flex, Stack, HStack, VStack, Text, IconButton } from "@chakra-ui/react";

import mapboxgl from "mapbox-gl";

import { LoadingBox, MessageBox } from 'components/helpers';
import { getPinDetails, getPinJson } from "Actions/pinActions";
import { detailsScreen } from '../../Actions/screenActions';
import {IoReload} from "react-icons/io5";
import { refreshPage } from "services/utils";

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX}`;

export function Map (mapProps: any) {

  const [mapFeatures, setMapFeatures] = React.useState<any>(mapProps?.mapProps?.features);
  const [geojson, setGeojson] = React.useState<any>({
    type: "FeatureCollection",
    features: mapProps?.mapProps?.features
  })
  
  const mapContainerRef = React.useRef<any>(null)

  // console.log(mapProps)
  const [lng, setLng] = React.useState<any>(null);
  const [lat, setLat] = React.useState<any>(null);


  const dispatch = useDispatch();

  // initialize map when component mounts
  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.08, 28.47],
      zoom: 2
    });

    const geoLocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
    });


    
      // add navigation control (zoom buttons)
      map.addControl(new mapboxgl.NavigationControl());
  
      map.addControl(geoLocate);

      map.on("load", () => {
        geoLocate.trigger();
        geojson?.features?.forEach((marker: any) => {
          new mapboxgl.Marker({
            color: "red",
            // draggable: true, 
          }).setLngLat(marker?.geometry?.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: -100 }) // add popups
              .setHTML(`<div>
                <h3>Cateory: ${marker?.properties?.category}</h3><p>Coordinates: [${marker?.geometry?.coordinates}]</p>
                <a href="${process.env.REACT_APP_BLINDS_URL}/screen/${marker?.properties?.screen}/${marker?.properties?.image?.split('/').slice(-1)[0]}" fontweight="600">Click her for screen details</a>
              </div>`)
          ).addTo(map);
        })
      });

      if(mapProps?.props) {
        setLat(mapProps?.props?.lat);
        setLng(mapProps?.props?.lng);
        new mapboxgl.Marker({
          color: "blue",
          // draggable: true
        }).setLngLat([lng, lat])
          .addTo(map);
      };
      

      map.on('move', () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        // setZoom(map.getZoom().toFixed(2));
      });

      // add popup when user clicks a points
      map.on('click', (event) => {
          // If the user clicked on one of your markers, get its information.
          const popup = new mapboxgl.Popup({ offset: [0, -100] })
          .setLngLat(event.lngLat)
          .setHTML(
          `<h3>${event.lngLat}</h3>`
          )
          .addTo(map);
        
      });

      // clean up on unmount
      return () => map.remove();
  }, [dispatch]);



  const reloadOption = (e: any) => {
    e.preventDefault();
    setMapFeatures(mapProps?.mapProps?.features);
    dispatch(getPinJson());
    refreshPage();

  }

  return (
    <Stack>
      <Flex p="2" justify="space-between">
        <Heading fontSize="15px">
        Longitude: {lng} | Latitude: {lat} |
          {/* Zoom: {zoom} */}
        </Heading>
        <IoReload  onClick={reloadOption}/>
      </Flex>
        <Box px="1" mt="" rounded="md" width="100%" height="100%">
          <Box rounded="md" width="100%" height={ mapProps?.props?.height || "540px" } ref={mapContainerRef} />
        </Box>
    </Stack>

  ) 
}