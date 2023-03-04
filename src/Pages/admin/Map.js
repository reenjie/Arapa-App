import React, { useEffect, useRef, useState } from "react";
import { GeoJSONSource } from "mapbox-gl";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import swal from "sweetalert";
import { Input } from "@chakra-ui/react";

import "./Map.css";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase-config";
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
  dataview,
}) {
  const mapContainerRef = useRef(null);
  const [search, setSearch] = useState();
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

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for places",
      marker: false,
    });
    map.addControl(geocoder);
    

    // Handle search result
    geocoder.on("result", (ev) => {
      const { coordinates } = ev.result.geometry;
      map.flyTo({
        center: [coordinates[0],coordinates[1]],
        zoom: 14,
      });
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-left");

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
    } else {
      const fetch = async () => {
        const firestoreData = await getDocs(
          query(collection(db, "Schools"), where("status", "==", 1))
        );

        firestoreData.forEach((element) => {
          const el = document.createElement("div");
          switch (element.data().SchoolType) {
            case "Primary":
              el.className = "Primary";
              break;
            case "High School":
              el.className = "HS";
              break;

            case "Senior High School":
              el.className = "SHS";
              break;

            case "College":
              el.className = "College";
              break;
          }

          element.data().Map.map((row) => {
            new mapboxgl.Marker(el)
              .setLngLat([row.Lng, row.Lat])

              .addTo(map);
          });
        });
      };

      fetch();
    }
  }, [marker]);

  return (
    <>
      {!viewOnly && <div id="geocoder" class="geocoder"></div>}

      <div className="map-container" ref={mapContainerRef} />
    </>
  );
}

export default Map;
