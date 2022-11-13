import React, { useEffect, useRef, useState } from "react";
import { GeoJSONSource } from "mapbox-gl";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import swal from "sweetalert";
import { useToast } from "@chakra-ui/react";

import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJhcGFhcHB0aGVzaXMiLCJhIjoiY2w5NDhkaHgwMWluMDN1cW12Nnc0dHF5OSJ9.0_F07LK70CVlIicQLa1AKw";

function Map({
  viewOnly,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  marker,
  setMarker,
  readonly,
  markerdrag,
  setMarkerdrag,
}) {
  const mapContainerRef = useRef(null);

  const toast = useToast();

  useEffect(() => {
    if (latitude || longitude) {
      setLatitude(latitude);
      setLongitude(longitude);
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center:
        longitude && latitude
          ? [longitude, latitude]
          : [125.58183241513922, 7.106698342813786],
      zoom: 10,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    if (readonly) {
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])

        .addTo(map);
    }

    if (!viewOnly) {
      const mymarker =
        longitude || latitude
          ? new mapboxgl.Marker({
              draggable: true,
            })
              .setLngLat([longitude, latitude])

              .addTo(map)
          : null;

      if (longitude && latitude) {
        mymarker.on("dragend", (e) => {
          const lngLat = mymarker.getLngLat();
          setLatitude(lngLat.lat);
          setLongitude(lngLat.lng);
          setMarkerdrag(true);
        });
      }

      map.on("click", (e) => {
        const lng = e.lngLat.lng;
        const lat = e.lngLat.lat;

        if (marker) {
          toast({
            title: "Marker Already Exist!",
            description: "Drag and Drop Marker Instead to Change Location",
            status: "error",

            duration: 9000,
            isClosable: true,
          });
        } else {
          const NewMap = new mapboxgl.Marker({
            draggable: true,
          })
            .setLngLat([lng, lat])

            .addTo(map);
          setLatitude(lat);
          setLongitude(lng);
          setMarker(true);
        }
      });
    }
  }, [marker]);

  return <div className="map-container" ref={mapContainerRef} />;
}

export default Map;
