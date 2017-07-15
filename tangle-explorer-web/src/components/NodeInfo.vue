<template lang="html">
  <div class='node-info' v-if="iotaNode.nodeInfo.appName !== null">
    <legend>Node Info</legend>
    <table class="wrap-table table table-striped">
        <tbody>
            <tr>
                <td>Application Name</td>
                <td>{{ iotaNode.nodeInfo.appName }}</td>
            </tr>
            <tr>
                <td>Application Version</td>
                <td>{{ iotaNode.nodeInfo.appVersion }}</td>
            </tr>
            <tr>
                <td> Latest Milestone</td>
                <td>{{ iotaNode.nodeInfo.latestMilestone }}</td>
            </tr>
            <tr>
                <td>Lastest Milestone Index</td>
                <td>{{ iotaNode.nodeInfo.latestMilestoneIndex }}</td>
            </tr>
            <tr>
                <td> Lastest Solid Subtangle Milestone</td>
                <td>{{ iotaNode.nodeInfo.latestSolidSubtangleMilestone }}</td>
            </tr>
            <tr>
                <td>Lastest Solid Subtangle Milestone Index</td>
                <td>{{ iotaNode.nodeInfo.latestSolidSubtangleMilestoneIndex }}</td>
            </tr>
            <tr>
                <td>Number of Neighbours</td>
                <td>{{ iotaNode.nodeInfo.neighbors }}</td>
            </tr>
            <tr>
                <td>Time</td>
                <td>{{ iotaNode.nodeInfo.time }}</td>
            </tr>
            <tr>
                <td>Number of tips</td>
                <td>{{ iotaNode.nodeInfo.tips }}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
require('@/lib/iota')
var iotaNode = require("@/utils/iota-node")

export default {
  data() {
    return {
      iotaNode: iotaNode
    }
  }
}
</script>

<style lang="css">
</style>
