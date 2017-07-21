<template lang="html">
  <div class='node-info' v-if="iotaNode.nodeInfo.appName !== null">
    <legend>Node Info</legend>
    <table class="wrap striped">
        <tbody>
            <tr>
                <td>Application Name</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.appName }}</td>
            </tr>
            <tr>
                <td>Application Version</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.appVersion }}</td>
            </tr>
            <tr>
                <td> Latest Milestone</td>
                <td class="mono-space">
                  <router-link :to="{ name: 'Transaction', params: { hash: iotaNode.nodeInfo.latestMilestone }}">{{ iotaNode.nodeInfo.latestMilestone }}</router-link>
                </td>
            </tr>
            <tr>
                <td>Lastest Milestone Index</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.latestMilestoneIndex }}</td>
            </tr>
            <tr>
                <td> Lastest Solid Subtangle Milestone</td>
                <td class="mono-space">
                  <router-link :to="{ name: 'Transaction', params: { hash: iotaNode.nodeInfo.latestSolidSubtangleMilestone }}">{{ iotaNode.nodeInfo.latestSolidSubtangleMilestone }}</router-link>
                </td>
            </tr>
            <tr>
                <td>Lastest Solid Subtangle Milestone Index</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.latestSolidSubtangleMilestoneIndex }}</td>
            </tr>
            <tr>
                <td>Number of Neighbours</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.neighbors }}</td>
            </tr>
            <tr>
                <td>Time</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.time }}</td>
            </tr>
            <tr>
                <td>Number of tips</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.tips }}</td>
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

<style scoped lang="stylus">

</style>
