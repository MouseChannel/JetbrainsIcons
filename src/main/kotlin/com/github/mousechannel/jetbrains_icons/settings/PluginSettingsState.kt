package com.github.mousechannel.jetbrains_icons.settings

import com.intellij.ide.plugins.PluginManager.isPluginInstalled
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.components.PersistentStateComponent
import com.intellij.openapi.components.State
import com.intellij.openapi.components.Storage
import com.intellij.openapi.extensions.PluginId.getId
import com.intellij.util.xmlb.XmlSerializerUtil

@State(
  name = "com.github.mousechannel.jetbrains_icons.settings.PluginSettingsState",
  storages = [Storage("MouseChannelIcons.xml")],
)
class PluginSettingsState : PersistentStateComponent<PluginSettingsState> {
  var variant = Variant.MOUSECHANNEL.id

  var pythonSupport = true
  var javaSupport = isPluginInstalled(getId("com.intellij.java"))
  var goSupport = true

  override fun getState(): PluginSettingsState = this

  override fun loadState(state: PluginSettingsState) = XmlSerializerUtil.copyBean(state, this)

  companion object {
    val instance: PluginSettingsState
      get() = ApplicationManager.getApplication().getService(PluginSettingsState::class.java)
  }
}
