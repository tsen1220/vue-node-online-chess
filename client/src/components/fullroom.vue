<template>
  <div>
    <span id="Msg">This room is full.</span>
    <router-link id="BackFull" to="/chess">Go Back to find new online chess room.</router-link>
  </div>
</template>

<script >
export default {
  name: "fullRoom"
};
</script>

<style lang='scss'>
#Msg {
  position: absolute;
  top: 100px;
  font-size: 30px;
}
#BackFull {
  position: absolute;
  top: 150px;
}
</style>