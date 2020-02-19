<template>
    <div>
        <h3> Device Info </h3>
        <div style="display: inline;">Name: {{device.name}} </div>
        <div style="display: inline;">ID: {{device.id}} </div>
        <div style="display: inline;">Location: {{device.location}} </div>
        <div style="display: inline;">Time created: {{device.time_created}} </div>
    </div>
</template>

<script>
export default {
    name: 'DeviceInfoBox',
    props: {
        device: Object,
    }
}
</script>