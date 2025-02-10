import {mkdirSync, readdirSync, readFileSync, writeFileSync} from 'fs';
import {fileNames, fileExtensions} from "@/defaults/fileIcons";
import {folderNames} from "@/defaults/folderIcons";
import {folderIcons} from "@/icons/folderIcons"
import {fileIcons} from "@/icons/fileIcons";

function generateIcons(variant: string) {
  mkdirSync('src/main/resources/jetbrains_icons/icons', {recursive: true});
  // readdirSync(`generate/vscode-icons/icons/${variant}`).forEach((file) => {
  readdirSync(`generate/vscode-material-icon-theme/icons`).forEach((file) => {

    if (!file.endsWith('.svg')) {
      return
    }
    // let data = readFileSync(`generate/vscode-icons/icons/${variant}/${file}`, {encoding: 'utf-8'})
    // writeFileSync(`src/main/resources/jetbrains_icons/icons/${variant}_${file}`, data, {encoding: 'utf-8'})

    let data = readFileSync(`generate/vscode-material-icon-theme/icons/${file}`, {encoding: 'utf-8'})
    writeFileSync(`src/main/resources/jetbrains_icons/icons/${variant}_${file}`, data, {encoding: 'utf-8'})

  });
}

// VSCode sometimes doesn't need the `fileExtension` block to be populated but that affects JetBrains so we can add our
// own extensions/overrides here if need be.
const customFileExtensions = {razor: "razor"}
const extendedFileExtensions = {...fileExtensions, ...customFileExtensions}

let folder_icons = folderIcons[0]['icons']
let file_icons = fileIcons['icons']

function generateIconsKt() {
  let data = `package com.github.mousechannel.jetbrains_icons

import com.intellij.openapi.util.IconLoader

class Icons(private val variant: String) {`

  // readdirSync('generate/vscode-material-icon-theme/icons').forEach((file) => {
  readdirSync('generate/vscode-material-icon-theme/icons').forEach((file) => {

    if (!file.endsWith('.svg')) {
      return
    }
    data += `\n    @JvmField`
    data += `\n    val ${file.replace('.svg', '').replaceAll('-', '_')} = IconLoader.getIcon("/jetbrains_icons/icons/" + variant + "_${file}", javaClass)`
    data += `\n`
  })

  // Folders to Icons
  data += `\n    val FOLDER_TO_ICONS = mapOf(\n`
  let tt = fileIcons;
  Object.entries(folder_icons).forEach(([k, v]) => {
    let name = v['name'];
    for (let index = 0; index < v['folderNames'].length; index++) {
      let name_target = v['folderNames'][index]
      data += `        "${name_target}" to ${name.replaceAll('-', '_')},\n`
    }
  })
  data += `    )\n`


  // Object.entries(folderNames).forEach(([key, value]: [string, string]) => {
  //   data += `        "${key}" to ${value.replaceAll('-', '_')},\n`
  // })
  // data += `    )\n`

  // File name to Icons
  data += `\n    val FILE_TO_ICONS = mapOf(\n`


  Object.entries(file_icons).forEach(([k, v]) => {
    let name = v['name'];
    if (v['fileExtensions'])
      for (let index = 0; index < v['fileExtensions'].length; index++) {
        let name_target = v['fileExtensions'][index]
        data += `        "${name_target}" to ${name.replaceAll('-', '_')},\n`
      }
    if (v['fileNames']) {

      for (let index = 0; index < v['fileNames'].length; index++) {
        let name_target = v['fileNames'][index]
        // data += `        "${name_target}" to ${name.replaceAll('-', '_')},\n`
      }
    }
  })

  data += `    )\n`


  // Object.entries(fileNames).forEach(([key, value]: [string, string]) => {
  //   data += `        "${key}" to ${value.replaceAll('-', '_')},\n`
  // })
  // data += `    )\n`

  // Extensions to Icons
  data += `\n    val EXT_TO_ICONS = mapOf(\n`


  Object.entries(file_icons).forEach(([k, v]) => {
    let name = v['name'];
    if (v['fileExtensions']) {

      for (let index = 0; index < v['fileExtensions'].length; index++) {
        let name_target = v['fileExtensions'][index]
        data += `        "${name_target}" to ${name.replaceAll('-', '_')},\n`
      }
    }


  })


  data += `    )\n`


  // Object.entries(extendedFileExtensions).forEach(([key, value]: [string, string]) => {
  //   data += `        "${key}" to ${value.replaceAll('-', '_')},\n`
  // })
  // data += `    )\n`

  data += `\n}\n`

  writeFileSync(`src/main/kotlin/com/github/mousechannel/jetbrains_icons/Icons.kt`, data, {encoding: 'utf-8'})
}

// ['latte', 'frappe', 'macchiato', 'mocha', 'mousechannel'].forEach(generateIcons)
['mousechannel'].forEach(generateIcons)

generateIconsKt()
