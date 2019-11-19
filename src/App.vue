<template>
  <article
    :data-v="version"
    :data-project="project"
    :data-news="about.nca"
    :data-whimn="about.whimn"
    :data-mobile="about.mobile"
    :data-desktop="!about.mobile"
    :data-longform="about.longform"
    :data-theme="about.theme"
    :data-testenv="about.isTestEnv"
    data-type="dna-custom-app"
  >
    <div class="dna-custom-app">
      <pre v-if="content.showDump" class="dump">
        {{ JSON.stringify({ project, about }, 'utf-8', 2) }}
      </pre>
      <used-view />
    </div>
  </article>
</template>

<script>
import about from '@/functions/_about.js'
import projectName from '@/content/project.json'
import content from '@/content/index.js'

export default {
  name: 'App',
  data () {
    return {
      project: projectName.name,
      about: {},
      content,
      version: `1.0.${content.version || 0}`,
    }
  },
  components: { UsedView: content.layout },
  beforeMount () {
    this.about = about()
  },
}

</script>

<style lang="sass">
// Imports relative to the styleguide directory
@import index
@import reset


</style>
