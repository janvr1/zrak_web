<template>
    <div>
        <h3>{{device.name}}</h3>
        <p>Location: {{device.location}}</p>
    </div>
</template>

<script>
export default {
    name: "DeviceCard",
    props: {
        device: Object
    }
}
</script>