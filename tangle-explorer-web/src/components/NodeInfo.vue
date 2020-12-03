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
                <td title="Current IRI version">Application Version</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.appVersion }}</td>
            </tr>
            <tr>
                <td title="Current Milestone hash of the tangle"> Latest Milestone</td>
                <td class="mono-space">
                  <router-link :title="iotaNode.nodeInfo.latestMilestone" :to="{ name: 'Transaction', params: { hash: iotaNode.nodeInfo.latestMilestone }}">{{ iotaNode.nodeInfo.latestMilestone }}</router-link>
                </td>
            </tr>
            <tr>
                <td title="Current Milestone index of the tangle">Lastest Milestone Index</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.latestMilestoneIndex }}</td>
            </tr>
            <tr>
                <td title="Current Solid Subtangle hash of the tangle"> Lastest Solid Subtangle Milestone</td>
                <td class="mono-space">
                  <router-link :title="iotaNode.nodeInfo.latestSolidSubtangleMilestone" :to="{ name: 'Transaction', params: { hash: iotaNode.nodeInfo.latestSolidSubtangleMilestone }}">{{ iotaNode.nodeInfo.latestSolidSubtangleMilestone }}</router-link>
                </td>
            </tr>
            <tr>
                <td title="Current Solid Subtangle index of the tangle">Lastest Solid Subtangle Milestone Index</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.latestSolidSubtangleMilestoneIndex }}</td>
            </tr>
            <tr>
                <td title="Number of neighbouring nodes connected">Number of Neighbours</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.neighbors }}</td>
            </tr>
            <tr>
                <td title="Time since genesis transaction">Time</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.time }}</td>
            </tr>
            <tr>
                <td title="Number of uncomfirmed transactions in the tangle">Number of tips</td>
                <td class="mono-space">{{ iotaNode.nodeInfo.tips }}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
var iotaNode = require("@/utils/iota-node").default

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
