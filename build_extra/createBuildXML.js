const fs = require('fs')
const path = require('path')
const distOutput = require('../build_extra/distOutput')()

// buildXml: only required for PROD, is used to trigger server side build to live
function createBuildXML ({ env, project, location }) {
  const template = `<?xml version="1.0" encoding="utf-8"?>
<project basedir="./" default="compile">
  <property name="basedir" value="$\{basedir}" />
  <property name="deploy.base" value="${location}" />
  <property name="dir.name" value="dist/${env}" />
  <target name="deploy">
    <copy todir="$\{user.dir}/T3Interactives/$\{deploy.base}/$\{dir.name}" >
      <fileset dir="$\{basedir}">
        <exclude name="build.xml"/>
      </fileset>
    </copy>
  </target> 
  <target name="compile-deploy" depends="deploy">
    <echo>Done with $\{dir.name}</echo>
  </target>
</project>`

  return new Promise((resolve, reject) => {
    const file = `${path.join(process.cwd(), `dist/${distOutput}`)}/build.xml`
    fs.writeFile(file, template, err => {
      if (err) reject(err)
      resolve('build.xml created')
    })
  })
}

module.exports = createBuildXML
