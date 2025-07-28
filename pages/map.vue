<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Leaflet Map</h2>

    <l-map
      ref="myMap"
      style="height: 600px; width: 100%;"
      :zoom="13"
      :center="mapCenter"
      @click="handleMapClick"
    >
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <l-marker
        v-for="(marker, index) in markers"
        :key="index"
        :lat-lng="marker.position"
        :draggable="true"
        @moveend="e => updateMarker(index, e.target.getLatLng())"
        @contextmenu="() => removeMarker(index)"
      >
        <l-popup>
          <div>
            <strong>{{ marker.name }}</strong><br />
            {{ marker.description }}<br />
            <small class="text-gray-500">Right-click OR click remove</small><br />
            <div class="mt-2 space-x-2">
              <button
                @click="openStreetView(marker.position)"
                class="bg-blue-500 text-white text-xs px-2 py-1 rounded"
              >
                Street View
              </button>
              <button
                @click="removeMarker(index)"
                class="bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        </l-popup>
      </l-marker>
    </l-map>

    <!-- Form Modal -->
    <div
      v-if="showForm"
      class="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border p-4 shadow-lg z-50 w-80 rounded"
    >
      <h3 class="font-semibold mb-2">Add Marker</h3>
      <input
        v-model="form.name"
        placeholder="Name"
        class="border p-2 mb-2 w-full rounded"
      />
      <textarea
        v-model="form.description"
        placeholder="Description"
        class="border p-2 mb-2 w-full rounded"
      ></textarea>
      <div class="flex justify-end space-x-2">
        <button @click="saveMarker" class="bg-green-500 text-white px-3 py-1 rounded">
          Save
        </button>
        <button @click="cancel" class="bg-gray-400 text-white px-3 py-1 rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import * as L from 'leaflet'
import 'leaflet-control-geocoder'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    return {
      mapCenter: [14.5995, 120.9842], // Metro Manila
      markers: [],
      mapObject: null,
      showForm: false,
      form: {
        name: '',
        description: '',
        latlng: null
      }
    }
  },
  methods: {
    handleMapClick(e) {
      this.form.latlng = e.latlng
      this.showForm = true
    },
    saveMarker() {
      if (this.form.name.trim()) {
        this.markers.push({
          position: this.form.latlng,
          name: this.form.name,
          description: this.form.description
        })
        this.resetForm()
      }
    },
    cancel() {
      this.resetForm()
    },
    resetForm() {
      this.form = { name: '', description: '', latlng: null }
      this.showForm = false
    },
    updateMarker(index, newLatLng) {
      this.markers[index].position = newLatLng
    },
    removeMarker(index) {
      if (confirm('Remove this marker?')) {
        this.markers.splice(index, 1)
      }
    },
    initSearchControl() {
      if (this.mapObject) {
        const geocoder = L.Control.geocoder({
          defaultMarkGeocode: false
        })
          .on('markgeocode', e => {
            const center = e.geocode.center
            this.mapCenter = [center.lat, center.lng]
            this.mapObject.setView(center, 15)

            // Add marker from search result
            this.markers.push({
              position: center,
              name: 'Search Result',
              description: e.geocode.name || 'From search'
            })
          })
          .addTo(this.mapObject)
      }
    },
    openStreetView(latlng) {
      const { lat, lng } = latlng
      const url = `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0&z=18`
      window.open(url, '_blank')
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mapObject = this.$refs.myMap.mapObject
      this.initSearchControl()
    })
  }
}
</script>

<style scoped>
.leaflet-container {
  height: 100%;
}
.leaflet-control-geocoder {
  z-index: 1000;
}
</style>