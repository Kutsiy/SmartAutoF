<template>
  <LMap
    style="
      width: 100%;
      height: 100%;
      border: 1px solid black;
      z-index: 10;
      border-radius: 15px;
    "
    :zoom="15"
    :center="[50.678, 30.6275]"
    :use-global-leaflet="false"
    ]
    :max-bounds="[
      [-90, -180],
      [90, 180],
    ]"
  >
    <LTileLayer
      style="z-index: 10"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      layer-type="base"
      name="OpenStreetMap"
      :no-wrap="true"
      :min-zoom="4"
      :draggable="false"
    />
    <LMarker :lat-lng="[50.678, 30.6275]" />
  </LMap>
</template>
